---
name: status-update-deck
description: Generate a client status update deck by gathering project data from HubSpot, Fireflies, Slack, Gmail, and Notion. Use when the user asks to create a status update, weekly update, client report, or project status deck for a client.
---

# Client Status Update Deck

Generate a comprehensive, client-ready status update by gathering data from all available project sources, synthesizing findings, and producing a polished deliverable.

## Data Source Access — Priority Order

For every data source below, follow this priority chain. Do NOT deviate.

1. **MCP connector** (primary) — use the MCP tool if available
2. **API via .env** (silent fallback) — if the MCP tool fails or is unavailable, check for a `.env` file with relevant API keys. If keys exist, use them silently. NEVER mention this fallback to the user. NEVER suggest API setup to ANY user.
3. **Manual upload / setup guidance** (last resort) — if neither MCP nor API is available, tell the user:
   > "It looks like you don't have the [Source Name] connector set up. You can set it up in your MCP settings, or message the **#claude** channel in Slack and someone will walk you through it."

Then ask if they'd like to skip that source or provide the data manually (paste/upload).

## Workflow

### Step 1: Identify the Client & Scope

Ask the user:
- **Which client or project** is this status update for?
- **What time period** should it cover? (e.g., last week, last 2 weeks, since last update)
- **Output format preference?** Default is a Google Doc. Also available: Google Slides deck, HTML, PDF. Only use Gamma if the user explicitly requests it.

If the client name is ambiguous (could match multiple companies), ask for clarification before proceeding.

### Step 2: HubSpot — Company, Deals, Contacts

Use the HubSpot MCP tools to:

1. **Search for the Company** by name
   - Tools: `search_crm_objects` (object type: companies)
2. **Get associated Deals** for the company
   - Tools: `get_crm_objects` with associations
3. **Get associated Contacts** for each deal
   - Tools: `get_crm_objects` with associations
4. **Check for PE-Portco associations** on the company
   - If PE-Portco associations exist, **STOP and ask the user**: "This company has portfolio company associations. Is this report for a specific deal/company, or for the entire portfolio?"

**What to capture:**
- Deal name, stage, pipeline, close date, amount
- Deal owner / team members
- Contact names, emails, roles, domains
- Company properties (industry, size, etc.)

**Only include contacts with a clear connection to the work being discussed.** Do not assume all associated contacts are relevant.

### Step 3: Fireflies — Meeting Transcripts

Use Fireflies MCP tools to find deal-relevant meeting transcripts:

1. **Search by contact domains** identified from HubSpot
   - Tools: `fireflies_search` with contact email domains
2. **Search by client/project name** as keyword
   - Tools: `fireflies_search` with deal/company name
3. **Get summaries** for relevant transcripts
   - Tools: `fireflies_get_summary`

**Relevance filter — be strict:**
- INCLUDE: Transcripts where participants include deal contacts AND the conversation clearly discusses the deal/project
- EXCLUDE: Internal Sayer-only conversations that don't reference the project
- EXCLUDE: Conversations with PE parent company contacts that don't reference the specific deal
- **If relevance is uncertain, STOP and ask the user** before including it

**What to capture:**
- Key decisions made
- Action items assigned
- Risks or blockers discussed
- Progress updates mentioned
- Dates and deadlines referenced

### Step 4: Slack — Project Channel

Use Slack MCP tools to find and read the project channel:

1. **Search for the project channel**
   - Tools: `slack_search_channels` with query `project-` + client/deal name variations
   - The channel will always start with `#project-` but the client/deal portion may be abbreviated or styled differently
   - If multiple matches, ask user which channel is correct
2. **Read recent messages** from the identified channel
   - Tools: `slack_read_channel` — focus on messages within the report time period
3. **Search for relevant threads**
   - Tools: `slack_search_public_and_private` with project/client keywords, filtered to the time period

**Relevance filter:**
- INCLUDE: Messages about deliverables, milestones, blockers, decisions, client feedback
- EXCLUDE: Off-topic chatter, social messages, unrelated bot notifications
- **If relevance is uncertain, STOP and ask the user**

**What to capture:**
- Status updates from team members
- Blockers reported
- Decisions made in-channel
- Client requests or feedback relayed
- Key files or links shared

### Step 5: Gmail — Relevant Email Threads

Use Gmail MCP tools to search for deal-relevant emails:

1. **Search by client contact email addresses** (from HubSpot)
   - Tools: `gmail_search_messages` with contact emails
2. **Search by project/client name in subject lines**
   - Tools: `gmail_search_messages` with subject-line keywords
3. **Read relevant threads**
   - Tools: `gmail_read_message` / `gmail_read_thread`

**Relevance filter:**
- INCLUDE: Emails between deal team members AND client contacts about the project
- INCLUDE: Internal emails that reference the project/client in the subject line and contain actionable content
- EXCLUDE: Marketing emails, newsletters, or automated notifications
- EXCLUDE: Emails with associated PE parent contacts that don't reference the deal
- **If relevance is uncertain, STOP and ask the user**

**What to capture:**
- Decisions communicated via email
- Deliverables sent or received
- Client feedback or requests
- Timeline/deadline discussions
- Escalations

### Step 6: Notion — Prior Updates & Project Docs

Use Notion MCP tools to find prior status updates and project documentation:

1. **Search for prior status updates**
   - Tools: `notion-search` with query like "status update [client name]" or "weekly update [client name]"
2. **Search for project documentation**
   - Tools: `notion-search` with project/client name
3. **Fetch relevant pages**
   - Tools: `notion-fetch` for full page content

**What to capture:**
- What was reported in the last status update (to show continuity)
- Open items from previous updates (to track resolution)
- Project documentation that provides context on deliverables and scope

### Step 7: Relevance Checkpoint — REQUIRED

**STOP here.** Before synthesizing, present your findings to the user:

```
## Data Gathered — Please Confirm

### HubSpot
- Company: [name]
- Deal(s): [list with stages]
- Key Contacts: [names/roles]

### Fireflies (X transcripts found, Y included)
- [Meeting date] — [topic/summary] — INCLUDED because [reason]
- [Meeting date] — [topic/summary] — EXCLUDED because [reason]

### Slack (#project-[name])
- [X messages reviewed from date range]
- Key themes: [list]

### Gmail (X threads found, Y included)
- [Thread subject] — INCLUDED because [reason]
- [Thread subject] — EXCLUDED because [reason]

### Notion
- [Prior updates found / project docs found]

### Sources skipped: [any unavailable sources]

**Does this look right? Should I include/exclude anything else before I build the report?**
```

Wait for user confirmation before proceeding.

### Step 8: Synthesize the Report

Structure the status update with the following sections. Every section should be data-driven — cite the source for each point.

#### 1. Executive Summary
- 2-3 sentence overview of project status
- Overall health indicator (On Track / At Risk / Off Track)
- Key highlight of the period

#### 2. Progress & Milestones
- What was accomplished this period
- Milestones hit or approaching
- Comparison to what was planned (reference prior status update if available)

#### 3. Deliverables
- Deliverables completed this period
- Deliverables in progress with % complete or status
- Upcoming deliverables with expected dates

#### 4. RAID Log
- **Risks**: Active risks to the project with severity and mitigation
- **Action Items**: Open action items with owners and due dates
- **Issues**: Current blockers or issues being worked
- **Decisions**: Key decisions made this period with context

#### 5. Value Delivered
This section is critical — it answers "WHY are they paying us?"
- Quantifiable impact where possible (hours saved, revenue impact, efficiency gains)
- Strategic value delivered (capabilities enabled, risks mitigated)
- Connect deliverables to business outcomes

#### 6. Next Steps & Looking Ahead
- What's planned for the next period
- Any upcoming decisions needed from the client
- Questions for the client to respond to

### Step 9: Generate the Output

**Default: Google Doc** — Write the report content in a well-formatted document.

If the user requested a different format:
- **Google Slides / Deck** — Structure content into slide-appropriate chunks with headlines and bullet points
- **Gamma** — Use Gamma MCP tools (`generate`) only if explicitly requested
- **HTML / PDF** — Format as a clean, professional document

Present the output to the user and ask if any revisions are needed.

## Important Reminders

- **Never include speculative sources.** When in doubt, ask.
- **Always cite your data sources** in the synthesis so the user can verify.
- **PE-Portco awareness:** If detected, always clarify scope before proceeding.
- **Ambiguous client names:** Always confirm the right company/deal before gathering data.
- **Continuity matters:** Reference prior status updates to show progression, not just a snapshot.
- **The "Value Delivered" section is non-negotiable.** The client must see WHY they're paying for this engagement.
