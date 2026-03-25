# Sayer ERP Assessment — Master Discovery Question Bank

> Reusable across all ERP engagements. Customize per client by selecting relevant sections.
> Questions tagged with source methodology and priority.

---

## How to Use This Document

1. **Before the engagement:** Select relevant question blocks based on client industry and known pain points
2. **During interviews:** Use as a guide, not a script — follow the conversation
3. **After interviews:** Map answers back to requirement blocks for scoring
4. **Continuous improvement:** Add new questions from every engagement back to this master list

---

## A. Financial Management

### A1. Current State Assessment
| # | Question | Priority | Why We Ask |
|---|----------|----------|------------|
| A1.1 | Walk us through a typical month-end close. What are the biggest bottlenecks? | Must Ask | Identifies automation opportunities and process maturity |
| A1.2 | How many days does it take to close the books? What's your target? | Must Ask | Benchmarking — industry standard is 5-7 days for mid-market |
| A1.3 | How do you handle intercompany transactions and eliminations? | Ask if multi-entity | Complexity driver for ERP selection |
| A1.4 | What financial reports does your board/PE sponsor require? How often? | Must Ask (PE) | Drives reporting module requirements |
| A1.5 | Do you need multi-currency support? Which currencies? | Ask if international | Affects vendor shortlist significantly |

### A2. Pain Points & Gaps
| # | Question | Priority | Why We Ask |
|---|----------|----------|------------|
| A2.1 | Where does your GL not reconcile with sub-ledgers? Which sub-ledgers? | Must Ask if flagged | Root cause identification — data vs. system vs. process |
| A2.2 | What manual workarounds do you use for financial reporting? | Must Ask | Quantifies automation ROI |
| A2.3 | How do you handle accruals and deferrals? Manual or automated? | Should Ask | Common gap in mid-market ERPs |
| A2.4 | What's your cash flow forecasting process? How long does it take? | Should Ask | AI/automation opportunity |
| A2.5 | How do you manage AP prioritization when cash is tight? | Should Ask (cash-sensitive) | Reveals financial management maturity |

### A3. Future State
| # | Question | Priority | Why We Ask |
|---|----------|----------|------------|
| A3.1 | What financial reports would you want that you can't get today? | Must Ask | Defines reporting requirements beyond current state |
| A3.2 | Do you anticipate needing consolidated reporting across multiple entities? | Ask if PE | PE rollup and exit readiness |
| A3.3 | What does audit-readiness mean to your organization? SOC 1? SOC 2? | Must Ask (PE) | Compliance requirements shape vendor selection |

---

## B. Purchase Orders & Supply Chain

### B1. Current State
| # | Question | Priority | Why We Ask |
|---|----------|----------|------------|
| B1.1 | Walk us through the life of a PO from creation to goods receipt. | Must Ask | End-to-end process mapping |
| B1.2 | How many POs do you process per week/month? | Must Ask | Volume drives system sizing and automation needs |
| B1.3 | How many vendors/suppliers do you work with? Domestic vs. international? | Must Ask | Supply chain complexity |
| B1.4 | How do you handle landed cost calculations (freight, duties, insurance)? | Ask if importer | Critical for apparel/import businesses |
| B1.5 | What EDI connections do you have? Which trading partners require EDI? | Must Ask if B2B | Integration requirement — can be expensive |

### B2. Pain Points
| # | Question | Priority | Why We Ask |
|---|----------|----------|------------|
| B2.1 | What happens when a PO goes missing or gets stuck? How often? | Must Ask if flagged | Quantifies the pain and impact |
| B2.2 | How do you track items in transit? Do you have visibility into shipments? | Should Ask | Supply chain visibility requirement |
| B2.3 | How do you manage returns and RMAs with vendors? | Should Ask | Reverse logistics complexity |
| B2.4 | Are your units of measure consistent across systems? Any conversion issues? | Must Ask if flagged | Data integrity issue with downstream effects |

---

## C. Inventory & Warehouse

### C1. Current State
| # | Question | Priority | Why We Ask |
|---|----------|----------|------------|
| C1.1 | Own warehouse or 3PL? How many locations? | Must Ask | Determines WMS scope |
| C1.2 | How many SKUs do you manage? How fast does the catalog change? | Must Ask | System sizing and product lifecycle needs |
| C1.3 | Do you use size-color matrix or other product attributes? | Must Ask (apparel) | Apparel-specific ERP capability |
| C1.4 | What does your pick, pack, ship process look like? | Must Ask | Warehouse workflow requirements |
| C1.5 | How do you generate shipping labels? Which carriers? | Should Ask | Integration needs (FedEx, UPS, USPS, LTL) |

### C2. Pain Points
| # | Question | Priority | Why We Ask |
|---|----------|----------|------------|
| C2.1 | How accurate is your current inventory? When was the last count? | Must Ask | Data migration complexity indicator |
| C2.2 | How do you handle damaged or defective inventory? | Should Ask | Quality control requirements |
| C2.3 | Do you have seasonal inventory patterns? How do you plan for them? | Ask if seasonal | Demand planning requirements |

---

## D. Customer Service & CRM

### D1. Current State
| # | Question | Priority | Why We Ask |
|---|----------|----------|------------|
| D1.1 | How many CS agents? What are operating hours? | Must Ask | System sizing |
| D1.2 | What channels do customers use to contact you? (phone, email, chat, portal) | Must Ask | Omnichannel requirements |
| D1.3 | Walk us through a typical customer service call from ring to resolution. | Must Ask | Process mapping |
| D1.4 | What CRM/CS platform do you use today? What do you like/dislike about it? | Must Ask | Keep vs. replace decision |
| D1.5 | What QA/quality metrics do you track? How? | Should Ask | Automation opportunity |

### D2. Pain Points
| # | Question | Priority | Why We Ask |
|---|----------|----------|------------|
| D2.1 | Can agents see who's calling before they answer? Can they transfer calls? | Must Ask if telephony issues | Basic feature that drives satisfaction |
| D2.2 | How reliable are call recordings and transcripts? | Must Ask if flagged | QA and compliance requirement |
| D2.3 | How do agents log calls? Manual or automatic? How long does it take? | Should Ask | Productivity metric |
| D2.4 | What happens when a customer falls through the cracks? How often? | Must Ask | Service reliability indicator |

---

## E. Integrations

### E1. Current Integrations
| # | Question | Priority | Why We Ask |
|---|----------|----------|------------|
| E1.1 | List every system that connects to your current ERP. Which ones work? Which don't? | Must Ask | Integration landscape and pain points |
| E1.2 | Are integrations built in-house, by vendors, or via middleware (Celigo, Boomi, etc.)? | Must Ask | Technical architecture and maintenance burden |
| E1.3 | How much do you spend annually on integration maintenance? | Should Ask | TCO input |
| E1.4 | What breaks most often? What's the impact when it breaks? | Must Ask | Priority ranking for new system |

### E2. Future Integration Needs
| # | Question | Priority | Why We Ask |
|---|----------|----------|------------|
| E2.1 | In an ideal state, what systems need to talk to each other? | Must Ask | Integration architecture for new ERP |
| E2.2 | Would you consolidate systems if possible, or keep best-of-breed? | Must Ask | Monolith vs. modular strategy (critical for DOSS+Campfire evaluation) |
| E2.3 | How important is real-time data sync vs. batch processing? | Should Ask | Integration complexity driver |

---

## F. Value-Added Services / Manufacturing

### F1. For Apparel/Decoration Businesses
| # | Question | Priority | Why We Ask |
|---|----------|----------|------------|
| F1.1 | Walk us through the embroidery/decoration process end to end. | Must Ask | Process mapping for ERP module requirements |
| F1.2 | Is decoration make-to-order or pre-decorated inventory? Or both? | Must Ask | Affects order management and production planning |
| F1.3 | How do you cost decoration services? Per stitch, per piece, flat rate? | Must Ask | Costing/BOM requirements |
| F1.4 | How do you manage artwork/logos? Customer-provided or maintained library? | Should Ask | Digital asset management needs |
| F1.5 | What are your production bottlenecks? Machines, labor, materials? | Should Ask | Capacity planning requirements |

### F2. For Manufacturing Businesses
| # | Question | Priority | Why We Ask |
|---|----------|----------|------------|
| F2.1 | Describe your BOM structure. How many levels deep? | Must Ask | Manufacturing module requirements |
| F2.2 | Do you use routing/work centers? How do you schedule production? | Must Ask | Production planning needs |
| F2.3 | How do you handle engineering changes? What's the revision control process? | Should Ask | ECN/ECO requirements |
| F2.4 | What's your quality control process? Incoming, in-process, outgoing? | Should Ask | QC module requirements |

---

## G. IT, Data & Migration

### G1. Current State
| # | Question | Priority | Why We Ask |
|---|----------|----------|------------|
| G1.1 | Do you have internal IT staff? Who will own the ERP post-implementation? | Must Ask | Support and maintenance planning |
| G1.2 | How many years of data do you need to migrate? What's required vs. nice-to-have? | Must Ask | Migration scope and effort |
| G1.3 | How clean is your data? Do you trust your inventory/financial numbers? | Must Ask | Migration risk assessment |
| G1.4 | What's your data backup and disaster recovery strategy? | Should Ask | Hosting requirements |
| G1.5 | Are there any regulatory data retention requirements? | Should Ask (PE) | Compliance scope |

---

## H. Strategic & Organizational

### H1. Business Direction
| # | Question | Priority | Why We Ask |
|---|----------|----------|------------|
| H1.1 | Where do you see the business in 3 years? Growth? New markets? New products? | Must Ask | Scalability requirements |
| H1.2 | Is there a potential exit event that affects system requirements? | Must Ask (PE) | Data room, audit trail, reporting needs |
| H1.3 | What does success look like 6 months after go-live? | Must Ask | Defines the acceptance criteria |
| H1.4 | What's the one thing that, if the new ERP doesn't solve, makes the whole project a failure? | Must Ask | The kill requirement — filters everything |
| H1.5 | Is there anything we haven't asked about that keeps you up at night? | Must Ask | The catch-all — always ask last |

---

## Interview Best Practices (for Sayer Consultants)

1. **Record everything** — Fireflies on every call, no exceptions
2. **Follow the thread** — If they say something interesting, dig deeper before moving to the next question
3. **Watch for body language** — Hesitation, sighs, or "that's a good question" usually means there's a story
4. **Don't solve in the interview** — Your job is to listen, not to recommend
5. **Quantify everything** — "How often?" "How long?" "How many?" Turn qualitative pain into numbers
6. **Ask for examples** — "Can you give me a recent example?" turns abstract complaints into concrete requirements
7. **End with the open question** — "What haven't we asked?" catches everything you missed
8. **Debrief immediately** — Capture your impressions within 30 minutes while they're fresh
