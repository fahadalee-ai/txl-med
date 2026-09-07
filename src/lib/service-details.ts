import { SERVICES, type Service } from "./mock-data";

export type ServiceDetail = Service & {
  who: string;
  overview: string;
  regulation: string;
  includes: { title: string; detail: string }[];
  whatToBring: string[];
  afterVisit: string[];
  notes: string[];
};

export const SERVICE_DETAILS: ServiceDetail[] = SERVICES.map((service) => {
  if (service.id === "dot-physical") {
    return {
      ...service,
      who: "Interstate commercial drivers, CDL and CPL holders, owner-operators, and anyone who operates a CMV over 10,001 lbs GVWR, a vehicle designed for 16+ passengers, or a placarded hazmat load.",
      overview:
        "A Department of Transportation physical is the FMCSA medical exam that decides whether you are physically qualified to operate a commercial motor vehicle. TXL Med PLLC brings a certified medical examiner to your yard, home, or meetup — you do not travel to a clinic.",
      regulation:
        "Required under 49 CFR 391.41–391.49. The exam must be performed by a medical examiner listed on the FMCSA National Registry. A passing exam produces a Medical Examiner’s Certificate (MEC), often called the DOT medical card.",
      includes: [
        {
          title: "Medical history review",
          detail:
            "Conditions such as diabetes, heart disease, sleep apnea, seizures, and current medications are reviewed against FMCSA qualification standards.",
        },
        {
          title: "Vision",
          detail:
            "Distant acuity of at least 20/40 in each eye, with or without correction, and at least 70° peripheral vision. Color recognition for traffic signals is checked.",
        },
        {
          title: "Hearing",
          detail:
            "Forced-whisper test at 5 feet, or an audiometric test if needed. Hearing aids may be used if you meet the standard with them.",
        },
        {
          title: "Blood pressure and pulse",
          detail:
            "Hypertension can still qualify, but the MEC may be issued for a shorter period (for example 3, 6, or 12 months) based on FMCSA BP guidelines.",
        },
        {
          title: "Urinalysis",
          detail:
            "Checks specific gravity, protein, blood, and glucose. This is a medical screen for the physical — it is not a DOT drug test.",
        },
        {
          title: "Physical examination",
          detail:
            "Eyes, ears, mouth/throat, heart, lungs, abdomen, vascular system, genito-urinary, extremities, spine, and neurological function.",
        },
        {
          title: "Medical Examiner’s Certificate",
          detail:
            "If you qualify, the examiner issues your MEC and reports the result to the FMCSA National Registry. Maximum certification is 24 months.",
        },
      ],
      whatToBring: [
        "Government-issued photo ID",
        "Current Medical Examiner’s Certificate if this is a renewal",
        "Glasses, contacts, or hearing aids you drive with",
        "A list of medications with doses",
        "Specialist letters or recent labs if you have a treated condition",
        "30-day CPAP compliance report if you are treated for sleep apnea",
        "Blood-sugar logs if you have diabetes",
      ],
      afterVisit: [
        "Qualified drivers receive an MEC to carry while operating a CMV",
        "The examiner submits the exam to the FMCSA National Registry",
        "Some medical conditions receive a shorter card than 24 months",
        "TXL Med does not store exam results in this app — this is scheduling only",
      ],
      notes: [
        "A DOT physical is not a CDL skills test and not a drug screen. Your employer may still require a separate DOT drug test.",
        "Bring corrective lenses to the visit if you need them to meet the vision standard.",
      ],
    };
  }

  if (service.id === "dot-renewal") {
    return {
      ...service,
      who: "CDL/CPL drivers and CMV operators whose Medical Examiner’s Certificate is expiring or was issued for a limited window (blood pressure, diabetes, sleep apnea, or other monitored conditions).",
      overview:
        "DOT recertification is the same FMCSA physical, scheduled before your current MEC expires so you stay legally on the road. TXL Med comes to you for the renewal exam.",
      regulation:
        "FMCSA requires a new exam by a National Registry examiner before the MEC end date. Many drivers renew every 24 months; others are certified for 3–12 months depending on medical findings.",
      includes: [
        {
          title: "Full DOT physical",
          detail:
            "History, vision, hearing, blood pressure, urinalysis, and the complete physical exam required by 49 CFR 391.43.",
        },
        {
          title: "Interval health review",
          detail:
            "Changes since your last card — new medications, surgeries, CPAP use, or specialist care — are documented for the new certification decision.",
        },
        {
          title: "Updated MEC",
          detail:
            "A new Medical Examiner’s Certificate is issued when you qualify, and the result is reported to the National Registry.",
        },
        {
          title: "No clinic gap",
          detail:
            "Mobile scheduling is meant to keep you from sitting in a waiting room or missing a load while your card lapses.",
        },
      ],
      whatToBring: [
        "Photo ID and your current or expired MEC",
        "Glasses, contacts, or hearing aids",
        "Updated medication list",
        "Any required compliance paperwork (CPAP, A1C/glucose logs, cardiology clearance)",
      ],
      afterVisit: [
        "New MEC dated from the exam, if you qualify",
        "Registry update with FMCSA",
        "Shorter recertification interval if a condition still needs monitoring",
      ],
      notes: [
        "Do not wait until the card is already expired if your employer or a state agency requires a current MEC to dispatch.",
        "Recertification uses the same medical standards as a first-time DOT physical.",
      ],
    };
  }

  return {
    ...service,
    who: "Safety managers, fleet owners, CDL schools, and owner-operators who need several drivers examined at one terminal, shop, or yard.",
    overview:
      "TXL Med schedules FMCSA-certified examiners on-site so a group of drivers can complete DOT physicals in one visit. Each driver still receives an individual exam and, if qualified, their own MEC.",
    regulation:
      "Every driver is examined to the same 49 CFR 391.41–391.43 standards. Group scheduling does not change medical requirements or allow a “fleet pass.”",
    includes: [
      {
        title: "On-site setup at your location",
        detail:
            "The examiner comes to your terminal, shop, or a designated meetup. Drivers stay on the clock instead of traveling to a clinic.",
      },
      {
        title: "Individual DOT physicals",
        detail:
          "Vision, hearing, blood pressure, urinalysis, history, and physical exam for each driver — same components as a solo visit.",
      },
      {
        title: "Coordinated time window",
        detail:
          "We work around shift changes so multiple certificates can be completed in a single stop.",
      },
      {
        title: "Per-driver MEC and registry reporting",
        detail:
          "Each qualifying driver receives a Medical Examiner’s Certificate. Results are reported to the FMCSA National Registry.",
      },
    ],
    whatToBring: [
      "A roster of drivers and a point of contact on site",
      "A private or semi-private space for the exam",
      "Each driver should bring photo ID, glasses/hearing aids, and medication lists",
      "Compliance paperwork for drivers with treated conditions",
    ],
    afterVisit: [
      "Each driver who qualifies leaves with an MEC",
      "Registry submissions are completed per driver",
      "Safety managers can follow up with TXL Med on scheduling the next group window",
    ],
    notes: [
      "Urinalysis for the physical is not a DOT drug-testing program. Random or pre-employment drug testing is a separate FMCSA requirement.",
      "Ask about a group window if you have five or more drivers at one location.",
    ],
  };
});

export function serviceDetailById(id: string) {
  return SERVICE_DETAILS.find((s) => s.id === id);
}
