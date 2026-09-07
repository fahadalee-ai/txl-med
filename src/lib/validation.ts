export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function isPhone(value: string) {
  return digitsOnly(value).length >= 10;
}

export function isEmailOrPhone(value: string) {
  const v = value.trim();
  return isEmail(v) || isPhone(v);
}

export function required(value: string, label = "This field") {
  return value.trim() ? undefined : `${label} is required`;
}

export function emailError(value: string) {
  if (!value.trim()) return "Email is required";
  if (!isEmail(value)) return "Enter a valid email address";
  return undefined;
}

export function phoneError(value: string) {
  if (!value.trim()) return "Phone number is required";
  if (!isPhone(value)) return "Enter a valid 10-digit phone number";
  return undefined;
}

export function identifierError(value: string) {
  if (!value.trim()) return "Email or phone is required";
  if (!isEmailOrPhone(value)) return "Enter a valid email or phone number";
  return undefined;
}

export function passwordError(value: string, min = 8) {
  if (!value) return "Password is required";
  if (value.length < min) return `Password must be at least ${min} characters`;
  return undefined;
}

export function confirmPasswordError(password: string, confirm: string) {
  if (!confirm) return "Confirm your password";
  if (password !== confirm) return "Passwords do not match";
  return undefined;
}

export function formatPhone(value: string) {
  const d = digitsOnly(value).slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
