---
title: "Crius: Autonomous Code Improvement Engine with Self-Improving Prompts"
date: 2026-03-20
category: "Tool"
signal: "incremental"
affects: ["devtools", "backend", "frontend"]
source: "https://github.com/orzazade/crius"
contributed_by: "@orzazade via ai-radar skill"
radar_quadrant: "Tools"
radar_ring: "Assess"
rising: true
stars: 2
repo_url: "https://github.com/orzazade/crius"
---

## What happened

Crius is a new open-source autonomous code improvement engine that runs six specialized AI agents in a continuous loop on a server with Claude Code. You register a project, set a goal, and the system spawns agents for research, design extraction, quality hardening, feature building, evaluation (via Playwright and Lighthouse), and reflection. The Reflection Agent reads experiment outcomes, identifies failure patterns, and writes learned rules — making the system's prompts self-improving over time. Inspired by Karpathy's autoresearch but applied to codebases instead of ML research.

## Why it matters

The "register, sleep, wake up to better code" paradigm is an interesting take on autonomous development. While most AI coding tools require active human-in-the-loop interaction, Crius runs unattended and learns from its own mistakes via a dedicated Reflection Agent. The six-agent architecture (Research, Design, Quality, Feature, Evaluator, Reflection) separates concerns in a way that could scale better than monolithic agent approaches. Early-stage but worth watching as autonomous coding agents mature.

## Who should pay attention

- Developers interested in autonomous coding agents that run unattended
- Teams exploring self-improving AI systems with reflection loops
- Open-source contributors looking for early-stage projects to shape
