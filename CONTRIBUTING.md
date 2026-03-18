# Contributing to awesome-ai-radar

We want sharp, honest signal — not volume. Five well-researched entries beat fifty copy-pasted announcements.

## How to Contribute

### Option 1: Claude Code Skill (Easiest)

If you have [Claude Code](https://claude.com/claude-code) installed:

```bash
# Install the skill (one-time)
claude skill install orzazade/awesome-ai-radar

# Research, draft entries, and open a PR
/ai-radar contribute
```

The skill handles research, formatting, schema validation, and PR creation. You review and approve.

### Option 2: Manual PR

1. Fork this repo
2. Create a new branch: `git checkout -b pulse/2026-W12-your-topic`
3. Add your entry to `src/pulse/YYYY/WXX/` (use the current ISO week)
4. Name the file descriptively: `claude-opus-4-6.md`, `mcp-servers-growth.md`
5. Follow the entry format below
6. Submit a PR using the provided template

## Entry Format

Every entry is a Markdown file with structured frontmatter:

```markdown
---
title: "Descriptive Title Here"
date: 2026-03-18
category: "Model Release"
signal: "game-changer"
affects: ["claude-code", "api"]
source: "https://real-url-to-primary-source"
contributed_by: "@yourhandle via ai-radar skill"
---

## What happened

One paragraph. State the facts clearly. What was released, announced, or discovered?
No hype, no speculation. Link to the primary source.

## Why it matters

One paragraph. This is the hard part. Explain WHY someone should care, not just WHAT
happened. What does this enable that wasn't possible before? What does this change
about how people work?

## Who should pay attention

Specific roles or profiles. "AI engineers building agent systems" is good.
"Everyone" is lazy and wrong.
```

### Frontmatter Fields

| Field | Required | Values |
|-------|----------|--------|
| `title` | Yes | Short, descriptive title |
| `date` | Yes | ISO date (YYYY-MM-DD) |
| `category` | Yes | `Model Release`, `Tool Launch`, `Framework Update`, `Research Paper`, `Industry Shift`, `Ecosystem Growth`, `Regulation`, `Funding` |
| `signal` | Yes | `game-changer`, `notable`, `incremental`, `noise` |
| `affects` | Yes | Array of tags: `claude-code`, `api`, `agents`, `rag`, `fine-tuning`, `open-source`, `enterprise`, `mobile`, `devtools`, `infrastructure`, `safety`, `regulation` |
| `source` | Yes | URL to the primary source (not a summary blog) |
| `contributed_by` | Yes | `@handle` or `@handle via ai-radar skill` |

## Signal Rating Guide

This is the most important part. Be honest.

### :red_circle: Game-changer (`signal: "game-changer"`)

Reserve this for things that genuinely shift capabilities or economics. Ask yourself: "Will I remember this in 6 months?" If not, it's not a game-changer.

**Examples:** GPT-4 release, Claude 3.5 Sonnet launch, Llama 2 open-sourcing, Cursor taking off.

**Not game-changers:** Version bumps, minor model improvements, another RAG framework.

### :yellow_circle: Notable (`signal: "notable"`)

Meaningful developments worth tracking. These move the needle but don't redefine the landscape.

**Examples:** A major framework hitting v1.0, a significant ecosystem milestone, a meaningful policy change.

### :green_circle: Incremental (`signal: "incremental"`)

Expected progress. The AI field moves fast, and most things are incremental. That's not a bad thing — it just means the signal rating should reflect reality.

**Examples:** Model updates with modest improvements, new features in existing tools, funding rounds for known players.

### :white_circle: Noise (`signal: "noise"`)

Explicitly calling out hype, misleading claims, or things that don't matter as much as Twitter thinks. These entries are valuable because they save people time.

**Examples:** "AGI by next Tuesday" claims, benchmark gaming, vaporware announcements.

## URL Allowlist

To prevent spam and low-quality sources, the CI pipeline checks URLs against an allowlist of known-good domains:

- **Auto-approved:** `anthropic.com`, `openai.com`, `arxiv.org`, `github.com`, `huggingface.co`, `blog.google`, `ai.meta.com`, `microsoft.com/en-us/research`, `techcrunch.com`, `theverge.com`, `arstechnica.com`
- **Flagged for review:** Everything else. A maintainer will check the source before merging.

This isn't gatekeeping — it's quality control. If your source is legitimate, it'll get approved.

## Quality Bar

Before submitting, ask yourself:

- [ ] Is the source a primary source (not a rehash of someone else's coverage)?
- [ ] Is my signal rating honest? (Most things are incremental. That's okay.)
- [ ] Does "Why it matters" explain significance, not just restate facts?
- [ ] Would I find this entry useful if someone else wrote it?
- [ ] Is this actually from this week, not old news?

## What We Don't Want

- **Self-promotion.** Don't submit your own project unless it's genuinely notable.
- **Spam.** Obvious spam gets you blocked.
- **Low-effort.** "X released Y" with no analysis is not a contribution.
- **Duplicate coverage.** Check existing entries for the week before submitting.
- **Speculation.** Stick to things that have actually happened.

## Code of Conduct

- Be respectful in PR discussions
- Disagree on signal ratings constructively — "I'd rate this incremental because..." is fine
- No personal attacks, no harassment
- Maintainers have final say on signal ratings and merges

---

Questions? Open an issue or reach out to [@orzazade](https://github.com/orzazade).
