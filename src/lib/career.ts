export interface CareerEntry {
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  bullets?: string[];
}

export interface SkillMeter {
  label: string;
  level: number;
}

export const careerTimeline: CareerEntry[] = [
  {
    period: "Jan 2026 - Apr 2026",
    role: "Motion Designer",
    company: "TATA Consultancy Services",
    location: "Hyderabad",
    summary:
      "Responsible for creating marketing, training, and corporate communication content using video editing, motion graphics, and brand-aligned visual storytelling in collaboration with internal teams.",
  },
  {
    period: "Jul 2018 - Dec 2025",
    role: "Lead Video Producer",
    company: "OTSI",
    location: "Hyderabad",
    summary:
      "Led end-to-end production of marketing videos, motion graphics, corporate films, and branded content for internal communication, employee engagement, and external events while translating business goals into impactful visual storytelling.",
    bullets: [
      "Led and coordinated a 5-member cross-functional creative team across video production, motion design, and brand communication projects.",
      "Joined as a Video Editor in 2018 and grew into Senior Video Editor and Video Production Lead roles through consistent creative contributions.",
    ],
  },
  {
    period: "Sep 2016 - Mar 2018",
    role: "Video Editor",
    company: "IncNut Digital",
    location: "Hyderabad",
    summary:
      "Worked as a video editor and cinematographer, creating promotional videos, sales videos, and branded content for clients including Dabur, Cipla, Dove, and Mattel, while also editing 50+ marketing videos for StyleCraze's YouTube channels.",
    bullets: ["Collaborated closely with creative and art directors on shoots, storyboards, and production planning."],
  },
  {
    period: "Jul 2014 - Apr 2016",
    role: "Video Editor",
    company: "Prashmax Photography",
    location: "Hyderabad",
    summary:
      "Edited cinematic wedding films, event highlights, and promotional content with a storytelling focus while also working as a wedding cinematographer for weddings and live events, handling editing, color correction, sound design, and final delivery.",
    bullets: ["Assisted fashion photographers with lighting setups and captured behind-the-scenes cinematic visuals during fashion shoots."],
  },
];

export const expertiseMeters: SkillMeter[] = [
  { label: "Premiere Pro", level: 72 },
  { label: "Final Cut Pro", level: 94 },
  { label: "After Effects", level: 72 },
  { label: "DaVinci Resolve", level: 36 },
  { label: "Photoshop", level: 90 },
  { label: "Illustrator", level: 68 },
  { label: "Audition", level: 34 },
];

export const coreSkills = [
  "Video Production",
  "Motion Graphics",
  "Brand Storytelling",
  "Cinematic Editing",
  "Visual Communication",
  "Creative Direction",
  "AI-Assisted Visuals",
];

export const aiTools = ["Higgsfield", "Ideogram", "Adobe Firefly", "Midjourney"];
