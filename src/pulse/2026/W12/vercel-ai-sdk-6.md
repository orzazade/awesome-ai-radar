---
title: "Vercel AI SDK 6 Adds Agents, Tool Approval, and Full MCP Support"
date: 2026-03-01
category: "Framework"
signal: "notable"
affects: ["typescript", "nextjs", "agents", "mcp", "frameworks"]
source: "https://vercel.com/blog/ai-sdk-6"
contributed_by: "@orzazade via ai-radar skill"
---

## What happened

Vercel released AI SDK 6 with the v3 Language Model Specification that powers native agent support, tool execution approval flows, built-in DevTools, and full MCP (Model Context Protocol) integration. The release also includes a rewritten @ai-sdk/langchain package with APIs for converting between UI messages and LangChain formats. The AI SDK now exceeds 20 million monthly downloads.

## Why it matters

AI SDK 6 makes it straightforward to build agentic applications in TypeScript with first-class support for tool approval workflows — a key requirement for production agent deployments where uncontrolled tool execution is a risk. Full MCP support means any MCP server can be plugged into AI SDK applications, expanding the ecosystem of available tools without custom integration work.

## Who should pay attention

- TypeScript developers building AI-powered applications with Next.js, React, Svelte, or Vue
- Teams using MCP servers who want a TypeScript-native way to integrate them
- Developers building agent workflows that need human-in-the-loop tool approval
