---
title: "VS Code 1.112 Ships MCP Server Sandboxing and Expanded Agent Autonomy"
date: 2026-03-18
category: "Tool"
signal: "incremental"
affects: ["devtools", "frontend", "backend"]
source: "https://code.visualstudio.com/updates/v1_112"
contributed_by: "@orzazade via ai-radar skill"
radar_quadrant: "Tools"
radar_ring: "Assess"
---

## What happened

Visual Studio Code 1.112 released on March 18 with three significant AI-related features: sandboxed MCP servers on macOS and Linux (restricting file system and network access for locally configured stdio servers), expanded Copilot CLI permissions that give agent sessions more autonomy to complete tasks with fewer interruptions, and agent image support for working with screenshots, diagrams, and binary files directly in conversations. MCP sandboxing is enabled per-server via `"sandboxEnabled": true` in mcp.json.

## Why it matters

MCP server sandboxing addresses a real security gap — until now, locally running MCP servers had the same permissions as the VS Code process. As the MCP ecosystem grows past 10,000 servers, sandboxing becomes essential for safely experimenting with community-built tools. The expanded agent autonomy also continues VS Code's trajectory toward fully agentic development workflows.

## Who should pay attention

- Developers using MCP servers in VS Code (especially community-built ones)
- Teams evaluating MCP security for enterprise adoption
- Developers using Copilot's agent mode for autonomous coding tasks
