import { cn } from "@/lib/utils";

export function TexasWatermark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      aria-hidden
      className={cn("pointer-events-none text-primary", className)}
    >
      <path
        fill="currentColor"
        d="M42 62V32h32V16h36v16h28c10 0 18 10 18 22v32l18 16v26l-18 22-28 22-34-10-28-22-10-26V62Z"
      />
    </svg>
  );
}

export function WildflowerAccent({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={cn("pointer-events-none", className)}>
      <g fill="currentColor">
        <ellipse cx="24" cy="10" rx="6" ry="9" />
        <ellipse cx="24" cy="10" rx="6" ry="9" transform="rotate(72 24 24)" />
        <ellipse cx="24" cy="10" rx="6" ry="9" transform="rotate(144 24 24)" />
        <ellipse cx="24" cy="10" rx="6" ry="9" transform="rotate(216 24 24)" />
        <ellipse cx="24" cy="10" rx="6" ry="9" transform="rotate(288 24 24)" />
        <circle cx="24" cy="24" r="5" fill="#F2925C" />
      </g>
    </svg>
  );
}
