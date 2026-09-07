import logoColor from "@/img/Logo.svg";
import logoWhite from "@/img/logo-w.svg";
import { cn } from "@/lib/utils";

export function BrandLogo({
  variant = "color",
  className,
}: {
  variant?: "color" | "white";
  className?: string;
}) {
  return (
    <img
      src={variant === "white" ? logoWhite : logoColor}
      alt="TXL Med PLLC"
      className={cn("select-none object-contain", className)}
    />
  );
}
