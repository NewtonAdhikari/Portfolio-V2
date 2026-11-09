import type { Project } from "./types";

/**
 * PROJECTS — Newton Adhikari
 *
 * This file replaces fictional/sample projects with projects and research
 * development work that match the profile information provided.
 *
 * Before publishing:
 * - Add only real GitHub and demo URLs.
 * - Confirm project years and completion status.
 * - Do not claim unverified performance metrics or user counts.
 * - Research concepts are described as ongoing work, not completed products.
 */

export const projects: Project[] = [
  // ---------------------------------------------------------------------------
  // 1. DISTRIBUTION-AWARE DECISION-CALIBRATED PROBABILISTIC LEARNING
  // ---------------------------------------------------------------------------
  {
    slug: "da-dcpl",
    title:
      "Distribution-Aware Decision-Calibrated Probabilistic Learning (DA-DCPL)",
    category: "Artificial Intelligence and Machine Learning",
    description:
      "Research implementation of a decision-aware probabilistic learning framework that investigates probability calibration, decision risk, and adaptive calibration under distribution shift.",
    technologies: [
      "Python",
      "PyTorch",
      "NumPy",
      "SciPy",
      "scikit-learn",
      "Pandas",
      "Matplotlib",
      "Machine Learning"
    ],
    status: "Ongoing",
    github: "",
    demo: "",
    year: 2026,
    cover: { from: "#21108F", to: "#3156C8", icon: "brain-circuit" },
    highlights: [
      "Decision-aware probabilistic learning and calibration",
      "Decision Calibration Error (DCE) and distribution-aware evaluation concepts",
      "Investigation of adaptive calibration under distribution shift",
      "Synthetic and real-world dataset experimentation"
    ],
    sections: [
      {
        id: "overview",
        heading: "Project Overview",
        paragraphs: [
          "DA-DCPL is a research implementation focused on improving the reliability of probabilistic machine learning models when their predictions are used for cost-sensitive decisions.",
          "The work extends decision-calibrated probabilistic learning toward distribution-aware calibration. It investigates how changes in data distributions can affect probability estimates and downstream decision risk."
        ]
      },
      {
        id: "problem",
        heading: "Problem Statement",
        paragraphs: [
          "A model can produce probability estimates that appear well calibrated on one dataset but become less reliable when the data distribution changes. In cost-sensitive applications, this can lead to decisions with undesirable consequences.",
          "The project investigates how probabilistic models can account for decision costs and distribution changes rather than relying only on conventional predictive metrics."
        ]
      },
      {
        id: "objectives",
        heading: "Project Objectives",
        bullets: [
          "Implement a probabilistic learning pipeline for decision-sensitive tasks.",
          "Investigate decision-aware calibration and decision-risk evaluation.",
          "Study Decision Calibration Error (DCE).",
          "Explore Distribution-Aware Decision Calibration (DADC).",
          "Investigate Distribution-Aware Decision Calibration Error (DADCE) and Distribution-Aware Decision Loss (DADL).",
          "Evaluate model behavior under simulated distribution shifts."
        ]
      },
      {
        id: "features",
        heading: "Key Components",
        bullets: [
          "Probabilistic model training and probability estimation.",
          "Decision-cost and risk evaluation.",
          "Calibration and distribution-shift experimentation.",
          "Synthetic Gaussian Mixture Decision Dataset support.",
          "Real-world dataset evaluation, including the Adult Income Dataset.",
          "Experiment logging and visualization."
        ]
      },
      {
        id: "stack",
        heading: "Technology Stack",
        bullets: [
          "Programming: Python.",
          "Deep learning: PyTorch.",
          "Data processing: NumPy and Pandas.",
          "Machine learning utilities: SciPy and scikit-learn.",
          "Visualization: Matplotlib."
        ]
      },
      {
        id: "architecture",
        heading: "System Architecture",
        paragraphs: [
          "The research pipeline is organized around data preparation, probabilistic model training, distribution-shift simulation or detection, calibration, decision-aware evaluation, and result reporting.",
          "The architecture is intended to keep model training, calibration methods, decision losses, metrics, and experiment configurations modular so that methods can be compared consistently."
        ]
      },
      {
        id: "implementation",
        heading: "Implementation Details",
        paragraphs: [
          "The implementation is developed in Python with PyTorch and supporting scientific-computing libraries. The project structure separates configuration, datasets, models, calibration, distribution-shift handling, decision objectives, training, and evaluation.",
          "The experimental workflow investigates baseline probabilistic learning and extensions for decision-aware and distribution-aware calibration."
        ]
      },
      {
        id: "screens",
        heading: "Screenshots and Demonstrations",
        paragraphs: [
          "Add genuine experiment plots, calibration diagrams, distribution-shift comparisons, and implementation screenshots when they are ready for public display."
        ]
      },
      {
        id: "challenges",
        heading: "Research Challenges",
        bullets: [
          "Separating probability calibration quality from downstream decision quality.",
          "Modeling different costs for false-positive and false-negative predictions.",
          "Evaluating calibration behavior when the data distribution changes.",
          "Designing metrics and objectives that can be compared fairly across experiments."
        ]
      },
      {
        id: "results",
        heading: "Results and Outcomes",
        paragraphs: [
          "The implementation and experimental evaluation are ongoing. Add quantitative results only after they have been reproduced and checked against the experiment logs and research manuscript."
        ]
      },
      {
        id: "future",
        heading: "Future Improvements",
        bullets: [
          "Broader evaluation across distribution-shift benchmarks.",
          "Additional probabilistic model architectures.",
          "More extensive comparisons with calibration baselines.",
          "Further study of decision-aware learning in high-risk applications."
        ]
      },
      {
        id: "repo",
        heading: "GitHub Repository",
        paragraphs: [
          "Add the public repository URL when the code is ready to share."
        ]
      },
      {
        id: "live",
        heading: "Research Artifacts",
        paragraphs: [
          "Add links to the preprint, technical report, experiment figures, or reproducibility materials when publicly available."
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 2. HYBRID MULTI-AGENT REINFORCEMENT LEARNING FOR SUPPLY CHAIN MANAGEMENT
  // ---------------------------------------------------------------------------
  {
    slug: "hybrid-marl-supply-chain",
    title:
      "Hybrid Multi-Agent Reinforcement Learning for End-to-End Supply Chain Management",
    category: "Artificial Intelligence",
    description:
      "A multi-agent supply chain research project exploring coordinated decision-making across supplier, manufacturing, warehouse, logistics, distribution, and retail operations.",
    technologies: [
      "Python",
      "PyTorch",
      "Stable-Baselines3",
      "PPO",
      "NumPy",
      "Pandas",
      "Graph Neural Networks",
      "Transformers",
      "Walmart M5 Dataset"
    ],
    status: "Ongoing",
    github: "",
    demo: "",
    year: 2026,
    cover: { from: "#101014", to: "#3156C8", icon: "network" },
    highlights: [
      "Six-agent end-to-end supply chain architecture",
      "Proximal Policy Optimization (PPO) learning workflow",
      "Centralized training with decentralized execution as the architectural direction",
      "Exploration of GNN and Transformer-based components"
    ],
    sections: [
      {
        id: "overview",
        heading: "Project Overview",
        paragraphs: [
          "This project explores a hybrid multi-agent reinforcement learning framework for end-to-end supply chain management. It models the supply chain as a set of connected operational stages, with an intelligent agent responsible for each stage.",
          "The six-agent design covers supplier, manufacturing, warehouse, logistics, distribution, and retail operations. The research investigates how these agents can coordinate decisions within a shared supply chain environment."
        ]
      },
      {
        id: "problem",
        heading: "Problem Statement",
        paragraphs: [
          "Supply chain decisions are interdependent. Procurement, production, inventory, transportation, distribution, and retail decisions can affect one another, while isolated optimization may overlook system-wide effects.",
          "The project investigates whether multi-agent reinforcement learning can support coordinated decisions across these operational stages."
        ]
      },
      {
        id: "objectives",
        heading: "Project Objectives",
        bullets: [
          "Model an end-to-end supply chain using six operational agents.",
          "Develop a simulation environment for agent interaction.",
          "Represent state, action, and reward information for each agent.",
          "Implement PPO-based reinforcement learning workflows.",
          "Explore centralized training and decentralized execution.",
          "Investigate hybrid learning using graph and sequence-modeling approaches."
        ]
      },
      {
        id: "features",
        heading: "Key Components",
        bullets: [
          "Supplier Agent for supplier-side decisions.",
          "Manufacturing Agent for production-related decisions.",
          "Warehouse Agent for storage and inventory decisions.",
          "Logistics Agent for transportation decisions.",
          "Distribution Agent for allocation and distribution decisions.",
          "Retail Agent for retail-side inventory and demand decisions.",
          "Reward design that considers local and system-level objectives."
        ]
      },
      {
        id: "stack",
        heading: "Technology Stack",
        bullets: [
          "Programming: Python.",
          "Reinforcement learning: Proximal Policy Optimization (PPO).",
          "Training tools: Stable-Baselines3.",
          "Deep learning: PyTorch.",
          "Data processing: NumPy and Pandas.",
          "Research data source: Walmart M5 forecasting dataset.",
          "Exploratory architecture: Graph Neural Networks and Transformers."
        ]
      },
      {
        id: "architecture",
        heading: "System Architecture",
        paragraphs: [
          "The project is organized around six interacting agents representing the major stages of a supply chain. Each agent observes its operational state, selects an action, and receives feedback from the simulated environment.",
          "The broader architecture explores centralized training with decentralized execution, with local agent behavior coordinated toward shared supply chain objectives."
        ]
      },
      {
        id: "implementation",
        heading: "Implementation Details",
        paragraphs: [
          "The implementation uses Python and a simulated environment for supply chain interactions. PPO-based training is used in the reinforcement learning workflow, with Stable-Baselines3 and PyTorch as part of the development stack.",
          "The Walmart M5 dataset is used as a source of historical sales information for demand-related modeling. GNN and Transformer components are part of the proposed hybrid architecture and should be described as implemented only when their code is complete."
        ]
      },
      {
        id: "screens",
        heading: "Screenshots and Demonstrations",
        paragraphs: [
          "Add genuine screenshots of the simulation environment, agent actions, training logs, inventory states, and evaluation charts."
        ]
      },
      {
        id: "challenges",
        heading: "Challenges and Research Considerations",
        bullets: [
          "Coordinating decisions across multiple operational agents.",
          "Designing reward functions that balance local and global objectives.",
          "Representing dependencies between supply chain stages.",
          "Evaluating policies under changing demand and supply conditions.",
          "Comparing multi-agent methods using consistent simulation settings."
        ]
      },
      {
        id: "results",
        heading: "Results and Outcomes",
        paragraphs: [
          "The project includes development and testing of a simulated multi-agent supply chain workflow. Add verified results for inventory cost, service level, reward, or bullwhip effect only after completing controlled experiments."
        ]
      },
      {
        id: "future",
        heading: "Future Improvements",
        bullets: [
          "Compare PPO-based approaches with MAPPO and QMIX.",
          "Evaluate the bullwhip effect.",
          "Test under demand uncertainty and supply disruptions.",
          "Expand the environment and agent coordination mechanisms.",
          "Evaluate hybrid GNN and Transformer components."
        ]
      },
      {
        id: "repo",
        heading: "GitHub Repository",
        paragraphs: [
          "Add the actual project repository URL when it is ready for public access."
        ]
      },
      {
        id: "live",
        heading: "Project Demonstration",
        paragraphs: [
          "Add a video or live simulation link when a public demonstration is available."
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 3. BLOCKCHAIN-ASSISTED FEDERATED LEARNING
  // ---------------------------------------------------------------------------
  {
    slug: "blockchain-assisted-federated-learning",
    title:
      "Blockchain-Assisted Privacy and Security Enhancement in Federated Learning",
    category: "Research-Based Projects",
    description:
      "A research project investigating how blockchain mechanisms can support privacy, security, transparency, and trust in collaborative federated learning environments.",
    technologies: [
      "Python",
      "Federated Learning",
      "Blockchain",
      "Machine Learning",
      "Distributed Systems",
      "Cryptography",
      "Privacy-Preserving Learning"
    ],
    status: "Ongoing",
    github: "",
    demo: "",
    year: 2026,
    cover: { from: "#3156C8", to: "#21108F", icon: "shield-check" },
    highlights: [
      "Blockchain-assisted federated learning research direction",
      "Privacy-aware collaborative model training",
      "Investigation of model-update verification and decentralized trust",
      "Security and communication-overhead evaluation"
    ],
    sections: [
      {
        id: "overview",
        heading: "Project Overview",
        paragraphs: [
          "This project investigates the integration of blockchain technology with federated learning. Federated learning allows multiple participants to train a shared model while keeping their raw data at their respective locations.",
          "The research explores whether blockchain-based coordination and verification mechanisms can improve transparency, trust, and security in distributed learning workflows."
        ]
      },
      {
        id: "problem",
        heading: "Problem Statement",
        paragraphs: [
          "Federated learning reduces the need to centralize raw training data, but distributed participants and model-update exchanges create security and trust challenges.",
          "The project investigates mechanisms for verifying participation and model-update activity while preserving the decentralized learning process."
        ]
      },
      {
        id: "objectives",
        heading: "Project Objectives",
        bullets: [
          "Study blockchain integration with federated learning.",
          "Investigate privacy-aware collaborative model training.",
          "Explore verification of model updates and participant activity.",
          "Study decentralized trust and coordination mechanisms.",
          "Evaluate security, communication, and computational trade-offs."
        ]
      },
      {
        id: "features",
        heading: "Key Research Components",
        bullets: [
          "Federated clients that retain their local training data.",
          "Local model-training and update-generation workflow.",
          "Federated aggregation process.",
          "Blockchain-assisted coordination and verification direction.",
          "Security and privacy evaluation."
        ]
      },
      {
        id: "stack",
        heading: "Technology Stack",
        bullets: [
          "Programming and experimentation: Python.",
          "Learning approach: Federated Learning.",
          "Distributed coordination: Blockchain concepts.",
          "Supporting areas: cryptography, privacy-preserving learning, and distributed systems."
        ]
      },
      {
        id: "architecture",
        heading: "System Architecture",
        paragraphs: [
          "The research architecture considers federated clients that train local models and participate in a collaborative aggregation process. A blockchain layer is investigated as a mechanism for recording or verifying selected coordination events.",
          "The precise ledger design, consensus mechanism, aggregation method, and privacy controls should be documented from the final implementation rather than assumed."
        ]
      },
      {
        id: "implementation",
        heading: "Implementation Details",
        paragraphs: [
          "The project is a research direction focused on blockchain-assisted federated learning. Implementation details should be expanded as the selected federated-learning framework, blockchain platform, client configuration, and security mechanisms are finalized."
        ]
      },
      {
        id: "screens",
        heading: "Screenshots and Demonstrations",
        paragraphs: [
          "Add actual architecture diagrams, federated-client demonstrations, blockchain transaction records, and experiment screenshots when available."
        ]
      },
      {
        id: "challenges",
        heading: "Challenges and Research Considerations",
        bullets: [
          "Maintaining privacy while coordinating distributed training.",
          "Verifying model-update activity without exposing sensitive information.",
          "Considering malicious or unreliable participants.",
          "Managing blockchain latency and communication overhead.",
          "Balancing security mechanisms with model-training performance."
        ]
      },
      {
        id: "results",
        heading: "Results and Outcomes",
        paragraphs: [
          "The project is ongoing. No specific security improvement, accuracy gain, or performance result is claimed until supported by completed experiments."
        ]
      },
      {
        id: "future",
        heading: "Future Improvements",
        bullets: [
          "Investigate secure aggregation.",
          "Study Byzantine-resilient federated learning.",
          "Evaluate privacy-preserving mechanisms.",
          "Compare alternative blockchain coordination designs.",
          "Evaluate scalability with heterogeneous clients."
        ]
      },
      {
        id: "repo",
        heading: "GitHub Repository",
        paragraphs: [
          "Add the actual source-code repository when the implementation is ready to share."
        ]
      },
      {
        id: "live",
        heading: "Research Demonstration",
        paragraphs: [
          "Add a demonstration or technical report when available."
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 4. NEURO-CAUSAL REFLECTIVE INTELLIGENCE FOR HALLUCINATION-RESISTANT LLMs
  // ---------------------------------------------------------------------------
  {
    slug: "neuro-causal-reflective-intelligence",
    title:
      "Neuro-Causal Reflective Intelligence for Trustworthy Hallucination-Resistant Large Language Models",
    category: "Artificial Intelligence",
    description:
      "An ongoing research project exploring causal reasoning and reflective evaluation mechanisms to identify unsupported claims and improve the factual reliability of Large Language Models.",
    technologies: [
      "Python",
      "Large Language Models",
      "Transformers",
      "Causal Inference",
      "Natural Language Processing",
      "Hallucination Evaluation",
      "Trustworthy AI"
    ],
    status: "Ongoing",
    github: "",
    demo: "",
    year: 2026,
    cover: { from: "#21108F", to: "#E52436", icon: "brain-circuit" },
    highlights: [
      "Neuro-Causal Reflective Intelligence research framework",
      "Causal reasoning for examining generated claims",
      "Reflective evaluation of unsupported or inconsistent responses",
      "Focus on factual reliability and trustworthy LLMs"
    ],
    sections: [
      {
        id: "overview",
        heading: "Project Overview",
        paragraphs: [
          "Large Language Models can generate fluent responses that contain unsupported, inconsistent, or factually incorrect information. These hallucinations create reliability concerns when LLMs are used for research, education, and decision support.",
          "This research investigates a Neuro-Causal Reflective Intelligence framework that combines causal reasoning and reflective evaluation to examine generated claims and improve response trustworthiness."
        ]
      },
      {
        id: "problem",
        heading: "Problem Statement",
        paragraphs: [
          "Fluent text generation does not guarantee factual correctness. A language model may produce claims without sufficient evidence or generate conclusions that do not follow from the available context.",
          "The project investigates how causal reasoning and reflective evaluation can be combined to identify unsupported claims and reasoning inconsistencies."
        ]
      },
      {
        id: "objectives",
        heading: "Project Objectives",
        bullets: [
          "Investigate a Neuro-Causal Reflective Intelligence framework.",
          "Explore causal reasoning for evaluating generated claims.",
          "Study reflective mechanisms for examining model responses.",
          "Investigate hallucination identification and mitigation.",
          "Evaluate factual consistency and evidence alignment.",
          "Develop a research foundation for more trustworthy LLMs."
        ]
      },
      {
        id: "features",
        heading: "Key Research Components",
        bullets: [
          "LLM response generation and claim identification.",
          "Causal reasoning and relationship analysis.",
          "Reflective evaluation of generated responses.",
          "Evidence and factual-consistency assessment.",
          "Hallucination identification and reliability evaluation."
        ]
      },
      {
        id: "stack",
        heading: "Technology Stack",
        bullets: [
          "Programming: Python.",
          "Language models: Transformer-based LLMs.",
          "Research areas: causal inference and reflective reasoning.",
          "Evaluation areas: hallucination detection, factual consistency, and trustworthy AI."
        ]
      },
      {
        id: "architecture",
        heading: "Proposed System Architecture",
        paragraphs: [
          "The proposed research direction considers an LLM generation component followed by claim-level examination, causal reasoning, reflective evaluation, and evidence assessment.",
          "The architecture is conceptual and under development. Its final modules and data flow should be updated as the methodology and implementation are finalized."
        ]
      },
      {
        id: "implementation",
        heading: "Implementation Details",
        paragraphs: [
          "The project is currently an ongoing research effort. The implementation choices, model selection, evaluation datasets, and integration strategy will be documented as the experimental framework develops."
        ]
      },
      {
        id: "screens",
        heading: "Screenshots and Demonstrations",
        paragraphs: [
          "Add genuine framework diagrams, prototype screenshots, evaluation examples, and demonstration videos when they become available."
        ]
      },
      {
        id: "challenges",
        heading: "Research Challenges",
        bullets: [
          "Distinguishing unsupported claims from statements that are merely uncertain.",
          "Evaluating causal relationships in natural-language responses.",
          "Designing reflective checks that add value beyond repeated generation.",
          "Measuring factual reliability consistently across different LLMs.",
          "Avoiding unsupported claims about hallucination reduction before validation."
        ]
      },
      {
        id: "results",
        heading: "Results and Outcomes",
        paragraphs: [
          "The research is in progress. Experimental results, benchmark comparisons, and claims of improved hallucination resistance will be added only after implementation and validation."
        ]
      },
      {
        id: "future",
        heading: "Future Improvements",
        bullets: [
          "Develop and evaluate a complete experimental framework.",
          "Test across multiple LLM architectures.",
          "Investigate integration with retrieval-augmented generation.",
          "Evaluate on established factuality and hallucination benchmarks.",
          "Study causal evidence verification and reflective reasoning."
        ]
      },
      {
        id: "repo",
        heading: "GitHub Repository",
        paragraphs: [
          "Add the public repository when code is available for release."
        ]
      },
      {
        id: "live",
        heading: "Research Demonstration",
        paragraphs: [
          "Add a technical demonstration or research report when available."
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 5. PORTFOLIO CONTENT MANAGEMENT SYSTEM
  // ---------------------------------------------------------------------------
  {
    slug: "portfolio-content-management-system",
    title: "Full-Stack Portfolio Content Management System",
    category: "Full-Stack Development",
    description:
      "A portfolio website and administration system with structured content management for projects, skills, education, experience, certifications, services, testimonials, and messages.",
    technologies: [
      "PHP",
      "MySQL",
      "JavaScript",
      "Vue.js",
      "HTML",
      "CSS",
      "REST API",
      "Database Design"
    ],
    status: "Ongoing",
    github: "",
    demo: "https://newtonadhikari.cc.cd",
    year: 2026,
    cover: { from: "#3156C8", to: "#21108F", icon: "panels-top-left" },
    highlights: [
      "Dynamic portfolio content management",
      "Admin panel for managing portfolio sections",
      "PHP and MySQL backend integration",
      "Structured management of projects and academic profile information"
    ],
    sections: [
      {
        id: "overview",
        heading: "Project Overview",
        paragraphs: [
          "This project is a full-stack portfolio website supported by an administration interface. It is designed to manage portfolio information through structured database-backed content rather than editing every page manually.",
          "The portfolio includes sections for projects, skills, education, experience, certifications, services, testimonials, and messages."
        ]
      },
      {
        id: "problem",
        heading: "Problem Statement",
        paragraphs: [
          "Maintaining a personal portfolio through manual code changes makes content updates repetitive and difficult to manage.",
          "The project addresses this by providing an administrative interface and backend operations for managing portfolio content."
        ]
      },
      {
        id: "objectives",
        heading: "Project Objectives",
        bullets: [
          "Build a dynamic portfolio website.",
          "Manage portfolio content through an admin panel.",
          "Store structured content in a MySQL database.",
          "Connect frontend components with backend API operations.",
          "Support management of academic, professional, and project information."
        ]
      },
      {
        id: "features",
        heading: "Key Features",
        bullets: [
          "Project and portfolio-content management.",
          "Skills and education management.",
          "Experience and certification management.",
          "Services and testimonials management.",
          "Message management.",
          "Database-backed content retrieval and updates."
        ]
      },
      {
        id: "stack",
        heading: "Technology Stack",
        bullets: [
          "Backend: PHP.",
          "Database: MySQL.",
          "Admin interface: Vue.js.",
          "Frontend: HTML, CSS, and JavaScript.",
          "Integration: application API and database operations."
        ]
      },
      {
        id: "architecture",
        heading: "System Architecture",
        paragraphs: [
          "The system uses a frontend portfolio, an administrative interface, backend API endpoints, and a relational database.",
          "Administrative actions are sent to backend endpoints, which validate requests and perform database operations. The public portfolio retrieves and displays the managed content."
        ]
      },
      {
        id: "implementation",
        heading: "Implementation Details",
        paragraphs: [
          "The project involves PHP backend development, MySQL schema design, and integration with a Vue-based admin interface. Development work includes resolving API actions, data persistence, and the display of managed records.",
          "The intended workflow is to let the administrator create and update portfolio information without changing the public website's visual design for every content update."
        ]
      },
      {
        id: "screens",
        heading: "Screenshots and Demonstrations",
        paragraphs: [
          "Use screenshots from the actual public portfolio and administration panel. Do not include placeholder screenshots."
        ]
      },
      {
        id: "challenges",
        heading: "Challenges and Solutions",
        bullets: [
          "Backend API actions must match the operations expected by the admin interface.",
          "Database schemas must support all portfolio content sections.",
          "Content updates must persist and appear correctly on the public website.",
          "Admin functionality should be improved without unnecessarily changing the existing visual design."
        ]
      },
      {
        id: "results",
        heading: "Results and Outcomes",
        paragraphs: [
          "The portfolio is available at newtonadhikari.cc.cd. The administration and data-management workflow has been developed and refined as part of the project."
        ]
      },
      {
        id: "future",
        heading: "Future Improvements",
        bullets: [
          "Reliable export and backup of portfolio data.",
          "Improved content validation and error handling.",
          "Additional admin analytics.",
          "More robust API and database testing."
        ]
      },
      {
        id: "repo",
        heading: "GitHub Repository",
        paragraphs: [
          "Add the source-code repository URL if it is publicly available."
        ]
      },
      {
        id: "live",
        heading: "Live Application",
        paragraphs: [
          "Portfolio website: https://newtonadhikari.cc.cd"
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 6. NEXOTV FULL-STACK WEBSITE
  // ---------------------------------------------------------------------------
  {
    slug: "nexotv",
    title: "NexoTV — Full-Stack Web Application",
    category: "Full-Stack Development",
    description:
      "A full-stack website project involving frontend development, PHP backend functionality, and MySQL database integration.",
    technologies: [
      "PHP",
      "MySQL",
      "JavaScript",
      "HTML",
      "CSS",
      "Database Management"
    ],
    status: "Ongoing",
    github: "",
    demo: "",
    year: 2026,
    cover: { from: "#101014", to: "#E52436", icon: "monitor-play" },
    highlights: [
      "Full-stack website development",
      "PHP backend functionality",
      "MySQL database integration",
      "Frontend and backend application integration"
    ],
    sections: [
      {
        id: "overview",
        heading: "Project Overview",
        paragraphs: [
          "NexoTV is a full-stack website project developed using PHP and MySQL. The project involves building website functionality and connecting the frontend with backend application logic and database operations."
        ]
      },
      {
        id: "problem",
        heading: "Project Focus",
        paragraphs: [
          "The project focuses on developing a functional web application with a backend capable of handling application logic and persistent data through a relational database."
        ]
      },
      {
        id: "objectives",
        heading: "Project Objectives",
        bullets: [
          "Develop the website frontend.",
          "Implement backend functionality using PHP.",
          "Design and integrate MySQL database structures.",
          "Connect application features with database operations.",
          "Maintain and improve application functionality."
        ]
      },
      {
        id: "features",
        heading: "Key Components",
        bullets: [
          "Frontend website interface.",
          "PHP backend application logic.",
          "MySQL database integration.",
          "Application data handling."
        ]
      },
      {
        id: "stack",
        heading: "Technology Stack",
        bullets: [
          "Backend: PHP.",
          "Database: MySQL.",
          "Frontend: HTML, CSS, and JavaScript."
        ]
      },
      {
        id: "architecture",
        heading: "System Architecture",
        paragraphs: [
          "The application uses a browser-based frontend connected to PHP backend functionality. The backend interacts with MySQL to store and retrieve application data."
        ]
      },
      {
        id: "implementation",
        heading: "Implementation Details",
        paragraphs: [
          "Development work covers frontend implementation, backend logic, database integration, and application testing. Additional implementation details should be added to match the final deployed version."
        ]
      },
      {
        id: "screens",
        heading: "Screenshots and Demonstrations",
        paragraphs: [
          "Add screenshots of the actual NexoTV interface and relevant application workflows."
        ]
      },
      {
        id: "challenges",
        heading: "Development Considerations",
        bullets: [
          "Maintaining consistent frontend and backend behavior.",
          "Designing database structures for application requirements.",
          "Handling application data through backend operations.",
          "Testing website functionality across user workflows."
        ]
      },
      {
        id: "results",
        heading: "Results and Outcomes",
        paragraphs: [
          "The project demonstrates practical full-stack development using PHP and MySQL. Add a live URL and verified implementation details when available."
        ]
      },
      {
        id: "future",
        heading: "Future Improvements",
        bullets: [
          "Further backend and database optimization.",
          "Improved application validation and error handling.",
          "Additional user-facing functionality.",
          "Deployment and maintenance improvements."
        ]
      },
      {
        id: "repo",
        heading: "GitHub Repository",
        paragraphs: [
          "Add the actual repository URL when available."
        ]
      },
      {
        id: "live",
        heading: "Live Application",
        paragraphs: [
          "Add the deployed NexoTV URL when available."
        ]
      }
    ]
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const projectCategories = Array.from(
  new Set(projects.map((p) => p.category))
);
