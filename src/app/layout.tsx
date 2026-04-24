import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lmsc.co.za"),
  title: {
    template: "%s | Lekanka MSC",
    default: "Lekanka MSC | Mining, Supply & Construction",
  },
  description: "Lekanka Mining, Supply and Construction — end-to-end mining, supply, and construction solutions built on quality, safety, and reliability.",
  openGraph: {
    title: "Lekanka MSC | Mining, Supply & Construction",
    description: "Lekanka Mining, Supply and Construction — end-to-end mining, supply, and construction solutions built on quality, safety, and reliability.",
    url: "https://www.lmsc.co.za",
    siteName: "Lekanka MSC",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Lekanka MSC — Mining, Supply & Construction",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lekanka MSC | Mining, Supply & Construction",
    description: "End-to-end mining, supply, and construction solutions built on quality, safety, and reliability across South Africa.",
    images: ["/images/og-home.jpg"],
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  other: {
    "theme-color": "#861414",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-ZA"
      data-scroll-behavior="smooth"
      className={`${satoshi.variable} ${instrumentSans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
