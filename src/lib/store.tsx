import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { clearStorage, readJson, readStorage, writeJson, writeStorage } from "./storage";
import {
  emptyDraft,
  seedAppointments,
  seedUsers,
  type Appointment,
  type AppointmentStatus,
  type BookingDraft,
  type User,
} from "./mock-data";
import { digitsOnly, isEmail } from "./validation";

export type Toast = { id: number; title: string; body?: string };

type Prefs = {
  notifications: boolean;
};

type Store = {
  ready: boolean;
  users: User[];
  user: User | null;
  guest: boolean;
  onboarded: boolean;
  markOnboarded: () => void;
  continueAsGuest: () => void;
  login: (
    identifier: string,
    password: string,
  ) => { ok: true } | { ok: false; reason: "invalid" };
  register: (input: {
    name: string;
    email: string;
    phone: string;
    password: string;
    cdlNumber?: string;
    employer?: string;
    role?: string;
  }) => { ok: true; email: string } | { ok: false; reason: "exists" };
  completeVerification: (email: string) => { ok: true } | { ok: false };
  requestPasswordReset: (identifier: string) => { ok: true } | { ok: false; reason: "not_found" };
  resetPassword: (
    identifier: string,
    password: string,
  ) => { ok: true } | { ok: false; reason: "not_found" };
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
  appointments: Appointment[];
  bookAppointment: (draft: BookingDraft) => Appointment;
  cancelAppointment: (id: string) => void;
  rescheduleAppointment: (id: string, date: string, time: string) => void;
  draft: BookingDraft;
  updateDraft: (patch: Partial<BookingDraft>) => void;
  resetDraft: () => void;
  prefs: Prefs;
  togglePref: (key: keyof Prefs) => void;
  toasts: Toast[];
  pushToast: (title: string, body?: string) => void;
  dismissToast: (id: number) => void;
};

const Ctx = createContext<Store | null>(null);

function matchUser(users: User[], identifier: string) {
  const id = identifier.trim().toLowerCase();
  const phone = digitsOnly(identifier);
  return users.find((u) => u.email.toLowerCase() === id || digitsOnly(u.phone) === phone);
}

function loadSessionUser(users: User[]): User | null {
  const id = readStorage("session");
  if (!id) return null;
  return users.find((u) => u.id === id) ?? null;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [users, setUsers] = useState<User[]>(seedUsers);
  const [user, setUser] = useState<User | null>(null);
  const [guest, setGuest] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(seedAppointments);
  const [draft, setDraft] = useState<BookingDraft>(emptyDraft());
  const [prefs, setPrefs] = useState<Prefs>({ notifications: true });
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const loadedUsers = readJson<User[]>("users", []);
    const nextUsers = loadedUsers.length ? loadedUsers : seedUsers;
    setUsers(nextUsers);
    setUser(loadSessionUser(nextUsers));
    setGuest(readStorage("guest") === "1" && !readStorage("session"));
    setOnboarded(readStorage("onboarded") === "1");
    setAppointments(readJson<Appointment[]>("appointments", seedAppointments));
    setDraft(readJson("draft", emptyDraft()));
    setPrefs(readJson("prefs", { notifications: true }));
    setReady(true);
  }, []);

  const persistUsers = (next: User[]) => {
    setUsers(next);
    writeJson("users", next);
  };

  const persistAppointments = (next: Appointment[]) => {
    setAppointments(next);
    writeJson("appointments", next);
  };

  const value = useMemo<Store>(() => {
    const pushToast = (title: string, body?: string) => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, title, body }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
    };

    const markOnboarded = () => {
      setOnboarded(true);
      writeStorage("onboarded", "1");
    };

    return {
      ready,
      users,
      user,
      guest,
      onboarded,
      markOnboarded,
      continueAsGuest: () => {
        setGuest(true);
        writeStorage("guest", "1");
        markOnboarded();
      },
      login: (identifier) => {
        const found = matchUser(users, identifier) ?? users[0];
        if (!found) return { ok: false, reason: "invalid" };
        setUser(found);
        setGuest(false);
        clearStorage("guest");
        writeStorage("session", found.id);
        markOnboarded();
        return { ok: true };
      },
      register: (input) => {
        const email = input.email.trim().toLowerCase();
        const existing = email
          ? users.find((u) => u.email.toLowerCase() === email)
          : undefined;
        if (existing) {
          writeStorage("pendingUser", existing.id);
          markOnboarded();
          return { ok: true, email: existing.email };
        }
        const created: User = {
          id: `u${Date.now()}`,
          name: input.name.trim() || "Driver",
          email: email || `driver${Date.now()}@txlmed.com`,
          phone: input.phone.trim(),
          password: input.password,
          cdlNumber: input.cdlNumber?.trim() || undefined,
          employer: input.employer?.trim() || undefined,
          role: input.role?.trim() || undefined,
        };
        persistUsers([...users, created]);
        writeStorage("pendingUser", created.id);
        markOnboarded();
        return { ok: true, email: created.email };
      },
      completeVerification: (email) => {
        const pendingId = readStorage("pendingUser");
        const found =
          users.find((u) => u.id === pendingId) ??
          users.find((u) => email && u.email.toLowerCase() === email.trim().toLowerCase()) ??
          users[0];
        if (!found) return { ok: false };
        setUser(found);
        setGuest(false);
        clearStorage("guest");
        clearStorage("pendingUser");
        writeStorage("session", found.id);
        return { ok: true };
      },
      requestPasswordReset: () => {
        return { ok: true };
      },
      resetPassword: (identifier, password) => {
        const found = matchUser(users, identifier) ?? users[0];
        if (found) {
          persistUsers(users.map((u) => (u.id === found.id ? { ...u, password } : u)));
        }
        clearStorage("resetFor");
        return { ok: true };
      },
      logout: () => {
        setUser(null);
        setGuest(false);
        clearStorage("session");
        clearStorage("guest");
      },
      updateUser: (patch) => {
        if (!user) return;
        const next = { ...user, ...patch };
        setUser(next);
        persistUsers(users.map((u) => (u.id === next.id ? next : u)));
      },
      appointments,
      bookAppointment: (input) => {
        const created: Appointment = {
          id: `apt${Date.now()}`,
          userId: user?.id ?? "guest",
          serviceId: input.serviceId,
          date: input.date,
          time: input.time,
          name: input.name,
          phone: input.phone,
          address: input.address,
          city: input.city,
          state: input.state,
          zip: input.zip,
          notes: input.notes,
          status: "upcoming" satisfies AppointmentStatus,
          createdAt: new Date().toISOString().slice(0, 10),
        };
        persistAppointments([created, ...appointments]);
        const cleared = emptyDraft();
        setDraft(cleared);
        writeJson("draft", cleared);
        pushToast("Appointment requested", "We'll confirm your mobile visit shortly.");
        return created;
      },
      cancelAppointment: (id) => {
        persistAppointments(
          appointments.map((a) => (a.id === id ? { ...a, status: "cancelled" as const } : a)),
        );
        pushToast("Appointment cancelled");
      },
      rescheduleAppointment: (id, date, time) => {
        persistAppointments(
          appointments.map((a) =>
            a.id === id ? { ...a, date, time, status: "upcoming" as const } : a,
          ),
        );
        pushToast("Appointment rescheduled");
      },
      draft,
      updateDraft: (patch) => {
        setDraft((prev) => {
          const next = { ...prev, ...patch };
          writeJson("draft", next);
          return next;
        });
      },
      resetDraft: () => {
        const cleared = emptyDraft();
        setDraft(cleared);
        writeJson("draft", cleared);
      },
      prefs,
      togglePref: (key) => {
        setPrefs((p) => {
          const next = { ...p, [key]: !p[key] };
          writeJson("prefs", next);
          return next;
        });
      },
      toasts,
      pushToast,
      dismissToast: (id) => setToasts((t) => t.filter((x) => x.id !== id)),
    };
  }, [ready, users, user, guest, onboarded, appointments, draft, prefs, toasts]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

export function looksLikeEmail(value: string) {
  return isEmail(value);
}
