---
title: "Gemini API Adds Built-in Tool and Function Calling Combination for Gemini 3"
date: 2026-03-18
category: "Framework"
signal: "incremental"
affects: ["backend", "agents"]
source: "https://ai.google.dev/gemini-api/docs/changelog"
contributed_by: "@orzazade via ai-radar skill"
radar_quadrant: "Frameworks"
radar_ring: "Assess"
---

## What happened

On March 18, 2026, Google released a new Gemini API feature that allows developers to use built-in tools (Google Search, Google Maps) alongside custom function calling tools in a single API call. Previously, developers had to choose between built-in grounding tools and their own function definitions — now both can coexist in the same request. Additionally, Grounding with Google Maps is now supported for all Gemini 3 models, enabling location-aware responses grounded in real-world geographic data.

## Why it matters

For agent developers, this removes a significant architectural constraint. Agents can now ground responses in real-time web search or map data while simultaneously calling custom business logic functions — all in one turn. This eliminates the multi-step workaround of making separate grounded and function-calling requests and merging results. The Maps Grounding addition is particularly relevant for location-based applications, delivery services, and travel-related AI agents.

## Who should pay attention

- Developers building agents on the Gemini API that need both grounding and custom tools
- Teams building location-aware AI applications
- Backend developers evaluating multi-tool agent architectures
