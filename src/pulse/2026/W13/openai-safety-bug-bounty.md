---
title: "OpenAI Launches Safety Bug Bounty for AI Agent Vulnerabilities"
date: 2026-03-25
category: "Infrastructure"
signal: "notable"
affects: ["security", "AI-agents", "MCP"]
source: "https://openai.com/index/safety-bug-bounty/"
contributed_by: "@orzazade via ai-radar skill"
radar_quadrant: "Tools"
radar_ring: "Trial"
---

## What happened

OpenAI launched a public Safety Bug Bounty program on March 25, hosted on Bugcrowd, focused on identifying AI abuse and safety risks that fall outside traditional security vulnerabilities. The program specifically targets third-party prompt injection and data exfiltration in agentic products (including Browser and ChatGPT Agent), MCP-related risks, exposure of proprietary model information, and account/platform integrity bypasses. Jailbreaks are explicitly out of scope.

## Why it matters

This is reportedly the first dedicated bug bounty program focused on AI agent safety rather than conventional software security. With agentic AI products gaining real-world deployment — including MCP integrations, browser agents, and autonomous task execution — the attack surface has expanded beyond prompt injection into multi-step agent manipulation. Formalizing a bounty for these risks acknowledges that agent security requires its own discipline.

## Who should pay attention

- Security researchers interested in AI-specific vulnerability classes
- Developers building MCP servers or agentic AI applications
- Enterprise teams deploying AI agents in production environments
- AI safety researchers tracking industry response to agentic risks
