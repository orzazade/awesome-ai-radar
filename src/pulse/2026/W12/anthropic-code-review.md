---
title: "Anthropic Launches Multi-Agent Code Review for Claude Code"
date: 2026-03-09
category: "Tool"
signal: "notable"
affects: ["backend", "frontend", "devops"]
source: "https://thenewstack.io/anthropic-launches-a-multi-agent-code-review-tool-for-claude-code/"
contributed_by: "@orzazade via ai-radar skill"
radar_quadrant: "Tools"
radar_ring: "Trial"
---

## What happened

Anthropic launched Code Review as a new Claude Code capability on March 9, 2026. When a pull request opens on GitHub, the system dispatches multiple specialized AI agents in parallel — each targeting a different class of issue: logic errors, boundary conditions, API misuse, authentication flaws, and project convention violations. A verification step attempts to disprove each finding before results are posted. Surviving findings are deduplicated, ranked by severity, and posted as inline PR comments. In Anthropic's internal data, 54% of pull requests now receive substantive comments (up from 16%), with less than 1% of findings marked as incorrect by engineers.

## Why it matters

Automated code review has historically suffered from high false-positive rates, making developers ignore the noise. Anthropic's multi-agent approach with a built-in adversarial verification step addresses this directly. At $15-25 per review and about 20 minutes per PR, the economics are favorable for teams already drowning in AI-generated code that needs human review. This is currently in research preview for Claude Team and Enterprise customers.

## Who should pay attention

- Engineering teams using Claude Code for development
- DevOps engineers managing CI/CD pipelines and PR workflows
- Engineering managers concerned about code quality as AI-generated code volume increases
