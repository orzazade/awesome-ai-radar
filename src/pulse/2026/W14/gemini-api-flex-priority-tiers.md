---
title: "Google Gemini API Introduces Flex and Priority Inference Tiers"
date: 2026-04-01
category: "Infrastructure"
signal: "notable"
affects: ["backend", "devops", "ml-engineers"]
source: "https://blog.google/innovation-and-ai/technology/developers-tools/introducing-flex-and-priority-inference/"
contributed_by: "@orzazade via ai-radar skill"
radar_quadrant: "Tools"
radar_ring: "Trial"
---

## What happened

Google added two new service tiers to the Gemini API on April 1, 2026: Flex and Priority. Flex is a cost-optimized synchronous tier offering 50% price savings for latency-tolerant workloads (target latency 1–15 minutes, non-guaranteed). Unlike the Batch API, Flex uses the same familiar endpoints without managing input/output files. Priority offers the highest reliability at a 75–100% premium over standard rates, routing requests to non-sheddable high-criticality compute queues with millisecond-to-second latency. Both tiers are available for GenerateContent and Interactions API endpoints.

## Why it matters

This is a meaningful step toward production-grade inference cost management. Teams can now route batch processing, background summarization, and non-interactive workloads through Flex at half cost, while keeping user-facing features on Priority for guaranteed uptime. The synchronous interface means no workflow changes — just a tier flag.

## Who should pay attention

- Backend developers running Gemini API in production
- DevOps teams managing AI inference costs at scale
- Product teams with mixed latency requirements (interactive + batch)
