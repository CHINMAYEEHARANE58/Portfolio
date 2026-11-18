"""Build the concise, ATS-friendly résumé used by the portfolio."""

from pathlib import Path
from shutil import copyfile

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output/pdf/Chinmayee_Harane_Resume.pdf"
PUBLIC = ROOT / "public/resume/Chinmayee_Harane_Resume.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

ink = colors.HexColor("#14202e")
muted = colors.HexColor("#4d5968")
accent = colors.HexColor("#155b79")
small = ParagraphStyle("small", fontName="Helvetica", fontSize=8.8, leading=11.5, textColor=ink, spaceAfter=0)
body = ParagraphStyle("body", parent=small, fontSize=9.15, leading=12.5)
role = ParagraphStyle("role", parent=body, fontName="Helvetica-Bold", fontSize=9.8, leading=12)
date = ParagraphStyle("date", parent=body, alignment=TA_RIGHT, textColor=muted, fontSize=8.6)
name = ParagraphStyle("name", parent=body, fontName="Helvetica-Bold", fontSize=22, leading=24, textColor=ink)
contact = ParagraphStyle("contact", parent=small, fontSize=8.5, leading=11, textColor=muted)
heading = ParagraphStyle("heading", parent=body, fontName="Helvetica-Bold", fontSize=9.2, leading=12, textColor=accent, spaceBefore=13, spaceAfter=5)

story = []

def p(text, style=body):
    return Paragraph(text, style)

def section(title):
    story.append(p(title.upper(), heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#b8c9d1"), spaceAfter=5))

def item(title, when, lines):
    row = Table([[p(title, role), p(when, date)]], colWidths=[129 * mm, 43 * mm])
    row.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 1)]))
    block = [row]
    block.extend(p("- " + line) for line in lines)
    block.append(Spacer(1, 6))
    story.append(KeepTogether(block))

story.append(p("Chinmayee Harane", name))
story.append(p("Software Engineer | Full-Stack Systems | Security", ParagraphStyle("subtitle", parent=body, fontName="Helvetica-Bold", textColor=accent, fontSize=9.3, leading=12)))
story.append(p('Pune, India  |  <link href="mailto:chinmayee.harane@kalvium.community">chinmayee.harane@kalvium.community</link>  |  <link href="https://github.com/CHINMAYEEHARANE58">GitHub</link>  |  <link href="https://www.linkedin.com/in/chinmayee-harane-568896287/">LinkedIn</link>  |  <link href="https://leetcode.com/u/chinmayeeharane/">LeetCode</link>', contact))
story.append(Spacer(1, 7))
story.append(p("Software engineering student with experience contributing to a live healthcare platform and an enterprise cybersecurity internship. Builds full-stack applications with an emphasis on backend integrity, clear interfaces, and practical security boundaries."))

section("Experience")
item("Nykaa - Cyber Security Intern", "Aug 2026 - Present", [
    "Gaining hands-on exposure to DLP, GRC, application security, security operations, and cloud security workflows.",
    "Learning Proofpoint and Netskope policy workflows; studying ISO/IEC 27001, ITGC, OWASP Top 10, HTTP analysis, and Burp Suite.",
])
item("iCliniq - Tech Intern", "Mar 2025 - Jan 2026", [
    "Contributed frontend and backend features to a live healthcare platform using React, TypeScript, Node.js, GraphQL, Directus, and REST APIs.",
    "Resolved frontend and API issues, debugged production problems, tested integrations, and participated in code reviews with cross-functional teams.",
])

section("Selected Projects")
item("StockPilot - Inventory and order fulfillment", "2026", [
    "Built an Angular/Spring Boot system with PostgreSQL stock balances, an append-only movement ledger, idempotent commands, and a Kafka transactional outbox. <link href='https://github.com/CHINMAYEEHARANE58/StockPilot'>Source</link>",
])
item("SentinelOps - Security event monitoring", "2026", [
    "Built a Go/React workflow for validated event ingestion, rule-based alerts, incident investigation, and ClickHouse analytics, with documented production-readiness limits. <link href='https://github.com/CHINMAYEEHARANE58/SentinelOps'>Source</link>",
])
item("TeamFlow - Project collaboration", "2026", [
    "Built a multi-workspace Next.js application with role-controlled tasks, sprints, reporting, durable events, and PostgreSQL/Prisma persistence. <link href='https://github.com/CHINMAYEEHARANE58/TeamFlow'>Source</link>",
])
item("DocuMind - Document knowledge workspace", "2026", [
    "Built a React/Django document workflow with private storage, Celery ingestion, PostgreSQL/pgvector retrieval, and checked answer citations; local AI providers are mock implementations. <link href='https://github.com/CHINMAYEEHARANE58/DocuMind'>Source</link>",
])

section("Technical Skills")
story.append(p("<b>Languages:</b> TypeScript, JavaScript, Python, Java, C++, Go, Dart, Rust  |  <b>Frontend:</b> React, Next.js, Angular, Flutter, HTML/CSS"))
story.append(p("<b>Backend &amp; data:</b> Node.js, Express, Spring Boot, Django, FastAPI, REST, GraphQL, PostgreSQL, MongoDB, Redis, Kafka, Docker"))
story.append(p("<b>Security:</b> DLP, GRC, OWASP Top 10, Burp Suite, application and cloud security fundamentals"))

section("Education & Highlights")
story.append(p("<b>MIT ADT University, Pune</b> - B.Tech, Computer Science; Kalvium Software Product Engineering program | 2023 - 2027"))
story.append(p("Shortlisted twice for the Smart India Hackathon. Former technical team member, Microsoft Learn Student Club; trek leader, MIT Adventure Club."))

doc = SimpleDocTemplate(str(OUTPUT), pagesize=A4, rightMargin=19 * mm, leftMargin=19 * mm, topMargin=15 * mm, bottomMargin=15 * mm, title="Chinmayee Harane - Software Engineer Resume", author="Chinmayee Harane")
doc.build(story)
PUBLIC.parent.mkdir(parents=True, exist_ok=True)
copyfile(OUTPUT, PUBLIC)
print(f"Built {OUTPUT} and {PUBLIC}")
