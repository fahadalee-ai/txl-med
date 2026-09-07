import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { Button, Header, Screen, TextInputField } from "@/components/kit";
import { RequireAuth } from "@/components/RequireAuth";
import { emailError, formatPhone, phoneError, required } from "@/lib/validation";
import { useFormValidation } from "@/lib/useFormValidation";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/profile/edit")({
  head: () => ({ meta: [{ title: "Edit profile — TXL Med PLLC" }] }),
  component: () => (
    <RequireAuth>
      <EditProfileScreen />
    </RequireAuth>
  ),
});

function EditProfileScreen() {
  const navigate = useNavigate();
  const { user, updateUser, pushToast } = useApp();
  const form = useFormValidation(
    {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      cdlNumber: user?.cdlNumber ?? "",
      role: user?.role ?? "",
      employer: user?.employer ?? "",
    },
    (v) => ({
      name: required(v.name, "Name"),
      email: emailError(v.email),
      phone: phoneError(v.phone),
    }),
  );

  function save(e: FormEvent) {
    e.preventDefault();
    if (!form.submit()) return;
    updateUser({
      name: form.values.name,
      email: form.values.email,
      phone: form.values.phone,
      cdlNumber: form.values.cdlNumber || undefined,
      role: form.values.role || undefined,
      employer: form.values.employer || undefined,
    });
    pushToast("Profile updated");
    navigate({ to: "/profile" });
  }

  return (
    <Screen padded={false} className="pb-8">
      <Header title="Edit profile" fallbackTo="/profile" />
      <form className="px-4" onSubmit={save}>
        <TextInputField
          label="Full name"
          value={form.values.name}
          onChange={(e) => form.set("name", e.target.value)}
          error={form.errors.name}
        />
        <TextInputField
          label="Email"
          type="email"
          value={form.values.email}
          onChange={(e) => form.set("email", e.target.value)}
          error={form.errors.email}
        />
        <TextInputField
          label="Phone"
          type="tel"
          value={form.values.phone}
          onChange={(e) => form.set("phone", formatPhone(e.target.value))}
          error={form.errors.phone}
        />
        <TextInputField
          label="CDL / CPL number"
          value={form.values.cdlNumber}
          onChange={(e) => form.set("cdlNumber", e.target.value)}
        />
        <TextInputField
          label="Role"
          value={form.values.role}
          onChange={(e) => form.set("role", e.target.value)}
        />
        <TextInputField
          label="Employer"
          value={form.values.employer}
          onChange={(e) => form.set("employer", e.target.value)}
        />
        <Button type="submit" full>
          Save changes
        </Button>
      </form>
    </Screen>
  );
}
