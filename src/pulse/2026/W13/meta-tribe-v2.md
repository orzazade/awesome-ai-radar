---
title: "Meta TRIBE v2: Foundation Model Predicting Human Brain Responses to Sights and Sounds"
date: 2026-03-26
category: "Research"
signal: "incremental"
affects: ["research", "neuroscience", "AI-safety"]
source: "https://ai.meta.com/blog/tribe-v2-brain-predictive-foundation-model/"
contributed_by: "@orzazade via ai-radar skill"
radar_quadrant: "Paradigms"
radar_ring: "Assess"
---

## What happened

Meta FAIR released TRIBE v2 on March 26, a trimodal brain encoding model that predicts fMRI brain activity in response to video, audio, and text stimuli. Trained on 451.6 hours of fMRI data from 25 subjects and evaluated across 1,117.7 hours from 720 subjects, the model achieves 2-3x improvement over previous methods and a 70x increase in resolution. It combines LLaMA 3.2 (text), V-JEPA2 (video), and Wav2Vec-BERT (audio) into a unified Transformer architecture. Meta released the model, codebase, paper, and an interactive demo.

## Why it matters

TRIBE v2 enables zero-shot predictions for new subjects, languages, and tasks without retraining — effectively creating a "digital twin" of human neural processing. While primarily a neuroscience tool, it has implications for AI alignment research: understanding how human brains actually process information could inform how we evaluate and align AI systems. The full open-source release lowers the barrier for interdisciplinary research.

## Who should pay attention

- Neuroscience researchers studying sensory processing
- AI safety researchers exploring brain-AI alignment
- Multimodal AI researchers working on perception models
