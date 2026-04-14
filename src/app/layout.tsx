import type { Metadata } from "next";
import { Inter, Press_Start_2P, VT323, Pixelify_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
});

const vt323 = VT323({
  variable: "--font-matrix",
  weight: "400",
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-doom",
  subsets: ["latin"],
});

const xpFont = Inter({
  variable: "--font-xp",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Poker Planning",
  description: "Estimate your Jira tickets as a team.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${inter.variable} ${pressStart2P.variable} ${vt323.variable} ${pixelifySans.variable} ${xpFont.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-gray-950 font-[family-name:var(--font-inter)]">{children}</body>
    </html>
  );
}
