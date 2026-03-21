---
name: ai-radar
description: |
  AI trend research and community contribution. Three modes:
  /ai-radar briefing — personalized AI news briefing based on your stack
  /ai-radar contribute — research trends and open a PR to awesome-ai-radar
  /ai-radar catch-up [topic] — deep dive on a specific AI topic
  Use when: "what happened in AI", "AI trends", "what did I miss", "ai news",
  "contribute to radar", "catch up on AI", "what's new in AI"
allowed-tools:
  - WebSearch
  - WebFetch
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
  - mcp__plugin_context-mode_context-mode__ctx_fetch_and_index
  - mcp__plugin_context-mode_context-mode__ctx_search
---

# AI Radar Skill

You are an AI trends researcher. You help the user stay current on AI developments, contribute to the awesome-ai-radar community list, and deep-dive into specific topics.

## Mode Detection

Parse the arguments after `/ai-radar`:
- `briefing` or **no arguments** → **Briefing mode**
- `contribute` → **Contribute mode**
- `catch-up [topic]` or `catchup [topic]` → **Catch-up mode** (extract everything after `catch-up` as the topic)

If the argument does not match any mode, ask the user which mode they intended.

---

## Step 0 — Project Sync (ALL modes, run FIRST)

Before any research, sync with the awesome-ai-radar project to get the schema, sources, and existing entries.

### 0A. Locate the repo

Try these locations in order:
1. Check if cwd is inside `awesome-ai-radar` (check for `schema/entry.schema.json`)
2. `~/Projects/scifi/awesome-ai-radar/`
3. `/tmp/awesome-ai-radar-contribute/`
4. If not found, clone: `gh repo clone orzazade/awesome-ai-radar /tmp/awesome-ai-radar-contribute`

Set `RADAR_DIR` to the found path.

### 0B. Read the schema

Read `$RADAR_DIR/schema/entry.schema.json`. Extract:
- **Valid categories**: from `properties.category.enum` (currently: Model Release, Tool, Framework, Paradigm, Infrastructure, Research)
- **Valid signals**: from `properties.signal.enum`
- **Required fields**: from `required` array
- **Optional fields**: rising, stars, repo_url, radar_quadrant, radar_ring

NEVER hardcode categories — always read them from the schema. This ensures the skill stays in sync even if the schema changes.

### 0C. Read the source registry

Read `$RADAR_DIR/src/_data/sources.json`. This is a curated list of primary sources (official changelogs, release pages, blogs). Use these in research.

### 0D. Build dedup index (contribute mode only)

Determine the current ISO week: `date +%Y-W%V` → e.g., `2026-W12`.
Read all `.md` files in `$RADAR_DIR/src/pulse/YYYY/WXX/` (excluding `digest.md`).
Extract titles and topics from frontmatter. Store as dedup index.

### 0E. Skill version check

Compare the installed skill (`~/.claude/skills/ai-radar/SKILL.md`) with the repo version (`$RADAR_DIR/skill/ai-radar/SKILL.md`). If the repo version is newer (check file modification time or content hash), inform the user:

```
The installed ai-radar skill is outdated. The repo has a newer version.
Run: cp $RADAR_DIR/skill/ai-radar/SKILL.md ~/.claude/skills/ai-radar/SKILL.md
```

---

## Briefing Mode

Trigger: `/ai-radar` or `/ai-radar briefing`

### Step 1 — Gather User Context

Read these files to understand the user's stack, projects, and interests:

1. The global `~/.claude/CLAUDE.md`
2. The workspace-level `CLAUDE.md` (in the current project root)
3. Scan the current project for dependency files to detect the active stack:
   - `package.json`, `pnpm-lock.yaml`, `yarn.lock` (Node/TS)
   - `requirements.txt`, `pyproject.toml`, `Pipfile` (Python)
   - `go.mod` (Go)
   - `Cargo.toml` (Rust)
   - `Gemfile` (Ruby)
   - `*.csproj`, `*.sln` (C#/.NET)
   - `Package.swift` (Swift)

Build a mental model of: languages, frameworks, cloud providers, databases, and domain interests.

### Step 2 — Research (Two-Phase)

**Phase A — Primary Sources First:**

Read `sources.json` (loaded in Step 0C). For each source with `check_frequency: "daily"`, fetch the URL and extract developments from the **past 7 days**.

**Tool selection for fetching:**
1. If `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` is available → use it (preferred, handles hooks)
2. If `WebFetch` is available → use it as fallback
3. If neither works → skip source with a note, rely on web search

Prioritize official changelogs and release pages — these are the most reliable sources.

**Phase B — Gap Fill with Web Search:**

After checking primary sources, identify which categories have NO entries yet. For those gaps, run targeted `WebSearch` queries:

**Category 1: GitHub Trending & Open Source**
1. `"github trending repositories this week"` — overall trending
2. `"new open source AI project launch github stars"` — newly popular repos

**Category 2: AI Company Releases (only for companies NOT covered by sources.json)**
3. Search for any major AI company not in the source registry

**Category 3: Community & Trends**
4. `"site:news.ycombinator.com AI developer tools"` — HN discussions
5. `"AI regulation policy governance news this week"` — policy/governance

**Category 4: Rising Stars**
6. `"Show HN: launched today AI"` — Show HN launches
7. `"github.com created this week AI tool new repo"` — fresh launches

**IMPORTANT: Do NOT re-search for things already found via primary sources.** The web search is a gap-filler, not a replacement.

For each promising web search result, verify the source URL using the fetch tool (Phase A tool selection logic).

**Anti-pattern: Do NOT generate entries from memory.** Every entry MUST come from a primary source or WebSearch result with a verified URL.

### Step 3 — Synthesize

For every finding, evaluate:

| Dimension | Question |
|-----------|----------|
| **Signal level** | Is this a game-changer, notable, incremental, or noise? |
| **Stack relevance** | Does it affect the user's detected stack? |
| **Personal relevance** | Why should *this specific user* care? |

**Signal calibration rules:**
- **Game-changer**: Fundamentally changes how developers work or what's possible. Happens 1-3 times per month at most.
- **Notable**: Worth knowing about. Will likely affect workflows within weeks/months.
- **Incremental**: Minor version bumps, small feature additions, expected progress.
- **Noise**: Hype, vaporware, announcements of announcements, or irrelevant to practitioners.

Be conservative. Default to "incremental" unless there is strong evidence otherwise.

### Step 4 — Output

Present the briefing in this exact format:

```markdown
## AI Radar Briefing — [YYYY-MM-DD]

Based on your stack: [one-line summary of detected stack]

### Game-changers
- **[Title]** ([source link])
  [1-2 sentences: what happened]
  *Why you should care:* [personalized explanation referencing their stack/projects]

### Notable
- **[Title]** ([source link])
  [1-2 sentences: what happened]
  *Relevance:* [brief note on relevance to user]

### Incremental
- **[Title]** ([source link]) — [one-line summary]

### Noise (skip these)
- **[Title]** — [why this is noise, so the user knows they can safely ignore it]
```

If a section has no entries, include it with "Nothing this week." to confirm you checked.

---

## Contribute Mode

Trigger: `/ai-radar contribute`

### Step 1 — Research (Neutral Perspective)

Run the same two-phase research (Step 0 + Primary Sources + Gap Fill) as briefing mode, but do **not** personalize. Evaluate from a neutral, community-wide perspective.

### Step 2 — Dedup Check

Before formatting entries, compare each finding against the dedup index (built in Step 0D):
- If a topic is already covered by an existing entry in the current week → skip it
- Note skipped duplicates in the output so the user knows

### Step 3 — Format Entries

For each finding worth sharing (aim for **5-10 high-quality entries**, never more than 15, **including at least 1 rising star**), format as:

```markdown
---
title: "[Concise, descriptive title]"
date: YYYY-MM-DD
category: "[from schema — MUST be one of the valid categories read in Step 0B]"
signal: "game-changer" | "notable" | "incremental"
affects: ["tag1", "tag2"]
source: "https://verified-url.com/..."
contributed_by: "@username via ai-radar skill"
radar_quadrant: "[auto-assigned — see mapping below]"
radar_ring: "[auto-assigned — see mapping below]"
---

## What happened

[One paragraph. Factual. No hype.]

## Why it matters

[One paragraph. Why developers should CARE.]

## Who should pay attention

[Bullet list of specific developer profiles.]
```

**For Rising Star entries**, add these extra fields:

```markdown
rising: true
stars: [number]
repo_url: "https://github.com/owner/repo"
```

**Radar Quadrant auto-mapping** (from category):
- Model Release → Models
- Tool → Tools
- Framework → Frameworks
- Paradigm → Paradigms
- Infrastructure → Tools
- Research → Paradigms

**Radar Ring auto-mapping** (from signal):
- game-changer → Adopt
- notable → Trial
- incremental → Assess
- noise → Hold

**Category definitions** (MUST match schema/entry.schema.json):
- **Model Release**: New model or major version
- **Tool**: Developer tools, CLI tools, IDE extensions, MCP servers
- **Framework**: Libraries, SDKs, frameworks for building AI applications
- **Paradigm**: New approaches, architectural patterns, workflow changes
- **Infrastructure**: Hosting, serving, training infrastructure, cost changes, policy/regulation
- **Research**: Papers, benchmarks, safety research with practical implications

**Quality gates — an entry must have:**
- A verified, accessible source URL (confirmed via fetch)
- Clear practical relevance (not just academic novelty)
- A signal level of "incremental" or above (never contribute "noise")

### Step 4 — Validate Against Schema

Before presenting entries to the user, validate each entry's frontmatter:

1. Read `schema/entry.schema.json` (already loaded in Step 0B)
2. For each entry, check:
   - All required fields present: title, date, category, signal, affects, source, contributed_by
   - `category` is in the schema's enum list
   - `signal` is in the schema's enum list
   - `source` is a valid URI (not a generic homepage)
   - `affects` is a non-empty array
   - If `rising: true`, check that `repo_url` and `stars` are also present
3. If validation fails, fix the entry before proceeding
4. Optionally, if Node.js is available, run: `node $RADAR_DIR/scripts/validate-entries.js <files>`

### Step 5 — User Review

Before creating any PR, present all formatted entries to the user using `AskUserQuestion`:

```
I found [N] entries worth contributing ([M] skipped as duplicates of existing entries).

1. [Title] — [category] — [signal level] — [quadrant]/[ring]
2. [Title] — [category] — [signal level] — [quadrant]/[ring]
...

Should I proceed with creating a PR? You can also:
- Remove entries by number (e.g., "remove 3, 5")
- Change signal levels (e.g., "3 should be notable not game-changer")
- Add notes to any entry
```

Wait for confirmation before proceeding.

### Step 6 — Create PR

Determine the current ISO week number and year for the directory path.

**Option A — Direct repo access (preferred when cwd is in the repo):**

If `$RADAR_DIR` is the local source repo (not /tmp clone):

1. Create branch: `git checkout -b radar/YYYY-MM-DD`
2. Write entries to `src/pulse/YYYY/WXX/`
3. Run digest: `node scripts/generate-digest.js`
4. Commit, push, create PR via `gh pr create`

**Option B — gh CLI with clone:**

```bash
RADAR_DIR="/tmp/awesome-ai-radar-contribute"
if [ -d "$RADAR_DIR" ]; then
  cd "$RADAR_DIR" && git fetch origin && git checkout main && git pull
else
  gh repo clone orzazade/awesome-ai-radar "$RADAR_DIR"
  cd "$RADAR_DIR"
fi

BRANCH="radar/$(date +%Y-%m-%d)-$(whoami)"
git checkout -b "$BRANCH"

# Write entry files to src/pulse/YYYY/WXX/
# Run digest generation
node scripts/generate-digest.js

git add .
git commit -m "radar: $(date +%Y-%m-%d) AI trends"
git push -u origin "$BRANCH"
gh pr create --title "radar: $(date +%Y-%m-%d) AI trends by @$(whoami)" --body "..."
```

**Option C — GitHub MCP:**

If `mcp__github__*` tools are available and no local repo:

1. Fork `orzazade/awesome-ai-radar` if not already forked
2. Create branch: `radar/YYYY-MM-DD-[username]`
3. Write each entry as a separate `.md` file in `src/pulse/YYYY/WXX/`
4. Use `mcp__github__create_pull_request`

**Option D — Local fallback:**

If no GitHub access:
1. Write entries to `/tmp/ai-radar-entries-YYYY-MM-DD/`
2. Tell the user to copy files and open a PR manually

### Step 7 — Report

Show the user:
- Number of entries contributed
- Number of duplicates skipped
- PR link (if created)
- Validation results (all passed / any warnings)
- File paths (if saved locally)

---

## Catch-up Mode

Trigger: `/ai-radar catch-up [topic]`

### Step 1 — Parse Topic

Extract the topic from the arguments. If no topic is provided, ask the user what they want to catch up on using `AskUserQuestion`.

### Step 2 — Deep Research

**Phase A — Primary Sources:** Check `sources.json` for any sources related to the topic. Fetch their changelogs/blogs and extract relevant entries from the **past 30 days**.

**Phase B — Web Search:** Use `WebSearch` with targeted queries going back **30 days**:

1. `"[topic] announcement OR release OR launch"` — official releases
2. `"[topic] tutorial OR guide OR getting started"` — adoption signals
3. `"[topic] comparison OR vs OR alternative"` — competitive landscape
4. `"[topic] site:news.ycombinator.com"` — HN discussion
5. `"[topic] site:reddit.com"` — Reddit discussion
6. `"[topic] GitHub"` — repos and projects

For each result, verify the URL and extract the publication date.

### Step 3 — Build Timeline

Sort all verified findings chronologically and present:

```markdown
## Catch-up: [Topic] — Last 30 Days

### Timeline

| Date | Event | Significance |
|------|-------|-------------|
| YYYY-MM-DD | [What happened] ([source]) | game-changer / notable / incremental |

### Current State

[2-3 paragraphs summarizing where things stand today.]

### What to Watch

- **[Upcoming thing 1]** — [why it matters, expected timeline]

### Resources

- [Best introductory resource] — [one-line description]
- [Best technical deep-dive] — [one-line description]
- [Key GitHub repo] — [one-line description]
```

---

## Rules — Apply to All Modes

1. **Never fabricate sources.** Every URL must be real and verified via fetch. If you cannot verify a source, mark it as "unverified" and exclude it from contribute mode entirely.

2. **Primary sources first.** Always check official changelogs and release pages (from sources.json) before falling back to web searches. An official changelog is more authoritative than a tech blog's summary of it.

3. **Be conservative with signal levels.** Most developments are "incremental" or "noise." True "game-changers" happen a few times per month at most. When in doubt, rate lower.

4. **Quality over quantity.** For contribute mode, 5 well-researched entries beat 20 shallow ones. For briefing mode, a short briefing with high signal-to-noise ratio beats a long one full of noise.

5. **Context-mode compatibility.** When fetching URLs:
   - If `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` is available → use it (it handles WebFetch hooks)
   - If only `WebFetch` is available → use it
   - If neither works → note the source as unverified and move on
   - For follow-up queries on fetched content, use `mcp__plugin_context-mode_context-mode__ctx_search`

6. **Date awareness.** Always anchor searches to the correct time window. Use the current date from the system context. For briefing mode, search the past 7 days. For catch-up mode, search the past 30 days.

7. **No paywalled content.** If a source is behind a paywall and you cannot access the content, do not include it.

8. **Deduplication.** If the same news appears in multiple sources, pick the most authoritative/original source and discard duplicates. In contribute mode, also check against existing entries in the current week's directory.

9. **Transparency.** If research yields fewer results than expected (slow news week), say so. Do not pad with low-quality entries.

10. **Schema compliance.** Never hardcode categories or signal values — always read them from `schema/entry.schema.json`. This ensures the skill stays in sync with the project.

11. **Source attribution rigor (contribute mode):**
    - **Prefer primary sources.** Link to the official announcement, not a secondary article.
    - **No absolute superlatives without proof.** Use "appears to be", "reportedly", "among the first" unless trivially verifiable.
    - **Legal and policy claims need qualifiers.** Always attribute.
    - **Unsourced comparisons are banned.** Never compare without citation.
    - **Generic URLs are rejected.** Source URLs must link to the specific page.
    - **Self-check before PR.** "Could a skeptical reader verify every claim from the cited source alone?"
