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
        "flex flex-col md:flex-row gap-4 md:gap-12 md:items-end",
        align === "center" && "md:items-center md:flex-col md:text-center",
        className
      )}
    >
      <div className="flex flex-col gap-1 md:shrink-0">
        <span className="font-heading font-bold text-lg text-accent tracking-wide">
          ({number})
        </span>
        <h2
          className={cn(
            "font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-text tracking-tight leading-[1.05]",
            align === "center" && "md:text-center"
          )}
        >
          {title}
        </h2>
      </div>

      {subtitle && (
        <p
          className={cn(
            "font-sans text-base md:text-lg text-text-muted max-w-sm leading-relaxed pb-1",
            align === "center" && "md:max-w-md"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
