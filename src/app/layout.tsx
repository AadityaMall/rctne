import type { Metadata, Viewport } from "next";
import { Fredoka, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingCta } from "@/components/layout/WhatsAppFloatingCta";
import { MorphingBackground } from "@/components/layout/MorphingBackground";
import { SmoothScroller } from "@/components/layout/SmoothScroller";
import { Toaster } from "@/components/ui/sonner";
import { OrganizationJsonLd } from "@/components/shared/OrganizationJsonLd";
import { siteConfig } from "@/data/site-config.data";
import "./globals.css";

const fontFredoka = Fredoka({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fontInter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  keywords: siteConfig.metadata.keywords,
  applicationName: siteConfig.siteName,
  authors: [{ name: siteConfig.organization.legalName }],
  creator: siteConfig.siteName,
  publisher: siteConfig.siteName,
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    ...siteConfig.metadata.openGraph,
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
    locale: siteConfig.locale,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteConfig.metadata.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metadata.openGraph.title,
    description: siteConfig.metadata.openGraph.description,
    images: ["/opengraph-image"],
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
  verification: {
    google: siteConfig.verification.google,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontInter.variable} ${fontFredoka.variable} antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="font-sans overflow-x-hidden">
        <OrganizationJsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroller>
            <MorphingBackground />
            <Navbar />
            <div className="flex-1 relative z-0">
              {children}
            </div>
            <Footer />
            <WhatsAppFloatingCta />
            <Toaster position="bottom-right" richColors />
          </SmoothScroller>
        </ThemeProvider>
      </body>
    </html>
  );
}
