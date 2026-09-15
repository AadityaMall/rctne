import type { Metadata } from "next";
import { Fredoka, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingCta } from "@/components/layout/WhatsAppFloatingCta";
import { MorphingBackground } from "@/components/layout/MorphingBackground";
import { SmoothScroller } from "@/components/layout/SmoothScroller";
import { Toaster } from "@/components/ui/sonner";
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
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  keywords: siteConfig.metadata.keywords,
  openGraph: siteConfig.metadata.openGraph,
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
