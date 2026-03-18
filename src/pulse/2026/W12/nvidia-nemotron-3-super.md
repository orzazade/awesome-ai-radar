---
title: "NVIDIA Nemotron 3 Super: Hybrid Mamba-Transformer MoE for Agentic AI"
date: 2026-03-11
category: "Model Release"
signal: "notable"
affects: ["agents", "inference", "self-hosting", "enterprise"]
source: "https://blogs.nvidia.com/blog/nemotron-3-super-agentic-ai/"
contributed_by: "@orzazade via ai-radar skill"
---

## What happened

NVIDIA announced Nemotron 3 Super at GTC 2026 — a 120B parameter hybrid model combining Mamba, Transformer, and MoE architectures with only 12B active parameters per token. It scores 60.47% on SWE-Bench Verified (vs GPT-OSS's 41.90%), supports a 1M token context window, and delivers 5x higher throughput than its predecessor. The model is released with open weights.

## Why it matters

The hybrid Mamba-Transformer architecture is the real story here. By keeping only 12B parameters active per token in a 120B model, NVIDIA achieves frontier-level agentic reasoning at a fraction of the compute cost. The 1M context window means agents can maintain full workflow state without goal drift. For teams building agentic systems, this is the first open-weight model purpose-built for agent workloads rather than retrofitted from a chat model.

## Who should pay attention

Teams building AI agent systems, engineers running inference on NVIDIA hardware, organizations evaluating open-weight models for self-hosted deployments, and anyone interested in the Mamba architecture as an alternative to pure Transformers.
