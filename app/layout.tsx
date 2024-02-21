import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Player from "@/components/player";

export const metadata: Metadata = {
  title: "Guess the Song",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} bg-slate-950 font-mono min-h-screen`}
      >
        <Player>
          {children}
        </Player>
        <SpeedInsights />
      </body>
    </html>
  );
}
