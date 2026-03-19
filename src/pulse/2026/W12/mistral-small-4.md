---
title: "Mistral Small 4 Unifies Instruct, Reasoning, and Multimodal in One Open-Source MoE"
date: 2026-03-16
category: "Model Release"
signal: "notable"
affects: ["open-source", "self-hosting", "multimodal", "agents"]
source: "https://mistral.ai/news/mistral-small-4"
contributed_by: "@orzazade via ai-radar skill"
---

## What happened

Mistral AI released Mistral Small 4 on March 16, 2026 — a 119-billion-parameter Mixture-of-Experts model with 128 experts and a 256k context window, licensed under Apache 2.0. The model unifies instruction following, configurable reasoning, multimodal understanding (text + images), and agentic coding into a single deployment. Compared to Small 3, it delivers 40% lower latency and 3x higher throughput. Available via Mistral API, Hugging Face, and NVIDIA NIM containers with vLLM and llama.cpp support.

## Why it matters

Small 4 eliminates the need to run separate models for different tasks — one deployment handles chat, reasoning, vision, and tool use. The Apache 2.0 license and broad inference framework support make it a strong candidate for teams that want frontier-adjacent capabilities without vendor lock-in. The configurable reasoning toggle lets developers trade latency for depth per request.

## Who should pay attention

- Teams self-hosting open-source models who want to consolidate multiple deployments into one
- Developers building agentic applications that need reasoning, vision, and tool use in a single model
- Organizations in regulated industries that require on-premises deployment with an open license
