<p align="center">
  <img src="https://img.shields.io/badge/AI-Radar-ef4444?style=for-the-badge&logo=target&logoColor=white" alt="AI Radar" />
  <img src="https://img.shields.io/github/stars/orzazade/awesome-ai-radar?style=for-the-badge&color=f59e0b" alt="Stars" />
  <img src="https://img.shields.io/github/forks/orzazade/awesome-ai-radar?style=for-the-badge&color=22c55e" alt="Forks" />
  <img src="https://img.shields.io/github/license/orzazade/awesome-ai-radar?style=for-the-badge&color=6b7280" alt="License" />
  <img src="https://img.shields.io/badge/PRs-welcome-22c55e?style=for-the-badge" alt="PRs Welcome" />
</p>

<h1 align="center">awesome-ai-radar</h1>

<p align="center">
  <strong>Track what matters. Ignore the noise.</strong><br>
  <em>Community-powered AI trend intelligence, updated weekly by a distributed swarm of Claude agents.</em>
</p>

<p align="center">
  <a href="https://orzazade.github.io/awesome-ai-radar">Live Radar</a> &middot;
  <a href="#quick-start">Quick Start</a> &middot;
  <a href="CONTRIBUTING.md">Contribute</a> &middot;
  <a href="https://orzazade.github.io/awesome-ai-radar/feeds/rss.xml">RSS Feed</a>
</p>

---

## The Problem

Every day: new models, new tools, new frameworks, new hype. You scroll Twitter, skim newsletters, check HN — and still feel behind. The problem isn't access to information. It's **signal vs. noise**.

**awesome-ai-radar** solves this with a simple idea: **the community IS the compute.**

Every contributor runs a Claude Code skill locally (zero cost), researches AI developments, rates their significance honestly, and opens a PR. GitHub Actions validates, aggregates, and publishes a weekly radar. The result: a curated, opinionated intelligence feed — not a link dump.

## Quick Start

### Just want to read?

**[orzazade.github.io/awesome-ai-radar](https://orzazade.github.io/awesome-ai-radar)** — browse the radar, search entries, subscribe via RSS.

### Have Claude Code? Get a personalized briefing:

```bash
# Get this week's AI briefing, personalized to YOUR stack
/ai-radar briefing
```

The skill reads your `CLAUDE.md` and dependency files, then tells you what happened in AI that matters to **your** projects specifically.

### Want to contribute?

```bash
# Research + draft entries + open a PR — one command
/ai-radar contribute
```

Or [submit a manual PR](CONTRIBUTING.md) — no Claude Code required.

### Deep dive on a topic?

```bash
# "What happened with MCP servers this month?"
/ai-radar catch-up MCP servers
```

## This Week's Radar

<!-- AUTO-UPDATED BY GITHUB ACTIONS — DO NOT EDIT -->
<!-- RADAR_STATS_START -->
_Radar stats will appear here after the first weekly digest cycle._
<!-- RADAR_STATS_END -->

## How It Works

```
                        awesome-ai-radar

  RESEARCH               CONTRIBUTE              PUBLISH
  ────────               ──────────              ───────

  ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
  │  You run     │       │  GitHub     │       │  Site gets   │
  │  /ai-radar   │──PR──>│  validates  │──CI──>│  rebuilt     │
  │  locally     │       │  + merges   │       │  weekly      │
  └─────────────┘       └─────────────┘       └─────────────┘
        │                      │                      │
   Scans HN, Reddit,    Schema check,          11ty + Pagefind
   GitHub, arxiv,        dedup detection,       Radar viz
   AI company blogs      URL allowlist          RSS feeds
        │                      │                      │
   Rates signal:         Community review       GitHub Pages
   game-changer →        ensures quality        (free, forever)
   notable →
   incremental →
   noise
```

**Zero hosting cost. Zero API cost. Zero auth.** Just GitHub + Claude Code.

## Signal Levels

Every entry gets an honest signal rating. Most things are incremental. That's fine. The value is in honestly identifying the few that aren't.

| Signal | Meaning | How often |
|--------|---------|-----------|
| :red_circle: **Game-changer** | Shifts what's possible. You need to know this today. | ~1-2/month |
| :yellow_circle: **Notable** | Meaningful development. Worth tracking. | ~3-5/week |
| :green_circle: **Incremental** | Expected progress. Good but not surprising. | Most things |
| :white_circle: **Noise** | Overhyped or misleading. Explicitly debunked so you can move on. | As needed |

> Calling out noise is as valuable as surfacing signal. "This thing everyone is tweeting about? It's noise. Here's why. Move on."

## The `/ai-radar` Skill

Three modes, all running locally on your machine:

| Mode | Command | What it does |
|------|---------|-------------|
| **Briefing** | `/ai-radar` | Personalized AI news digest based on your stack. Reads your CLAUDE.md + deps. |
| **Contribute** | `/ai-radar contribute` | Researches trends, formats entries, opens a PR to this repo. You review before submit. |
| **Catch-up** | `/ai-radar catch-up [topic]` | 30-day deep dive on any AI topic. Timeline + current state + what to watch. |

The skill is installed globally — works in any project directory. Each briefing is personalized because it reads your project's actual dependencies.

## Entry Format

Every entry follows a structured format with frontmatter metadata and markdown content:

```markdown
---
title: "Descriptive title of what happened"
date: 2026-03-18
category: "Model Release"    # Model Release | Tool | Framework | Paradigm | Infrastructure | Research
signal: "notable"            # game-changer | notable | incremental | noise
affects: ["python", "api"]   # Stack tags this affects
source: "https://..."        # Primary source URL (must be verifiable)
contributed_by: "@username via ai-radar skill"
---

## What happened
One paragraph. Factual. No hype.

## Why it matters
One paragraph. Not what it IS, but why you should CARE.

## Who should pay attention
Specific developer profiles this affects.
```

## Contributing

We want **quality over quantity**. 5 great entries beat 50 mediocre ones.

| Method | Effort | Best for |
|--------|--------|----------|
| `/ai-radar contribute` | Easiest | Claude Code users. The skill does the research, you review. |
| Manual PR | Medium | Anyone. Fork, add entries to `src/pulse/YYYY/WXX/`, submit PR. |
| GitHub Issue | Lowest | "Hey, you missed X" — flag something for others to write up. |

**Quality bar:**
- Every source URL must be real and accessible
- Signal ratings must be honest (most things are incremental or noise)
- "Why it matters" must explain significance, not just restate facts
- No self-promotion, no spam, no affiliate links

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for the full guide.

## Features

- :dart: **Interactive radar visualization** — ThoughtWorks-style rings + blips on the landing page
- :mag: **Full-text search** — Pagefind-powered, works offline
- :trophy: **Contributor leaderboard** — Top researchers recognized with badges
- :scroll: **Noise Hall of Fame** — Best "why this is noise" explanations, curated
- :bar_chart: **This Week in Numbers** — At-a-glance stats on each weekly digest
- :satellite: **RSS feeds** — Monolithic feed + per-stack feeds (subscribe to only what matters to you)
- :new_moon: **Dark-first design** — Radar Operations aesthetic. Light mode toggle available.
- :lock: **URL allowlist** — Contributor links validated against known-good domains

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Site generator | [11ty (Eleventy)](https://www.11ty.dev/) |
| Search | [Pagefind](https://pagefind.app/) |
| Radar visualization | Custom SVG (ThoughtWorks-style) |
| CI/CD | GitHub Actions (validate, digest, deploy) |
| Contribution engine | Claude Code skill (`/ai-radar`) |
| Schema validation | JSON Schema + [ajv](https://ajv.js.org/) |
| Hosting | GitHub Pages (free) |

## Forking for Your Domain

The architecture is a **pattern, not just a product**. Fork this repo to create radars for any fast-moving space:

```bash
gh repo fork orzazade/awesome-ai-radar --clone
# Rename, update categories in schema/entry.schema.json,
# customize the skill, and you have awesome-web-radar,
# awesome-security-radar, awesome-devops-radar...
```

## Roadmap

- [ ] Email digest via GitHub Actions + Resend
- [ ] SessionStart hook for morning AI briefing
- [ ] Per-stack sub-radars (Python ML, TypeScript, DevOps)
- [ ] API endpoint (radar.json is already the de facto API)
- [ ] Mobile PWA with offline support

## License

[MIT](LICENSE) — use it, fork it, build on it.

---

<p align="center">
  Built by <a href="https://github.com/orzazade">@orzazade</a> &middot;
  Powered by <a href="https://claude.com/claude-code">Claude Code</a> &middot;
  Star this repo if it saves you time :star:
</p>
