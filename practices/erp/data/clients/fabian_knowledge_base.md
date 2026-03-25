# Fabian Clothing Group — Engagement Knowledge Base

> Auto-generated from Fireflies transcripts, Gmail, and meeting data. Living document.

---

## Engagement Overview

**Client:** Fabian Clothing Group
**PE Sponsor:** Valesco Industries
**Industry:** Apparel / Clothing Manufacturing & Distribution
**Engagement Type:** ERP Assessment — Selection, Implementation Planning, Post-Go-Live Support
**Status:** Pre-kickoff (awaiting Valesco board approval)

---

## Meeting History

### 1. PM Proposal Walkthrough — Mar 3, 2026
**Attendees:** Billy Leigh, Terry Hooten, Vlada Rassin, Danielle Novak
**Key Takeaways:**
- Billy presented dual-level service proposal: Strategic Oversight vs White Glove
- Pricing based on hourly model with phased hour allocation
- Vlada raised concerns about cost estimation and contingency planning
- Billy highlighted AI efficiency reducing manual effort significantly
- Discussed Fabian's ERP requirements including Salesforce integration and API reliability
- DOSS and Campfire recommended as modern ERP alternatives beyond current finalists
- Vlada tasked with discussing DOSS/Campfire intro with CEO
- Vlada to create shared folder for all ERP documentation

### 2. Billy/Terry — Fabian ERP PM — Feb 24, 2026
**Attendees:** Billy Leigh, Terry Hooten
**Key Takeaways:**
- Defined PM roles and responsibilities to avoid misunderstandings
- Risks: unclear Volt PM responsibilities, limited internal IT resources
- Need formal SOW with clear deliverables
- No work committed without Terry's approval and sign-off
- Alignment meeting needed with Volt and Vlada

### 3. Campfire Discussion — Mar 10, 2026
**Attendees:** Chris Camilleri (Campfire), Jack Arrix (Campfire), Billy, Terry, Weston
**Key Takeaways:**
- Structured multi-phase sales process for ERP business
- Client discovery of pain points using NetSuite first
- Expert-led demos to highlight Campfire advantages
- Leveraging DOS team partnership (Seb from DOSS)
- Campfire positioned for audit-friendly solutions
- Billy to share project docs with DOSS team

### 4. Claude in Excel Walkthrough — Mar 12, 2026
**Attendees:** Weston, Billy, Greg, Vlada Rassin, Danielle Novak
**Key Takeaways:**
- Demonstrated Claude Excel plugin for financial modeling
- Vlada: cash projection currently takes 3 days for 18-month forecast; AI could cut to 2 days
- Plugin can build complex models (LBO, AP prioritization) in plain English
- Dynamic payment prioritization based on cash flow and due dates
- Claude quickly identified substantial financial discrepancies
- $20/user/month subscription for Claude Excel plugin
- Danielle and Vlada to experiment with plugin
- Weston to provide follow-up training on data integration (Notion, HubSpot, Fireflies)

### 5. Discovery Session (CS/CX) — Mar 19, 2026
**Attendees:** Cameron, Mike Forster (Sayer), Alex Gordin, Danielle Novak (Fabian), Alan Forster
**Key Takeaways:**
- Telephony: Salesforce-Amazon Connect integration has major issues
  - Incomplete call recordings
  - Unreliable transcripts
  - Call routing failures → manual interventions
  - Agents can't transfer calls
  - No customer identification on inbound calls
- CS team: 11 agents, increased manual processes
- Licensing: complex mix across user needs with varying costs
- Need thorough review of contracts and billing
- Action: Isabel to provide phone number inventory and routing details
- Action: Cameron/Mike to examine Salesforce admin portal and license structure

### 6. Fabian Kick-off Email — Mar 17, 2026
**From:** Billy Leigh → Vlada Rassin (cc: Weston, Terry)
**Content:**
- Acknowledged waiting on Valesco final confirmation
- Getting ball rolling on Sayer side
- Plan kickoff with Vlada's team for week of April 8
- Weston to help schedule
- Sayer to begin reviewing NetSuite/Volt documents
- Coordinating demos with Campfire and DOSS

### 7. ERP Internal Kickoff — Mar 25, 2026 (TODAY)
**Attendees:** Weston Baker, Terry Hooten, Billy Leigh
**Key Takeaways:**
- Still waiting on Vlada's Valesco/board approval
- Board expects assessment to be completed — urgency noted
- Option to involve Addison (Valesco) to expedite
- Campfire and DOSS demos teed up and ready
- Documents from Volt Technologies available but potentially incomplete
- Terry: documentation "looked a little incomplete" — needs validation

**Agreed Approach:**
1. Synthesize all existing documents (proposals, demos, Volt docs, emails, Slack)
2. Feed into Claude AI to identify requirement gaps
3. Build reusable "ERP Assessment Skill" in Claude
4. Interview 2-3 key stakeholders to validate
5. Hybrid approach: 10% human setup → 70% AI → 20% human judgment
6. Every project becomes a firm asset (recursive improvement)

**Action Items (Weston):**
- Build Claude AI skill using existing documents
- Review Fabian documents with IT for skill creation
- Collate all documentation to populate AI knowledge base
- Schedule follow-up call with Terry

**Action Items (Terry):**
- Review documentation tabs for completeness
- Plan interviews with 2-3 key stakeholders
- Confirm documentation completeness and sign-offs

---

## Vendor Landscape

| Vendor | Status | Fit Notes |
|--------|--------|-----------|
| NetSuite | Incumbent | Current system. Assess optimize vs replace. |
| DOSS | Discovery | Modern ERP. Seb (seb@doss.com) is lead contact. Luke doing parallel discovery. |
| Campfire | Discovery | Modern ERP. Chris & Jack leading. 9-min YouTube demo available. |
| Volt Technologies | Prior partner | Microsoft Business Central plans. Documentation being reviewed. |

### ERP Discussion (for Five Lakes, but relevant context) — Mar 5, 2026
- Narrowed to NetSuite, Epicor Kinetic, Microsoft Business Central
- Campfire excluded for manufacturing (not applicable to Fabian — Fabian is apparel)
- Competitive pricing strategy: engage multiple vendors for leverage
- Condensed requirements spreadsheet for quicker feedback
- AI tools (Claude) used for communication and process efficiency

---

## Key Client Description (Billy → DOSS/Campfire, Mar 3, 2026)

> Verbatim from Billy's initial outreach — this is the canonical client description:

"Fabian Clothing Group (Valesco Industries portfolio) — An apparel importer offering value-added services like embroidery. Currently operating on a broken system reliant on Excel and failed API integrations. Their GL doesn't reconcile with sub-ledgers, units of measure are incorrect, and POs frequently disappear. They need dependable connectors for Salesforce, EDI partners, and warehouse systems without relying on custom builds that are prone to failure. They've evaluated Microsoft BC, NetSuite, and Acumatica but haven't selected a platform yet. We introduced DOSS and Campfire today, and they're interested in seeing demos."

### Sayer's Platform Thesis (Billy → DOSS, Mar 3)
"Sayer believes the combination of DOSS (operations), Campfire (F&A), and Rippling (HRIS/IT) represents the future of the integrated business platform, replacing legacy all-in-one ERPs such as NetSuite."

### Attachments Shared with Vendors
- `Volt + Fabian Group Proposal Review - Dec 16 2025.pdf` — Volt's MS Business Central proposal
- `Implementation Plan - Fabian Group - 12.16.2025.xlsx` — Volt's implementation timeline
- `Fabian-ERP-Assessment-Proposal-v2.docx` — Sayer's assessment proposal

### DOSS Fit Assessment (Seb, Mar 4)
- "Looks like a solid fit, though we'd need discovery to confirm"
- DOSS self-disqualified from Five Lakes Manufacturing ("manufacturing isn't our current strength")
- DOSS offers a "GL bridge" — customers can upgrade operations without migrating existing GL

### Vendors Previously Evaluated by Fabian (Pre-Sayer)
1. Microsoft Business Central — Volt Technologies as implementer (leading candidate before Sayer)
2. NetSuite — evaluated
3. Acumatica — evaluated
4. None selected

---

## Open Questions / Gaps
1. Do we have ALL documentation from Volt Technologies?
2. Which 2-3 stakeholders should be interviewed? (Vlada to designate)
3. What are the specific customizations currently in NetSuite?
4. What is the actual budget range once Valesco approves?
5. Timeline pressure — when does the board expect completion?
6. Integration requirements: NetSuite ↔ Salesforce ↔ Amazon Connect — keep or replace?
7. Manufacturing capabilities needed? (apparel vs pure distribution)

---

## Cross-Reference: Other Sayer ERP Engagements

These concurrent engagements provide patterns and learnings:

- **Five Lakes Manufacturing (FLM):** Epicor evaluation. Weston leading scoring with weighted requirement blocks. 8 blocks, 4-hour vendor demo sessions. Data migration from legacy Passport ERP.
- **NAKS Inc:** NetSuite issues. Manufacturing module not selected. Rick Dodson (day 4). Valesco-backed.
- **Topdown Auto:** NetSuite/legacy Intuitive ERP migration. Data cleanup. 15K SKUs, $4-5M inventory.
- **Dewpoint:** Epicor demo prep. CPQ integration, EDI requirements.
