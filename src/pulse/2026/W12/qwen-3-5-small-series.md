---
title: "Alibaba's Qwen 3.5 9B Outperforms OpenAI's 120B on Graduate-Level Reasoning"
date: 2026-03-02
category: "Model Release"
signal: "game-changer"
affects: ["open-source", "edge-deployment", "efficiency", "multimodal"]
source: "https://huggingface.co/Qwen/Qwen3.5-9B"
contributed_by: "@orzazade via ai-radar skill"
---

## What happened

Alibaba's Qwen Team released the Qwen 3.5 Small series on March 2, 2026 — four models at 0.8B, 2B, 4B, and 9B parameters, all under Apache 2.0. According to the official model card, the flagship 9B model scores 81.7 on GPQA Diamond, surpassing OpenAI's GPT-OSS-120B (80.1) on the same benchmark despite having over thirteen times fewer parameters. All models are natively multimodal (text, images, video) with a 262k context window extensible to over 1M tokens via YaRN scaling.

## Why it matters

A 9B model beating a 120B model on graduate-level reasoning fundamentally changes the efficiency calculus for AI deployment. Models this small run on consumer hardware — laptops, phones, edge devices — without cloud dependencies. The Apache 2.0 license and multimodal capabilities mean developers can build production applications with frontier-level reasoning that run entirely on-device. This accelerates the shift from cloud-dependent to local-first AI.

## Who should pay attention

- Mobile and edge developers who need strong reasoning without cloud round-trips
- Teams running self-hosted inference who want to dramatically reduce compute costs
- Researchers studying efficient architectures, particularly the Gated Delta Networks + MoE combination
- Privacy-focused applications that require on-device processing of text, images, and video
