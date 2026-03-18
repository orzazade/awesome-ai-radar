# awesome-ai-radar

**Track what matters. Ignore the noise. Powered by a swarm of Claude agents.**

---

Most "awesome lists" are graveyards. This one updates itself weekly.

**awesome-ai-radar** is a community-powered AI trend tracker built on a simple loop: distributed research, shared intelligence, published radar. Every week, contributors run a Claude Code skill that researches the latest AI developments, rates their signal strength, and submits entries via PR. The result is a curated, opinionated radar — not a link dump.

## Quick Start

**Just want to read?** Browse the radar at **[orzazade.github.io/awesome-ai-radar](https://orzazade.github.io/awesome-ai-radar)**

**Have Claude Code?** Install the skill and get a briefing:

```bash
# Install the skill (one-time)
claude skill install orzazade/awesome-ai-radar

# Get this week's AI briefing
/ai-radar briefing
```

**Want to contribute?** The skill does the heavy lifting:

```bash
# Research + draft entries + open a PR — all in one command
/ai-radar contribute
```

Or [submit a manual PR](#contributing) if you prefer.

## This Week's Radar

<!-- AUTO-UPDATED BY GITHUB ACTIONS — DO NOT EDIT -->
<!-- RADAR_STATS_START -->
_Radar stats will appear here after the first publish cycle._
<!-- RADAR_STATS_END -->

## How It Works

```
  You (locally)              GitHub                   Site
  ┌──────────┐          ┌──────────────┐        ┌──────────────┐
  │ Research  │  ──PR──▶ │  Contribute  │ ──CI──▶│   Publish    │
  │          │          │              │        │              │
  │ Claude   │          │ Review +     │        │ 11ty builds  │
  │ skill    │          │ merge        │        │ radar viz    │
  │ runs     │          │              │        │ Pagefind     │
  │ locally  │          │              │        │ search       │
  └──────────┘          └──────────────┘        └──────────────┘
```

1. **Research** — You run the Claude Code skill. It scans AI news, papers, releases, and community chatter. Everything stays on your machine.
2. **Contribute** — The skill drafts entries, you review them, and it opens a PR to this repo. Quality over quantity.
3. **Publish** — GitHub Actions validates entries, builds the 11ty site, and deploys to GitHub Pages. The radar updates weekly.

## Signal Levels

Every entry gets an honest signal rating:

| Signal | Emoji | Meaning | Frequency |
|--------|-------|---------|-----------|
| **Game-changer** | :red_circle: | Shifts what's possible. You need to know this today. | ~1-2/month |
| **Notable** | :yellow_circle: | Meaningful development. Worth tracking. | ~3-5/week |
| **Incremental** | :green_circle: | Expected progress. Good but not surprising. | Most things |
| **Noise** | :white_circle: | Overhyped, misleading, or irrelevant. Explicitly called out. | As needed |

Most things are incremental. That's fine. The value is in honestly identifying the few that aren't.

## Contributing

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for the full guide.

The short version:
- Run `/ai-radar contribute` for the guided experience
- Or fork, add entries to `src/pulse/YYYY/WXX/`, and open a PR
- We want 5 great entries per week, not 50 mediocre ones
- Be honest with signal ratings — calling something "game-changer" when it's incremental hurts everyone

## Tech Stack

| Component | Tool |
|-----------|------|
| Static site | [11ty](https://www.11ty.dev/) |
| Search | [Pagefind](https://pagefind.app/) |
| Radar visualization | [ThoughtWorks Radar](https://www.thoughtworks.com/radar) viz |
| CI/CD | GitHub Actions |
| Contribution engine | Claude Code skill |
| Schema validation | JSON Schema + GitHub Actions |
| Hosting | GitHub Pages |

## License

[MIT](LICENSE) — Orkhan Rzazade, 2026.

---

Built by [@orzazade](https://github.com/orzazade). Powered by Claude Code.
