import type { ResearchItem } from "./types";

/**
 * RESEARCH PROJECTS — Newton Adhikari
 *
 * This file replaces the sample/placeholder research entries with four
 * research projects based on the user's stated academic work:
 *
 * 1. Decision-Calibrated Probabilistic Learning
 * 2. Hybrid Multi-Agent Reinforcement Learning for Supply Chain Management
 * 3. Blockchain-Assisted Privacy and Security Enhancement in Federated Learning
 * 4. Neuro-Causal Reflective Intelligence for Trustworthy Hallucination-Resistant LLMs
 *
 * IMPORTANT:
 * - Do not publish unverified metrics, results, affiliations, or author lists.
 * - Confirm author order, years, venues, and project status before deployment.
 * - The supply-chain work is also associated with a patent; it is not represented
 *   here as a journal publication.
 */

export const researchItems: ResearchItem[] = [
  // ---------------------------------------------------------------------------
  // 1. DECISION-CALIBRATED PROBABILISTIC LEARNING
  // ---------------------------------------------------------------------------
  {
    slug: "decision-calibrated-probabilistic-learning",
    title:
      "Decision-Calibrated Probabilistic Learning for Cost-Sensitive and Risk-Aware Decision Making",
    category: "Decision Intelligence and Machine Learning",
    domain: "Probabilistic Machine Learning",
    status: "Preprint",
    authors: [
      "Shashi Tiwari",
      "Sheikh Burhan Ul Haque",
      "Newton Adhikari",
      "Gaurav Panday"
    ],
    venue: "Preprint",
    year: 2026,
    abstract:
      "This research introduces a Decision-Calibrated Probabilistic Learning framework that aligns probabilistic predictions with downstream decision-making costs and risks. It investigates how probability estimates influence actual decision outcomes in cost-sensitive settings. The work introduces Decision Calibration Error (DCE) and explores decision-aware training objectives, particularly for settings in which false-negative errors can carry higher costs.",
    tags: [
      "Decision Calibration",
      "Probabilistic Learning",
      "Cost-Sensitive Learning",
      "Decision Risk",
      "Probability Calibration",
      "Machine Learning",
      "DA-DCPL"
    ],
    cover: { from: "#21108F", to: "#3156C8", icon: "brain" },
    links: {},
    sections: [
      {
        id: "overview",
        heading: "Research Overview",
        paragraphs: [
          "Machine learning models are commonly evaluated using predictive accuracy and probability calibration. However, reliable probability estimates do not automatically guarantee good decisions when different prediction errors have different consequences.",
          "This research studies the relationship between probabilistic prediction quality and downstream decision-making costs. It investigates a decision-calibrated learning approach that considers the risk associated with model predictions.",
          "A related extension, Distribution-Aware Decision-Calibrated Probabilistic Learning (DA-DCPL), investigates adaptive decision calibration under distribution shift."
        ]
      },
      {
        id: "abstract",
        heading: "Abstract",
        paragraphs: [
          "The research investigates a decision-calibrated probabilistic learning framework for cost-sensitive and risk-aware decision-making. It introduces Decision Calibration Error (DCE) to examine the difference between predicted and realized decision risk.",
          "The work also explores decision-aware training objectives that incorporate downstream decision costs into the learning process."
        ]
      },
      {
        id: "introduction",
        heading: "Introduction",
        paragraphs: [
          "Probability calibration is an important component of reliable machine learning. Nevertheless, conventional calibration methods do not necessarily consider the financial or operational consequences of decisions made using predicted probabilities.",
          "In applications such as medical screening and financial risk assessment, false-negative predictions may be more costly than false-positive predictions. This motivates learning approaches that explicitly consider decision costs."
        ]
      },
      {
        id: "problem",
        heading: "Problem Statement",
        paragraphs: [
          "Conventional probabilistic learning methods primarily optimize predictive performance without directly aligning probability estimates with downstream decision risk. This can lead to poor decisions in cost-sensitive environments.",
          "The central research problem is how to train and evaluate probabilistic models so that their predictions better reflect the actual costs and risks of the decisions they support."
        ]
      },
      {
        id: "motivation",
        heading: "Research Motivation",
        bullets: [
          "Traditional probability calibration does not directly optimize downstream decision quality.",
          "Different classification errors can have significantly different costs.",
          "False-negative errors can create substantial operational or financial losses.",
          "Reliable decision-making requires consideration of both probability quality and decision consequences.",
          "Distribution shifts can reduce the reliability of previously calibrated models."
        ]
      },
      {
        id: "objectives",
        heading: "Research Objectives",
        bullets: [
          "Develop a decision-calibrated probabilistic learning framework.",
          "Introduce Decision Calibration Error (DCE) for evaluating decision risk.",
          "Investigate decision-aware training objectives.",
          "Study costly prediction errors in cost-sensitive classification.",
          "Evaluate models using predictive and decision-oriented metrics.",
          "Extend decision calibration toward distribution-aware learning."
        ]
      },
      {
        id: "literature",
        heading: "Literature Review",
        paragraphs: [
          "The research builds on probability calibration, proper scoring rules, cost-sensitive classification, decision theory, empirical risk minimization, and uncertainty-aware machine learning.",
          "The extended DA-DCPL direction also considers distribution shift detection, adaptive calibration, and robust decision-making under changing data distributions."
        ]
      },
      {
        id: "methodology",
        heading: "Proposed Methodology",
        paragraphs: [
          "The methodology begins with dataset preparation, probabilistic model training, and probability estimation. Predicted probabilities are then evaluated using decision-sensitive cost structures.",
          "A decision-aware learning objective is investigated to connect model optimization with downstream decision costs. Decision Calibration Error is used to study the relationship between predicted and realized decision risk."
        ],
        bullets: [
          "Phase 1 — Dataset preparation and probabilistic model development.",
          "Phase 2 — Probability estimation and baseline calibration.",
          "Phase 3 — Decision-cost modeling and decision-aware optimization.",
          "Phase 4 — Decision Calibration Error evaluation.",
          "Phase 5 — Comparative experimental evaluation.",
          "Phase 6 — Extension toward distribution-aware decision calibration."
        ]
      },
      {
        id: "architecture",
        heading: "System Architecture",
        paragraphs: [
          "The proposed architecture consists of a data-processing layer, probabilistic learning module, probability calibration component, decision-cost evaluation layer, and performance reporting module.",
          "The extended DA-DCPL direction additionally investigates distribution-shift detection and adaptive calibration mechanisms."
        ],
        bullets: [
          "Data and preprocessing layer.",
          "Probabilistic learning core.",
          "Probability calibration module.",
          "Decision-aware optimization layer.",
          "Decision-risk and DCE evaluation.",
          "Distribution monitoring and adaptive calibration."
        ]
      },
      {
        id: "dataset",
        heading: "Dataset Description",
        paragraphs: [
          "The research uses a synthetic Gaussian Mixture Decision Dataset and real-world datasets, including the Adult Income Dataset, to investigate cost-sensitive classification and decision risk.",
          "Cost-sensitive evaluation considers different penalties for false-positive and false-negative predictions."
        ]
      },
      {
        id: "setup",
        heading: "Experimental Setup",
        bullets: [
          "Python-based experimental implementation.",
          "PyTorch for probabilistic model development.",
          "Scikit-learn for machine learning evaluation.",
          "Synthetic and real-world dataset evaluation.",
          "Probability calibration and decision-risk analysis.",
          "Comparative evaluation using predictive and decision-oriented metrics."
        ]
      },
      {
        id: "results",
        heading: "Results and Analysis",
        paragraphs: [
          "The research investigates prediction quality, false-negative behavior, decision risk, and cost-sensitive performance.",
          "Quantitative results and verified experimental comparisons should be added from the final research manuscript. No unverified numerical improvements are claimed here."
        ]
      },
      {
        id: "contributions",
        heading: "Research Contributions",
        bullets: [
          "Decision-Calibrated Probabilistic Learning framework.",
          "Decision Calibration Error (DCE) evaluation concept.",
          "Decision-aware training objective.",
          "Cost-sensitive and risk-aware learning approach.",
          "Distribution-Aware Decision Calibration (DADC) as an extension.",
          "Distribution-Aware Decision Calibration Error (DADCE) as an extension.",
          "Distribution-Aware Decision Loss (DADL) as an extension."
        ]
      },
      {
        id: "future",
        heading: "Future Scope",
        bullets: [
          "Adaptive calibration under distribution shift.",
          "Extension to deep neural probabilistic models.",
          "Application to medical diagnosis and financial risk assessment.",
          "Decision-aware learning for dynamic environments.",
          "Improved risk-sensitive model evaluation."
        ]
      },
      {
        id: "references",
        heading: "References",
        bullets: [
          "Brier, G. W. (1950). Verification of forecasts expressed in terms of probability.",
          "Murphy, A. H. (1973). A new vector partition of the probability score.",
          "Additional references are documented in the associated research manuscript."
        ]
      },
      {
        id: "publications",
        heading: "Associated Publications",
        bullets: [
          "Decision-Calibrated Probabilistic Learning for Cost-Sensitive and Risk-Aware Decision Making — Preprint. See the Publications page."
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 2. HYBRID MULTI-AGENT REINFORCEMENT LEARNING FOR SUPPLY CHAIN MANAGEMENT
  // ---------------------------------------------------------------------------
  {
    slug: "hybrid-marl-supply-chain-management",
    title:
      "Hybrid Multi-Agent Reinforcement Learning for End-to-End Supply Chain Management",
    category: "Multi-Agent Reinforcement Learning",
    domain: "Artificial Intelligence and Supply Chain Optimization",
    status: "Ongoing",
    authors: ["Newton Adhikari"],
    venue: "Academic Research and Patent-Associated Project",
    year: 2026,
    abstract:
      "This research investigates a hybrid multi-agent reinforcement learning framework for end-to-end supply chain management. The proposed architecture considers six autonomous agents representing suppliers, manufacturing, warehouses, logistics, distribution, and retail. It explores centralized training with decentralized execution, Proximal Policy Optimization, and hybrid learning architectures involving Graph Neural Networks and Transformers to support coordinated supply chain decision-making.",
    tags: [
      "Multi-Agent Reinforcement Learning",
      "Supply Chain Management",
      "PPO",
      "Graph Neural Networks",
      "Transformers",
      "CTDE",
      "Inventory Optimization"
    ],
    cover: { from: "#101014", to: "#3156C8", icon: "network" },
    links: {},
    sections: [
      {
        id: "overview",
        heading: "Research Overview",
        paragraphs: [
          "Modern supply chains involve multiple operational stages that must coordinate their decisions. Independent optimization of individual stages can create inventory imbalances and operational inefficiencies.",
          "This research explores a hybrid multi-agent reinforcement learning architecture in which multiple intelligent agents cooperate to manage different supply chain operations.",
          "The framework focuses on end-to-end coordination, multi-objective reward design, and intelligent decision-making."
        ]
      },
      {
        id: "abstract",
        heading: "Abstract",
        paragraphs: [
          "The research investigates a hybrid multi-agent reinforcement learning framework for supply chain management using six operational agents.",
          "The proposed direction combines centralized training with decentralized execution and explores PPO-based learning with GNN and Transformer architectures for coordinated supply chain operations."
        ]
      },
      {
        id: "introduction",
        heading: "Introduction",
        paragraphs: [
          "Supply chain management requires coordination between suppliers, manufacturers, warehouses, logistics providers, distributors, and retailers.",
          "Traditional approaches may optimize these stages independently. Multi-agent reinforcement learning provides a way to model autonomous decision-makers that interact within a shared environment."
        ]
      },
      {
        id: "problem",
        heading: "Problem Statement",
        paragraphs: [
          "Independent decision-making across supply chain stages can create operational conflicts and inefficient inventory distribution.",
          "This research investigates how multiple intelligent agents can coordinate their decisions to support overall supply chain performance."
        ]
      },
      {
        id: "motivation",
        heading: "Research Motivation",
        bullets: [
          "Complex supply chains contain multiple interconnected decision-making stages.",
          "Independent optimization may ignore global supply chain objectives.",
          "Inventory and logistics decisions influence downstream operations.",
          "Multi-agent learning can support decentralized operational decisions.",
          "Hybrid learning architectures can represent complex relationships between supply chain entities."
        ]
      },
      {
        id: "objectives",
        heading: "Research Objectives",
        bullets: [
          "Design a six-agent supply chain architecture.",
          "Develop a multi-agent reinforcement learning environment.",
          "Investigate centralized training with decentralized execution.",
          "Implement PPO-based reinforcement learning.",
          "Explore GNN and Transformer-based architectures.",
          "Design hybrid local and global reward functions.",
          "Evaluate inventory and operational coordination."
        ]
      },
      {
        id: "literature",
        heading: "Literature Review",
        paragraphs: [
          "The research builds on multi-agent reinforcement learning, cooperative decision-making, centralized training with decentralized execution, policy optimization, graph neural networks, and attention-based sequence modeling.",
          "It also considers supply chain optimization and inventory management research."
        ]
      },
      {
        id: "methodology",
        heading: "Proposed Methodology",
        paragraphs: [
          "The framework models the supply chain as an interconnected multi-agent environment. Each agent observes its operational state, selects an action, and receives feedback through a reward mechanism.",
          "PPO is used as the reinforcement learning approach, while centralized training is investigated to support coordination between agents."
        ],
        bullets: [
          "Phase 1 — Supply chain data preparation and environment design.",
          "Phase 2 — Development of six autonomous supply chain agents.",
          "Phase 3 — State and action representation.",
          "Phase 4 — Multi-objective reward-function design.",
          "Phase 5 — PPO-based multi-agent training.",
          "Phase 6 — Performance evaluation and comparative analysis."
        ]
      },
      {
        id: "architecture",
        heading: "System Architecture",
        bullets: [
          "Supplier Agent — Supplier-side inventory and procurement decisions.",
          "Manufacturing Agent — Production-related decisions.",
          "Warehouse Agent — Storage and inventory management.",
          "Logistics Agent — Transportation and movement coordination.",
          "Distribution Agent — Distribution and allocation decisions.",
          "Retail Agent — Retail demand and inventory decisions.",
          "Centralized training and decentralized execution layer."
        ]
      },
      {
        id: "dataset",
        heading: "Dataset Description",
        paragraphs: [
          "The Walmart M5 forecasting dataset is used as a data source for the supply chain project.",
          "The dataset provides historical sales information that can support demand-related modeling and inventory-decision experiments."
        ]
      },
      {
        id: "setup",
        heading: "Experimental Setup",
        bullets: [
          "Python-based implementation.",
          "Stable-Baselines3 and PPO.",
          "PyTorch for deep learning components.",
          "NumPy and Pandas for data processing.",
          "Simulated multi-agent supply chain environment.",
          "Inventory- and reward-based evaluation."
        ]
      },
      {
        id: "results",
        heading: "Results and Analysis",
        paragraphs: [
          "The implementation investigates agent interaction, inventory behavior, and reward-based learning within a simulated supply chain environment.",
          "Comparative performance results, including inventory costs, service levels, and bullwhip-effect measurements, should be added after validated experiments."
        ]
      },
      {
        id: "contributions",
        heading: "Research Contributions",
        bullets: [
          "Six-agent end-to-end supply chain architecture.",
          "Hybrid multi-agent reinforcement learning approach.",
          "Centralized training and decentralized execution.",
          "Multi-objective reward design.",
          "Exploration of GNN and Transformer integration.",
          "PPO-based learning framework."
        ]
      },
      {
        id: "future",
        heading: "Future Scope",
        bullets: [
          "Comparison with MAPPO and QMIX.",
          "Bullwhip-effect evaluation.",
          "Dynamic demand and supply uncertainty.",
          "Scalable multi-agent coordination.",
          "Real-world supply chain deployment."
        ]
      },
      {
        id: "references",
        heading: "References",
        bullets: [
          "Schulman, J. et al. Proximal Policy Optimization Algorithms.",
          "Lowe, R. et al. Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments.",
          "Additional multi-agent reinforcement learning and supply chain references should be added from the project bibliography."
        ]
      },
      {
        id: "publications",
        heading: "Associated Publications and Intellectual Property",
        bullets: [
          "Hybrid Multi-Agent Reinforcement Learning for End-to-End Supply Chain Management — associated patent project. See the Publications page for the patent record."
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 3. BLOCKCHAIN-ASSISTED PRIVACY AND SECURITY IN FEDERATED LEARNING
  // ---------------------------------------------------------------------------
  {
    slug: "blockchain-assisted-federated-learning",
    title:
      "Blockchain-Assisted Privacy and Security Enhancement in Federated Learning",
    category: "Privacy-Preserving Machine Learning",
    domain: "Federated Learning and Blockchain Security",
    status: "Ongoing",
    authors: ["Newton Adhikari"],
    venue: "Independent Research",
    year: 2026,
    abstract:
      "This research investigates the integration of blockchain technology with federated learning to improve privacy, security, transparency, and trust in distributed machine learning environments. It explores decentralized coordination, verification of model updates, and privacy-preserving collaborative learning without requiring participants to directly share their raw data.",
    tags: [
      "Federated Learning",
      "Blockchain",
      "Privacy Preservation",
      "Distributed Systems",
      "Secure Aggregation",
      "Cybersecurity",
      "Machine Learning"
    ],
    cover: { from: "#3156C8", to: "#21108F", icon: "shield-check" },
    links: {},
    sections: [
      {
        id: "overview",
        heading: "Research Overview",
        paragraphs: [
          "Federated learning allows multiple participants to collaboratively train machine learning models while keeping their raw data locally stored.",
          "However, distributed learning introduces challenges involving participant trust, malicious model updates, privacy risks, and secure coordination.",
          "This research explores blockchain-assisted mechanisms to strengthen privacy, security, transparency, and accountability in federated learning systems."
        ]
      },
      {
        id: "abstract",
        heading: "Abstract",
        paragraphs: [
          "The research investigates blockchain integration into federated learning to support decentralized trust and security.",
          "The proposed research direction considers distributed verification mechanisms and secure coordination of model updates while maintaining the decentralized nature of federated learning."
        ]
      },
      {
        id: "introduction",
        heading: "Introduction",
        paragraphs: [
          "Centralized machine learning requires data to be collected and processed in a common location, creating privacy and governance challenges.",
          "Federated learning addresses part of this problem by allowing participants to train models locally and share model updates instead of raw data.",
          "Blockchain technology provides distributed-ledger capabilities that can be investigated for improving trust and transparency in collaborative learning."
        ]
      },
      {
        id: "problem",
        heading: "Problem Statement",
        paragraphs: [
          "Federated learning environments may involve untrusted participants, manipulated model updates, communication risks, and coordination challenges.",
          "This research investigates how blockchain-based mechanisms can strengthen the security and trustworthiness of collaborative learning without compromising data decentralization."
        ]
      },
      {
        id: "motivation",
        heading: "Research Motivation",
        bullets: [
          "Protection of sensitive participant data.",
          "Trust challenges in decentralized collaborative learning.",
          "Potential manipulation of model updates.",
          "Need for transparent participation and coordination.",
          "Security and accountability in distributed learning environments."
        ]
      },
      {
        id: "objectives",
        heading: "Research Objectives",
        bullets: [
          "Investigate blockchain integration with federated learning.",
          "Explore privacy-preserving collaborative learning.",
          "Study secure model-update verification.",
          "Investigate decentralized trust mechanisms.",
          "Evaluate security and privacy considerations.",
          "Study trade-offs between security, communication overhead, and learning performance."
        ]
      },
      {
        id: "literature",
        heading: "Literature Review",
        paragraphs: [
          "The research builds on federated optimization, distributed-ledger technology, privacy-preserving machine learning, secure aggregation, cryptographic verification, and distributed-systems security.",
          "The literature review examines the advantages and limitations of blockchain-assisted federated learning architectures."
        ]
      },
      {
        id: "methodology",
        heading: "Proposed Methodology",
        paragraphs: [
          "The research direction considers multiple federated-learning participants that train local models and communicate model updates through a collaborative learning process.",
          "Blockchain mechanisms are investigated for recording and verifying relevant coordination events and model-update information."
        ],
        bullets: [
          "Phase 1 — Review federated-learning architecture and security threats.",
          "Phase 2 — Design the blockchain-assisted federated-learning framework.",
          "Phase 3 — Define participant and model-update workflows.",
          "Phase 4 — Investigate verification and security mechanisms.",
          "Phase 5 — Evaluate privacy, security, and communication considerations.",
          "Phase 6 — Conduct comparative experimental evaluation."
        ]
      },
      {
        id: "architecture",
        heading: "System Architecture",
        bullets: [
          "Federated client participants.",
          "Local model training.",
          "Model-update communication layer.",
          "Federated aggregation mechanism.",
          "Blockchain-based verification and coordination.",
          "Security and performance evaluation layer."
        ]
      },
      {
        id: "dataset",
        heading: "Dataset Description",
        paragraphs: [
          "The final dataset selection and experimental configuration should be documented from the actual implementation. Federated-client partitioning and data distribution will be described when the experiments are finalized."
        ]
      },
      {
        id: "setup",
        heading: "Experimental Setup",
        bullets: [
          "Python-based federated-learning implementation.",
          "Machine learning model training and evaluation.",
          "Blockchain integration and transaction verification.",
          "Federated-client simulation.",
          "Privacy and security analysis.",
          "Communication and computational-overhead evaluation."
        ]
      },
      {
        id: "results",
        heading: "Results and Analysis",
        paragraphs: [
          "Experimental evaluation should be added from the completed research implementation. No performance improvements or security guarantees are claimed before validation."
        ]
      },
      {
        id: "contributions",
        heading: "Research Contributions",
        bullets: [
          "Blockchain-assisted federated-learning research framework.",
          "Investigation of decentralized trust and verification.",
          "Privacy-aware collaborative-learning architecture.",
          "Security analysis of distributed model-update workflows.",
          "Study of blockchain-integration trade-offs."
        ]
      },
      {
        id: "future",
        heading: "Future Scope",
        bullets: [
          "Integration of secure aggregation.",
          "Advanced privacy-preserving mechanisms.",
          "Byzantine-resilient federated learning.",
          "Scalable blockchain coordination.",
          "Evaluation under heterogeneous client environments."
        ]
      },
      {
        id: "references",
        heading: "References",
        bullets: [
          "McMahan, B. et al. Communication-Efficient Learning of Deep Networks from Decentralized Data.",
          "Additional blockchain and federated-learning security references should be added from the research manuscript."
        ]
      },
      {
        id: "publications",
        heading: "Associated Publications",
        bullets: [
          "Blockchain-Assisted Privacy and Security Enhancement in Federated Learning — research manuscript. See the Publications page for its current status."
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
    category: "Trustworthy Artificial Intelligence",
    domain: "Large Language Models and Causal Reasoning",
    status: "Ongoing",
    authors: ["Newton Adhikari"],
    venue: "Independent Research — Work in Progress",
    year: 2026,
    abstract:
      "This research investigates a Neuro-Causal Reflective Intelligence framework for improving the factual reliability and trustworthiness of Large Language Models. The proposed research direction explores the integration of causal reasoning, reflective intelligence, evidence evaluation, and hallucination detection. Its objective is to investigate mechanisms that enable language models to identify unsupported claims, examine reasoning inconsistencies, and improve the factual reliability of generated responses.",
    tags: [
      "Large Language Models",
      "Hallucination Detection",
      "Causal Inference",
      "Reflective Intelligence",
      "Trustworthy AI",
      "Neuro-Causal Reasoning",
      "Factual Consistency",
      "LLM Reliability"
    ],
    cover: { from: "#21108F", to: "#E52436", icon: "brain-circuit" },
    links: {},
    sections: [
      {
        id: "overview",
        heading: "Research Overview",
        paragraphs: [
          "Large Language Models have demonstrated strong capabilities in natural-language understanding and generation. However, they can generate fluent responses containing factually incorrect, unsupported, or inconsistent information.",
          "This research investigates a Neuro-Causal Reflective Intelligence framework that combines causal reasoning and reflective evaluation to improve the reliability of generated responses.",
          "The broader objective is to investigate mechanisms through which language models can examine their generated claims, evaluate supporting evidence, identify potential reasoning failures, and improve response trustworthiness."
        ]
      },
      {
        id: "abstract",
        heading: "Abstract",
        paragraphs: [
          "The research explores an integrated framework combining neuro-inspired intelligence, causal reasoning, and reflective evaluation for hallucination-resistant language models.",
          "The framework investigates how causal relationships, evidence-based assessment, and reflective mechanisms can help identify unsupported claims and reasoning inconsistencies in LLM-generated responses."
        ]
      },
      {
        id: "introduction",
        heading: "Introduction",
        paragraphs: [
          "The rapid development of Large Language Models has transformed natural-language processing and artificial-intelligence applications. Despite their capabilities, these models can produce hallucinations that undermine their reliability.",
          "Existing language-generation approaches do not guarantee factual correctness. This research explores causal reasoning and reflective intelligence as complementary mechanisms for improving factual reliability and trustworthy AI."
        ]
      },
      {
        id: "problem",
        heading: "Problem Statement",
        paragraphs: [
          "Current Large Language Models can produce convincing responses without sufficient factual evidence. They may also generate inconsistent reasoning or unsupported conclusions.",
          "The research investigates how causal reasoning and reflective evaluation can be integrated to identify, assess, and reduce hallucinations while improving the reliability of generated information."
        ]
      },
      {
        id: "motivation",
        heading: "Research Motivation",
        bullets: [
          "Hallucinations remain a significant limitation of modern Large Language Models.",
          "Fluent language generation does not guarantee factual correctness.",
          "Conventional evaluation approaches may fail to identify unsupported claims.",
          "Causal reasoning provides a foundation for examining relationships between evidence and conclusions.",
          "Reflective evaluation can support systematic examination of generated responses.",
          "Trustworthy AI requires stronger factual consistency and reliability."
        ]
      },
      {
        id: "objectives",
        heading: "Research Objectives",
        bullets: [
          "Investigate a Neuro-Causal Reflective Intelligence framework.",
          "Explore causal reasoning for factual-claim evaluation.",
          "Develop reflective mechanisms for examining generated responses.",
          "Investigate hallucination identification and reduction.",
          "Evaluate evidence consistency and factual reliability.",
          "Study the integration of causal and reflective reasoning.",
          "Develop a framework for more trustworthy Large Language Models."
        ]
      },
      {
        id: "literature",
        heading: "Literature Review",
        paragraphs: [
          "The research investigates literature on Large Language Model hallucinations, causal inference, factual-consistency evaluation, self-reflection, retrieval-augmented generation, and trustworthy artificial intelligence.",
          "Particular attention is given to the limitations of existing hallucination-detection and mitigation approaches and the potential role of causal reasoning and reflective evaluation."
        ]
      },
      {
        id: "methodology",
        heading: "Proposed Methodology",
        paragraphs: [
          "The proposed research direction investigates an integrated process in which a language model generates a response and subsequent reasoning mechanisms examine its factual claims and supporting evidence.",
          "Causal reasoning is explored to evaluate relationships between claims, evidence, and conclusions. Reflective evaluation is investigated to identify inconsistencies and unsupported information."
        ],
        bullets: [
          "Phase 1 — Literature review and hallucination-problem analysis.",
          "Phase 2 — Design of the neuro-causal reasoning framework.",
          "Phase 3 — Development of reflective-evaluation components.",
          "Phase 4 — Evidence and factual-consistency assessment.",
          "Phase 5 — Hallucination identification and mitigation.",
          "Phase 6 — Experimental evaluation against baseline LLM approaches."
        ]
      },
      {
        id: "architecture",
        heading: "Proposed System Architecture",
        bullets: [
          "Input and contextual-information processing.",
          "Large Language Model generation module.",
          "Causal reasoning and relationship analysis.",
          "Reflective intelligence and response evaluation.",
          "Evidence verification and factual-consistency analysis.",
          "Hallucination-identification mechanism.",
          "Trustworthiness and response-reliability assessment."
        ]
      },
      {
        id: "dataset",
        heading: "Dataset Description",
        paragraphs: [
          "Dataset selection and benchmark configuration will be finalized during experimental development. Evaluation is intended to focus on factual correctness, hallucinated claims, evidence consistency, and reasoning reliability."
        ]
      },
      {
        id: "setup",
        heading: "Experimental Setup",
        bullets: [
          "Python-based research implementation.",
          "Transformer-based language models.",
          "Causal-reasoning components.",
          "Reflective-evaluation mechanisms.",
          "Factual-consistency and hallucination evaluation.",
          "Comparison with appropriate baseline approaches."
        ]
      },
      {
        id: "results",
        heading: "Results and Analysis",
        paragraphs: [
          "The research is currently in progress. Quantitative results, comparative experiments, and performance improvements will be added after experimental validation."
        ]
      },
      {
        id: "contributions",
        heading: "Proposed Research Contributions",
        bullets: [
          "Neuro-Causal Reflective Intelligence research framework.",
          "Integration of causal reasoning and reflective evaluation.",
          "Investigation of hallucination-resistant LLM architecture.",
          "Structured evaluation of unsupported claims and reasoning inconsistencies.",
          "Research direction for improving factual reliability and trustworthy AI."
        ]
      },
      {
        id: "future",
        heading: "Future Scope",
        bullets: [
          "Development of a complete experimental framework.",
          "Evaluation across different LLM architectures.",
          "Integration with retrieval-augmented generation.",
          "Advanced causal reasoning and evidence verification.",
          "Evaluation using established hallucination benchmarks.",
          "Development of more reliable and trustworthy AI systems."
        ]
      },
      {
        id: "references",
        heading: "References",
        bullets: [
          "Lewis, P. et al. Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. NeurIPS 2020.",
          "Pearl, J. Causality: Models, Reasoning, and Inference. Cambridge University Press.",
          "Additional references on LLM hallucination, causal inference, and reflective reasoning should be added during the literature review."
        ]
      },
      {
        id: "publications",
        heading: "Associated Publications",
        bullets: [
          "Independent research project — Work in Progress. No associated publication is claimed at this stage."
        ]
      }
    ]
  }
];

export function getResearchBySlug(slug: string) {
  return researchItems.find((r) => r.slug === slug);
}
