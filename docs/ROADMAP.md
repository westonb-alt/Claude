# Sayer Agent Platform — Roadmap

> Living document. Updated as practices evolve.

## Vision

Build a library of AI agents that make Sayer consultants 10x more efficient — starting with ERP, expanding across all practice areas. Every pattern built once, reused everywhere.

---

## Phase 1: Foundation + Fabian MVP (Current)

**Goal:** Prove the pattern works with one real client engagement.

### Core Framework
- [x] Repository structure and architecture
- [ ] Base agent class with prompt chaining
- [ ] Configuration system (per-client, per-practice)
- [ ] Local file-based data layer
- [ ] Logging and output formatting

### ERP Practice — Fabian
- [ ] **Vendor Research Agent** — Given client requirements, research and summarize ERP vendors
- [ ] **Requirements Gathering Agent** — Structured interview framework, outputs a requirements matrix
- [ ] **Scoring Agent** — Weighted scorecard generation from requirements + vendor data
- [ ] **Recommendation Agent** — Executive summary and recommendation document
- [ ] Deliverable templates (scorecard, vendor comparison, recommendation memo)

### Integrations (Stretch)
- [ ] Notion connector (read/write practice knowledge bases)
- [ ] Google Sheets connector (scorecard output)
- [ ] Slack notifications (agent status updates)

---

## Phase 2: Implementation & Post-Go-Live

**Goal:** Extend the ERP practice to cover the full engagement lifecycle.

- [ ] **Implementation Tracker Agent** — Milestone tracking, risk flagging, status reports
- [ ] **Issue Triage Agent** — Post-go-live issue classification and routing
- [ ] **Knowledge Base Agent** — Builds searchable FAQ from engagement history
- [ ] **Status Report Agent** — Auto-generates weekly stakeholder updates
- [ ] Client-facing read-only views

---

## Phase 3: Second Practice Area

**Goal:** Validate the framework scales by adding a second practice.

- [ ] Identify next practice area (CRM, Data & Analytics, Change Management, etc.)
- [ ] Fork `_template/` into new practice directory
- [ ] Build practice-specific agents reusing core patterns
- [ ] Refactor any Fabian-specific code into core if reusable

---

## Phase 4: Platform & Integrations

**Goal:** Move from CLI tools to connected platform.

- [ ] Web UI or Slack bot interface
- [ ] Cloud database migration (Supabase or similar)
- [ ] HubSpot integration (auto-log engagement activity)
- [ ] Multi-user support and permissions
- [ ] Notion bi-directional sync

---

## Phase 5: Client-Facing Agents

**Goal:** Extend select agents for client self-service.

- [ ] Client portal with scoped access
- [ ] Self-service post-go-live support agent
- [ ] Client satisfaction and feedback collection
- [ ] White-labeled deliverables

---

## Practice Areas (Planned)

| # | Practice | Priority | Notes |
|---|----------|----------|-------|
| 1 | ERP Selection & Implementation | Active | Fabian engagement |
| 2 | TBD | Backlog | Identify after Phase 1 |
| 3 | TBD | Backlog | |
| 4 | TBD | Backlog | |
| 5 | TBD | Backlog | |

---

## Principles

1. **Build for reuse** — If you build it for one practice, ask "can this be core?"
2. **Start with prompts** — Get the AI interaction right before writing infrastructure
3. **Ship incrementally** — Working agent > perfect architecture
4. **Consultants are the users** — Optimize for their workflow, not theoretical elegance
5. **Local until proven otherwise** — Files before databases, CLI before UI
