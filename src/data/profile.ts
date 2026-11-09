/**
 * ─────────────────────────────────────────────────────────────────────────
 *  EDITABLE PROFILE / GLOBAL CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────
 *  All sample content in src/data is placeholder material meant to be
 *  replaced with real personal information. Statistics below are samples —
 *  update them in one place and the whole site follows.
 */

export const profile = {
  name: "Newton Adhikari",
  firstName: "Newton",
  initials: "NA",
  designation: "B.Tech Computer Science Engineer • Aspiring Researcher",
  headline:
    "Building Intelligent Solutions Through Code, Research & Innovation.",
  heroKicker: "COMPUTER SCIENCE • RESEARCH • TECHNOLOGY • INNOVATION",
  heroDescription:
    "An aspiring computer scientist and technology enthusiast passionate about software development, artificial intelligence, machine learning, and innovative research.",
  shortIntro:
    "I am a Computer Science Engineering undergraduate and undergraduate researcher who enjoys turning deep ideas in machine learning into dependable, human-centered software. My current work explores large language models, causal reasoning and trustworthy AI.",
  location: "JanakpurDham -08 , Madhesh Provience, Nepal",
  email: "newton.adhikari@newtonadhikari.cc.cd",
  phone: "+919398350151",
  siteUrl: "https://newtonadhikari.cc.cd",
  instagram: "drissac_newton",
  facebook: "newton.adhikari.501510",
  whatsapp: "+919398350151",
  orcid: "0009-0007-1826-0918",
  researchgate: "https://www.researchgate.net/profile/Newton-Adhikari-3",
  github: "NewtonAdhikari",
  linkedin: "newton-adhikari",
  scholar: "https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=nDn9ZXkAAAAJ",
  x: "newton_adhi2722",
  resumeUrl: "/resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/NewtonAdhikari", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/newton-adhikari",
      icon: "linkedin",
    },
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=nDn9ZXkAAAAJ",
      icon: "graduation",
    },
    { label: "X / Twitter", href: "https://x.com/newton_adhi2722", icon: "twitter" },
  ],
  announcement:
    "EXPLORING TECHNOLOGY • RESEARCH • INNOVATION • BUILDING THE FUTURE",
} as const;

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  DEV.to BLOG CONFIGURATION  (single source of truth for the blog)
 * ─────────────────────────────────────────────────────────────────────────
 *  Articles are written & published on DEV.to; this portfolio only displays
 *  them via the public DEV.to API. No custom backend, database or admin
 *  dashboard is involved.
 *
 *  ① Create/confirm your account at https://dev.to
 *  ② Replace the placeholder username below with your own.
 *  ③ That's it — every article you publish appears here automatically
 *     (homepage section + /blog) with no code changes or redeployment.
 */
export const devtoConfig = {
  /** ← EDIT ME: your DEV.to username (the part after https://dev.to/).
   *  Until you set your real username, the blog shows a friendly
   *  "no articles yet" state with setup instructions. */
  username: "newton-adhikari",
  /** Display name used in the blog header/footer ("on DEV.to"). */
  platformLabel: "DEV.to",
  /** Auto-refresh cadence while a visitor stays on the page (ms). */
  refreshIntervalMs: 5 * 60 * 1000,
  /** How long fetched articles stay fresh in the client cache (ms). */
  cacheTtlMs: 3 * 60 * 1000,
  /** Articles per page on /blog before "Load more". */
  pageSize: 9,
} as const;

/** Convenience: canonical DEV.to profile URL derived from the username. */
export const devtoProfileUrl = `https://dev.to/${devtoConfig.username}`;

/** RSS feed of your DEV.to articles — used by the "Follow" button. */
export const devtoFeedUrl = `https://dev.to/feed/${devtoConfig.username}`;

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GOOGLE MAP — CONTACT PAGE LOCATION
 * ─────────────────────────────────────────────────────────────────────────
 *  The map shown on the Contact page is a keyless Google Maps embed built
 *  from `mapQuery`. Change this one string (a place, address or campus
 *  name) and both the embedded map and the "Get Directions" link update.
 */
export const mapConfig = {
  /** Place shown on the Contact page map. */
  mapQuery: "26.738714, 85.916132",
  label: "Vijay Kumar Yadav[Home]",
  note: "Open to on-site, remote and relocation opportunities worldwide.",
} as const;

/** Build the keyless Google Maps embed URL. */
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  mapConfig.mapQuery
)}&z=16&output=embed`;

/** External Get Directions link. */
export const mapDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  mapConfig.mapQuery
)}`;

/**
 * Quick statistics shown on the home page (animated counters).
 * Edit values/labels here — they are intentionally sample values.
 */
export const stats = [
  { id: "pubs", label: "Research Publications", value: 4, suffix: "" },
  { id: "rproj", label: "Research Projects", value: 5, suffix: "" },
  { id: "tproj", label: "Technical Projects", value: 12, suffix: "+" },
  { id: "certs", label: "Certifications", value: 9, suffix: "" },
  { id: "years", label: "Years of Learning & Experience", value: 3, suffix: "+" },
] as const;

export const researchCategories = [
  "Computer Science Engineering Research",
  "Artificial Intelligence Research",
  "Machine Learning Research",
  "Natural Language Processing",
  "Large Language Models",
  "Causal Inference and Reasoning",
  "Trustworthy AI",
  "Blockchain and Distributed Systems",
  "Data Science and Predictive Analytics",
] as const;

export const whatDrivesMe = [
  {
    title: "Artificial Intelligence",
    text: "Designing systems that perceive, reason and act — from classical search to modern foundation models.",
    icon: "brain",
  },
  {
    title: "Machine Learning",
    text: "Rigorous model development: honest baselines, careful evaluation and reproducible experiments.",
    icon: "network",
  },
  {
    title: "Large Language Models",
    text: "Fine-tuning, retrieval augmentation and evaluation of LLMs for real domain-specific tasks.",
    icon: "message",
  },
  {
    title: "Causal Reasoning",
    text: "Moving beyond correlation: identification strategies, causal graphs and robust effect estimation.",
    icon: "gitBranch",
  },
  {
    title: "Software Engineering",
    text: "Clean architecture, testing culture and developer experience — research code that ships.",
    icon: "code",
  },
  {
    title: "Data Science",
    text: "From messy raw data to decisions: statistics, visualization and storytelling with numbers.",
    icon: "chart",
  },
  {
    title: "Cybersecurity",
    text: "Threat modeling, secure coding habits and the adversarial side of machine learning systems.",
    icon: "shield",
  },
  {
    title: "Emerging Technologies",
    text: "Tracking what is next — distributed systems, edge AI, privacy-preserving computation.",
    icon: "sparkles",
  },
] as const;

export const philosophy = [
  {
    title: "Learn relentlessly",
    text: "Every paper, codebase and conversation compounds. I try to stay a permanent beginner in the best sense — curious, humble and hungry for first principles.",
  },
  {
    title: "Build to understand",
    text: "Reading about an idea is not knowing it. Implementing it — with tests, failure modes and edge cases — is how understanding actually forms.",
  },
  {
    title: "Rigor over hype",
    text: "In a noisy field, I value honest baselines, reproducibility and claims that survive scrutiny over impressive-sounding results.",
  },
  {
    title: "Technology for people",
    text: "The best systems disappear into someone's daily life. I aim to build things that are useful, trustworthy and genuinely considerate of their users.",
  },
] as const;

export const journey = [
  {
    period: "2023 — 2027",
    title: "B.Tech, Computer Science & Engineering",
    org: "Guru Nanak Institute of Technology, Hyderabad, India",
    text: "Core CSE curriculum with a specialization track in AI & Data Science. Active in the campus ML research group and coding club.",
    icon: "graduation",
  },
  { 
    period: "2025-2026",
    title: "President, HackerRank Club",
    org: "Leadership Role",
    text: "Leading the HackerRank Coding Club, organizing coding competitions, workshops and peer learning sessions to foster a collaborative programming culture.",
    icon: "Roles",
  },
  {
    period: "2025",
    title: "Undergraduate Researcher",
    org: "Applied ML Lab (on-campus)",
    text: "Joined the applied machine learning laboratory — first papers, first reviews, and a permanent love affair with the research process.",
    icon: "flask",
  },
  {
    period: "2024",
    title: "Hack Arena 2024",
    org: "IEEE GNITC",
    text: "Participated on hackathon with a retrieval-augmented campus assistant; began contributing documentation and bug fixes to OSS projects.",
    icon: "trophy",
  },
  {
    period: "2021 — 2023",
    title: "Higher Secondary (PCM + Computer Science)",
    org: "Vidya Niketan Senior Secondary School",
    text: "Developed the mathematics and programming foundation — calculus, linear algebra, probability and first serious C++/Python projects.",
    icon: "school",
  },
  {
    period: "2011 — 2021",
    title: "Foundations",
    org: "Vidya Niketan Group of Schools",
    text: "Where a curiosity about 'how computers work' turned into hours of Scratch, then Python, then everything else.",
    icon: "book",
  },
] as const;
