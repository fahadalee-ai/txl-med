import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/kit";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useApp } from "@/lib/store";

type Search = { email?: string };

export const Route = createFileRoute("/verify")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    email: typeof s.email === "string" ? s.email : undefined,
  }),
  head: () => ({ meta: [{ title: "Verify — TXL Med PLLC" }] }),
  component: VerifyScreen,
});

function VerifyScreen() {
  const navigate = useNavigate();
  const { email } = Route.useSearch();
  const { completeVerification, pushToast } = useApp();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    await new Promise((r) => setTimeout(r, 300));
    completeVerification(email ?? "");
    setBusy(false);
    pushToast("Welcome to TXL Med", "You're all set to book a mobile DOT physical.");
    navigate({ to: "/home" });
  }

  return (
    <AuthShell
      title="Check your email"
      subtitle={
        email
          ? `We sent a 6-digit code to ${email}. Enter it to finish setting up your account.`
          : "Enter the 6-digit code we sent to your email."
      }
    >
      <form onSubmit={onSubmit} noValidate>
        <div className="mb-6 flex justify-center">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, i) => (
                <InputOTPSlot key={i} index={i} className="size-11 text-base" />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button type="submit" full disabled={busy}>
          {busy ? "Verifying…" : "Verify and continue"}
        </Button>
      </form>
    </AuthShell>
  );
}
