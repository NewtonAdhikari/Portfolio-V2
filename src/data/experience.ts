
import type { ExperienceItem } from "./types";

/**
 * EXPERIENCE — Newton Adhikari
 * Only include verifiable academic research and project work.
 * No fabricated employers, internships, dates, awards, or metrics.
 */

export const experienceItems: ExperienceItem[] = [
  {
    slug: "decision-calibrated-research",
    organization: "Independent Academic Research",
    role: "Student Researcher — Machine Learning",
    category: "Research Experience",
    duration: "2026 — Present",
    start: "",
    end: "Present",
    location: "Academic Research",
    summary:
      "Conducting research on decision-calibrated probabilistic learning, focusing on probability calibration, cost-sensitive classification, decision risk, and reliable machine learning systems. Developed research contributions and prepared a manuscript for journal submission.",
    technologies: [
      "Python",
      "PyTorch",
      "Scikit-learn",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Machine Learning"
    ],
    responsibilities: [
      "Study probabilistic learning, model calibration, and cost-sensitive decision-making.",
      "Develop experimental frameworks for evaluating prediction quality and downstream decision risk.",
      "Implement machine learning experiments using Python and PyTorch.",
      "Analyze false negatives, decision costs, and model performance.",
      "Prepare research manuscripts and technical documentation."
    ],
    contributions: [
      "Worked on the Decision-Calibrated Probabilistic Learning framework.",
      "Developed the Decision Calibration Error (DCE) evaluation concept.",
      "Explored decision-aware training objectives for reducing costly classification errors.",
      "Worked on Distribution-Aware Decision-Calibrated Probabilistic Learning (DA-DCPL).",
      "Explored adaptive calibration under distribution shift."
    ],
    achievements: [
      "Prepared a research manuscript titled Decision-Calibrated Probabilistic Learning for Cost-Sensitive and Risk-Aware Decision Making.",
      "Submitted research work to Expert Systems With Applications."
    ],
    documents: [],
    cover: {
      from: "#21108F",
      to: "#3156C8",
      icon: "flask"
    },
    sections: [
      {
        id: "role",
        heading: "Research Overview",
        paragraphs: [
          "My research focuses on improving the reliability of machine learning systems by connecting probabilistic predictions with actual decision-making costs and risks.",
          "I explore calibration methods, decision-aware learning objectives, distribution shift, and evaluation techniques for trustworthy machine learning."
        ]
      },
      {
        id: "contributions",
        heading: "Research Contributions",
        bullets: [
          "Decision-Calibrated Probabilistic Learning.",
          "Decision Calibration Error (DCE).",
          "Distribution-Aware Decision Calibration.",
          "Distribution-Aware Decision Calibration Error (DADCE).",
          "Distribution-Aware Decision Loss (DADL)."
        ]
      },
      {
        id: "outcomes",
        heading: "Research Outcomes",
        paragraphs: [
          "Research manuscript submitted to Expert Systems With Applications. Publication status should be updated according to the journal's official decision."
        ]
      }
    ]
  },

  {
    slug: "hybrid-marl-supply-chain",
    organization: "Academic Research and Development Project",
    role: "Machine Learning Project Developer",
    category: "Research Experience",
    duration: "Dates to be confirmed",
    start: "",
    end: "",
    location: "Academic Project",
    summary:
      "Working on a Hybrid Multi-Agent Reinforcement Learning framework for end-to-end supply chain management. The project explores coordination between multiple supply chain agents using reinforcement learning and hybrid learning architectures.",
    technologies: [
      "Python",
      "PyTorch",
      "Reinforcement Learning",
      "PPO",
      "Stable-Baselines3",
      "Graph Neural Networks",
      "Transformers",
      "Pandas",
      "NumPy"
    ],
    responsibilities: [
      "Develop a simulated environment for supply chain operations.",
      "Design agent-based state, action, and reward representations.",
      "Implement reinforcement learning training workflows.",
      "Explore multi-agent coordination and decentralized execution.",
      "Evaluate inventory management and supply chain performance."
    ],
    contributions: [
      "Designed a six-agent supply chain framework covering suppliers, manufacturing, warehouses, logistics, distribution, and retail.",
      "Explored centralized training with decentralized execution.",
      "Worked with Proximal Policy Optimization (PPO).",
      "Used the Walmart M5 dataset as a data source for the project.",
      "Explored hybrid GNN and Transformer-based architectures."
    ],
    achievements: [],
    documents: [],
    cover: {
      from: "#101014",
      to: "#3156C8",
      icon: "network"
    },
    sections: [
      {
        id: "role",
        heading: "Project Overview",
        paragraphs: [
          "The project aims to develop an intelligent supply chain management system using multiple autonomous agents.",
          "Each agent is responsible for a different operational stage, while the overall framework focuses on coordination and optimization."
        ]
      },
      {
        id: "contributions",
        heading: "Technical Contributions",
        bullets: [
          "Six-agent supply chain architecture.",
          "Multi-agent reinforcement learning.",
          "Centralized training and decentralized execution.",
          "Hybrid learning with GNNs and Transformers.",
          "Multi-objective reward design."
        ]
      },
      {
        id: "outcomes",
        heading: "Project Outcomes",
        paragraphs: [
          "Implementation and experimental evaluation are ongoing. Quantitative performance improvements will be reported only after verified experiments."
        ]
      }
    ]
  },

  {
    slug: "nexotv-development",
    organization: "Independent Software Development",
    role: "Full-Stack Web Developer",
    category: "Professional Experience",
    duration: "Dates to be confirmed",
    start: "",
    end: "",
    location: "Independent Project",
    summary:
      "Developed NexoTV, a full-stack website using PHP and MySQL. The project involved frontend development and backend/database implementation.",
    technologies: [
      "PHP",
      "MySQL",
      "JavaScript",
      "HTML",
      "CSS",
      "Database Management",
      "Full-Stack Development"
    ],
    responsibilities: [
      "Develop website frontend and backend functionality.",
      "Design and manage relational database structures.",
      "Implement server-side application logic.",
      "Work with database operations and application integration.",
      "Maintain and improve website functionality."
    ],
    contributions: [
      "Created a full-stack web application named NexoTV.",
      "Used PHP for backend development.",
      "Used MySQL for database management."
    ],
    achievements: [],
    documents: [],
    cover: {
      from: "#3156C8",
      to: "#E52436",
      icon: "code"
    },
    sections: [
      {
        id: "role",
        heading: "Project Overview",
        paragraphs: [
          "NexoTV is a full-stack website developed using PHP and MySQL. The project demonstrates practical experience in web application development and database integration."
        ]
      },
      {
        id: "contributions",
        heading: "Development Contributions",
        bullets: [
          "Full-stack website development.",
          "PHP backend implementation.",
          "MySQL database integration.",
          "Application functionality and maintenance."
        ]
      },
      {
        id: "outcomes",
        heading: "Project Outcomes",
        paragraphs: [
          "Successfully developed the website. Additional performance metrics and user statistics are not included because they have not been verified."
        ]
      }
    ]
  }
];

export function getExperienceBySlug(slug: string) {
  return experienceItems.find((e) => e.slug === slug);
}

export const experienceCategories: ExperienceItem["category"][] = [
  "Internships",
  "Professional Experience",
  "Research Experience",
  "Technical Leadership",
  "Campus Activities",
  "Volunteering"
];
