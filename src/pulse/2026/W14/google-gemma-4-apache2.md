---
title: "Google Gemma 4: Apache 2.0 Open Models with On-Device Agentic Capabilities"
date: 2026-04-02
category: "Model Release"
signal: "notable"
affects: ["backend", "mobile", "edge", "ml-engineers"]
source: "https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/"
contributed_by: "@orzazade via ai-radar skill"
radar_quadrant: "Models"
radar_ring: "Trial"
---

## What happened

Google DeepMind launched Gemma 4 on April 2, 2026, a family of open models released under the Apache 2.0 license — a significant shift from previous Gemma releases to more permissive terms. The family spans four sizes, from a 2B edge model that runs on a Raspberry Pi to a 31B dense model for workstation-class deployments. Gemma 4 supports over 140 languages and enables on-device agentic capabilities including multi-step planning, autonomous action, and audio-visual processing without specialized fine-tuning. The edge variants activate an effective 2B–4B parameter footprint during inference to preserve RAM and battery life, running up to four times faster than previous Gemma versions with up to 60% less battery consumption.

## Why it matters

Apache 2.0 licensing removes the friction that kept many commercial teams from adopting Gemma. The on-device agentic capabilities mean developers can build AI agents that run entirely offline on phones, IoT devices, and embedded systems — no cloud round-trip required. For teams building mobile or edge AI products, Gemma 4 is among the most capable open models available at these sizes.

## Who should pay attention

- Mobile and embedded developers building on-device AI features
- ML engineers evaluating open models for commercial deployment
- Backend teams needing lightweight inference without GPU servers
- Companies in regulated industries requiring offline AI processing
