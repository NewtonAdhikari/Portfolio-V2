import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { JsonLd } from "@/components/shared/JsonLd";
import { siteUrl, ogImage } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Newton Adhikari — Computer Science Engineer, Researcher & Technology Enthusiast",
    template: "%s | Newton Adhikari",
  },
  description:
    "Premium portfolio of a Computer Science Engineering student and aspiring researcher — exploring artificial intelligence, machine learning, large language models, causal reasoning and trustworthy AI through code, research and innovation.",
  keywords: [
    "Computer Science Engineering",
    "portfolio",
    "artificial intelligence",
    "machine learning",
    "research",
    "large language models",
    "causal inference",
    "software development",
  ],
  authors: [{ name: "Newton Adhikari", url: siteUrl }],
  creator: "Newton Adhikari",
  publisher: "Newton Adhikari",
  applicationName: "Newton Adhikari",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Newton Adhikari — Building Intelligent Solutions Through Code, Research & Innovation",
    description:
      "An aspiring computer scientist and technology enthusiast passionate about software development, AI, machine learning and innovative research.",
    siteName: "Newton Adhikari",
    type: "website",
    locale: "en_US",
    url: "/",
    images: [
      {
        url: ogImage.url,
        width: ogImage.width,
        height: ogImage.height,
        alt: ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@newtonadhikari",
    creator: "@newtonadhikari",
    title: "Newton Adhikari — CSE Student, Researcher & Technology Enthusiast",
    description:
      "Building intelligent solutions through code, research and innovation.",
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Cross-browser icon suite (Next also auto-serves src/app/icon.svg).
  icons: {
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Aarav Sharma",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  other: {
    "msapplication-TileColor": "#21108F",
    "msapplication-config": "/browserconfig.xml",
    "apple-mobile-web-app-title": "Aarav Sharma",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0d14" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          {children}
          <Toaster />
          <JsonLd />
          {/* React 19 hoists <link> tags into <head> — Safari pinned-tab icon */}
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#21108F" />
        </ThemeProvider>
      </body>
    </html>
  );
}
