#!/usr/bin/env python3
"""Prepare a centered, softly whitened loop from an intro video using ffmpeg and numpy."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps


def run(command: list[str], *, capture: bool = False) -> bytes:
    result = subprocess.run(
        command,
        check=True,
        stdout=subprocess.PIPE if capture else None,
    )
    return result.stdout if capture else b""


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path, help="source MP4/MOV file")
    parser.add_argument("--crop", nargs=4, type=int, metavar=("X", "Y", "W", "H"), required=True,
                        help="person-centered crop; set after inspecting the source video")
    parser.add_argument("--output", type=Path, default=Path("public/hero"))
    parser.add_argument("--seconds", type=float, default=10.0)
    parser.add_argument("--portrait-image", type=Path,
                        help="optional portrait photo; otherwise a frame from the video is used")
    parser.add_argument("--portrait-seconds", type=float, default=1.0,
                        help="frame time to use for the portrait when no photo is provided")
    args = parser.parse_args()

    ffmpeg = shutil.which("ffmpeg")
    ffprobe = shutil.which("ffprobe")
    if not ffmpeg or not ffprobe:
        parser.error("ffmpeg and ffprobe must be installed and available on PATH")
    if not args.input.is_file():
        parser.error(f"input video does not exist: {args.input}")

    x, y, width, height = args.crop
    if min(x, y) < 0 or min(width, height) <= 0:
        parser.error("crop X/Y must be nonnegative and crop width/height must be positive")

    probe = json.loads(run([
        ffprobe, "-v", "error", "-show_streams", "-show_format", "-of", "json", str(args.input)
    ], capture=True))
    video_stream = next((stream for stream in probe["streams"] if stream["codec_type"] == "video"), None)
    audio_stream = next((stream for stream in probe["streams"] if stream["codec_type"] == "audio"), None)
    if video_stream is None:
        parser.error("input has no video stream")
    source_duration = float(probe["format"]["duration"])
    duration = min(args.seconds, source_duration)
    if duration <= 1:
        parser.error("input must be longer than one second to create the loop")
    if x + width > int(video_stream["width"]) or y + height > int(video_stream["height"]):
        parser.error("crop extends beyond the source video dimensions")

    args.output.mkdir(parents=True, exist_ok=True)
    width_out = 768
    height_out = round(height * width_out / width / 2) * 2
    fade = 0.5
    body_duration = duration - 1
    video_filter = (
        f"crop={width}:{height}:{x}:{y},"
        "colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,"
        f"scale={width_out}:{height_out},fps=30,format=yuv420p,split=3[body][tail][head];"
        f"[body]trim=start={fade}:duration={body_duration},setpts=PTS-STARTPTS[vbody];"
        f"[tail]trim=start={duration-fade}:duration={fade},setpts=PTS-STARTPTS[vtail];"
        f"[head]trim=start=0:duration={fade},setpts=PTS-STARTPTS[vhead];"
        "[vtail][vhead]xfade=transition=fade:duration=0.5:offset=0[vloop];"
        "[vbody][vloop]concat=n=2:v=1:a=0[outv]"
    )
    if audio_stream is not None:
        sample_rate = 48000
        pcm = run([
            ffmpeg, "-v", "error", "-i", str(args.input), "-t", str(duration),
            "-vn", "-ac", "2", "-ar", str(sample_rate), "-f", "f32le", "-"
        ], capture=True)
        audio = np.frombuffer(pcm, dtype="<f4").reshape(-1, 2)
        fade_samples = round(fade * sample_rate)
        duration_samples = min(len(audio), round(duration * sample_rate))
        audio = audio[:duration_samples]
        if len(audio) <= 2 * fade_samples:
            parser.error("audio is too short to cross-fade")
        tail = audio[-fade_samples:]
        head = audio[:fade_samples]
        phase = np.linspace(0, np.pi / 2, fade_samples, endpoint=True, dtype=np.float32)[:, None]
        crossfade = tail * np.cos(phase) + head * np.sin(phase)
        loop = np.concatenate((audio[fade_samples:-fade_samples], crossfade), axis=0)
        raw_audio = args.output / "hero-audio.f32le"
        raw_audio.write_bytes(loop.astype("<f4", copy=False).tobytes())
        audio_input = ["-f", "f32le", "-ar", str(sample_rate), "-ac", "2", "-i", str(raw_audio)]
    else:
        audio_input = []

    base = [
        ffmpeg, "-y", "-v", "error", "-i", str(args.input), *audio_input,
        "-filter_complex", video_filter, "-map", "[outv]",
    ]
    output_duration = duration - fade
    audio_map = ["-map", "1:a:0", "-t", str(output_duration)] if audio_stream else ["-an"]
    mp4 = args.output / "hero.mp4"
    webm = args.output / "hero.webm"
    run(base + audio_map + [
        "-t", str(output_duration), "-c:v", "libx264", "-crf", "24", "-preset", "slow",
        "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", str(mp4)
    ])
    run(base + audio_map + [
        "-t", str(output_duration), "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
        "-c:a", "libopus", "-b:a", "80k", str(webm)
    ])

    if args.portrait_image:
        if not args.portrait_image.is_file():
            parser.error(f"portrait image does not exist: {args.portrait_image}")
        portrait_source = Image.open(args.portrait_image).convert("RGB")
        image_width, image_height = portrait_source.size
        crop_height = int(image_height * 0.58)
        crop_width = min(image_width, round(crop_height * 0.8))
        left = max(0, (image_width - crop_width) // 2)
        portrait_source = portrait_source.crop((left, 0, left + crop_width, crop_height))
    else:
        frame_path = args.output / ".hero-portrait-frame.png"
        portrait_time = min(max(args.portrait_seconds, 0), duration)
        run([
            ffmpeg, "-y", "-v", "error", "-ss", str(portrait_time), "-i", str(args.input),
            "-frames:v", "1", str(frame_path)
        ])
        frame = Image.open(frame_path).convert("RGB")
        image_width, image_height = frame.size
        portrait_width = min(round(width * 0.6), image_width - x)
        portrait_height = min(round(portrait_width / 0.8), height, image_height - y)
        portrait_width = min(round(portrait_height * 0.8), portrait_width)
        left = x + (width - portrait_width) // 2
        portrait_source = frame.crop((left, y, left + portrait_width, y + portrait_height))
        frame.close()
        frame_path.unlink(missing_ok=True)

    portrait = ImageOps.fit(portrait_source, (480, 600), method=Image.Resampling.LANCZOS,
                            centering=(0.5, 0.18))
    portrait_path = args.output.parent / "portrait-bust.webp"
    portrait.save(portrait_path, "WEBP", quality=90, method=6)

    og = Image.new("RGB", (1200, 630), (244, 242, 238))
    drawing = ImageDraw.Draw(og)

    def get_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
        candidates = (
            Path("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"),
            Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold
                 else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
        )
        for candidate in candidates:
            if candidate.is_file():
                return ImageFont.truetype(str(candidate), size=size)
        return ImageFont.load_default(size=size)

    drawing.line((70, 110, 710, 110), fill=(190, 188, 182), width=1)
    drawing.text((70, 155), "PORTFOLIO", font=get_font(22), fill=(100, 98, 93))
    drawing.text((62, 248), "Tejas", font=get_font(82, bold=True), fill=(13, 13, 13))
    drawing.text((62, 340), "Bhosale", font=get_font(82, bold=True), fill=(13, 13, 13))
    drawing.text((70, 475), "Software Engineer", font=get_font(22), fill=(58, 58, 58))
    drawing.text((70, 522), "Hayward, CA", font=get_font(18), fill=(119, 117, 111))
    og_portrait = ImageOps.fit(ImageOps.grayscale(portrait).convert("RGB"), (410, 630),
                               method=Image.Resampling.LANCZOS, centering=(0.5, 0.3))
    og.paste(og_portrait, (790, 0))
    og.save(args.output.parent / "og.jpg", "JPEG", quality=88, optimize=True)

    temp = args.output / "hero-audio.f32le"
    temp.unlink(missing_ok=True)
    print(f"Wrote {mp4}, {webm}, {portrait_path}, and {args.output.parent / 'og.jpg'}.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (subprocess.CalledProcessError, OSError, ValueError, KeyError) as error:
        print(f"hero asset build failed: {error}", file=sys.stderr)
        raise SystemExit(1)
