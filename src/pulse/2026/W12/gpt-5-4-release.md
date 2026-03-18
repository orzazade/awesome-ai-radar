---
title: "GPT-5.4 Ships in Three Variants with 1.05M Context"
date: 2026-03-05
category: "Model Release"
signal: "incremental"
affects: ["api", "chatgpt", "enterprise"]
source: "https://releasebot.io/updates/openai"
contributed_by: "@orzazade via ai-radar skill"
---

## What happened

OpenAI released GPT-5.4 in three variants — Standard, Thinking, and Pro — supporting context windows up to 1.05 million tokens. The model reduces individual claim errors by 33% and full-response errors by 18% compared to GPT-5.2. Concurrently, OpenAI retired GPT-5.1 models from ChatGPT, auto-migrating conversations to 5.3 or 5.4 variants.

## Why it matters

GPT-5.4 is an iterative improvement rather than a paradigm shift. The three-variant approach (Standard/Thinking/Pro) mirrors what other labs already offer, and the accuracy improvements, while meaningful, are incremental. The 1.05M context window brings OpenAI to parity with Anthropic and Google rather than establishing a lead. The GPT-5.1 deprecation signals OpenAI's increasingly aggressive model rotation cycle.

## Who should pay attention

Teams currently on GPT-5.1 or 5.2 who need to plan migration, developers comparing frontier model pricing and capabilities across labs, and ChatGPT API users who should test their prompts against 5.4 for regressions.
