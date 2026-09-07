import { useCanGoBack, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Field, inputClass } from "@/components/kit";
import { TextLogo } from "@/components/TextLogo";
import { IMAGES } from "@/lib/images";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  showBack = true,
  image = IMAGES.authRoad,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  showBack?: boolean;
  image?: string;
}) {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  return (
    <div className="relative min-h-dvh bg-background">
      <div className="relative h-52 overflow-hidden bg-ink">
        <img
          src={image}
          alt=""
          className="absolute inset-0 size-full object-cover motion-safe:animate-[splash-kenburns_8s_ease-out_forwards]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink/50 via-ink/25 to-background" />
        <div className="relative z-10 flex h-full flex-col px-5 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <div className="flex items-center justify-between">
            {showBack ? (
              <button
                type="button"
                aria-label="Go back"
                onClick={() => (canGoBack ? router.history.back() : router.navigate({ to: "/login" }))}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-ink/30 text-white backdrop-blur-sm"
              >
                <ArrowLeft size={18} strokeWidth={2} />
              </button>
            ) : (
              <span className="h-11 w-11" />
            )}
            <TextLogo variant="white" size="sm" />
            <span className="h-11 w-11" />
          </div>
        </div>
      </div>

      <div className="relative -mt-8 rounded-t-3xl bg-background px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <h1 className="font-display text-[28px] leading-[34px] font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {subtitle && <p className="mt-2 text-[15px] leading-[22px] text-muted-foreground">{subtitle}</p>}
        <div className="mt-6">{children}</div>
        {footer}
      </div>
    </div>
  );
}

export function AuthInput({
  icon,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { icon?: ReactNode }) {
  return (
    <div className="relative">
      {icon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
      )}
      <input {...props} className={cn(inputClass, icon && "pl-10", className)} />
    </div>
  );
}

export function PasswordField({
  label,
  error,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string; error?: string }) {
  const [show, setShow] = useState(false);
  return (
    <Field label={label} error={error}>
      <div className="relative">
        <AuthInput
          {...props}
          type={show ? "text" : "password"}
          icon={<Lock size={16} strokeWidth={2} />}
          className="pr-11"
        />
        <button
          type="button"
          aria-label={show ? "Hide password" : "Show password"}
          onClick={() => setShow((s) => !s)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground"
        >
          {show ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
        </button>
      </div>
    </Field>
  );
}
