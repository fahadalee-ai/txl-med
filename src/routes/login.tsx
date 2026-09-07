import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { AuthInput, AuthShell, PasswordField } from "@/components/AuthShell";
import { Button } from "@/components/kit";
import { IMAGES } from "@/lib/images";
import { useApp } from "@/lib/store";

type Search = { next?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    next: typeof s.next === "string" ? s.next : undefined,
  }),
  head: () => ({ meta: [{ title: "Log In — TXL Med PLLC" }] }),
  component: LoginScreen,
});

function LoginScreen() {
  const navigate = useNavigate();
  const { next } = Route.useSearch();
  const { login } = useApp();
  const [busy, setBusy] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    await new Promise((r) => setTimeout(r, 300));
    login(identifier, password);
    setBusy(false);
    if (next?.startsWith("/")) navigate({ to: next as "/home" });
    else navigate({ to: "/home" });
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to book a mobile DOT physical or manage your visits."
      image={IMAGES.authRoad}
      footer={
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold text-primary">
            Sign Up
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit} noValidate className="relative">
        <label className="mb-4 block">
          <span className="mb-1 block text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Email or phone
          </span>
          <AuthInput
            icon={<Mail size={16} />}
            inputMode="email"
            autoComplete="username"
            placeholder="you@email.com or (512) 555-0148"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </label>
        <PasswordField
          label="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="-mt-1 mb-5 flex justify-end">
          <Link to="/forgot-password" className="min-h-11 text-sm font-semibold text-primary">
            Forgot Password?
          </Link>
        </div>
        <Button type="submit" full disabled={busy}>
          {busy ? "Signing in…" : "Log In"}
        </Button>
      </form>
    </AuthShell>
  );
}
