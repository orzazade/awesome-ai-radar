---
title: "Claude Code Ships 16 Releases in March: Voice Mode, /loop, 128k Output"
date: 2026-03-17
category: "Tool"
signal: "notable"
affects: ["developer-tools", "cli", "agents", "plugins"]
source: "https://github.com/anthropics/claude-code/releases"
contributed_by: "@orzazade via ai-radar skill"
---

## What happened

Anthropic released 16 versions of Claude Code in March 2026 (v2.1.63 through v2.1.79), introducing push-to-talk voice mode via `/voice`, recurring task scheduling with `/loop`, configurable effort levels via `/effort`, and increased maximum output tokens to 128k for Opus 4.6 and Sonnet 4.6. Other additions include a StopFailure hook event for error handling, last-modified timestamps on memory files, and language support for 10 additional languages in voice mode.

## Why it matters

Claude Code is evolving from a coding assistant into a general-purpose developer agent platform. The `/loop` command enables autonomous recurring tasks, hooks provide programmatic control over agent behavior, and voice mode opens new interaction patterns. The 128k output token limit removes a practical constraint for large-scale code generation and refactoring tasks.

## Who should pay attention

- Developers using Claude Code as their primary coding agent
- Teams building Claude Code plugins, hooks, or skills
- Developers evaluating agentic coding tools (Claude Code vs Cursor vs Codex)
