
import type { Publication } from "./types";

/**
 * PUBLICATIONS — Newton Adhikari
 *
 * Four verified-profile research records:
 * 1. Published research paper
 * 2. Supply chain management patent
 * 3. Decision-calibrated learning preprint
 * 4. Blockchain-assisted federated learning research
 *
 * Replace metadata marked TODO with official records.
 */

export const publications: Publication[] = [
  // --------------------------------------------------
  // 1. PUBLISHED RESEARCH PAPER
  // --------------------------------------------------
  {
    slug: "blockchain-decentralized-cloud-storage",
    title:
      "Performance and Security Analysis of Blockchain-Based Decentralized Cloud Storage Systems",
    authors: ["Newton Adhikari"],
    year: 2026, // TODO: Confirm actual publication year
    category: "International Journal Publications",
    venue: "Published Journal — TODO: Add official journal name",
    doi: "TODO: Add DOI if assigned",
    status: "Published",
    abstract:
      "This research investigates the performance and security characteristics of blockchain-based decentralized cloud storage systems. It focuses on the application of blockchain technology in decentralized storage environments, examining security, data integrity, and system performance.",
    domain: "Blockchain and Distributed Systems",
    keywords: [
      "Blockchain",
      "Decentralized Cloud Storage",
      "Data Security",
      "Performance Analysis",
      "Distributed Systems"
    ],
    citation:
      "Adhikari, N. Performance and Security Analysis of Blockchain-Based Decentralized Cloud Storage Systems. TODO: Add official publication details.",
    featured: true,
    sections: [
      {
        id: "abstract",
        heading: "Abstract",
        paragraphs: [
          "The research explores blockchain-based decentralized cloud storage systems and examines their performance and security characteristics.",
          "The study focuses on the potential of distributed ledger technology for improving trust, data integrity, and security in decentralized storage environments."
        ]
      },
      {
        id: "highlights",
        heading: "Research Contributions",
        bullets: [
          "Investigation of blockchain-based decentralized storage architecture.",
          "Analysis of security characteristics in decentralized cloud storage.",
          "Study of performance considerations in distributed storage systems.",
          "Exploration of blockchain applications in secure data management."
        ]
      },
      {
        id: "status",
        heading: "Publication Status",
        paragraphs: [
          "Published research paper. Add the official journal name, publication year, DOI, and article link to complete the citation."
        ]
      },
      {
        id: "citation",
        heading: "Citation",
        paragraphs: [
          "Adhikari, N. Performance and Security Analysis of Blockchain-Based Decentralized Cloud Storage Systems. Official citation details to be added."
        ]
      }
    ]
  },

  // --------------------------------------------------
  // 2. SUPPLY CHAIN MANAGEMENT PATENT
  // --------------------------------------------------
  {
    slug: "hybrid-rl-supply-chain-patent",
    title:
      "Hybrid Reinforcement Learning Framework for End-to-End Supply Chain Management",
    authors: ["Newton Adhikari"],
    year: 2026, // TODO: Confirm actual filing/publication year
    category: "Patents",
    venue: "Patent — TODO: Add official patent authority and application details",
    doi: "Not applicable",
    status: "In Progress",
    abstract:
      "This intellectual property work focuses on a hybrid multi-agent reinforcement learning framework for end-to-end supply chain management. The framework considers intelligent coordination among supplier, manufacturing, warehouse, logistics, distribution, and retail agents to support coordinated supply chain decision-making.",
    domain: "Artificial Intelligence and Supply Chain Management",
    keywords: [
      "Multi-Agent Reinforcement Learning",
      "Supply Chain Management",
      "PPO",
      "Graph Neural Networks",
      "Transformers",
      "Intelligent Decision Making"
    ],
    citation:
      "Adhikari, N. Hybrid Reinforcement Learning Framework for End-to-End Supply Chain Management. Patent. TODO: Add official patent details.",
    featured: true,
    sections: [
      {
        id: "abstract",
        heading: "Invention Overview",
        paragraphs: [
          "The proposed framework explores the integration of multi-agent reinforcement learning into end-to-end supply chain operations.",
          "It considers multiple intelligent agents responsible for different supply chain stages and investigates coordinated decision-making using hybrid learning techniques."
        ]
      },
      {
        id: "highlights",
        heading: "Technical Contributions",
        bullets: [
          "Six-agent supply chain architecture.",
          "Supplier, manufacturing, warehouse, logistics, distribution, and retail agents.",
          "Centralized Training with Decentralized Execution (CTDE).",
          "Proximal Policy Optimization (PPO) for reinforcement learning.",
          "Exploration of GNN and Transformer-based learning architectures.",
          "Multi-objective reward design for supply chain coordination."
        ]
      },
      {
        id: "status",
        heading: "Patent Status",
        paragraphs: [
          "Patent work is listed in the existing portfolio. Add the official application number, filing date, inventors, jurisdiction, and legal status."
        ]
      },
      {
        id: "citation",
        heading: "Patent Reference",
        paragraphs: [
          "Newton Adhikari. Hybrid Reinforcement Learning Framework for End-to-End Supply Chain Management. Official patent reference to be added."
        ]
      }
    ]
  },

  // --------------------------------------------------
  // 3. DECISION CALIBRATION PREPRINT
  // --------------------------------------------------
  {
    slug: "decision-calibrated-probabilistic-learning",
    title:
      "Decision-Calibrated Probabilistic Learning for Cost-Sensitive and Risk-Aware Decision Making",
    authors: [
      "Shashi Tiwari",
      "Sheikh Burhan Ul Haque",
      "Newton Adhikari",
      "Gaurav Panday"
    ],
    year: 2026,
    category: "Preprints",
    venue: "Preprint",
    doi: "Not assigned",
    status: "Preprint",
    abstract:
      "This research introduces a Decision-Calibrated Probabilistic Learning framework that connects probabilistic prediction quality with downstream decision-making costs and risks. The proposed approach introduces Decision Calibration Error (DCE) and explores decision-aware training objectives to improve decision quality, particularly in cost-sensitive classification settings where false negatives can produce substantial losses.",
    domain: "Machine Learning and Decision Intelligence",
    keywords: [
      "Decision Calibration",
      "Probabilistic Learning",
      "Cost-Sensitive Learning",
      "Decision Risk",
      "Probability Calibration",
      "Decision Calibration Error",
      "Machine Learning"
    ],
    citation:
      "Tiwari, S., Haque, S. B. U., Adhikari, N., and Panday, G. Decision-Calibrated Probabilistic Learning for Cost-Sensitive and Risk-Aware Decision Making. Preprint, 2026.",
    featured: true,
    sections: [
      {
        id: "abstract",
        heading: "Abstract",
        paragraphs: [
          "Traditional probabilistic learning approaches mainly focus on prediction accuracy and probability calibration. However, well-calibrated predictions do not necessarily produce optimal decisions when different prediction errors have different costs.",
          "This research introduces Decision-Calibrated Probabilistic Learning to align probability estimates with downstream decision costs and risks.",
          "The framework introduces Decision Calibration Error (DCE) to evaluate the difference between predicted and realized decision risk and explores decision-aware training objectives."
        ]
      },
      {
        id: "highlights",
        heading: "Key Research Contributions",
        bullets: [
          "Decision-Calibrated Probabilistic Learning framework.",
          "Decision Calibration Error (DCE) evaluation metric.",
          "Decision-aware training objective for cost-sensitive learning.",
          "Risk-aware probabilistic decision-making.",
          "Evaluation of false-negative-driven decision costs.",
          "Experimental investigation using synthetic and real-world datasets."
        ]
      },
      {
        id: "status",
        heading: "Research Status",
        paragraphs: [
          "Available as a preprint. The preprint URL and identifier should be added when publicly available."
        ]
      },
      {
        id: "citation",
        heading: "Citation",
        paragraphs: [
          "Tiwari, S., Haque, S. B. U., Adhikari, N., and Panday, G. Decision-Calibrated Probabilistic Learning for Cost-Sensitive and Risk-Aware Decision Making. Preprint, 2026."
        ]
      }
    ]
  },

  // --------------------------------------------------
  // 4. BLOCKCHAIN-ASSISTED FEDERATED LEARNING
  // --------------------------------------------------
  {
    slug: "blockchain-assisted-privacy-federated-learning",
    title:
      "Blockchain-Assisted Privacy and Security Enhancement in Federated Learning",
    authors: ["Newton Adhikari"],
    year: 2026,
    category: "Research Papers",
    venue: "Research Manuscript — TODO: Add target or submitted journal",
    doi: "Not assigned",
    status: "In Progress",
    abstract:
      "This research investigates the integration of blockchain technology with federated learning to enhance privacy, security, transparency, and trust in distributed machine learning environments. The proposed research direction explores the use of distributed ledger mechanisms to support secure coordination, verifiable model updates, and privacy-aware collaborative learning without requiring centralized access to raw participant data.",
    domain: "Federated Learning and Blockchain Security",
    keywords: [
      "Federated Learning",
      "Blockchain",
      "Privacy Preservation",
      "Distributed Systems",
      "Secure Aggregation",
      "Machine Learning Security",
      "Data Privacy"
    ],
    citation:
      "Adhikari, N. Blockchain-Assisted Privacy and Security Enhancement in Federated Learning. Research manuscript, 2026.",
    featured: true,
    sections: [
      {
        id: "abstract",
        heading: "Abstract",
        paragraphs: [
          "Federated learning enables multiple participants to collaboratively train machine learning models without directly sharing their raw data. However, distributed learning environments introduce security, privacy, trust, and coordination challenges.",
          "This research investigates blockchain-assisted mechanisms for strengthening the security and transparency of federated learning systems.",
          "The study explores how distributed ledger technology can support verifiable participation, trustworthy model-update management, and secure collaborative learning."
        ]
      },
      {
        id: "highlights",
        heading: "Research Contributions",
        bullets: [
          "Integration of blockchain technology with federated learning.",
          "Privacy-aware collaborative machine learning.",
          "Distributed trust and transparency mechanisms.",
          "Security considerations for federated model updates.",
          "Investigation of decentralized coordination and verification.",
          "Analysis of privacy and security challenges in distributed learning."
        ]
      },
      {
        id: "status",
        heading: "Research Status",
        paragraphs: [
          "Research manuscript. Update this status to Submitted, Under Review, Accepted, or Published when the corresponding milestone is officially reached."
        ]
      },
      {
        id: "citation",
        heading: "Citation",
        paragraphs: [
          "Adhikari, N. Blockchain-Assisted Privacy and Security Enhancement in Federated Learning. Research manuscript, 2026."
        ]
      }
    ]
  },

  // --------------------------------------------------
  // 5. NEURO-CAUSAL REFLECTIVE INTELLIGENCE FOR LLMs
  // --------------------------------------------------
  {
    slug: "neuro-causal-reflective-intelligence-llm",
    title:
      "Neuro-Causal Reflective Intelligence for Trustworthy Hallucination-Resistant Large Language Models",
    authors: ["Newton Adhikari"],
    year: 2026,
    category: "Work in Progress",
    venue: "Independent Research — Ongoing",
    doi: "Not assigned",
    status: "In Progress",
    abstract:
      "This research explores a neuro-causal reflective intelligence framework for improving the reliability and factual consistency of large language models. The proposed research direction investigates the integration of causal reasoning, reflective evaluation, and hallucination detection to identify unsupported or inconsistent model-generated responses. The goal is to develop a more trustworthy language model architecture capable of evaluating its own reasoning and improving response reliability.",
    domain: "Trustworthy Artificial Intelligence and Large Language Models",
    keywords: [
      "Large Language Models",
      "AI Hallucination",
      "Causal Reasoning",
      "Reflective Intelligence",
      "Trustworthy AI",
      "Neuro-Causal Learning",
      "LLM Reliability",
      "Hallucination Detection"
    ],
    citation:
      "Adhikari, N. Neuro-Causal Reflective Intelligence for Trustworthy Hallucination-Resistant Large Language Models. Research in progress, 2026.",
    featured: true,
    sections: [
      {
        id: "abstract",
        heading: "Research Overview",
        paragraphs: [
          "Large Language Models can generate convincing but factually incorrect or unsupported information. Existing approaches do not always provide reliable mechanisms for identifying and correcting these hallucinations.",
          "This research explores a neuro-causal reflective intelligence framework that combines causal reasoning and reflective evaluation to improve the factual reliability and trustworthiness of LLM-generated responses.",
          "The long-term objective is to develop an intelligent framework that can examine its reasoning, identify potential hallucinations, and improve the reliability of generated information."
        ]
      },
      {
        id: "highlights",
        heading: "Proposed Research Directions",
        bullets: [
          "Causal reasoning for evaluating model-generated claims.",
          "Reflective intelligence for identifying reasoning inconsistencies.",
          "Hallucination detection and factual consistency evaluation.",
          "Integration of causal and reflective reasoning mechanisms.",
          "Trustworthiness and reliability evaluation of LLMs.",
          "Development of a hallucination-resistant language model framework."
        ]
      },
      {
        id: "status",
        heading: "Research Status",
        paragraphs: [
          "Currently under development as an independent research project. The architecture, methodology, experimental validation, and publication plans will be updated as the research progresses."
        ]
      },
      {
        id: "citation",
        heading: "Research Reference",
        paragraphs: [
          "Adhikari, N. Neuro-Causal Reflective Intelligence for Trustworthy Hallucination-Resistant Large Language Models. Research in progress, 2026."
        ]
      }
    ]
  },
];

export function getPublicationBySlug(slug: string) {
  return publications.find((p) => p.slug === slug);
}

export const pubCategories: Publication["category"][] = [
  "International Journal Publications",
  "Conference Publications",
  "Research Papers",
  "Patents",
  "Preprints",
  "Under Review",
  "Work in Progress"
];

export const pubYears = Array.from(
  new Set(publications.map((p) => p.year))
).sort((a, b) => b - a);
