---
title: "GLM-5: First Frontier Model Trained Entirely on Non-NVIDIA Hardware"
date: 2026-02-11
category: "Model Release"
signal: "game-changer"
affects: ["open-source", "self-hosting", "api", "agents", "infrastructure"]
source: "https://huggingface.co/blog/mlabonne/glm-5"
contributed_by: "@orzazade via ai-radar skill"
---

## What happened

Zhipu AI (z.ai) released GLM-5, a 744B MoE model with 40B active parameters, under the MIT license. It was trained entirely on 100,000 Huawei Ascend 910B processors — zero NVIDIA silicon. GLM-5 scores 77.8% on SWE-Bench Verified and 50 on the Artificial Analysis Intelligence Index, matching frontier proprietary models. A novel asynchronous RL technique called "slime" improves training throughput, and DeepSeek Sparse Attention reduces deployment cost while maintaining a 205K token context window.

## Why it matters

This is a triple first: the first frontier-class model trained entirely without NVIDIA GPUs, the first to ship at this performance tier under MIT license, and the first to prove the Huawei Ascend stack can produce globally competitive results. The geopolitical implications are significant — the AI compute monopoly assumption just broke. For developers, the MIT license means unrestricted commercial use, modification, and self-hosting of a model that genuinely competes with proprietary offerings. At $1.00/$3.20 per million tokens via API, it's also the best value play at frontier performance.

## Who should pay attention

Open-source AI advocates, teams evaluating self-hosted frontier models, infrastructure engineers watching the NVIDIA dependency landscape, AI policy researchers tracking compute geopolitics, and any developer who wants frontier performance without proprietary licensing restrictions.
