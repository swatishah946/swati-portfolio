import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource-variable/public-sans";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Swati Shah — Full-stack developer",
  description:
    "Swati Shah is a full-stack developer and computer science student at IIIT Kota, building web applications and AI-powered products.",
  openGraph: {
    title: "Swati Shah — Full-stack developer",
    description: "Full-stack developer building web applications and AI-powered products.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { color: "#11191b" },
  ],
};

// Sets the theme before paint so there's no flash.
// Dark is the default; a saved choice from the toggle wins.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
