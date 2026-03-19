---
title: "VS Code 1.111 Debuts Weekly Releases, Autopilot Mode, and Agent Permissions"
date: 2026-03-09
category: "Tool"
signal: "notable"
affects: ["ide", "developer-tools", "agents", "copilot"]
source: "https://github.com/microsoft/vscode-docs/blob/main/release-notes/v1_111.md"
contributed_by: "@orzazade via ai-radar skill"
---

## What happened

Microsoft released VS Code 1.111 on March 9, 2026, marking the start of a weekly Stable release cadence. The release introduces a three-tier agent permission system: Default Approvals (manual confirmation), Bypass Approvals (auto-approve all tool calls), and Autopilot (auto-approve, auto-retry, auto-respond until task completion). It also adds agent-scoped hooks for attaching pre- and post-processing logic to specific agents, and debug event snapshots for troubleshooting agent behavior.

## Why it matters

The Autopilot mode represents a significant shift in IDE philosophy — allowing AI agents to operate with full autonomy until a task is complete, without human confirmation at each step. The weekly release cadence means agent capabilities will iterate rapidly. Agent-scoped hooks enable customizable guardrails, addressing a key concern around autonomous agent actions.

## Who should pay attention

- VS Code users working with GitHub Copilot's agent features
- Developers building VS Code extensions that interact with AI agents
- Teams evaluating the tradeoff between agent autonomy and safety in their development workflow
