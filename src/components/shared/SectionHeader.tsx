import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  number,
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <span className="font-heading font-bold text-5xl text-accent/20 block leading-none">
        {number}
      </span>
      <h2
        className={cn(
          "font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-text tracking-tight leading-[1.05]",
          align === "center" && "text-center"
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "font-sans text-base md:text-lg text-text-muted max-w-sm leading-relaxed mt-1",
            align === "center" && "md:max-w-md"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
