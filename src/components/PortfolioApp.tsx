"use client";

import { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RouterProvider, matchRoute, useRoute } from "@/lib/router";
import { applySeo } from "@/lib/seo";
import { profile } from "@/data/profile";

// import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

import { HomePage } from "@/components/pages/HomePage";
import { AboutPage } from "@/components/pages/AboutPage";
import { ResearchPage } from "@/components/pages/ResearchPage";
import { ResearchDetailPage } from "@/components/pages/ResearchDetailPage";
import { PublicationsPage } from "@/components/pages/PublicationsPage";
import { PublicationDetailPage } from "@/components/pages/PublicationDetailPage";
import { ProjectsPage } from "@/components/pages/ProjectsPage";
import { ProjectDetailPage } from "@/components/pages/ProjectDetailPage";
import { EducationPage } from "@/components/pages/EducationPage";
import { EducationDetailPage } from "@/components/pages/EducationDetailPage";
import { ExperiencePage } from "@/components/pages/ExperiencePage";
import { ExperienceDetailPage } from "@/components/pages/ExperienceDetailPage";
import { BlogPage } from "@/components/pages/BlogPage";
import { SkillsPage } from "@/components/pages/SkillsPage";
import { AchievementsPage } from "@/components/pages/AchievementsPage";
import { AchievementDetailPage } from "@/components/pages/AchievementDetailPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { NotFoundPage } from "@/components/pages/NotFoundPage";

/* ── Route → page resolution ───────────────────────── */
type Resolved = {
  node: React.ReactNode;
  seo: { title: string; description?: string };
};

function useResolve(path: string): Resolved {
  return useMemo(() => {
    const name = profile.name;

    let m: Record<string, string> | null;

    if (path === "/")
      return {
        node: <HomePage />,
        seo: {
          title: `${name} — CSE Student, Researcher & Technology Enthusiast`,
          description:
            "Building intelligent solutions through code, research and innovation — AI, machine learning, LLMs, causal reasoning and trustworthy AI.",
        },
      };

    if (path === "/about")
      return {
        node: <AboutPage />,
        seo: {
          title: "About",
          description:
            "Professional introduction, personal background, academic journey, technical interests and professional philosophy.",
        },
      };

    if (path === "/research")
      return {
        node: <ResearchPage />,
        seo: {
          title: "Research",
          description:
            "Exploring the frontiers of computer science research — LLMs, causal reasoning, trustworthy AI and applied machine learning.",
        },
      };

    if ((m = matchRoute("/research/:slug", path)))
      return {
        node: <ResearchDetailPage slug={m.slug} />,
        seo: { title: `Research — ${m.slug}`, description: "Detailed research overview: methodology, architecture, datasets, results and contributions." },
      };

    if (path === "/publications")
      return {
        node: <PublicationsPage />,
        seo: {
          title: "Publications",
          description:
            "Journal papers, conference publications, preprints, patents and works in progress — searchable and filterable.",
        },
      };

    if ((m = matchRoute("/publications/:slug", path)))
      return {
        node: <PublicationDetailPage slug={m.slug} />,
        seo: { title: `Publication — ${m.slug}`, description: "Publication details: abstract, authors, DOI, citation and access links." },
      };

    if (path === "/projects")
      return {
        node: <ProjectsPage />,
        seo: {
          title: "Projects",
          description:
            "AI systems, full-stack platforms, data tooling and academic builds — each with a detailed case study.",
        },
      };

    if ((m = matchRoute("/projects/:slug", path)))
      return {
        node: <ProjectDetailPage slug={m.slug} />,
        seo: { title: `Project — ${m.slug}`, description: "Project case study: architecture, implementation, challenges and outcomes." },
      };

    if (path === "/education")
      return {
        node: <EducationPage />,
        seo: {
          title: "Education",
          description:
            "Academic timeline — undergraduate education, higher secondary and secondary schooling, coursework and achievements.",
        },
      };

    if ((m = matchRoute("/education/:slug", path)))
      return {
        node: <EducationDetailPage slug={m.slug} />,
        seo: { title: `Education — ${m.slug}`, description: "Institution overview, academic information, coursework and documents." },
      };

    if (path === "/experience")
      return {
        node: <ExperiencePage />,
        seo: {
          title: "Experience",
          description:
            "Internships, research experience, technical leadership, campus activities and volunteering.",
        },
      };

    if ((m = matchRoute("/experience/:slug", path)))
      return {
        node: <ExperienceDetailPage slug={m.slug} />,
        seo: { title: `Experience — ${m.slug}`, description: "Role details: responsibilities, technologies, contributions and achievements." },
      };

    if (path === "/blog")
      return {
        node: <BlogPage />,
        seo: {
          title: "Blog — Insights, Ideas & My Learning Journey",
          description:
            "Daily articles on AI, machine learning, programming, web development, research and my personal learning journey — auto-synced from DEV.to.",
        },
      };

    if (path === "/skills")
      return {
        node: <SkillsPage />,
        seo: {
          title: "Skills",
          description:
            "Technical toolkit across programming, frontend, backend, AI/ML, data science, research and cloud — with honest proficiency labels.",
        },
      };

    if (path === "/achievements")
      return {
        node: <AchievementsPage />,
        seo: {
          title: "Achievements & Certifications",
          description:
            "Academic honors, research achievements, hackathons, professional certifications and a premium certificate gallery.",
        },
      };

    if ((m = matchRoute("/achievements/:slug", path)))
      return {
        node: <AchievementDetailPage slug={m.slug} />,
        seo: { title: `Achievement — ${m.slug}`, description: "Achievement details with certificate and verification information." },
      };

    if (path === "/contact")
      return {
        node: <ContactPage />,
        seo: {
          title: "Contact",
          description:
            "Get in touch for research collaboration, internships, projects and academic discussion — powered by a Google Sheets pipeline.",
        },
      };

    if (path === "/privacy")
      return {
        node: <PrivacyPage />,
        seo: { title: "Privacy Policy", description: "What data this portfolio collects, how it is stored and how it is protected." },
      };

    return {
      node: <NotFoundPage />,
      seo: { title: "Page Not Found", description: "The requested page could not be found." },
    };
  }, [path]);
}

/* ── App shell ─────────────────────────────────────── */
function Shell() {
  const { path } = useRoute();
  const { node, seo } = useResolve(path);

  useEffect(() => {
    applySeo(seo);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [seo]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LoadingScreen />
      {/* <AnnouncementBar /> */}
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={path}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {node}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

export function PortfolioApp() {
  return (
    <RouterProvider>
      <Shell />
    </RouterProvider>
  );
}
