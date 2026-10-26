import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const interTight = localFont({
  src: "../fonts/inter-tight.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});

const instrumentSerif = localFont({
  src: [
    { path: "../fonts/instrument-serif-regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../fonts/jetbrains-mono.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Tejas Bhosale — Software Engineer",
  description: "Portfolio of Tejas Bhosale, Software Engineer.",
  openGraph: {
    title: "Tejas Bhosale — Software Engineer",
    description: "Portfolio of Tejas Bhosale, Software Engineer.",
    type: "website",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
