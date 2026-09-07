import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthShell, PasswordField } from "@/components/AuthShell";
import { Button, TextInputField } from "@/components/kit";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create Account — TXL Med PLLC" }] }),
  component: RegisterScreen,
});

function RegisterScreen() {
  const navigate = useNavigate();
  const { register } = useApp();
  const [busy, setBusy] = useState(false);
  const [extra, setExtra] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [cdlNumber, setCdlNumber] = useState("");
  const [role, setRole] = useState("");
  const [employer, setEmployer] = useState("");
  const [terms, setTerms] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    await new Promise((r) => setTimeout(r, 300));
    const result = register({
      name,
      email,
      phone,
      password: password || confirm,
      cdlNumber,
      role,
      employer,
    });
    setBusy(false);
    navigate({ to: "/verify", search: { email: result.email } });
  }

  return (
    <AuthShell
      title="Create account"
      subtitle="Save your details so booking a mobile DOT visit takes minutes."
      image={IMAGES.authTerminal}
      footer={
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary">
            Log In
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit} noValidate>
        <TextInputField label="Full name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextInputField
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInputField
          label="Phone number"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <PasswordField
          label="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordField
          label="Confirm password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <Collapsible open={extra} onOpenChange={setExtra}>
          <CollapsibleTrigger className="mb-3 flex min-h-11 w-full items-center justify-between text-sm font-semibold text-primary">
            Additional info (optional)
            <ChevronDown size={16} className={extra ? "rotate-180" : ""} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <TextInputField
              label="CDL / CPL license number"
              value={cdlNumber}
              onChange={(e) => setCdlNumber(e.target.value)}
            />
            <TextInputField
              label="Role"
              placeholder="CDL driver, owner-operator, fleet…"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <TextInputField label="Employer" value={employer} onChange={(e) => setEmployer(e.target.value)} />
          </CollapsibleContent>
        </Collapsible>

        <label className="mb-5 flex items-start gap-3 text-sm leading-relaxed text-foreground">
          <Checkbox
            checked={terms}
            onCheckedChange={(v) => setTerms(v === true)}
            className="mt-0.5 size-5"
          />
          <span>
            I agree to the{" "}
            <Link to="/terms" className="font-semibold text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="font-semibold text-primary">
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        <Button type="submit" full disabled={busy}>
          {busy ? "Creating account…" : "Create Account"}
        </Button>
      </form>
    </AuthShell>
  );
}
