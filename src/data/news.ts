/**
 * ─────────────────────────────────────────────────────────────────────────
 *  NEWS & UPDATES  (homepage section — fully editable)
 * ─────────────────────────────────────────────────────────────────────────
 *  Short, recent highlights shown in the "News & Updates" section of the
 *  home page. Add a new object at the TOP of the array and the site shows
 *  it first (newest → oldest). Keep entries factual — these are placeholders
 *  to be replaced with your real announcements.
 */

export type NewsTag =
  | "Milestone"
  | "Research"
  | "Publication"
  | "Project"
  | "Event"
  | "Update";

export type NewsItem = {
  id: string;
  /** ISO date (YYYY-MM-DD) — displayed as e.g. "Jan 12, 2026". */
  date: string;
  tag: NewsTag;
  title: string;
  text: string;
  /** Optional internal route ("/research/...") or external link. */
  link?: { label: string; href: string };
};

export const newsItems: NewsItem[] = [
  {
    id: "news-1",
    date: "2026-10-18",
    tag: "Update",
    title: "Portfolio v2 is live",
    text: "Fresh 3D redesign, a DEV.to-powered blog and a streamlined contact pipeline are now rolling on this site.",
    link: { label: "Explore the blog", href: "/blog" },
  },
  {
    id: "news-2",
    date: "2026-09-02",
    tag: "Publication",
    title: "First-author paper submitted",
    text: "A manuscript on evaluation practices for retrieval-augmented LLM systems is under review. Details will follow once a decision is out.",
  },
  {
    id: "news-3",
    date: "2026-07-21",
    tag: "Research",
    title: "Joined the Applied ML Lab",
    text: "Started as an undergraduate researcher focusing on causal reasoning and trustworthy evaluation pipelines.",
    link: { label: "See research", href: "/research" },
  },
  {
    id: "news-4",
    date: "2026-04-11",
    tag: "Milestone",
    title: "National hackathon win",
    text: "Our team placed first with a retrieval-augmented campus assistant built in 36 hours.",
    link: { label: "View project", href: "/projects" },
  },
  {
    id: "news-5",
    date: "2026-01-30",
    tag: "Event",
    title: "Guest session on RAG systems",
    text: "Conducted an intro-to-RAG workshop for junior students covering chunking, embeddings and honest evaluation.",
  },
];
