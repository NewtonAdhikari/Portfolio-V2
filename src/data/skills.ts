
import type { SkillCategory } from "./types";

/**
 * SKILLS — Newton Adhikari.
 * Focus: Full-Stack Development, Artificial Intelligence,
 * Machine Learning, Research and Software Engineering.
 */

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    icon: "code",
    blurb: "Building intelligent applications and scalable systems through programming and problem-solving.",
    skills: [
      {
        name: "Python",
        description:
          "Used for machine learning research, AI applications, reinforcement learning, data processing and automation.",
        proficiency: "Advanced",
        relatedProjects: [
          "AI Virtual Assistant",
          "Supply Chain Management System",
          "Machine Learning Research",
        ],
      },
      {
        name: "TypeScript / JavaScript",
        description:
          "Full-stack web development, interactive applications, frontend architecture, API integration and application logic.",
        proficiency: "Advanced",
        relatedProjects: [
          "AI Virtual Assistant",
          "Education Operating System",
          "Supply Chain Management System",
        ],
      },
      {
        name: "Go",
        description:
          "Backend development, concurrent programming, scalable services and performance-oriented application development.",
        proficiency: "Intermediate",
      },
      {
        name: "SQL",
        description:
          "Database querying, relational data modeling, schema design, joins, data manipulation and application-level data management.",
        proficiency: "Intermediate",
        relatedProjects: [
          "Education Operating System",
          "Supply Chain Management System",
        ],
      },
      {
        name: "HTML5 / CSS3",
        description:
          "Semantic web development, responsive layouts, modern styling and accessible user interfaces.",
        proficiency: "Advanced",
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    icon: "layout",
    blurb: "Designing responsive, interactive and modern digital experiences.",
    skills: [
      {
        name: "React.js",
        description:
          "Component-based application development, reusable interfaces, state management and modern frontend architecture.",
        proficiency: "Advanced",
        relatedProjects: [
          "AI Virtual Assistant",
          "Education Operating System",
          "Supply Chain Management System",
        ],
      },
      {
        name: "Next.js",
        description:
          "Modern web application development, application routing, optimized rendering and production-oriented frontend architecture.",
        proficiency: "Advanced",
      },
      {
        name: "Tailwind CSS",
        description:
          "Utility-first styling, responsive design systems, reusable components and modern interface development.",
        proficiency: "Advanced",
      },
      {
        name: "Framer Motion",
        description:
          "Interactive animations, smooth transitions, motion-based interfaces and engaging user experiences.",
        proficiency: "Intermediate",
      },
      {
        name: "D3.js",
        description:
          "Interactive data visualization and graphical representation of complex datasets.",
        proficiency: "Intermediate",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: "server",
    blurb: "Developing scalable backend architectures, APIs and intelligent application services.",
    skills: [
      {
        name: "Node.js / Express.js",
        description:
          "REST API development, backend application logic, middleware integration and server-side application development.",
        proficiency: "Intermediate",
      },
      {
        name: "Go Backend Development",
        description:
          "Building backend services, concurrent processing, API architectures and performance-oriented server applications.",
        proficiency: "Intermediate",
      },
      {
        name: "REST API Development",
        description:
          "Designing structured APIs, integrating frontend and backend services and managing application data exchange.",
        proficiency: "Intermediate",
      },
      {
        name: "Authentication & Authorization",
        description:
          "User authentication, JWT-based security, email verification, OTP validation and role-based access control.",
        proficiency: "Intermediate",
      },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "database",
    blurb: "Designing structured, reliable and scalable data management systems.",
    skills: [
      {
        name: "PostgreSQL",
        description:
          "Relational database design, SQL queries, schema management, indexing and application data persistence.",
        proficiency: "Intermediate",
        relatedProjects: [
          "Education Operating System",
          "Supply Chain Management System",
        ],
      },
      {
        name: "MongoDB",
        description:
          "Document-oriented database management, flexible data structures and application data persistence.",
        proficiency: "Intermediate",
      },
      {
        name: "Database Design",
        description:
          "Data modeling, relational structures, normalization, entity relationships and database architecture.",
        proficiency: "Intermediate",
      },
      {
        name: "Google Sheets Integration",
        description:
          "Connecting applications with Google Sheets for automated data storage, registration management and reporting.",
        proficiency: "Intermediate",
      },
    ],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: "brain",
    blurb: "Developing intelligent applications through conversational AI, language models and automation.",
    skills: [
      {
        name: "Conversational AI",
        description:
          "Developing intelligent virtual assistants capable of understanding user queries and generating context-aware responses.",
        proficiency: "Intermediate",
        relatedProjects: ["AI Virtual Assistant"],
      },
      {
        name: "Natural Language Processing",
        description:
          "Text processing, language understanding, semantic representations and NLP-based application development.",
        proficiency: "Intermediate",
      },
      {
        name: "Large Language Models",
        description:
          "Exploring language models, prompt engineering, AI integration and locally hosted model applications.",
        proficiency: "Intermediate",
        relatedProjects: ["AI Virtual Assistant"],
      },
      {
        name: "Ollama",
        description:
          "Integrating locally hosted language models into AI-powered applications and conversational interfaces.",
        proficiency: "Intermediate",
        relatedProjects: ["AI Virtual Assistant"],
      },
      {
        name: "Retrieval-Augmented Generation",
        description:
          "Knowledge retrieval, context-aware generation, document processing and grounded AI response architectures.",
        proficiency: "Intermediate",
      },
      {
        name: "Speech Recognition",
        description:
          "Voice-based interaction, speech-to-text processing and conversational automation.",
        proficiency: "Intermediate",
        relatedProjects: ["AI Virtual Assistant"],
      },
    ],
  },
  {
    id: "ml",
    title: "Machine Learning & Deep Learning",
    icon: "network",
    blurb: "Training, evaluating and investigating intelligent models and decision-making systems.",
    skills: [
      {
        name: "Machine Learning",
        description:
          "Supervised and unsupervised learning, predictive modeling, model development and experimental evaluation.",
        proficiency: "Intermediate",
        relatedProjects: ["Machine Learning Research"],
      },
      {
        name: "Deep Learning",
        description:
          "Neural network architectures, representation learning, model training and deep learning experimentation.",
        proficiency: "Intermediate",
      },
      {
        name: "PyTorch",
        description:
          "Neural network development, model training workflows, optimization and deep learning experimentation.",
        proficiency: "Intermediate",
      },
      {
        name: "TensorFlow",
        description:
          "Deep learning architectures, neural network implementation and machine learning workflows.",
        proficiency: "Intermediate",
      },
      {
        name: "Reinforcement Learning",
        description:
          "Reward-driven learning, intelligent agents, sequential decision-making and optimization strategies.",
        proficiency: "Intermediate",
        relatedProjects: ["Supply Chain Management System"],
      },
      {
        name: "Model Calibration & Uncertainty Estimation",
        description:
          "Investigating prediction calibration, probabilistic reliability, uncertainty estimation and risk-aware decision-making.",
        proficiency: "Intermediate",
        relatedProjects: ["Machine Learning Research"],
      },
      {
        name: "Scikit-learn",
        description:
          "Machine learning pipelines, baseline models, preprocessing, cross-validation and model evaluation.",
        proficiency: "Intermediate",
      },
    ],
  },
  {
    id: "data-science",
    title: "Data Science",
    icon: "chart",
    blurb: "Transforming complex datasets into meaningful insights and data-driven decisions.",
    skills: [
      {
        name: "NumPy / Pandas",
        description:
          "Numerical computing, data manipulation, cleaning, transformation and exploratory data analysis.",
        proficiency: "Intermediate",
      },
      {
        name: "Statistical Analysis",
        description:
          "Probability, statistical reasoning, hypothesis testing, uncertainty analysis and quantitative evaluation.",
        proficiency: "Intermediate",
      },
      {
        name: "Data Visualization",
        description:
          "Communicating analytical findings through graphical representations, comparative analysis and structured visualizations.",
        proficiency: "Intermediate",
      },
      {
        name: "Supply Chain Analytics",
        description:
          "Demand forecasting, inventory analysis, operational optimization and data-driven supply chain decisions.",
        proficiency: "Intermediate",
        relatedProjects: ["Supply Chain Management System"],
      },
    ],
  },
  {
    id: "research-tools",
    title: "Research & Scientific Computing",
    icon: "flask",
    blurb: "Connecting theoretical investigation, experimental implementation and scientific evaluation.",
    skills: [
      {
        name: "Machine Learning Research",
        description:
          "Investigating model calibration, distribution shifts, prediction uncertainty, error analysis and decision reliability.",
        proficiency: "Intermediate",
        relatedProjects: ["Machine Learning Research"],
      },
      {
        name: "Reinforcement Learning Research",
        description:
          "Investigating hybrid reinforcement learning strategies for complex optimization and sequential decision-making.",
        proficiency: "Intermediate",
        relatedProjects: ["Supply Chain Management System"],
      },
      {
        name: "Blockchain Research",
        description:
          "Investigating decentralized storage architectures, security, scalability, data integrity and performance trade-offs.",
        proficiency: "Intermediate",
      },
      {
        name: "LaTeX",
        description:
          "Preparing academic manuscripts, mathematical expressions, research papers, references and technical documentation.",
        proficiency: "Intermediate",
      },
      {
        name: "Experimental Evaluation",
        description:
          "Analyzing model performance, prediction errors, calibration behavior, loss functions and experimental outcomes.",
        proficiency: "Intermediate",
        relatedProjects: ["Machine Learning Research"],
      },
      {
        name: "Research Paper Writing",
        description:
          "Literature analysis, methodology development, technical documentation and scientific reporting.",
        proficiency: "Intermediate",
      },
    ],
  },
  {
    id: "blockchain",
    title: "Blockchain & Decentralized Technologies",
    icon: "blocks",
    blurb: "Exploring decentralized architectures, distributed storage and blockchain-based systems.",
    skills: [
      {
        name: "Blockchain Technology",
        description:
          "Decentralized architectures, distributed ledgers, data integrity and blockchain-based applications.",
        proficiency: "Intermediate",
      },
      {
        name: "IPFS",
        description:
          "Decentralized file storage, content-addressed data and distributed storage architectures.",
        proficiency: "Beginner",
      },
      {
        name: "Decentralized Storage Systems",
        description:
          "Exploring distributed storage models, data availability, fault tolerance and storage efficiency.",
        proficiency: "Intermediate",
      },
    ],
  },
  {
    id: "computer-vision",
    title: "Computer Vision & Intelligent Systems",
    icon: "eye",
    blurb: "Exploring visual intelligence, image processing and intelligent computational systems.",
    skills: [
      {
        name: "OpenCV",
        description:
          "Image processing, computer vision fundamentals and visual data analysis.",
        proficiency: "Beginner",
      },
      {
        name: "BERT & Transformer Architectures",
        description:
          "Contextual language representations, transformer-based models and advanced NLP concepts.",
        proficiency: "Beginner",
      },
      {
        name: "Generative Adversarial Networks",
        description:
          "Exploring generative modeling, adversarial training and GAN architectures.",
        proficiency: "Beginner",
      },
    ],
  },
  {
    id: "devtools",
    title: "Developer Tools",
    icon: "wrench",
    blurb: "Using modern engineering tools and development practices to build maintainable applications.",
    skills: [
      {
        name: "Git & GitHub",
        description:
          "Version control, repository management, collaborative development and source code maintenance.",
        proficiency: "Advanced",
      },
      {
        name: "Docker",
        description:
          "Containerization fundamentals, application environments and deployment workflows.",
        proficiency: "Intermediate",
      },
      {
        name: "Linux & Shell",
        description:
          "Command-line operations, development environments, system fundamentals and shell utilities.",
        proficiency: "Intermediate",
      },
      {
        name: "Google Apps Script",
        description:
          "Workflow automation, Google Workspace integration and application data management.",
        proficiency: "Intermediate",
      },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Deployment",
    icon: "cloud",
    blurb: "Deploying modern applications and managing development and hosting environments.",
    skills: [
      {
        name: "Vercel",
        description:
          "Frontend deployment, production builds, environment configuration and modern web hosting.",
        proficiency: "Intermediate",
      },
      {
        name: "Supabase",
        description:
          "Backend-as-a-service, PostgreSQL integration, authentication and application data management.",
        proficiency: "Intermediate",
      },
      {
        name: "Cloud Deployment",
        description:
          "Application hosting, deployment workflows, environment configuration and production delivery.",
        proficiency: "Intermediate",
      },
    ],
  },
  {
    id: "leadership",
    title: "Technical Leadership & Collaboration",
    icon: "users",
    blurb: "Promoting collaborative development, competitive programming and technical knowledge sharing.",
    skills: [
      {
        name: "Competitive Programming",
        description:
          "Algorithmic problem-solving, logical reasoning, coding challenges and data structures.",
        proficiency: "Intermediate",
      },
      {
        name: "Technical Community Leadership",
        description:
          "Leading coding initiatives, encouraging peer learning and coordinating technical activities as President of the HackerRank Coding Club.",
        proficiency: "Intermediate",
      },
      {
        name: "Technical Collaboration",
        description:
          "Collaborative software development, technical knowledge sharing and coordination of development activities.",
        proficiency: "Intermediate",
      },
    ],
  },
];
