import { IMAGES } from "./images";

export type AppointmentStatus = "upcoming" | "completed" | "cancelled";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  cdlNumber?: string;
  employer?: string;
  role?: string;
};

export type Service = {
  id: string;
  name: string;
  short: string;
  description: string;
  duration: string;
  price: number;
  icon: "stethoscope" | "refresh" | "truck";
  image: string;
  featured?: boolean;
};

export type Appointment = {
  id: string;
  userId: string;
  serviceId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
  status: AppointmentStatus;
  createdAt: string;
};

export type BookingDraft = {
  serviceId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
};

export const BUSINESS = {
  name: "TXL Med PLLC",
  tagline: "Mobile DOT Physicals, Wherever You Are",
  phone: "(512) 400-8950",
  phoneHref: "tel:+15124008950",
  email: "scheduling@txlmed.com",
  emailHref: "mailto:scheduling@txlmed.com",
  hours: "Monday–Saturday, 7:00 AM – 7:00 PM",
  serviceArea: "Texas — Austin, San Antonio, Houston, DFW, and connecting corridors",
  serviceAreaNote:
    "FMCSA-certified examiners travel to your yard, terminal, home, or a safe roadside meetup across Texas.",
} as const;

export const SERVICES: Service[] = [
  {
    id: "dot-physical",
    name: "DOT Physical",
    short: "FMCSA medical exam at your location",
    description:
      "A complete Department of Transportation physical from an FMCSA-certified examiner. We come to you, complete the exam, and help you stay road-ready with your Medical Examiner’s Certificate.",
    duration: "30–45 min",
    price: 125,
    icon: "stethoscope",
    image: IMAGES.serviceDot,
    featured: true,
  },
  {
    id: "dot-renewal",
    name: "DOT Recertification",
    short: "Renew your Medical Examiner’s Certificate",
    description:
      "For CDL and CPL drivers whose medical card is expiring. Same mobile DOT physical, focused on getting your certificate renewed without a clinic wait.",
    duration: "30–40 min",
    price: 115,
    icon: "refresh",
    image: IMAGES.serviceRenewal,
  },
  {
    id: "fleet-dot",
    name: "Fleet / On-Site Group Exams",
    short: "Bring the exam to your drivers",
    description:
      "Schedule mobile DOT physicals for multiple drivers at your terminal or shop. One visit, several certificates — less downtime for the fleet.",
    duration: "Per driver, ~30 min",
    price: 99,
    icon: "truck",
    image: IMAGES.serviceFleet,
  },
];

export const ONBOARDING = [
  {
    title: "Your DOT Physical, On Your Route",
    body: "TXL Med brings certified DOT physical exams directly to you — no clinic visit, no lost driving time.",
    image: IMAGES.onboardingHighway,
    alt: "Commercial truck on an open Texas highway",
  },
  {
    title: "Certified. Convenient. Compliant.",
    body: "Our FMCSA-certified examiners come to your location and get you road-ready, fast.",
    image: IMAGES.onboardingExam,
    alt: "Medical examiner with a stethoscope during an on-site exam",
  },
  {
    title: "Book in Minutes",
    body: "Pick a time, share your location, and we'll handle the rest — your Medical Examiner's Certificate, without the wait.",
    image: IMAGES.onboardingSchedule,
    alt: "Driver checking a phone schedule",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Book",
    body: "Choose a DOT exam, pick a time that fits your route, and tell us where to meet you.",
  },
  {
    step: "2",
    title: "We Come to You",
    body: "An FMCSA-certified examiner arrives at your yard, home, or meetup spot.",
  },
  {
    step: "3",
    title: "Get Certified",
    body: "Complete your physical and stay compliant — without losing a day at a clinic.",
  },
] as const;

export const TRUST_POINTS = [
  {
    title: "Certified examiners",
    body: "FMCSA-certified medical examiners who understand commercial-driver requirements.",
  },
  {
    title: "Mobile convenience",
    body: "No waiting room. We travel to you so you keep moving freight — and income.",
  },
  {
    title: "Texas coverage",
    body: "Austin, San Antonio, Houston, DFW, and the corridors that connect them.",
  },
] as const;

export const TIME_SLOTS = [
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "18:00",
] as const;

export const BOOKING_STEPS = ["Service", "Date & time", "Location", "Review"] as const;

export const emptyDraft = (): BookingDraft => ({
  serviceId: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "TX",
  zip: "",
  notes: "",
});

export const seedUsers: User[] = [
  {
    id: "u1",
    name: "Jordan Reyes",
    email: "jordan@txlmed.com",
    phone: "(512) 555-0148",
    password: "Driver1",
    cdlNumber: "TX-C-482913",
    employer: "Lone Star Freight",
    role: "CDL driver",
  },
];

function isoDaysFromToday(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export const seedAppointments: Appointment[] = [
  {
    id: "apt1",
    userId: "u1",
    serviceId: "dot-physical",
    date: isoDaysFromToday(5),
    time: "09:00",
    name: "Jordan Reyes",
    phone: "(512) 555-0148",
    address: "1840 E Cesar Chavez St",
    city: "Austin",
    state: "TX",
    zip: "78702",
    notes: "Yard gate code 4412. Park by the office.",
    status: "upcoming",
    createdAt: isoDaysFromToday(-2),
  },
  {
    id: "apt2",
    userId: "u1",
    serviceId: "dot-renewal",
    date: isoDaysFromToday(-40),
    time: "14:00",
    name: "Jordan Reyes",
    phone: "(512) 555-0148",
    address: "410 Terminal Rd",
    city: "San Antonio",
    state: "TX",
    zip: "78219",
    notes: "",
    status: "completed",
    createdAt: isoDaysFromToday(-45),
  },
];

export function serviceById(id: string) {
  return SERVICES.find((s) => s.id === id);
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatDateLong(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function todayIso() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
}

export function formatMoney(n: number) {
  return `$${n.toFixed(0)}`;
}

export function statusLabel(status: AppointmentStatus) {
  if (status === "upcoming") return "Upcoming";
  if (status === "completed") return "Completed";
  return "Cancelled";
}

export type NotificationKind = "appointment" | "reminder" | "system";

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  detail: string;
  time: string;
  read: boolean;
  kind: NotificationKind;
  cta?: { label: string; to: string; params?: Record<string, string> };
};

export type ChatThread = {
  id: string;
  name: string;
  role: string;
  preview: string;
  time: string;
  unread: number;
};

export type ChatMessage = {
  id: string;
  threadId: string;
  from: "me" | "them";
  text: string;
  time: string;
};

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    title: "Visit confirmed",
    body: "Your DOT physical is booked for Tuesday at 9:00 AM in Austin.",
    detail:
      "Jordan, your mobile DOT physical is confirmed. An FMCSA-certified examiner will meet you at 1840 E Cesar Chavez St, Austin, TX 78702. Please have your CDL and a government photo ID ready. Call us if the yard gate code changes.",
    time: "2h ago",
    read: false,
    kind: "appointment",
    cta: { label: "View appointment", to: "/appointments/$id", params: { id: "apt1" } },
  },
  {
    id: "n2",
    title: "What to bring",
    body: "CDL, photo ID, and your glasses or contacts if you wear them.",
    detail:
      "For a complete FMCSA exam we need your commercial driver’s license, a second photo ID if requested, and corrective lenses if you use them for driving. Eat a normal meal and avoid excess caffeine so blood pressure reads cleanly. This is not a drug test — urinalysis checks for underlying medical conditions.",
    time: "Yesterday",
    read: false,
    kind: "reminder",
  },
  {
    id: "n3",
    title: "Certificate reminder",
    body: "Recertification is easier if you book 2–3 weeks before your MEC expires.",
    detail:
      "Your Medical Examiner’s Certificate should stay current to remain in service. TXL Med can come to your yard or a meetup on your route. Recertification is the same mobile DOT physical — typically 30–40 minutes.",
    time: "3 days ago",
    read: true,
    kind: "reminder",
    cta: { label: "Book recertification", to: "/book" },
  },
  {
    id: "n4",
    title: "Fleet exams available",
    body: "Schedule multiple drivers in one on-site visit.",
    detail:
      "If your shop has several CDL drivers due, we can run group exams at your terminal. One trip, several certificates, less downtime. Reply to scheduling or book a fleet visit from Home.",
    time: "1 week ago",
    read: true,
    kind: "system",
    cta: { label: "See fleet exams", to: "/home/service/$id", params: { id: "fleet-dot" } },
  },
];

export const CHAT_THREADS: ChatThread[] = [
  {
    id: "c1",
    name: "TXL Med Scheduling",
    role: "Front desk",
    preview: "We’ll text you when the examiner is 20 minutes out.",
    time: "10:14 AM",
    unread: 1,
  },
  {
    id: "c2",
    name: "Dr. Elena Vasquez",
    role: "FMCSA examiner",
    preview: "Park by the office — I’ll find you at the gate.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "c3",
    name: "Support",
    role: "TXL Med PLLC",
    preview: "Hours are Monday–Saturday, 7 AM – 7 PM.",
    time: "Mon",
    unread: 0,
  },
];

export const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    threadId: "c1",
    from: "them",
    text: "Hi Jordan — your DOT physical is confirmed for Tuesday at 9:00 AM at the Austin yard.",
    time: "9:02 AM",
  },
  {
    id: "m2",
    threadId: "c1",
    from: "me",
    text: "Perfect. Gate code is still 4412.",
    time: "9:18 AM",
  },
  {
    id: "m3",
    threadId: "c1",
    from: "them",
    text: "Got it. We’ll text you when the examiner is 20 minutes out.",
    time: "10:14 AM",
  },
  {
    id: "m4",
    threadId: "c2",
    from: "them",
    text: "This is Dr. Vasquez. I’ll be on site for your DOT physical tomorrow morning.",
    time: "4:40 PM",
  },
  {
    id: "m5",
    threadId: "c2",
    from: "me",
    text: "Thanks, doctor. I’ll be by the office.",
    time: "5:02 PM",
  },
  {
    id: "m6",
    threadId: "c2",
    from: "them",
    text: "Park by the office — I’ll find you at the gate.",
    time: "5:06 PM",
  },
  {
    id: "m7",
    threadId: "c3",
    from: "them",
    text: "TXL Med PLLC — how can we help with scheduling or coverage?",
    time: "Mon",
  },
  {
    id: "m8",
    threadId: "c3",
    from: "me",
    text: "Do you cover San Antonio yards on Saturdays?",
    time: "Mon",
  },
  {
    id: "m9",
    threadId: "c3",
    from: "them",
    text: "Yes. Hours are Monday–Saturday, 7 AM – 7 PM across Austin, San Antonio, Houston, and DFW corridors.",
    time: "Mon",
  },
];

export function notificationById(id: string) {
  return NOTIFICATIONS.find((n) => n.id === id);
}

export function chatThreadById(id: string) {
  return CHAT_THREADS.find((t) => t.id === id);
}

export function messagesForThread(threadId: string) {
  return CHAT_MESSAGES.filter((m) => m.threadId === threadId);
}

export function unavailableSlotsForDate(iso: string) {
  const day = Number(iso.split("-")[2] ?? 0);
  if (day % 5 === 0) return ["09:00", "09:30", "13:00"];
  if (day % 3 === 0) return ["07:00", "11:00", "16:00"];
  if (day % 2 === 0) return ["10:30", "15:00"];
  return ["08:00"];
}
