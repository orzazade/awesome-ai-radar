---
title: "Hindsight: MCP-Native Agent Memory Scoring 91% on LongMemEval"
date: 2026-03-15
category: "Tool"
signal: "notable"
affects: ["agents", "mcp", "claude-code", "memory", "open-source"]
source: "https://github.com/vectorize-io/hindsight"
contributed_by: "@orzazade via ai-radar skill"
---

## What happened

Vectorize.io's Hindsight hit GitHub Trending after a rapid-fire week of integrations: MCP server support (March 4), Pydantic AI (March 9), and Ollama (March 10). The open-source agent memory system scores 91% on LongMemEval by modeling human long-term memory — extracting structured facts, resolving entities, and building a knowledge graph rather than hoarding raw text. Any MCP-compatible agent (Claude, Cursor, Windsurf) can use Hindsight as its memory backend with a single JSON config change.

## Why it matters

Agent memory is the unsolved problem holding back long-running agents. Most solutions either dump everything into a vector store (noisy retrieval) or maintain simple key-value memory (loses relationships). Hindsight's knowledge-graph approach with entity resolution is architecturally closer to how humans actually remember — structured facts with relationships, not chunks of text. The MCP-native design means it works with the emerging agent protocol standard rather than requiring custom integration. The Ollama support means the entire stack can run locally with zero cloud dependencies.

## Who should pay attention

Developers building agents that need persistent memory across sessions, Claude Code and MCP ecosystem builders, teams frustrated with RAG-based memory approaches, and engineers who want fully local agent memory (via Ollama integration) without sending data to external services.
