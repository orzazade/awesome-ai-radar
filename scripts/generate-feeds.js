#!/usr/bin/env node
/**
 * Per-stack RSS feed generator for awesome-ai-radar.
 *
 * Reads all pulse markdown entries and generates one Atom feed per unique
 * "affects" tag at _site/feeds/<tag>.xml.
 *
 * Run after the 11ty build:
 *   node scripts/generate-feeds.js
 *
 * This script exists because generating per-tag feeds dynamically in 11ty's
 * data cascade is non-trivial. The main build handles the "all entries" feed
 * via src/feeds/feeds.njk; this script supplements it with per-stack feeds.
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const PULSE_DIR = path.join(__dirname, "..", "src", "pulse");
const OUTPUT_DIR = path.join(__dirname, "..", "_site", "feeds");
const SITE_URL = "https://orzazade.github.io/awesome-ai-radar";
const SITE_TITLE = "awesome-ai-radar";

function findMarkdownFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results.push(...findMarkdownFiles(fullPath));
    } else if (item.name.endsWith(".md")) {
      results.push(fullPath);
    }
  }
  return results;
}

function escapeXml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateAtomFeed(tag, entries) {
  const sorted = entries.sort((a, b) => new Date(b.date) - new Date(a.date));
  const updated = sorted[0]
    ? new Date(sorted[0].date).toISOString()
    : new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE_TITLE)} — ${escapeXml(tag)}</title>
  <subtitle>Entries affecting ${escapeXml(tag)}</subtitle>
  <link href="${SITE_URL}/feeds/${encodeURIComponent(tag)}.xml" rel="self" type="application/atom+xml"/>
  <link href="${SITE_URL}/" rel="alternate" type="text/html"/>
  <updated>${updated}</updated>
  <id>${SITE_URL}/feeds/${encodeURIComponent(tag)}</id>
`;

  for (const entry of sorted) {
    const slug = path.basename(entry.filePath, ".md");
    const entryUrl = `${SITE_URL}/pulse/${slug}/`;
    const published = new Date(entry.date).toISOString();

    xml += `  <entry>
    <title>${escapeXml(entry.title)}</title>
    <link href="${entryUrl}" rel="alternate" type="text/html"/>
    <id>${entryUrl}</id>
    <published>${published}</published>
    <updated>${published}</updated>
    <category term="${escapeXml(entry.category || "")}"/>
    <summary>${escapeXml(entry.signal || "")} — ${escapeXml(entry.category || "")}</summary>
    <content type="html">${escapeXml(entry.content || "")}</content>
  </entry>
`;
  }

  xml += `</feed>\n`;
  return xml;
}

function main() {
  const files = findMarkdownFiles(PULSE_DIR);
  if (files.length === 0) {
    console.log("No pulse entries found. Skipping per-stack feed generation.");
    return;
  }

  // Parse all entries and group by affects tag
  const tagMap = {};

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    const affects = data.affects || [];
    const entry = {
      title: data.title || path.basename(filePath, ".md"),
      date: data.date || new Date().toISOString(),
      signal: data.signal || "incremental",
      category: data.category || "",
      content: content,
      filePath: filePath,
    };

    for (const tag of affects) {
      const key = tag.toLowerCase().trim();
      if (!tagMap[key]) tagMap[key] = [];
      tagMap[key].push(entry);
    }
  }

  // Generate feeds
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const tags = Object.keys(tagMap);
  for (const tag of tags) {
    const xml = generateAtomFeed(tag, tagMap[tag]);
    const outPath = path.join(OUTPUT_DIR, `${tag}.xml`);
    fs.writeFileSync(outPath, xml, "utf8");
    console.log(`Generated: feeds/${tag}.xml (${tagMap[tag].length} entries)`);
  }

  console.log(`Done. ${tags.length} per-stack feeds generated.`);
}

main();
