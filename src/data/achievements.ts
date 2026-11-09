
import type { Achievement } from "./types";

/**
 * ACHIEVEMENTS & CERTIFICATIONS — Newton Adhikari.
 * Focus: Academic Performance, Technical Leadership and
 * Competitive Programming Community Development.
 *
 * Only include verifiable achievements and credentials.
 */

export const achievements: Achievement[] = [
  {
    slug: "hackerrank-coding-club-president",
    title: "President — HackerRank Coding Club",
    organization: "Guru Nanak Institute of Technology (GNIT), Hyderabad",
    date: "Undergraduate Studies",
    category: "Leadership Activities",
    description:
      "Serving as President of the HackerRank Coding Club, contributing to the development of a collaborative programming culture through technical activities, competitive programming, and peer learning.",
    certificateId: "hackerrank-coding-club-president",
    sections: [
      {
        id: "details",
        heading: "Leadership Overview",
        paragraphs: [
          "As President of the HackerRank Coding Club, I contribute to building an active student programming community that encourages technical exploration, algorithmic thinking, and collaborative problem-solving.",
        ],
      },
      {
        id: "responsibilities",
        heading: "Leadership Contributions",
        bullets: [
          "Organized and led coding competitions and programming activities.",
          "Conducted technical workshops to encourage practical programming skills.",
          "Promoted competitive programming, algorithmic problem-solving, and peer learning.",
          "Encouraged collaborative participation in technical and coding initiatives.",
        ],
      },
    ],
  },
  {
    slug: "secondary-academic-excellence",
    title: "Academic Excellence — Secondary Education",
    organization:
      "Shree Kishori Janata Madhyamik Secondary School, Mahottari, Nepal",
    date: "2021",
    category: "Academic Achievements",
    description:
      "Achieved 94.8% in the Class X secondary education examination, demonstrating strong academic performance across the school curriculum.",
    certificateId: "secondary-academic-excellence",
    sections: [
      {
        id: "details",
        heading: "Academic Achievement",
        paragraphs: [
          "Completed secondary education with an overall academic score of 94.8% in Class X. This achievement reflects a strong foundation in mathematics, science, languages, and other core academic subjects.",
        ],
      },
      {
        id: "education",
        heading: "Education Details",
        bullets: [
          "Institution: Shree Kishori Janata Madhyamik Secondary School.",
          "Qualification: Secondary Education — Class X.",
          "Academic Period: 2014–2021.",
          "Final Academic Score: 94.8%.",
        ],
      },
    ],
  },
  {
    slug: "higher-secondary-academic-performance",
    title: "Higher Secondary Education — Science Stream",
    organization: "Caspian Valley Higher Secondary School, Kathmandu, Nepal",
    date: "2022",
    category: "Academic Achievements",
    description:
      "Completed higher secondary education in the Science stream with 81%, studying Physics, Chemistry, Mathematics, and Biology.",
    certificateId: "higher-secondary-academic-performance",
    sections: [
      {
        id: "details",
        heading: "Academic Achievement",
        paragraphs: [
          "Completed Class XI and XII in the Science stream, developing a foundation in mathematical reasoning and scientific principles through the study of Physics, Chemistry, Mathematics, and Biology.",
        ],
      },
      {
        id: "education",
        heading: "Education Details",
        bullets: [
          "Institution: Caspian Valley Higher Secondary School.",
          "Qualification: Higher Secondary Education — Class XI–XII.",
          "Academic Period: 2021–2022.",
          "Stream: Science.",
          "Final Academic Score: 81%.",
        ],
      },
    ],
  },
];

export function getAchievementBySlug(slug: string) {
  return achievements.find((a) => a.slug === slug);
}

export const achievementCategories: Achievement["category"][] = [
  "Academic Achievements",
  "Research Achievements",
  "Awards and Recognition",
  "Technical Competitions",
  "Hackathons",
  "Professional Certifications",
  "Leadership Activities",
];
