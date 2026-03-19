#!/usr/bin/env node

/**
 * generate-digest.js
 *
 * Generates a weekly digest from pulse entries, updates radar.json,
 * and recalculates contributor stats.
 *
 * Usage: node scripts/generate-digest.js [--week YYYY-WXX]
 *   If --week is omitted, uses the current ISO week.
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const ROOT = path.resolve(__dirname, "..");
const PULSE_DIR = path.join(ROOT, "src", "pulse");
const DATA_DIR = path.join(ROOT, "src", "_data");
const RADAR_PATH = path.join(DATA_DIR, "radar.json");
const CONTRIBUTORS_PATH = path.join(DATA_DIR, "contributors.json");

// ---------------------------------------------------------------------------
// Signal ordering (highest first)
// ---------------------------------------------------------------------------

const SIGNAL_ORDER = ["game-changer", "notable", "incremental", "noise"];
const SIGNAL_EMOJI = {
  "game-changer": "🔴",
  notable: "🟡",
  incremental: "🟢",
  noise: "⚪",
};

// ---------------------------------------------------------------------------
// ISO week helpers
// ---------------------------------------------------------------------------

function getISOWeek(date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return { year: d.getUTCFullYear(), week: weekNo };
}

function getISOWeekDateRange(year, week) {
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const dayOfWeek = jan4.getUTCDay() || 7;
  const monday = new Date(jan4);
  monday.setUTCDate(jan4.getUTCDate() - dayOfWeek + 1 + (week - 1) * 7);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  return { start: monday, end: sunday };
}

function formatDate(d) {
  return d.toISOString().split("T")[0];
}

// ---------------------------------------------------------------------------
// Frontmatter parser (zero-dependency)
// ---------------------------------------------------------------------------

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const raw = match[1];
  const data = {};
  let currentKey = null;
  let currentArray = null;

  for (const line of raw.split("\n")) {
    const arrayItem = line.match(/^\s+-\s+(.*)/);
    if (arrayItem && currentKey && currentArray) {
      currentArray.push(arrayItem[1].trim().replace(/^["']|["']$/g, ""));
      continue;
    }

    const kv = line.match(/^(\w[\w_]*):\s*(.*)/);
    if (kv) {
      if (currentKey && currentArray && currentArray.length > 0) {
        data[currentKey] = currentArray;
        currentArray = null;
      }

      const key = kv[1];
      let value = kv[2].trim();

      if (value === "" || value === "[]") {
        currentKey = key;
        currentArray = value === "[]" ? [] : [];
        if (value === "[]") {
          data[key] = [];
          currentKey = null;
          currentArray = null;
        }
        continue;
      }

      value = value.replace(/^["']|["']$/g, "");

      const inlineArr = value.match(/^\[(.*)\]$/);
      if (inlineArr) {
        data[key] = inlineArr[1]
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean);
        currentKey = null;
        currentArray = null;
        continue;
      }

      data[key] = value;
      currentKey = key;
      currentArray = null;
    }
  }

  if (currentKey && currentArray && currentArray.length > 0) {
    data[currentKey] = currentArray;
  }

  return data;
}

// ---------------------------------------------------------------------------
// Collect entries for a given week directory
// ---------------------------------------------------------------------------

function collectWeekEntries(weekDir) {
  const entries = [];
  if (!fs.existsSync(weekDir)) return entries;

  const files = fs
    .readdirSync(weekDir)
    .filter((f) => f.endsWith(".md") && f !== "digest.md");

  for (const file of files) {
    const filePath = path.join(weekDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const fm = parseFrontmatter(content);
    if (fm && fm.title) {
      entries.push({ ...fm, _file: file, _path: filePath });
    }
  }

  // Sort by signal level
  entries.sort((a, b) => {
    const ai = SIGNAL_ORDER.indexOf(a.signal);
    const bi = SIGNAL_ORDER.indexOf(b.signal);
    return ai - bi;
  });

  return entries;
}

// ---------------------------------------------------------------------------
// Generate digest markdown
// ---------------------------------------------------------------------------

function generateDigestMarkdown(entries, year, week, dateRange) {
  const weekLabel = `W${String(week).padStart(2, "0")}`;
  const dateStr = `${formatDate(dateRange.start)} – ${formatDate(dateRange.end)}`;

  const signalCounts = {};
  const categoryCounts = {};
  for (const e of entries) {
    signalCounts[e.signal] = (signalCounts[e.signal] || 0) + 1;
    categoryCounts[e.category] = (categoryCounts[e.category] || 0) + 1;
  }

  const lines = [
    "---",
    `title: "Weekly Digest — ${year} ${weekLabel}"`,
    `week: "${year}-${weekLabel}"`,
    `date: "${formatDate(dateRange.end)}"`,
    `entries: ${entries.length}`,
    "layout: digest.njk",
    "---",
    "",
    `# Weekly Digest — ${year} ${weekLabel}`,
    "",
    `**${dateStr}** | ${entries.length} entries`,
    "",
    "## This Week in Numbers",
    "",
    "### By Signal",
    "",
    "| Signal | Count |",
    "|--------|-------|",
  ];

  for (const signal of SIGNAL_ORDER) {
    if (signalCounts[signal]) {
      lines.push(
        `| ${SIGNAL_EMOJI[signal]} ${signal} | ${signalCounts[signal]} |`
      );
    }
  }

  lines.push(
    "",
    "### By Category",
    "",
    "| Category | Count |",
    "|----------|-------|"
  );

  for (const [cat, count] of Object.entries(categoryCounts).sort(
    (a, b) => b[1] - a[1]
  )) {
    lines.push(`| ${cat} | ${count} |`);
  }

  lines.push("");

  for (const signal of SIGNAL_ORDER) {
    const signalEntries = entries.filter((e) => e.signal === signal);
    if (signalEntries.length === 0) continue;

    lines.push(
      `## ${SIGNAL_EMOJI[signal]} ${signal.charAt(0).toUpperCase() + signal.slice(1)}`,
      ""
    );

    for (const e of signalEntries) {
      const slug = e._file.replace(/\.md$/, "");
      lines.push(`### [${e.title}](./${slug}/)`);
      lines.push("");
      lines.push(
        `**${e.category}** | ${(e.affects || []).join(", ")} | by ${e.contributed_by}`
      );
      lines.push("");
      if (e.what_happened) {
        lines.push(`> ${e.what_happened}`);
        lines.push("");
      }
      if (e.why_it_matters) {
        lines.push(`**Why it matters:** ${e.why_it_matters}`);
        lines.push("");
      }
    }
  }

  return lines.join("\n") + "\n";
}

// ---------------------------------------------------------------------------
// Update radar.json
// ---------------------------------------------------------------------------

// Map category to radar quadrant
function categoryToQuadrant(category) {
  const map = {
    "Model Release": "Models",
    "Tool": "Tools",
    "Framework": "Frameworks",
    "Paradigm": "Paradigms",
    "Infrastructure": "Tools",
    "Research": "Paradigms",
  };
  return map[category] || "Tools";
}

// Map signal to radar ring
function signalToRing(signal) {
  const map = {
    "game-changer": "Adopt",
    "notable": "Trial",
    "incremental": "Assess",
    "noise": "Hold",
  };
  return map[signal] || "Assess";
}

function updateRadar(entries) {
  let radar = { quadrants: ["Models", "Tools", "Frameworks", "Paradigms"], rings: ["Adopt", "Trial", "Assess", "Hold"], entries: [] };
  if (fs.existsSync(RADAR_PATH)) {
    try {
      const existing = JSON.parse(fs.readFileSync(RADAR_PATH, "utf-8"));
      if (existing.entries) radar = existing;
    } catch {
      // use defaults
    }
  }

  if (!Array.isArray(radar.entries)) {
    radar.entries = [];
  }

  const existingByTitle = new Map(radar.entries.map((b) => [b.title, b]));

  for (const entry of entries) {
    const quadrant = entry.radar_quadrant || categoryToQuadrant(entry.category);
    const ring = entry.radar_ring || signalToRing(entry.signal);

    // Build URL path from file path
    const slug = entry._file
      ? path.basename(entry._file, ".md")
      : entry.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const url = `/awesome-ai-radar/pulse/${slug}/`;

    const blip = {
      title: entry.title,
      quadrant: quadrant,
      ring: ring,
      signal: entry.signal,
      url: url,
    };

    if (existingByTitle.has(entry.title)) {
      const existing = existingByTitle.get(entry.title);
      Object.assign(existing, blip);
    } else {
      radar.entries.push(blip);
    }
  }

  radar.entries.sort((a, b) => {
    const ringOrder = { Adopt: 0, Trial: 1, Assess: 2, Hold: 3 };
    return (ringOrder[a.ring] || 9) - (ringOrder[b.ring] || 9);
  });

  fs.mkdirSync(path.dirname(RADAR_PATH), { recursive: true });
  fs.writeFileSync(RADAR_PATH, JSON.stringify(radar, null, 2) + "\n");
  console.log(`Updated ${RADAR_PATH} (${radar.entries.length} entries)`);
}

// ---------------------------------------------------------------------------
// Update contributors.json
// ---------------------------------------------------------------------------

function updateContributors() {
  const contributorMap = {};

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) {
        walk(full);
      } else if (item.name.endsWith(".md") && item.name !== "digest.md") {
        try {
          const content = fs.readFileSync(full, "utf-8");
          const fm = parseFrontmatter(content);
          if (fm && fm.contributed_by) {
            const user = fm.contributed_by;
            if (!contributorMap[user]) {
              contributorMap[user] = {
                username: user,
                entries: 0,
                signals: {},
              };
            }
            contributorMap[user].entries++;
            const sig = fm.signal || "unknown";
            contributorMap[user].signals[sig] =
              (contributorMap[user].signals[sig] || 0) + 1;
          }
        } catch {
          // skip unreadable files
        }
      }
    }
  }

  walk(PULSE_DIR);

  // Get first contribution date from git (safe: no user input in args)
  for (const user of Object.values(contributorMap)) {
    try {
      const log = execFileSync(
        "git",
        [
          "log",
          "--all",
          "--diff-filter=A",
          "--format=%aI",
          "--",
          "src/pulse/**/*.md",
        ],
        { cwd: ROOT, encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }
      ).trim();
      const lines = log.split("\n").filter(Boolean);
      if (lines.length > 0) {
        user.first_contribution = lines[lines.length - 1].split("T")[0];
      }
    } catch {
      // git not available or no history
    }
  }

  const contributors = Object.values(contributorMap).sort(
    (a, b) => b.entries - a.entries
  );

  fs.mkdirSync(path.dirname(CONTRIBUTORS_PATH), { recursive: true });
  fs.writeFileSync(
    CONTRIBUTORS_PATH,
    JSON.stringify(contributors, null, 2) + "\n"
  );
  console.log(
    `Updated ${CONTRIBUTORS_PATH} (${contributors.length} contributors)`
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  let targetYear, targetWeek;
  const weekArg = process.argv.indexOf("--week");
  if (weekArg !== -1 && process.argv[weekArg + 1]) {
    const match = process.argv[weekArg + 1].match(/^(\d{4})-W(\d{2})$/);
    if (match) {
      targetYear = parseInt(match[1]);
      targetWeek = parseInt(match[2]);
    } else {
      console.error("Invalid --week format. Use YYYY-WXX (e.g., 2026-W12)");
      process.exit(1);
    }
  } else {
    const now = new Date();
    const isoWeek = getISOWeek(now);
    targetYear = isoWeek.year;
    targetWeek = isoWeek.week;
  }

  const weekLabel = `W${String(targetWeek).padStart(2, "0")}`;
  const weekDir = path.join(PULSE_DIR, String(targetYear), weekLabel);

  console.log(`Generating digest for ${targetYear}-${weekLabel}`);
  console.log(`Looking in: ${weekDir}`);

  const entries = collectWeekEntries(weekDir);

  if (entries.length === 0) {
    console.log("No entries found for this week. Nothing to generate.");
    updateRadar([]);
    updateContributors();
    return;
  }

  console.log(`Found ${entries.length} entries`);

  const dateRange = getISOWeekDateRange(targetYear, targetWeek);
  const digestContent = generateDigestMarkdown(
    entries,
    targetYear,
    targetWeek,
    dateRange
  );

  const digestPath = path.join(weekDir, "digest.md");
  fs.writeFileSync(digestPath, digestContent);
  console.log(`Generated digest: ${digestPath}`);

  updateRadar(entries);
  updateContributors();

  console.log("Done.");
}

main();
