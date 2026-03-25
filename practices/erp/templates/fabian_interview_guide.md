# Fabian Clothing Group — Stakeholder Interview Guide

> **Prepared for:** Terry Hooten (Lead), Weston Baker (Support)
> **Purpose:** Validate requirements, close documentation gaps, prepare for vendor scoring
> **Timeline:** Execute during first week post-approval (target: week of April 8, 2026)
> **Format:** 3 sessions, 60 minutes each, with designated stakeholders

---

## Pre-Interview Checklist

Before conducting interviews, ensure you have:
- [ ] Access to shared Google Drive folder with all Volt documentation
- [ ] Reviewed `Volt + Fabian Group Proposal Review - Dec 16 2025.pdf`
- [ ] Reviewed `Implementation Plan - Fabian Group - 12.16.2025.xlsx`
- [ ] Printed gap analysis summary (7 requirement blocks, 25+ requirements)
- [ ] Confirmed interview participants with Vlada

---

## Session 1: Finance & Operations (60 min)

**Stakeholders:** Vlada Rassin (CFO), Danielle Novak (VP Operations)
**Facilitator:** Terry Hooten
**Note-taker / AI:** Weston Baker (Fireflies recording + Claude synthesis)

### Opening (5 min)
> "We've reviewed all the documentation, proposals, and prior meeting notes. Today we want to validate what we know, identify what's missing, and make sure the requirements reflect your actual priorities — not just what was written in a proposal months ago."

### Block 1: General Ledger & Financial Reporting (15 min)

**Context we already have:** GL doesn't reconcile with sub-ledgers. UOM incorrect. Cash projection takes 3 days. One vendor quote was $100K higher than others.

1. "Walk us through a typical month-end close. What are the biggest bottlenecks today?"
   - *Listen for:* Manual reconciliation steps, workarounds, time spent, error frequency

2. "When you say the GL doesn't reconcile with sub-ledgers — is this a data issue, a configuration issue, or a system limitation?"
   - *Listen for:* Whether this is fixable in current system or fundamental

3. "How many chart of accounts entities do you maintain? Do you need multi-company or multi-currency?"
   - *Listen for:* Complexity of financial structure, intercompany transactions

4. "Vlada, you mentioned the 18-month cash projection takes 3 days. What would 'good' look like? Same day? Real-time?"
   - *Listen for:* Ambition level — this shapes whether they need BI/analytics or just better ERP reports

5. "What financial reports does Valesco require from you? How often? In what format?"
   - *Listen for:* PE reporting requirements, board deck needs, audit trail requirements

**Red flags to watch for:**
- "We don't really know what's wrong" → deeper diagnostic needed before vendor selection
- "Volt was supposed to fix this" → check if Volt's proposal addressed this specifically
- Vlada deflects to Danielle on details → Danielle may be the real requirements owner

### Block 2: Purchase Orders & Supply Chain (15 min)

**Context we already have:** POs disappear. Apparel importer with embroidery services. EDI required.

6. "You mentioned POs frequently disappear. Can you give us a recent example? How often does this happen?"
   - *Listen for:* Frequency, business impact (missed shipments? lost revenue?), workaround cost

7. "Walk us through the life of a purchase order from creation to receipt. Where does it live today?"
   - *Listen for:* Excel? NetSuite? Email? How many handoffs? Who touches it?

8. "How do you manage your import process? Is there customs documentation, landed cost calculations, duty tracking?"
   - *Listen for:* Whether this is a major process or handled by a broker externally

9. "How many vendors/suppliers do you work with? Are they mostly domestic or international?"
   - *Listen for:* Volume, complexity, currency needs, lead time management

10. "What EDI connections do you need? Which trading partners require EDI?"
    - *Listen for:* Specific partners (retailers?), EDI standards (AS2, SFTP), volume

**Red flags to watch for:**
- "We use Excel for all of this" → scope is bigger than documented
- "Our broker handles customs" → may not need customs module, simplifies requirements
- PO issues are actually user error → training issue, not system issue

### Block 3: Cost & Budget Constraints (10 min)

**Context we already have:** Vlada wants contingency planning. One quote was $100K higher. Cash flow sensitivity. White Glove option selected.

11. "Now that you've seen multiple proposals, what's your realistic budget range for the full ERP project — software + implementation + first year support?"
    - *Listen for:* Hard ceiling vs. flexible range, who controls the budget (Vlada or Valesco)

12. "Is there a timeline driver? Board deadline? Fiscal year? Audit requirement?"
    - *Listen for:* Urgency and whether it's real or artificial

13. "What's more important to you: speed of implementation or thoroughness of the rollout?"
    - *Listen for:* Risk tolerance, appetite for phased vs. big-bang approach

**Red flags to watch for:**
- Budget is significantly lower than vendor quotes → need to manage expectations
- "Valesco decides" → find out Valesco's approval process and timeline

### Wrap-Up (5 min)
14. "What's the one thing that, if the new ERP doesn't solve, makes the whole project a failure?"
    - *Critical question — defines the must-have filter for vendor scoring*

15. "Is there anything we haven't asked about that keeps you up at night?"
    - *Open-ended catch-all for hidden requirements*

---

## Session 2: Customer Service & Telephony (60 min)

**Stakeholders:** Isabel Alicea (CS Manager), Alex Gordin (Operations/Contracts)
**Facilitator:** Terry Hooten (with Cameron Taggart for technical depth)
**Note-taker / AI:** Weston Baker

### Opening (5 min)
> "Cameron and Mike already did great work in the CS/CX discovery session. Today we're going deeper on a few areas to make sure our vendor evaluation captures your team's needs."

### Block 4: Telephony & CRM Integration (20 min)

**Context we already have:** 18 licenses ($75-$200/mo), 11 agents, 6 in NJ + IL, 8 active phone numbers, no screen pop, can't transfer, broken recordings. Salesforce updates cause outages.

16. "Since the discovery session on March 19th, has anything changed with the telephony situation?"
    - *Listen for:* New issues, temporary fixes, workarounds implemented

17. "If you could design the perfect system from scratch, what does a customer service call look like from ring to resolution?"
    - *Listen for:* Their vision vs. current state — gap is the requirement

18. "How important is it that the CS platform stays on Salesforce, or would you consider a different CRM for service?"
    - *Listen for:* Lock-in, training investment, data migration concerns
    - *Important:* DOSS and Campfire may not integrate with Salesforce the same way

19. "What metrics do you track today for CS performance? What metrics do you wish you could track?"
    - *Listen for:* CSAT (blocked by Salesforce login requirement), FCR, handle time, NPS

20. "Isabel, you mentioned building a call library for training. What would the ideal QA/training system look like?"
    - *Listen for:* Automated scoring, sentiment analysis, coaching tools

### Block 5: Salesforce & Licensing (15 min)

**Context we already have:** Alex reviewing contracts. Complex license mix. Updates on hold due to risk.

21. "Alex, have you been able to review the Salesforce contract? Are you locked in, or is there flexibility?"
    - *Listen for:* Contract end date, renewal terms, early termination options

22. "Of the 18 licenses, how many are actively used daily? How many could be downgraded or eliminated?"
    - *Listen for:* Shelfware, over-provisioning, optimization opportunities

23. "Is the Salesforce CRM itself working well for sales, or are there issues beyond telephony?"
    - *Listen for:* Alan's comment that "Salesforce CRM functions well" — validate if sales team agrees

24. "If we recommended replacing Amazon Connect with a different telephony provider, what would your concerns be?"
    - *Listen for:* Data migration, number porting, training, downtime tolerance

### Block 6: Customer Service Operations (15 min)

25. "Walk us through a typical day for one of your agents. What systems do they touch?"
    - *Listen for:* System count, tab switching, copy-paste workflows, manual data entry

26. "You mentioned email orders route via Salesforce cases. How reliable is that? What falls through the cracks?"
    - *Listen for:* Case reopening issues, email threading problems (noted in discovery)

27. "How do your customers prefer to communicate? Phone, email, portal, text?"
    - *Listen for:* Channel preferences that should shape the CRM/CS strategy

28. "What's your average handle time? Average calls per agent per day?"
    - *Listen for:* Baseline metrics for ROI calculations on new system

### Wrap-Up (5 min)
29. "If we solve the telephony problem, what's the next biggest operational headache for your team?"
    - *Listen for:* Hidden requirements beyond telephony*

30. "Is there anyone else on the CS team we should talk to who has a different perspective?"
    - *Listen for:* Dissenting voices, power users, recent hires with fresh eyes

---

## Session 3: Operations, Warehouse & Value-Added Services (60 min)

**Stakeholders:** TBD — Ask Vlada to designate:
- Warehouse/operations manager
- Embroidery/decoration production lead
- IT contact (if one exists)

**Facilitator:** Terry Hooten
**Note-taker / AI:** Weston Baker

### Opening (5 min)
> "We have a solid picture of the financial and CS needs. Now we need to understand the physical operations — how product flows through your business from import to customer delivery."

### Block 7: Warehouse & Inventory (15 min)

31. "Do you operate your own warehouse or use a 3PL? How many locations?"
    - *Listen for:* In-house vs. outsourced, number of facilities, geography

32. "What does your current warehouse management look like? Paper-based? WMS? Excel?"
    - *Listen for:* Maturity level — this determines whether they need full WMS or basic inventory

33. "How do you track inventory today? Cycle counts? Perpetual? Annual?"
    - *Listen for:* Accuracy level, shrinkage rates, audit findings

34. "How many SKUs do you manage? Do you use size-color matrix for apparel?"
    - *Listen for:* SKU count, matrix complexity, attribute management needs

35. "What does pick, pack, and ship look like? How are shipping labels generated?"
    - *Listen for:* Carrier integration needs (UPS, FedEx, USPS), pack station setup

### Block 8: Embroidery & Value-Added Services (15 min)

**Context we already have:** Billy described "value-added services like embroidery" — this is largely unvalidated territory.

36. "Walk us through the embroidery process from order to completion. Is it per-order custom or standard decoration?"
    - *Listen for:* Make-to-order vs. pre-decorated inventory, setup complexity

37. "How do you schedule embroidery production? What drives capacity — machines, labor, thread stock?"
    - *Listen for:* Bottlenecks, scheduling method (Excel? whiteboard? ERP?), throughput

38. "Do customers provide artwork/logos, or do you maintain a library? How is artwork managed?"
    - *Listen for:* Digital asset management needs, approval workflows

39. "How do you cost the embroidery service? Per stitch? Per piece? Flat rate?"
    - *Listen for:* Costing complexity — this affects how the ERP needs to handle BOM/routing

40. "Beyond embroidery, are there other value-added services? Screen printing, labeling, kitting, custom packaging?"
    - *Listen for:* Full scope of services that need ERP support

### Block 9: Data Migration & IT (15 min)

41. "How many years of historical data do you need to bring into the new system?"
    - *Listen for:* Retention requirements, regulatory needs, practical vs. "nice to have"

42. "What's the current state of your data? Clean? Messy? Do you trust your inventory numbers?"
    - *Listen for:* Data quality — if it's bad, migration planning is much more complex

43. "Do you have internal IT staff, or is everything outsourced?"
    - *Listen for:* Implementation capacity, who will own the system post-go-live

44. "What systems would you keep vs. replace in an ideal world?"
    - *Listen for:* Sacred cows, emotional attachments, political landmines

45. "Have you done any data cleanup or preparation for the migration?"
    - *Listen for:* Whether Danielle or IT has started any prep work

### Block 10: Strategic & Future State (10 min)

46. "Where do you see the business in 3 years? Growth plans? New product lines? New markets?"
    - *Listen for:* Scalability requirements, multi-entity needs, international expansion

47. "Is there a potential exit event on the horizon that would affect system requirements?"
    - *Listen for:* PE exit timeline — this shapes audit, reporting, and data room needs

48. "What does success look like 6 months after go-live?"
    - *Listen for:* Their definition of done — align vendor evaluation to this

---

## Post-Interview Actions

### Within 24 Hours
- [ ] Feed all interview recordings into Claude for synthesis
- [ ] Update `fabian_gap_analysis.md` with validated/new requirements
- [ ] Update `fabian.yaml` client config with new details
- [ ] Re-weight requirement blocks based on stakeholder priorities
- [ ] Identify any new gaps that emerged

### Within 48 Hours
- [ ] Run updated gap analysis through Gap Analysis Agent
- [ ] Generate preliminary vendor scoring template with validated weights
- [ ] Send interview summary to Vlada for confirmation
- [ ] Share updated requirements matrix with DOSS and Campfire for demo prep

### Within 1 Week
- [ ] Finalize scoring template
- [ ] Schedule vendor demos
- [ ] Prepare demo evaluation criteria for each stakeholder
