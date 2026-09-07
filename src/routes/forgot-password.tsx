import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthShell, PasswordField } from "@/components/AuthShell";
import { Button, TextInputField } from "@/components/kit";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — TXL Med PLLC" }] }),
  component: ForgotPasswordScreen,
});

function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const { requestPasswordReset, resetPassword, pushToast } = useApp();
  const [step, setStep] = useState<"email" | "reset">("email");
  const [busy, setBusy] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [code, setCode] = useState("");

  async function sendCode(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    await new Promise((r) => setTimeout(r, 300));
    requestPasswordReset(identifier);
    setBusy(false);
    setStep("reset");
  }

  async function savePassword(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    await new Promise((r) => setTimeout(r, 300));
    resetPassword(identifier, password || confirm);
    setBusy(false);
    pushToast("Password updated", "You can log in with your new password.");
    navigate({ to: "/login" });
  }

  return (
    <AuthShell
      title={step === "email" ? "Forgot password" : "Set a new password"}
      subtitle={
        step === "email"
          ? "Enter the email or phone on your account. We'll send a reset code."
          : "Enter the code we sent, then choose a new password."
      }
    >
      {step === "email" ? (
        <form onSubmit={sendCode} noValidate>
          <TextInputField
            label="Email or phone"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <Button type="submit" full disabled={busy}>
            {busy ? "Sending…" : "Send reset code"}
          </Button>
        </form>
      ) : (
        <form onSubmit={savePassword} noValidate>
          <div className="mb-4 flex justify-center">
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot key={i} index={i} className="size-11 text-base" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <PasswordField
            label="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordField
            label="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <Button type="submit" full disabled={busy}>
            {busy ? "Updating…" : "Update password"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
