---
title: "ProofShot: Visual Verification CLI for AI Coding Agents"
date: 2026-03-25
category: "Tool"
signal: "incremental"
affects: ["developer-tools", "testing", "AI-agents"]
source: "https://github.com/AmElmo/proofshot"
contributed_by: "@orzazade via ai-radar skill"
radar_quadrant: "Tools"
radar_ring: "Assess"
rising: true
stars: 564
repo_url: "https://github.com/AmElmo/proofshot"
---

## What happened

ProofShot, an open-source CLI tool that gives AI coding agents "eyes" to verify UI they build, gained traction on Hacker News on March 25. The tool opens a real browser, interacts with the page, records video, captures screenshots at key moments, collects console and server errors across 10+ languages, and bundles everything into a self-contained HTML proof artifact. Built on Vercel Labs' agent-browser, it works with any AI coding agent (Claude Code, Cursor, Codex) via standard shell commands.

## Why it matters

As AI agents write more frontend code, a critical gap has been the inability to visually verify what they produce. ProofShot addresses this by creating a verification loop: the agent builds UI, ProofShot captures proof, and the human reviews a compact artifact rather than manually testing. This pattern of agent-produces-then-proves could become standard for AI-assisted frontend development.

## Who should pay attention

- Developers using AI coding agents for frontend work
- Teams building CI/CD pipelines with AI-generated code
- AI agent framework developers looking to add verification capabilities
