/**
 * Shared content types. All portfolio content lives in structured data files
 * under src/data — adding an entry automatically generates its detail page.
 */

export type DocSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
  callout?: { tone: "info" | "gold" | "warn"; text: string };
};

export type LinkRef = { label: string; href: string; external?: boolean };

export type ResearchStatus =
  | "Ongoing"
  | "Completed"
  | "Under Review"
  | "Published"
  | "Preprint";

export type ResearchItem = {
  slug: string;
  title: string;
  category: string;
  domain: string;
  status: ResearchStatus;
  authors: string[];
  venue: string;
  year: number;
  abstract: string;
  tags: string[];
  cover: { from: string; to: string; icon: string };
  links?: {
    paper?: LinkRef;
    publication?: LinkRef;
    code?: LinkRef;
  };
  sections: DocSection[];
};

export type PubCategory =
  | "International Journal Publications"
  | "Conference Publications"
  | "Research Papers"
  | "Patents"
  | "Preprints"
  | "Under Review"
  | "Work in Progress";

export type Publication = {
  slug: string;
  title: string;
  authors: string[];
  year: number;
  category: PubCategory;
  venue: string;
  doi: string;
  doiUrl?: string;
  status: "Published" | "Accepted" | "Preprint" | "Under Review" | "In Progress";
  abstract: string;
  domain: string;
  keywords: string[];
  citation: string;
  featured?: boolean;
  pdfUrl?: string;
  sections: DocSection[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  status: "Completed" | "Ongoing" | "Maintained" | "Archived";
  github?: string;
  demo?: string;
  year: number;
  cover: { from: string; to: string; icon: string };
  highlights: string[];
  sections: DocSection[];
};

export type EducationItem = {
  slug: string;
  institution: string;
  degree: string;
  department: string;
  specialization: string;
  duration: string;
  grade: string;
  level: "Undergraduate Education" | "Higher Secondary Education" | "Secondary Education";
  location: string;
  overview: string;
  icon: string;
  cover: { from: string; to: string };
  coursework: string[];
  achievements: string[];
  projects: { name: string; description: string }[];
  documents: LinkRef[];
  sections: DocSection[];
};

export type ExperienceCategory =
  | "Internships"
  | "Professional Experience"
  | "Research Experience"
  | "Technical Leadership"
  | "Campus Activities"
  | "Volunteering";

export type ExperienceItem = {
  slug: string;
  organization: string;
  role: string;
  category: ExperienceCategory;
  duration: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  technologies: string[];
  responsibilities: string[];
  contributions: string[];
  achievements: string[];
  documents: LinkRef[];
  cover: { from: string; to: string; icon: string };
  sections: DocSection[];
};

export type Proficiency = "Beginner" | "Intermediate" | "Advanced";

export type SkillCategory = {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  skills: {
    name: string;
    description: string;
    proficiency: Proficiency;
    relatedProjects?: string[];
    relatedExperience?: string[];
  }[];
};

export type AchievementCategory =
  | "Academic Achievements"
  | "Research Achievements"
  | "Awards and Recognition"
  | "Technical Competitions"
  | "Hackathons"
  | "Professional Certifications"
  | "Leadership Activities";

export type Achievement = {
  slug: string;
  title: string;
  organization: string;
  date: string;
  category: AchievementCategory;
  description: string;
  certificateId: string;
  verificationUrl?: string;
  credentialId?: string;
  sections: DocSection[];
};
