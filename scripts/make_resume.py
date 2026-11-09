#!/usr/bin/env python3
"""Generate the sample resume PDF (public/resume.pdf) for the portfolio."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph

DEEP = HexColor("#21108F")
ROYAL = HexColor("#3156C8")
RED = HexColor("#E52436")
ORANGE = HexColor("#FF8A24")
INK = HexColor("#101014")
SLATE = HexColor("#626779")
GOLD = HexColor("#D4AF37")

W, H = A4
M = 16 * mm

c = canvas.Canvas("/home/z/my-project/public/resume.pdf", pagesize=A4)
c.setTitle("Aarav Sharma — Resume (Sample)")

# ── Header band ─────────────────────────────────────────
c.setFillColor(DEEP)
c.rect(0, H - 46 * mm, W, 46 * mm, stroke=0, fill=1)
c.setFillColor(RED)
c.rect(0, H - 46 * mm, W, 2.2 * mm, stroke=0, fill=1)

c.setFillColor(HexColor("#FFFFFF"))
c.setFont("Helvetica-Bold", 26)
c.drawString(M, H - 18 * mm, "AARAV SHARMA")
c.setFont("Helvetica", 10.5)
c.setFillColor(HexColor("#CDD4F5"))
c.drawString(M, H - 24.5 * mm, "B.Tech Computer Science & Engineering (AI & DS)  |  Aspiring Researcher")
c.drawString(M, H - 29.5 * mm, "Bengaluru, Karnataka, India  |  hello@aaravsharma.dev  |  github.com/aaravsharma  |  linkedin.com/in/aaravsharma")

# gold keyline + tagline
c.setStrokeColor(GOLD)
c.setLineWidth(0.8)
c.line(M, H - 34 * mm, W - M, H - 34 * mm)
c.setFont("Helvetica-Oblique", 9.5)
c.setFillColor(GOLD)
c.drawString(M, H - 39.5 * mm, "Building intelligent solutions through code, research & innovation — LLMs, causal reasoning, trustworthy AI.")

# ── Helpers ─────────────────────────────────────────────
y = H - 56 * mm

def section(title):
    global y
    c.setFont("Helvetica-Bold", 11.5)
    c.setFillColor(DEEP)
    c.drawString(M, y, title.upper())
    c.setStrokeColor(RED)
    c.setLineWidth(1.6)
    tw = c.stringWidth(title.upper(), "Helvetica-Bold", 11.5)
    c.line(M, y - 2.2 * mm, M + tw, y - 2.2 * mm)
    c.setStrokeColor(HexColor("#E6E8F0"))
    c.setLineWidth(0.6)
    c.line(M + tw + 3 * mm, y - 1.2 * mm, W - M, y - 1.2 * mm)
    y -= 7.5 * mm

def entry(left, right, title, org):
    global y
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(INK)
    c.drawString(M, y, title)
    c.setFont("Helvetica", 8.5)
    c.setFillColor(SLATE)
    c.drawRightString(W - M, y, right)
    y -= 4.4 * mm
    c.setFont("Helvetica-Oblique", 9)
    c.setFillColor(ROYAL)
    c.drawString(M, y, org)
    y -= 5 * mm

def bullets(items):
    global y
    body = ParagraphStyle(
        "b", fontName="Helvetica", fontSize=8.8, leading=12.4,
        textColor=SLATE, leftIndent=9, bulletIndent=1,
    )
    for it in items:
        p = Paragraph(it, body, bulletText="•")
        pw, ph = p.wrap(W - 2 * M, 60 * mm)
        p.drawOn(c, M, y - ph + 2.5 * mm)
        y -= ph + 1.6 * mm

# ── Education ───────────────────────────────────────────
section("Education")
entry("2023 — 2027 (exp.)", "CGPA 9.1/10 (sample)", "B.Tech — Computer Science & Engineering (AI & DS track)", "Nova Institute of Technology, Bengaluru  (sample entry)")
entry("2021 — 2023", "92.4% (sample)", "Higher Secondary — Science (PCM + Computer Science)", "Vidya Niketan Senior Secondary School  (sample entry)")
y -= 1 * mm

# ── Research ────────────────────────────────────────────
section("Research Experience & Publications")
entry("Aug 2025 — Present", "Applied ML Lab", "Undergraduate Research Assistant", "Causal evaluation of LLM reasoning; citation-first RAG systems (lab, on-campus)")
bullets([
    "First-author conference submission (under review, 2025): <i>Beyond Benchmarks: Causal Evaluation of LLM Reasoning</i>.",
    "Journal publication (2023): tamper-evident academic credential verification on a permissioned blockchain.",
    "Preprint in preparation: structured survey of trustworthiness dimensions in applied ML.",
])
y -= 2 * mm

# ── Experience ──────────────────────────────────────────
section("Experience & Leadership")
entry("May 2025 — Jul 2025", "Remote", "Software Engineering Intern — Data Platform", "FinSight Analytics (sample company)")
bullets([
    "Built data-quality monitors for daily ingestion pipelines; shipped an internal pipeline-health dashboard with runbooks.",
])
entry("Jan 2025 — Present", "Campus", "Technical Lead", "Coding Club, Nova Institute of Technology")
bullets([
    "Run weekly problem-solving sessions; designed the first-year bootcamp; built the club's problem archive with editorials.",
])
y -= 2 * mm

# ── Projects ────────────────────────────────────────────
section("Selected Projects")
bullets([
    "<b>Campus Knowledge Assistant (RAG)</b> — citation-first QA over verified institutional documents; hybrid retrieval, reranking, groundedness harness. (Next.js, pgvector, BM25)",
    "<b>Neural Text Classifier Studio</b> — web studio for training and stress-testing text classifiers with fairness slices and adversarial probes. (PyTorch, FastAPI)",
    "<b>SyncBoard</b> — realtime multi-user Kanban with offline-first optimistic updates. (Next.js, Prisma, Socket.IO, Redis)",
    "<b>BlockCert</b> — permissioned-blockchain credential verification DApp; hash-commitment-only on-chain design.",
])
y -= 2 * mm

# ── Skills ──────────────────────────────────────────────
section("Technical Skills")
sk = ParagraphStyle("s", fontName="Helvetica", fontSize=8.8, leading=13, textColor=INK)
skills_p = Paragraph(
    "<b>Languages:</b> Python (advanced) · TypeScript/JavaScript (advanced) · C++ (intermediate) · SQL (intermediate)<br/>"
    "<b>AI / ML:</b> PyTorch, scikit-learn, transformers, RAG architectures, evaluation & fairness tooling<br/>"
    "<b>Web:</b> React, Next.js, Tailwind CSS, Framer Motion, FastAPI, Node.js, Socket.IO<br/>"
    "<b>Data &amp; Infra:</b> PostgreSQL (+pgvector), Prisma, Docker, Redis, Vercel, Linux, Git/Actions<br/>"
    "<b>Research:</b> LaTeX, Zotero, experiment tracking, reproducibility practices",
    sk,
)
pw, ph = skills_p.wrap(W - 2 * M, 60 * mm)
skills_p.drawOn(c, M, y - ph + 3 * mm)
y -= ph + 5 * mm

# ── Achievements ────────────────────────────────────────
section("Achievements")
bullets([
    "Smart India Hackathon — national finalist, winning team (2024, sample entry).",
    "Dean's List recognition for academic excellence (2024–25, sample entry).",
    "Top-5, intra-university algorithm championship (2024, sample entry).",
])

# ── Footer ──────────────────────────────────────────────
c.setFillColor(DEEP)
c.rect(0, 0, W, 9 * mm, stroke=0, fill=1)
c.setFont("Helvetica", 7.5)
c.setFillColor(HexColor("#CDD4F5"))
c.drawString(M, 3.4 * mm, "Sample resume generated for the portfolio template — replace all content with real records.")
c.drawRightString(W - M, 3.4 * mm, f"Generated {__import__('datetime').date.today().isoformat()}")

c.save()
print("resume.pdf written")
