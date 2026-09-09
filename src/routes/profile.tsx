import { Outlet, createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, Headphones, LogOut, MessageCircle, Pencil, Phone } from "lucide-react";
import { useState } from "react";
import { TextLogo } from "@/components/TextLogo";
import { Button, Card, ConfirmDialog, LinkButton, Row, Screen } from "@/components/kit";
import { Switch } from "@/components/ui/switch";
import { BUSINESS, initials } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — TXL Med PLLC" }] }),
  component: ProfileRoute,
});

function ProfileRoute() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/profile") return <Outlet />;
  return <ProfileScreen />;
}

function ProfileScreen() {
  const navigate = useNavigate();
  const { user, prefs, togglePref, logout } = useApp();
  const [confirmOut, setConfirmOut] = useState(false);

  return (
    <Screen padded={false} className="pb-8">
      <div className="px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <h1 className="font-display text-[28px] leading-[34px] font-semibold">Profile</h1>
      </div>

      {user ? (
        <Card className="mx-4 mt-4 flex items-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            {initials(user.name)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{user.name}</p>
            <p className="truncate text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">{user.phone}</p>
          </div>
          <button
            type="button"
            aria-label="Edit profile"
            onClick={() => navigate({ to: "/profile/edit" })}
            className="flex size-11 items-center justify-center rounded-xl border border-border"
          >
            <Pencil size={16} />
          </button>
        </Card>
      ) : (
        <div className="px-4 pt-4">
          <Card className="text-center">
            <TextLogo size="sm" />
            <p className="mt-2 text-sm text-muted-foreground">
              Log in to save bookings and manage your visits.
            </p>
            <LinkButton to="/login" className="mt-4" full>
              Log In
            </LinkButton>
          </Card>
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-xl border border-border mx-4">
        <Row icon={<Bell size={18} />} label="Notifications" to="/notifications" />
        <Row icon={<MessageCircle size={18} />} label="Messages" to="/chat" />
        <Row
          icon={<Headphones size={18} />}
          label="Contact / Support"
          to="/profile/support"
        />
        <div className="flex items-center gap-3 bg-card px-4 py-4">
          <span className="text-primary">
            <Bell size={18} />
          </span>
          <span className="flex-1 text-sm font-medium">Appointment notifications</span>
          <Switch
            checked={prefs.notifications}
            onCheckedChange={() => togglePref("notifications")}
            aria-label="Appointment notifications"
          />
        </div>
        <a href={BUSINESS.phoneHref} className="flex w-full items-center gap-3 border-t border-border bg-card px-4 py-4">
          <span className="text-primary">
            <Phone size={18} />
          </span>
          <span className="flex-1 text-sm font-medium">Call TXL Med</span>
          <span className="text-xs text-muted-foreground">{BUSINESS.phone}</span>
        </a>
      </div>

      {user && (
        <div className="px-4 pt-6">
          <Button full variant="danger" onClick={() => setConfirmOut(true)}>
            <LogOut size={16} />
            Log out
          </Button>
        </div>
      )}

      <ConfirmDialog
        open={confirmOut}
        title="Log out?"
        body="You'll need to sign in again to book or manage appointments."
        confirmLabel="Log out"
        danger
        onClose={() => setConfirmOut(false)}
        onConfirm={() => {
          logout();
          setConfirmOut(false);
          navigate({ to: "/login" });
        }}
      />
    </Screen>
  );
}
