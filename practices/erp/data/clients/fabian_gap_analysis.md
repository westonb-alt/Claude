# Fabian Clothing Group — ERP Requirements Gap Analysis

> Generated from: Meeting transcripts (7 meetings), email threads (DOSS, Campfire, Volt),
> Billy's client description to vendors, CS/CX discovery session, and PM proposal walkthrough.
>
> **Status:** Pre-kickoff draft — requires validation with Vlada + 2-3 key stakeholders

---

## Client Profile Summary

**Company:** Fabian Clothing Group
**Industry:** Apparel importer offering value-added services (embroidery)
**PE Sponsor:** Valesco Industries
**Size:** Mid-market, PE-backed
**Current ERP:** Broken system reliant on Excel and failed API integrations
**Prior Leading Candidate:** Microsoft Business Central (Volt Technologies as implementer)
**Other Systems Evaluated:** NetSuite, Acumatica
**New Alternatives Introduced:** DOSS, Campfire

---

## Known Requirements (Sourced)

### R1: Financial Management
| # | Requirement | Priority | Weight | Source | Status |
|---|-------------|----------|--------|--------|--------|
| R1.1 | GL that reconciles with sub-ledgers | Must Have | 10 | Billy → DOSS email (3/3) | **CRITICAL GAP** — current GL doesn't reconcile |
| R1.2 | Correct units of measure tracking | Must Have | 9 | Billy → DOSS email (3/3) | **CRITICAL GAP** — currently incorrect |
| R1.3 | Cash flow projection & forecasting | Should Have | 8 | Claude Excel walkthrough (3/12) | Danielle: currently takes 3 days for 18-month projection |
| R1.4 | Accounts payable prioritization | Should Have | 7 | Claude Excel walkthrough (3/12) | Dynamic payment prioritization based on cash flow & due dates |
| R1.5 | Audit-ready financial reporting | Must Have | 9 | PM Proposal (3/3) — PE requirement | PE sponsor expects audit readiness |
| R1.6 | Multi-entity/portfolio reporting | Should Have | 7 | PM Proposal (3/3) | Valesco needs portfolio-level visibility |

### R2: Purchase Orders & Supply Chain
| # | Requirement | Priority | Weight | Source | Status |
|---|-------------|----------|--------|--------|--------|
| R2.1 | Reliable PO management (no disappearing POs) | Must Have | 10 | Billy → DOSS email (3/3) | **CRITICAL GAP** — POs frequently disappear |
| R2.2 | Vendor/supplier management | Must Have | 8 | Inferred from apparel import business | Not validated |
| R2.3 | Import/customs documentation | Should Have | 7 | Inferred from "apparel importer" | Not validated |
| R2.4 | Inventory tracking with correct UOM | Must Have | 9 | Billy → DOSS email (3/3) | Tied to R1.2 |

### R3: Integrations
| # | Requirement | Priority | Weight | Source | Status |
|---|-------------|----------|--------|--------|--------|
| R3.1 | Salesforce CRM connector (dependable, not custom) | Must Have | 10 | Billy → DOSS email (3/3) | **CRITICAL GAP** — current API integrations have failed |
| R3.2 | EDI partner connectivity | Must Have | 9 | Billy → DOSS email (3/3) | Required for apparel supply chain |
| R3.3 | Warehouse management system integration | Must Have | 8 | Billy → DOSS email (3/3) | Explicit requirement |
| R3.4 | Telephony (Amazon Connect) integration | Should Have | 6 | CS/CX Discovery (3/19) | Current integration is broken |
| R3.5 | HubSpot integration | Nice to Have | 4 | Inferred from Sayer tech stack | Cross-portfolio standard |

### R4: Customer Service & CX
| # | Requirement | Priority | Weight | Source | Status |
|---|-------------|----------|--------|--------|--------|
| R4.1 | Customer identification on inbound calls | Must Have | 8 | CS/CX Discovery (3/19) | **GAP** — agents can't see who's calling |
| R4.2 | Call transfer capability | Must Have | 7 | CS/CX Discovery (3/19) | **GAP** — agents can't transfer calls |
| R4.3 | Reliable call recording & transcripts | Must Have | 8 | CS/CX Discovery (3/19) | **GAP** — incomplete recordings, unreliable transcripts |
| R4.4 | Automated call logging | Should Have | 6 | CS/CX Discovery (3/19) | Currently manual — 11 agents affected |
| R4.5 | Quality check automation | Should Have | 6 | CS/CX Discovery (3/19) | Currently manual |

### R5: Value-Added Services
| # | Requirement | Priority | Weight | Source | Status |
|---|-------------|----------|--------|--------|--------|
| R5.1 | Embroidery/decoration order tracking | Must Have | 8 | Billy → DOSS email — "value-added services like embroidery" | Not validated |
| R5.2 | Production/service scheduling | Should Have | 7 | Inferred from embroidery operations | Not validated |
| R5.3 | Quality control tracking | Should Have | 6 | Inferred | Not validated |

### R6: Reporting & Analytics
| # | Requirement | Priority | Weight | Source | Status |
|---|-------------|----------|--------|--------|--------|
| R6.1 | Real-time financial dashboards | Should Have | 7 | PM Proposal (3/3) | PE sponsor requirement |
| R6.2 | ETS report automation | Should Have | 6 | Claude Excel walkthrough (3/12) | Vlada & Danielle discussed converting to Claude-enabled |
| R6.3 | Open orders reporting | Should Have | 6 | Claude Excel walkthrough (3/12) | Same as above |
| R6.4 | Custom report generation | Should Have | 5 | Inferred | Standard ERP requirement |

### R7: Licensing & Cost
| # | Requirement | Priority | Weight | Source | Status |
|---|-------------|----------|--------|--------|--------|
| R7.1 | Simplified licensing structure | Should Have | 7 | CS/CX Discovery (3/19) | Current mix is complex and costly |
| R7.2 | Transparent pricing with no hidden costs | Must Have | 8 | PM Proposal (3/3) — Vlada raised cost concerns | Vlada emphasized comparing quotes for consistency |
| R7.3 | Competitive total cost of ownership | Must Have | 8 | PM Proposal (3/3) | Multiple vendor quotes for comparison |

---

## Gap Summary

### Critical Gaps (System Broken)
| Gap | Impact | Evidence |
|-----|--------|----------|
| GL doesn't reconcile with sub-ledgers | Financial reporting unreliable | Billy → DOSS (3/3) |
| POs frequently disappear | Supply chain disruption, lost orders | Billy → DOSS (3/3) |
| Units of measure incorrect | Inventory counts wrong, costing errors | Billy → DOSS (3/3) |
| API integrations have failed | No reliable system connectivity | Billy → DOSS (3/3) |
| Salesforce-Amazon Connect integration broken | CS team working manually | CS/CX Discovery (3/19) |

### Significant Gaps (Operational Pain)
| Gap | Impact | Evidence |
|-----|--------|----------|
| No customer ID on inbound calls | Agents can't identify callers | CS/CX Discovery (3/19) |
| Can't transfer calls | Every call is a dead end or manual reroute | CS/CX Discovery (3/19) |
| Call recordings incomplete | Quality assurance impossible | CS/CX Discovery (3/19) |
| Cash flow projection takes 3 days | Finance team bottlenecked | Claude Excel walkthrough (3/12) |
| Manual call logging for 11 agents | Wasted labor, data quality issues | CS/CX Discovery (3/19) |
| Complex licensing structure | Overspending, hard to manage | CS/CX Discovery (3/19) |

### Unvalidated Requirements (Need Stakeholder Interviews)
| Area | What We Don't Know | Recommended Stakeholder |
|------|--------------------|------------------------|
| Value-Added Services | Embroidery workflow details, volume, scheduling needs | Operations lead (TBD) |
| Import/Customs | Documentation requirements, compliance needs | Supply chain / procurement |
| Warehouse Operations | WMS details, pick/pack/ship process, 3PL vs in-house | Warehouse manager |
| HR / Payroll | Whether ERP should handle or keep separate | Vlada / Danielle |
| E-commerce | Any D2C or B2B portal requirements | Sales lead |
| Data Migration | What data to bring forward, retention requirements | IT / Vlada |
| Manufacturing | Extent of in-house production beyond embroidery | Operations lead |

---

## Vendor Evaluation Matrix (Preliminary)

Based on known requirements vs. vendor positioning:

| Requirement Area | Weight | NetSuite | DOSS + Campfire | MS Business Central (Volt) |
|-----------------|--------|----------|-----------------|---------------------------|
| R1: Financial Management | 20% | Strong | Campfire: Strong (F&A focus) | Strong |
| R2: PO & Supply Chain | 15% | Strong | DOSS: Strong (operations) | Moderate |
| R3: Integrations | 20% | Moderate (API ecosystem) | Unknown — needs demo | Moderate (via ISVs) |
| R4: Customer Service | 10% | Weak (not CS-focused) | Unknown | Weak |
| R5: Value-Added Services | 10% | Moderate (customizable) | Unknown | Moderate |
| R6: Reporting | 10% | Strong | Unknown | Moderate |
| R7: Licensing & Cost | 15% | Moderate-High cost | Unknown | Moderate cost |

**Note:** DOSS + Campfire is a split-stack approach (DOSS for operations, Campfire for F&A) with a GL bridge. This is novel and needs thorough evaluation during demos.

---

## Recommended Next Steps

### Immediate (Pre-Approval)
1. **Build the scoring template** using the 7 requirement blocks above with weights
2. **Prepare stakeholder interview scripts** for the 7 unvalidated areas
3. **Review Volt proposal PDF** and implementation plan XLSX for additional requirements
4. **Map Volt's proposed scope** against our requirements to identify what was/wasn't covered

### Post-Approval (Week of April 8 Kickoff)
1. **Validate this gap analysis** with Vlada and 2-3 designated stakeholders
2. **Conduct stakeholder interviews** (2-3 sessions, 60 min each)
3. **Finalize weighted requirements matrix** based on validated gaps
4. **Schedule vendor demos** (DOSS, Campfire) with structured scoring criteria
5. **Run scoring sessions** post-demo with stakeholder input
6. **Produce recommendation document** for executive review

### Documents to Request from Client
- [ ] Complete list of current integrations and API connections
- [ ] Salesforce configuration documentation
- [ ] Amazon Connect / telephony architecture
- [ ] Warehouse operations process documentation
- [ ] Embroidery/value-added services workflow
- [ ] Current NetSuite module list and license inventory
- [ ] Volt Technologies proposal and implementation plan (if not already in shared folder)
- [ ] Any prior ERP evaluation scorecards or decision criteria
