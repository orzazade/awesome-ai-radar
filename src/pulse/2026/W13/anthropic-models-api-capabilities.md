---
title: "Anthropic Models API Now Returns Capability Fields for Programmatic Discovery"
date: 2026-03-18
category: "Tool"
signal: "incremental"
affects: ["api", "backend", "devtools"]
source: "https://docs.anthropic.com/en/release-notes/overview"
contributed_by: "@orzazade via ai-radar skill"
radar_quadrant: "Tools"
radar_ring: "Assess"
---

## What happened

On March 18, 2026, Anthropic updated the Models API (`GET /v1/models` and `GET /v1/models/{model_id}`) to return structured capability metadata for each model. Responses now include `max_input_tokens`, `max_tokens`, and a `capabilities` object describing what each model supports. Previously, developers had to consult documentation or maintain their own lookup tables to know which features each model supported — now this information is queryable at runtime.

## Why it matters

This is a small but practically useful API improvement for developers building multi-model or model-switching systems. Applications that route requests to the cheapest capable model, validate user requests against model constraints, or display model information to end users can now retrieve that data dynamically from the API rather than hardcoding it. As the Claude model family expands and capabilities change across versions, programmatic discovery reduces the risk of subtle bugs caused by stale capability assumptions baked into application code.

## Who should pay attention

- API developers who build applications on top of multiple Claude models and need to handle capability differences programmatically
- Teams building model-routing or model-selection logic in their applications
- Developers who want to future-proof their integrations against capability changes in new model releases
