---
title: "Gemini 3.1 Flash Live: Real-Time Audio-to-Audio Model for Voice Agents"
date: 2026-03-26
category: "Model Release"
signal: "notable"
affects: ["backend", "voice", "AI-agents"]
source: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-live/"
contributed_by: "@orzazade via ai-radar skill"
radar_quadrant: "Models"
radar_ring: "Trial"
---

## What happened

Google released Gemini 3.1 Flash Live on March 26, a dedicated audio-to-audio model optimized for real-time dialogue and voice-first AI applications. The model offers improved acoustic nuance detection (pitch, pace), lower latency than its predecessor (2.5 Flash Native Audio), numeric precision for reading back numbers and codes, and multimodal awareness. It supports 90+ languages, is available via the Gemini Live API in Google AI Studio and Vertex AI, and all output is watermarked with SynthID. Gemini Live now works in over 200 countries.

## Why it matters

This is Google's first purpose-built audio-to-audio model, separate from its text-focused model line. For developers building voice agents, the low-latency A2A architecture eliminates the text-to-speech-to-text roundtrip that adds delay in traditional pipelines. The 90+ language support and broad availability make it immediately usable for production voice applications at global scale.

## Who should pay attention

- Developers building conversational AI agents and voice interfaces
- Teams using Google AI Studio or Vertex AI for real-time applications
- Companies building customer support or call center automation
