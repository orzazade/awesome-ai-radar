---
title: "Cloudflare Workers AI Enters the Frontier Model Game with Kimi K2.5"
date: 2026-03-19
category: "Infrastructure"
signal: "notable"
affects: ["backend", "infrastructure", "agents"]
source: "https://blog.cloudflare.com/workers-ai-large-models/"
contributed_by: "@orzazade via ai-radar skill"
radar_quadrant: "Tools"
radar_ring: "Trial"
---

## What happened

On March 19, 2026, Cloudflare announced that Workers AI now supports frontier-scale open-source models, starting with Moonshot AI's Kimi K2.5. This is the first time a model of this scale has been available on Cloudflare's edge inference platform. Kimi K2.5 runs with a full 256k context window and supports multi-turn tool calling, vision inputs, and structured outputs. Cloudflare also introduced prefix caching with discounted pricing for cached tokens and a new x-session-affinity header that routes requests to the same model instance for improved cache hit rates. In Cloudflare's own usage, an internal agent performing security code reviews processes over 7 billion tokens per day and caught more than 15 confirmed issues in a single codebase, at 77% lower cost compared to a mid-tier proprietary model.

## Why it matters

Cloudflare positioning itself as a frontier model inference platform changes the economics of agent deployment. Workers AI already provides the execution environment (Durable Objects for state, Workflows for long-running tasks, Sandbox for secure execution), and now it adds the model layer too. The 77% cost reduction figure is compelling — it suggests that edge-deployed open-source models can undercut proprietary API pricing significantly while keeping latency low. The session affinity feature specifically targets agentic workloads where conversation continuity matters for cache efficiency.

## Who should pay attention

- Backend developers deploying AI agents on Cloudflare Workers
- Teams evaluating inference cost optimization for high-volume AI workloads
- Developers building edge-first AI applications with tool-calling agents
