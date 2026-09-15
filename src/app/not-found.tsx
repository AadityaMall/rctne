import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="max-w-md text-center flex flex-col items-center gap-6">
        <BlurFade delay={0.05} inView>
          <span className="font-heading font-bold text-7xl text-accent/25">404</span>
        </BlurFade>
        <BlurFade delay={0.15} inView>
          <div className="flex flex-col gap-3">
            <h1 className="font-heading font-bold text-3xl text-text leading-tight">
              This page hasn&apos;t begun yet.
            </h1>
            <p className="font-sans text-sm text-text-muted leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or may have moved.
            </p>
          </div>
        </BlurFade>
        <BlurFade delay={0.25} inView>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-accent text-background font-heading font-bold px-6 py-3 rounded-full text-sm tracking-wide hover:bg-accent/90 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>
        </BlurFade>
      </div>
    </main>
  );
}
