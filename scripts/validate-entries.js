#!/usr/bin/env node

/**
 * validate-entries.js
 *
 * Validates AI Radar pulse entries against the schema, checks for duplicates,
 * and verifies source URL domains against an allowlist.
 *
 * Usage: node scripts/validate-entries.js <file1.md> [file2.md ...]
 * Output: JSON with schemaErrors, duplicates, and urlViolations arrays.
 *
 * Requires: ajv (devDependency)
 */

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const SCHEMA_PATH = path.resolve(__dirname, "..", "schema", "entry.schema.json");
const PULSE_DIR = path.resolve(__dirname, "..", "src", "pulse");

const URL_ALLOWLIST = [
  "github.com",
  "github.blog",
  "arxiv.org",
  "anthropic.com",
  "openai.com",
  "huggingface.co",
  "deepmind.google",
  "ai.meta.com",
  "blog.google",
  "news.ycombinator.com",
  "reddit.com",
  "x.com",
  "twitter.com",
  "pytorch.org",
  "tensorflow.org",
  "docs.mistral.ai",
  "ollama.com",
  "vercel.com",
  "nextjs.org",
  "arstechnica.com",
  "techcrunch.com",
  "theverge.com",
  "wired.com",
  "langchain.dev",
  "docs.anthropic.com",
  "platform.openai.com",
  "cloud.google.com",
  "aws.amazon.com",
  "learn.microsoft.com",
  "developer.nvidia.com",
];

const DUPLICATE_THRESHOLD = 0.8;

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
    // Array item
    const arrayItem = line.match(/^\s+-\s+(.*)/);
    if (arrayItem && currentKey && currentArray) {
      currentArray.push(arrayItem[1].trim().replace(/^["']|["']$/g, ""));
      continue;
    }

    // Key-value pair
    const kv = line.match(/^(\w[\w_]*):\s*(.*)/);
    if (kv) {
      // Flush previous array
      if (currentKey && currentArray) {
        data[currentKey] = currentArray;
        currentArray = null;
      }

      const key = kv[1];
      let value = kv[2].trim();

      if (value === "" || value === "[]") {
        // Could be start of array block or empty value
        currentKey = key;
        currentArray = value === "[]" ? [] : [];
        if (value === "[]") {
          data[key] = [];
          currentKey = null;
          currentArray = null;
        }
        continue;
      }

      // Remove quotes
      value = value.replace(/^["']|["']$/g, "");

      // Inline array: [a, b, c]
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

  // Flush trailing array
  if (currentKey && currentArray && currentArray.length > 0) {
    data[currentKey] = currentArray;
  }

  return data;
}

// ---------------------------------------------------------------------------
// Levenshtein distance
// ---------------------------------------------------------------------------

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  return dp[m][n];
}

function similarity(a, b) {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - levenshtein(a.toLowerCase(), b.toLowerCase()) / maxLen;
}

// ---------------------------------------------------------------------------
// Collect all existing entry titles
// ---------------------------------------------------------------------------

function collectExistingTitles(excludeFiles) {
  const titles = [];
  const excludeSet = new Set(excludeFiles.map((f) => path.resolve(f)));

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (
        entry.name.endsWith(".md") &&
        entry.name !== "digest.md" &&
        !excludeSet.has(fullPath)
      ) {
        try {
          const content = fs.readFileSync(fullPath, "utf-8");
          const fm = parseFrontmatter(content);
          if (fm && fm.title) {
            titles.push({ title: fm.title, file: fullPath });
          }
        } catch {
          // skip unreadable files
        }
      }
    }
  }

  walk(PULSE_DIR);
  return titles;
}

// ---------------------------------------------------------------------------
// URL allowlist check
// ---------------------------------------------------------------------------

function getDomain(urlStr) {
  try {
    const u = new URL(urlStr);
    // Strip www. prefix for matching
    return u.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function isDomainAllowed(domain) {
  if (!domain) return false;
  return URL_ALLOWLIST.some(
    (allowed) => domain === allowed || domain.endsWith("." + allowed)
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const files = process.argv.slice(2);

  if (files.length === 0) {
    console.log(
      JSON.stringify({ schemaErrors: [], duplicates: [], urlViolations: [] })
    );
    process.exit(0);
  }

  // Load schema
  const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, "utf-8"));
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(schema);

  const existingTitles = collectExistingTitles(files);

  const schemaErrors = [];
  const duplicates = [];
  const urlViolations = [];
  const newTitles = [];

  for (const file of files) {
    // Skip non-entry files (digests, pulse.json, etc.)
    const basename = path.basename(file);
    if (basename === "digest.md" || basename === "pulse.json" || !file.endsWith(".md")) {
      continue;
    }

    const filePath = path.resolve(file);

    if (!fs.existsSync(filePath)) {
      schemaErrors.push({
        file,
        message: `File not found: ${file}`,
      });
      continue;
    }

    const content = fs.readFileSync(filePath, "utf-8");
    const frontmatter = parseFrontmatter(content);

    if (!frontmatter) {
      schemaErrors.push({
        file,
        message: `No valid frontmatter found in ${file}`,
      });
      continue;
    }

    // --- Schema validation ---
    const valid = validate(frontmatter);
    if (!valid) {
      for (const err of validate.errors) {
        schemaErrors.push({
          file,
          message: `${file}: ${err.instancePath || "root"} ${err.message}`,
        });
      }
    }

    // --- Duplicate detection ---
    if (frontmatter.title) {
      const title = frontmatter.title;

      // Check against existing entries
      for (const existing of existingTitles) {
        const sim = similarity(title, existing.title);
        if (sim >= DUPLICATE_THRESHOLD) {
          duplicates.push({
            file,
            message: `"${title}" is ${Math.round(sim * 100)}% similar to existing entry "${existing.title}" (${path.relative(process.cwd(), existing.file)})`,
          });
        }
      }

      // Check against other new entries in this PR
      for (const prev of newTitles) {
        const sim = similarity(title, prev.title);
        if (sim >= DUPLICATE_THRESHOLD) {
          duplicates.push({
            file,
            message: `"${title}" is ${Math.round(sim * 100)}% similar to another new entry "${prev.title}" (${prev.file})`,
          });
        }
      }

      newTitles.push({ title, file });
    }

    // --- URL allowlist check ---
    if (frontmatter.source) {
      const domain = getDomain(frontmatter.source);
      if (!isDomainAllowed(domain)) {
        urlViolations.push({
          file,
          domain: domain || "invalid-url",
          url: frontmatter.source,
        });
      }
    }
  }

  console.log(JSON.stringify({ schemaErrors, duplicates, urlViolations }));

  // Exit with error code if schema errors found (for non-CI usage)
  if (schemaErrors.length > 0) {
    process.exit(1);
  }
}

try {
  main();
} catch (err) {
  console.log(
    JSON.stringify({
      schemaErrors: [{ file: "validate-entries.js", message: err.message }],
      duplicates: [],
      urlViolations: [],
    })
  );
  process.exit(1);
}
