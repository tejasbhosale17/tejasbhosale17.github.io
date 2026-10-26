# Tejas Bhosale — Portfolio

A responsive portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS 4, and Lenis. Portfolio copy and links are centralized in `src/lib/data.ts`; entries are sourced from the supplied résumé.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Create a production build with `npm run build` and serve it with `npm start`.
Set `NEXT_PUBLIC_SITE_URL` to the deployed site origin when publishing so Open Graph URLs use the public hostname.

## Deploy to GitHub Pages

This project is configured for the `tejasbhosale17.github.io` user site. Static files are generated into `out/`, and `.github/workflows/deploy.yml` publishes them to GitHub Pages whenever a commit is pushed to `main`.

1. Create the GitHub repository `tejasbhosale17/tejasbhosale17.github.io`.
2. In the repository, open **Settings → Pages** and select **GitHub Actions** as the deployment source.
3. Push the project to the repository's `main` branch. Check the **Actions** tab for the deployment, then visit [https://tejasbhosale17.github.io](https://tejasbhosale17.github.io).

## Sections

| Order | Section | Content |
| --- | --- | --- |
| 01 | Hero | Intro video, role, résumé |
| 02 | About | Profile, links, education |
| 03 | Skills | Résumé skill groups |
| 04 | Work | Four résumé projects |
| 05 | Certifications | AWS certification |
| 06 | Experience | Education and employment timeline |
| 07 | Achievements | Résumé publication |
| 08 | Contact | Résumé contact details |

## Hero video

The current introduction source is `intro_video_closeup.mp4`; its original copy is available at `public/hero/intro_video_closeup.mp4`. The website plays the generated `public/hero/hero.webm` first and falls back to `public/hero/hero.mp4`. To rebuild the centered, cropped loop from the source, install FFmpeg (including `ffprobe`), NumPy, and Pillow, then run:

```bash
python -m pip install numpy Pillow
python scripts/build-hero-assets.py "public/hero/intro_video_closeup.mp4" --crop 576 0 768 1080
```

The crop is explicit so the script never guesses where the person is. It trims to the first ten seconds by default, whitens the light background, and cross-fades the picture and decoded audio at the loop boundary. It also writes the portrait and Open Graph image; without `--portrait-image`, it uses the video frame at `--portrait-seconds` (default `1.0`). `--output` can select another output folder.

## Assets and credits

- `public/Tejas-Bhosale-Resume.pdf` is the provided résumé.
- `public/portrait-bust.webp` and `public/og.jpg` are derived from the provided studio portrait.
- `public/hero/intro_video_closeup.mp4` is the original close-up introduction video used to generate the hero loop. No external scripts, image CDNs, or third-party logo assets are used.
- The local font files in `src/fonts/` are open-source font binaries: Inter Tight, JetBrains Mono, and Instrument Serif (SIL Open Font License). Their license texts are in that directory.
