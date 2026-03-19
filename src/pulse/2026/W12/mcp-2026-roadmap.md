---
title: "MCP 2026 Roadmap: Horizontal Scaling, Enterprise Auth, and .well-known Discovery"
date: 2026-03-10
category: "Paradigm"
signal: "incremental"
affects: ["mcp", "infrastructure", "enterprise", "agents"]
source: "https://modelcontextprotocol.io/development/roadmap"
contributed_by: "@orzazade via ai-radar skill"
---

## What happened

The Model Context Protocol maintainers published the 2026 roadmap outlining four priorities: evolving transport and session models for horizontal scaling without holding state, enterprise readiness (SSO-integrated auth, audit trails, gateway behavior), a standard metadata format via .well-known URLs for server capability discovery without live connections, and formalized community governance with working groups and Spec Enhancement Proposals.

## Why it matters

MCP adoption has reached production scale, and the roadmap directly addresses the pain points that emerge at that scale. Stateless horizontal scaling and .well-known discovery will make MCP servers easier to deploy and discover in enterprise environments. The SSO and audit focus signals that MCP is targeting compliance-heavy organizations.

## Who should pay attention

- Teams running MCP servers in production who face scaling or session management challenges
- Enterprise architects evaluating MCP for organizational AI tool integration
- MCP server developers who should prepare for upcoming transport and auth changes
