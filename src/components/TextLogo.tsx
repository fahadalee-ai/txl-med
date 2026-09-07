import { cn } from "@/lib/utils";

export function TextLogo({
  variant = "color",
  size = "md",
  className,
}: {
  variant?: "color" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: { title: "text-[22px] leading-7 tracking-[0.18em]", sub: "text-[9px] tracking-[0.42em]" },
    md: { title: "text-[32px] leading-9 tracking-[0.2em]", sub: "text-[11px] tracking-[0.46em]" },
    lg: { title: "text-[40px] leading-[44px] tracking-[0.22em]", sub: "text-[12px] tracking-[0.5em]" },
  }[size];

  return (
    <div className={cn("select-none text-center", className)}>
      <p
        className={cn(
          "font-display font-bold",
          sizes.title,
          variant === "white" ? "text-white" : "text-foreground",
        )}
      >
        TXL MED
      </p>
      <p
        className={cn(
          "mt-1 font-semibold uppercase",
          sizes.sub,
          variant === "white" ? "text-white/80" : "text-primary",
        )}
      >
        PLLC
      </p>
    </div>
  );
}
