import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "LLimb Games",
    template: "%s | LLimb Games",
  },
  description:
    "Indie game studio crafting unique gaming experiences. Explore our games, prototypes, and professional services including web development, game prototyping, and 3D modeling.",
  keywords: [
    "indie games",
    "game development",
    "LLimb Games",
    "game studio",
    "web development",
    "game prototyping",
    "3D modeling",
  ],
  authors: [{ name: "LLimb Games" }],
  creator: "LLimb Games",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LLimb Games",
    title: "LLimb Games",
    description:
      "Indie game studio crafting unique gaming experiences. Explore our games, prototypes, and professional services.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LLimb Games",
    description:
      "Indie game studio crafting unique gaming experiences. Explore our games, prototypes, and professional services.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
