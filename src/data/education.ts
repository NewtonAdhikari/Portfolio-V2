import type { EducationItem } from "./types";

/**
 * EDUCATION — sample/placeholder entries. Replace institutions, grades and
 * coursework with real records.
 */

export const educationItems: EducationItem[] = [
  {
    slug: "Btech-cse",
    institution: "Guru Nanak Institute of Technology, Hyderabad, India",
    degree: "B.Tech — Computer Science & Engineering",
    department: "Department of Computer Science & Engineering",
    specialization: "General CSE with Web Development, AI & Data Science track",
    duration: "2023 — 2027 (expected)",
    grade: "CGPA: 9.21 / 10 (through 7th semester — sample value)",
    level: "Undergraduate Education",
    location: "Hyderabad, Telangana, India",
    overview:
      "A rigorous CSE program with a dedicated AI & Data Science specialization track and Web Development, combining strong theoretical foundations with studio-style project courses and an active undergraduate research culture.",
    icon: "graduation",
    cover: { from: "#21108F", to: "#3156C8" },
    coursework: [
      "Data Structures & Algorithms",
      "Computer Systems & Organization",
      "Operating Systems",
      "Databases",
      "Computer Networks",
      "Theory of Computation",
      "Machine Learning",
      "Deep Learning",
      "Probability & Statistics",
      "Linear Algebra",
      "Discrete Mathematics",
      "Software Engineering",
      "Web Development",
      "Android App Development"
    ],
    achievements: [
      "President, HackerRank Coding Club",
      "Organized and led coding competitions, technical workshops, and collaborative programming initiatives",
      "Promoted competitive programming, algorithmic problem-solving, and peer learning among students"
    ],
    projects: [
      {
         name: "AI Virtual Assistant",
         description:
          "Intelligent AI-powered virtual assistant designed to automate user interactions, understand natural language queries, and deliver context-aware responses.",
      },
      {
          name: "Supply Chain Management System",
          description:
            "Integrated supply chain management platform for streamlining inventory tracking, procurement, supplier coordination, and order management.",
      },
      {
          name: "Machine Learning Research — Model Calibration & Distribution Shift",
          description:
            "Research-focused machine learning framework investigating model calibration, distribution shifts, prediction uncertainty, error analysis, and decision reliability.",
      },
    ],
    documents: [
      { label: "Transcript (placeholder)", href: "#", external: true },
      { label: "Program handbook (placeholder)", href: "#", external: true },
    ],
    sections: [
    {
      id: "institution",
      heading: "Institution Overview",
      paragraphs: [
       "Guru Nanak Institute of Technology (GNIT), Hyderabad, is an engineering and management institution established in 2008 under Barah Moula Educational Society. Located in Ibrahimpatnam, Telangana, the institution focuses on technical education, research, innovation, and industry-oriented learning.",
       "GNIT provides an academic environment that encourages technical excellence, interdisciplinary learning, research development, and practical problem-solving. The institution is approved by AICTE, affiliated with JNTUH, and recognized for its NAAC accreditation and autonomous status."
      ],
      callout: {
        tone: "info",
        text: "Institution: Guru Nanak Institute of Technology (GNIT), Ibrahimpatnam, Hyderabad, Telangana."
       },
     },
    {
     id: "academics",
      heading: "Academic Information",
      bullets: [
        "Degree: Bachelor of Technology (B.Tech).",
        "Institution: Guru Nanak Institute of Technology (GNIT), Hyderabad.",
        "Specialization: Artificial Intelligence and Data Science.",
        "Academic Focus: Computer Science, Artificial Intelligence, Machine Learning, Data Science, and Software Engineering.",
        "Duration: Four-year undergraduate program, 2023 – 2027 (expected).",
        "Academic Framework: Autonomous curriculum affiliated with Jawaharlal Nehru Technological University Hyderabad (JNTUH)."
      ],
    },
    {
      id: "coursework",
      heading: "Relevant Coursework",
      paragraphs: [
        "Academic coursework combines fundamental computer science concepts with specialized subjects in artificial intelligence and data science. Key areas include Data Structures and Algorithms, Database Management Systems, Operating Systems, Computer Networks, Object-Oriented Programming, Probability and Statistics, Machine Learning, Deep Learning, Artificial Intelligence, Data Analytics, and Software Engineering.",
        "The curriculum supports the development of analytical thinking, algorithmic problem-solving, computational skills, and the practical application of intelligent systems to real-world challenges."
      ],
    },
    {
      id: "achievements",
      heading: "Academic Achievements & Leadership",
      bullets: [
        "President, HackerRank Coding Club — leading coding initiatives, technical workshops, and competitive programming activities.",
        "Organized and promoted collaborative coding sessions to strengthen algorithmic thinking and problem-solving skills.",
        "Actively engaged in machine learning research, focusing on model calibration, distribution shifts, prediction uncertainty, and decision reliability.",
        "Developed interdisciplinary technical projects integrating artificial intelligence, software engineering, and system design."
      ],
    },
    {
      id: "projects",
      heading: "Relevant Projects & Research",
      bullets: [
        "AI Virtual Assistant — intelligent assistant designed to automate interactions, understand natural language queries, and provide context-aware responses.",
        "Supply Chain Management System — integrated platform for inventory tracking, procurement, supplier coordination, and order management.",
        "Machine Learning Research — investigating model calibration, distribution shifts, prediction uncertainty, and model reliability through experimental evaluation.",
      ],
    },
    {
      id: "documents",
      heading: "Certificates & Supporting Documents",
      paragraphs: [
        "Academic transcripts, certificates, technical credentials, research documentation, and supporting institutional records can be accessed through the relevant document links.",
        "Additional documentation, including project reports, research publications, and technical achievements, can be included to provide evidence of academic progress and professional development."
      ],
    },
  ],
  },
  {
    slug: "Higher-Secondary",
    institution: "Caspian Valley Higher Secondary School",
    degree: "Higher Secondary Education (Class XI–XII), Science",
    department: "Science Stream",
    specialization: "Physics, Chemistry, Mathematics and Biology",
    duration: "2021 — 2022",
    grade: "81%",
    level: "Higher Secondary Education",
    location: "Kathmandu, Nepal",

    overview:
      "Completed higher secondary education in the Science stream, developing a strong foundation in mathematical reasoning, scientific principles, analytical thinking, and problem-solving. Studied Physics, Chemistry, Mathematics, and Biology, building the academic foundation for further studies in Computer Science, Artificial Intelligence, and Data Science.",

    icon: "school",
    cover: { from: "#3156C8", to: "#E52436" },

    coursework: [
      "Mathematics — Algebra, Calculus and Trigonometry",
      "Physics — Mechanics, Electricity and Magnetism",
      "Chemistry — Physical, Organic and Inorganic Chemistry",
      "Biology — Botany and Zoology",
      "English",
      "Nepali",
    ],

    achievements: [
      "Successfully completed Higher Secondary Education in the Science stream.",
      "Achieved 81% in the higher secondary academic examinations.",
      "Developed a multidisciplinary academic foundation across mathematical and biological sciences.",
    ],

    projects: [],

    documents: [
      {
        label: "Higher Secondary Academic Certificate",
        href: "#",
        external: true,
      },
    ],

    sections: [
      {
        id: "institution",
        heading: "Institution Overview",
        paragraphs: [
          "Caspian Valley Higher Secondary School, Kathmandu, Nepal, provided the academic foundation for higher education through a science-oriented curriculum emphasizing scientific understanding, mathematical reasoning, and analytical development.",
          "The institution's academic environment supported the development of fundamental knowledge across Physics, Chemistry, Mathematics, and Biology, preparing students for further academic and professional pursuits.",
        ],
      },
    {
      id: "academics",
      heading: "Academic Information",
      bullets: [
        "Qualification: Higher Secondary Education (Class XI–XII).",
        "Stream: Science.",
        "Specialization: Physics, Chemistry, Mathematics and Biology.",
        "Academic Performance: 81%.",
        "Duration: 2021 – 2022.",
        "Location: Kathmandu, Nepal.",
      ],
    },
    {
      id: "coursework",
      heading: "Relevant Coursework",
      paragraphs: [
        "The science curriculum provided a comprehensive foundation in mathematical concepts, physical sciences, chemical principles, and biological systems. Mathematics strengthened quantitative reasoning and analytical problem-solving, while Physics and Chemistry developed an understanding of scientific principles and their practical applications.",
        "Biology introduced fundamental concepts of living systems, cellular processes, genetics, and biological organization. Together, these subjects established a multidisciplinary foundation for advanced studies in science and technology.",
      ],
    },
    {
      id: "achievements",
      heading: "Academic Achievements",
      bullets: [
        "Secured 81% in Higher Secondary Education.",
        "Successfully completed the Science stream with Physics, Chemistry, Mathematics, and Biology.",
        "Established a strong foundation in scientific reasoning, quantitative analysis, and interdisciplinary learning.",
      ],
    },
    {
      id: "projects",
      heading: "Academic Projects",
      bullets: [
        "No formally documented academic projects listed for this qualification.",
      ],
    },
    {
      id: "documents",
      heading: "Certificates & Supporting Documents",
      paragraphs: [
        "Higher secondary academic certificates and examination records serve as supporting documentation of educational qualifications and academic performance.",
      ],
    },
  ],
},
 {
  slug: "Secondary",
  institution: "Shree Kishori Janata Madhyamik Secondary School, Mahottari, Nepal",
  degree: "Secondary Education (Class V–X)",
  department: "General Education",
  specialization: "General Studies — Mathematics, Science and Languages",
  duration: "2014 — 2021",
  grade: "94.8% (Class X)",
  level: "Secondary Education",
  location: "Mahottari, Nepal",

  overview:
    "Completed secondary education at Shree Kishori Janata Madhyamik Secondary School, establishing a strong academic foundation in mathematics, science, languages, and general studies. Achieved 94.8% in the Class X examinations, demonstrating consistent academic dedication, analytical ability, and a strong commitment to learning. These formative years developed the foundational knowledge and problem-solving mindset that supported subsequent studies in science, technology, and engineering.",

  icon: "book",
  cover: { from: "#FF8A24", to: "#D4AF37" },

  coursework: [
    "Mathematics — Algebra, Geometry, Arithmetic and Trigonometry",
    "Science — Physics, Chemistry and Biology fundamentals",
    "English Language and Literature",
    "Nepali Language and Literature",
    "Social Studies",
    "Computer Education",
    "General Knowledge and Environmental Studies",
  ],

  achievements: [
    "Achieved 94.8% in the Class X secondary education examinations.",
    "Established a strong academic foundation in Mathematics and Science.",
    "Successfully completed secondary-level education with a multidisciplinary academic background.",
  ],

  projects: [],

  documents: [
    {
      label: "Secondary Education (Class X) Certificate",
      href: "#",
      external: true,
    },
  ],

  sections: [
    {
      id: "institution",
      heading: "Institution Overview",
      paragraphs: [
        "Shree Kishori Janata Madhyamik Secondary School, located in Mahottari, Nepal, provided the foundational academic environment for secondary education. The institution supported the development of essential knowledge, intellectual curiosity, and academic discipline through a comprehensive general education curriculum.",
        "The learning experience emphasized fundamental concepts in mathematics, science, languages, and social studies, helping develop analytical thinking, communication skills, and a structured approach to problem-solving.",
      ],
    },
    {
      id: "academics",
      heading: "Academic Information",
      bullets: [
        "Qualification: Secondary Education (Class V–X).",
        "Institution: Shree Kishori Janata Madhyamik Secondary School.",
        "Curriculum: General Education.",
        "Academic Performance: 94.8% in Class X.",
        "Duration: 2014 – 2021.",
        "Location: Mahottari, Nepal.",
      ],
    },
    {
      id: "coursework",
      heading: "Relevant Coursework",
      paragraphs: [
        "The secondary-level curriculum established a broad foundation in mathematics, natural sciences, languages, and social studies. Mathematics strengthened numerical reasoning, logical thinking, and quantitative problem-solving, while science introduced fundamental principles of the physical and biological world.",
        "Language studies developed communication, comprehension, and written expression, while computer education introduced foundational concepts of digital technology and computing. Together, these subjects contributed to a well-rounded academic foundation for higher education.",
      ],
    },
    {
      id: "achievements",
      heading: "Academic Achievements",
      bullets: [
        "Secured 94.8% in the Class X examinations.",
        "Demonstrated strong academic performance across the secondary curriculum.",
        "Developed foundational analytical, mathematical, and scientific reasoning skills.",
      ],
    },
    {
      id: "projects",
      heading: "Academic Projects",
      bullets: [
        "No formally documented academic projects listed for this qualification.",
      ],
    },
    {
      id: "documents",
      heading: "Certificates & Supporting Documents",
      paragraphs: [
        "Class X academic certificates and examination records provide supporting documentation of secondary education and academic performance.",
      ],
    },
  ],
},
];

export function getEducationBySlug(slug: string) {
  return educationItems.find((e) => e.slug === slug);
}
