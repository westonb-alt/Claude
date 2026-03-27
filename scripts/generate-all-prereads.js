/**
 * Batch Pre-Read Generator
 * Generates branded one-page pre-read .docx files for all active projects.
 *
 * Sources: Fireflies transcripts, Gmail threads, meeting notes
 * Generated: Week of Mar 24, 2026
 *
 * Usage: node scripts/generate-all-prereads.js
 */

const fs = require("fs");
const path = require("path");
const { generatePreread } = require("./generate-preread");

const OUTPUT_DIR = path.join(__dirname, "..", "output", "prereads");

const projects = [
  // =========================================================================
  // 1. APC Consulting — Commission & BI
  // =========================================================================
  {
    filename: "apc_consulting_preread_mar24.docx",
    config: {
      clientName: "APC Consulting",
      owners: "Weston Baker / Cameron Taggart",
      weekOf: "Week of Mar 24",
      workstreams: "Commission & BI",

      shippedText:
        "Commission infrastructure built and validated. Master table v3 reconciled across 14 suppliers, Power BI dashboards live with book value and cash-basis views, HubSpot properties configured, QuotaPath integration confirmed. We were days from final delivery to Kane.",

      blockedText:
        "Kane introduced a new three-level commission structure roughly one day before final delivery. This changes the commission logic end to end:",
      blockedBullets: [
        "Master table, ETL logic, and split calculations need to be rebuilt for the new tiers",
        "HubSpot properties and Power BI dashboards require remapping to the updated structure",
        "QuotaPath data flows need revalidation",
        "Open questions sent to Kane on Mar 17 (upfront payment handling, clawbacks, legacy deals) remain unanswered",
      ],

      decisionQuestion: "Does Kane want us to deliver or wait?",
      decisionOptions: [
        {
          label: "Option A: Deliver now",
          description:
            "on the original structure. New commission tiers become a separate phase with its own scope and timeline.",
        },
        {
          label: "Option B: Pause and rebuild",
          description:
            "for the new structure before delivering. Requires Kane\u2019s answers to open questions and a commercial conversation on scope.",
        },
      ],

      callToAction:
        "We need a commercial conversation with Kane before the team can move either direction.",
    },
  },

  // =========================================================================
  // 2. Five Lakes Manufacturing — BI & Data
  // =========================================================================
  {
    filename: "five_lakes_bi_preread_mar24.docx",
    config: {
      clientName: "Five Lakes Manufacturing",
      owners: "Weston Baker / Shraddha Hegde",
      weekOf: "Week of Mar 24",
      workstreams: "BI & Data Pipeline",

      shippedText:
        "Mapped required fields for BearingPoint Report and Order to Production to Passport ERP columns. Established access to Passport data through the Linux server. First report outcome for BearingPoint in progress on the remote machine (ETA Mar 27). Sayer proposed building cloud infrastructure ourselves to accelerate delivery; John agreed and Brent added to weekly sync.",

      blockedText:
        "Multiple clarifications from Five Lakes are required before reports can be finalized. John deprioritized BearingPoint, shifting the task list mid-sprint:",
      blockedBullets: [
        "Cloud infrastructure access still needed \u2014 Sayer offered to build on AWS (S3, EC2, PostgreSQL) but needs credentials from Jamie/Precision CS",
        "Final report template for Material Cost Report not yet provided",
        "Google Sheets walkthrough needed to identify correct tabs for BearingPoint and Order to Production data sources",
        "Order to Production PDF conversion rules unclear \u2014 how are SCH and TICKET values populated?",
        "Report distribution method undecided (automated email vs. shared drive)",
      ],

      decisionQuestion:
        "How should we handle the BearingPoint deprioritization and unblock infrastructure?",
      decisionOptions: [
        {
          label: "Option A: Sayer builds cloud infra",
          description:
            "independently using AWS. We need Jamie\u2019s credentials by next sync to stay on schedule.",
        },
        {
          label: "Option B: Wait on Five Lakes IT",
          description:
            "to provision infrastructure. Timeline slips but avoids any cost ambiguity.",
        },
      ],

      callToAction:
        "Schedule report design call with Brent and John to finalize the first three reports. Jamie needs to provide cloud access credentials.",
    },
  },

  // =========================================================================
  // 3. Five Lakes Manufacturing — ERP (NetSuite / Epicor)
  // =========================================================================
  {
    filename: "five_lakes_erp_preread_mar24.docx",
    config: {
      clientName: "Five Lakes Manufacturing",
      owners: "Terry Hooten / Weston Baker",
      weekOf: "Week of Mar 24",
      workstreams: "ERP Assessment & Implementation",

      shippedText:
        "Completed NetSuite introduction and follow-up with Nunya/Oracle. Phased implementation plan defined: Phase 1 targets order-to-cash and inventory management for early October go-live. Epicor follow-up held with David Back\u2019s team to explore quote tool-to-ERP integration and no-input configurator for automated BOM creation. Sayer established as sole project manager for ERP implementation \u2014 communication protocols locked down with Epicor.",

      blockedText:
        "ERP cost estimates are significantly higher than expected, and vendor negotiations are ongoing:",
      blockedBullets: [
        "Total project cost estimated at ~$585K over three years (licensing + implementation + integration)",
        "Client has not yet seen final pricing \u2014 Terry leading budget alignment conversations with Five Lakes",
        "Dew Point (external partner) contacted client directly, creating confusion \u2014 Sayer asserted PM ownership with Epicor",
        "Manufacturing module selection still open between NetSuite and Epicor paths",
        "Quote tool outputs need review by Epicor team before integration approach can be finalized (Jim sending example PDFs)",
      ],

      decisionQuestion:
        "Which ERP path does Five Lakes want to commit to?",
      decisionOptions: [
        {
          label: "Option A: NetSuite via Nunya",
          description:
            "Phased rollout targeting Oct 1 go-live. ~$585K over 3 years. Strong order-to-cash and inventory story but manufacturing module TBD.",
        },
        {
          label: "Option B: Epicor Kinetic",
          description:
            "Purpose-built for manufacturing. Quote tool integration path clearer, but requires full scoping and separate cost proposal.",
        },
      ],

      callToAction:
        "Terry to present cost comparison to Five Lakes leadership. On-site scoping sessions (6\u20138 hrs) needed to refine discovery before final recommendation.",
    },
  },

  // =========================================================================
  // 4. Five Lakes Manufacturing — HubSpot / CRM
  // =========================================================================
  {
    filename: "five_lakes_hubspot_preread_mar24.docx",
    config: {
      clientName: "Five Lakes Manufacturing",
      owners: "Weston Baker / Cameron Taggart",
      weekOf: "Week of Mar 24",
      workstreams: "HubSpot & CRM",

      shippedText:
        "Account-based rep assignment model agreed upon for CRM territory management. CRM permissions configured so rep agencies see only assigned accounts. LinkedIn integration strategy outlined with Jason and Jim for May content rollout. Customer issue tracking migration from spreadsheets to HubSpot Service Hub tickets is scoped and in progress.",

      blockedText:
        "Several items need resolution before the April 6 launch target:",
      blockedBullets: [
        "Need to confirm whether PDFs are stored natively in HubSpot or linked to AWS \u2014 affects retention policy",
        "Quote properties in HubSpot production environment need verification for completeness",
        "Erica\u2019s HubSpot invite needs resending; Alexis Bates needs to be added and onboarded",
        "Service Hub subscription confirmation needed for ticketing pipeline functionality",
        "Jason departs April 10 \u2014 training sessions must be scheduled during week of April 6",
      ],

      decisionQuestion:
        "Are we on track for the April 6 launch?",
      decisionOptions: [
        {
          label: "Option A: Launch April 6 as planned",
          description:
            "Requires training sessions scheduled this week, all user access confirmed, and Service Hub verified by end of next week.",
        },
        {
          label: "Option B: Soft launch April 6, full rollout April 13",
          description:
            "Core users go live April 6, broader team onboarded the following week after Jason\u2019s training window.",
        },
      ],

      callToAction:
        "Confirm Service Hub access, schedule training sessions for week of April 6, and get Alexis Bates onboarded before Jason\u2019s departure.",
    },
  },

  // =========================================================================
  // 5. NAKS (Valesco Industries) — NetSuite Integration
  // =========================================================================
  {
    filename: "naks_valesco_preread_mar24.docx",
    config: {
      clientName: "NAKS Inc. (Valesco)",
      owners: "Billy Leigh / Tim Hainey",
      weekOf: "Week of Mar 24",
      workstreams: "NetSuite Integration",

      shippedText:
        "On-site discovery completed with NAKS leadership (Sacha, Rick, Dennis, Sherri, Bryan). NetSuite implementation assessed at 85\u201390% complete. Key gaps identified in invoicing, inventory data, and order processing. Rick Dodson confirmed as accounting lead; Paul Balodis on invoicing cleanup, Omodion Okojie on manufacturing cost accounting. Invoicing backlog cleanup underway with Jan target by Mar 31, Feb by Apr 7, Mar by Apr 15. Wednesday check-ins established.",

      blockedText:
        "Scope has been formally narrowed to NetSuite integration only, but several coordination challenges remain:",
      blockedBullets: [
        "Sacha naturally broadens conversations beyond integration scope \u2014 team must hold the line in meetings",
        "Unclear how Sayer works alongside BSP (current implementation provider) and Dan Cavolo (ERP PM) \u2014 Rick requested a pre-kickoff call",
        "Manufacturing module not yet selected for NetSuite \u2014 blocks manufacturing implementation planning",
        "Kaitlynn asked if AI/automation could accelerate the invoicing backlog upload (currently manual entry from Salesforce)",
        "Mandatory on-site scheduled for April 6 \u2014 team alignment needed before then",
      ],

      decisionQuestion:
        "How does Sayer engage alongside the existing BSP/NetSuite team?",
      decisionOptions: [
        {
          label: "Option A: Sayer leads",
          description:
            "and absorbs PM responsibilities from BSP/Dan Cavolo. Clean ownership, single point of accountability.",
        },
        {
          label: "Option B: Sayer advises",
          description:
            "alongside BSP. Lower friction with existing vendor relationships but risk of duplicated effort and unclear ownership.",
        },
      ],

      callToAction:
        "Schedule pre-kickoff call with Rick to clarify Sayer vs. BSP roles before the April 6 on-site. Initial working session with key stakeholders to follow.",
    },
  },

  // =========================================================================
  // 6. ResinSmart / RTI Global — Product & Go-to-Market
  // =========================================================================
  {
    filename: "resinsmart_rti_preread_mar24.docx",
    config: {
      clientName: "ResinSmart / RTI Global",
      owners: "Cameron Taggart / Weston Baker",
      weekOf: "Week of Mar 24",
      workstreams: "Product & Go-to-Market",

      shippedText:
        "New $360K two-year NPK deal closed. Pipeline grew to $600K. Client Data Strategy product nearing completion. Paid media spend increasing to $5,500/month. Resin price forecasting models being built with Claude AI. Benchmark landing page under development. April webinar planned on procurement strategies. Marmon quarterly meeting prep underway for April 2.",

      blockedText:
        "Several strategic decisions and renewals need resolution:",
      blockedBullets: [
        "ISIS subscription renewal ($30K/year) due May 28 \u2014 debating necessity vs. CMA as a cheaper backup data source",
        "Everstream platform implementation scheduled for April but contract terms and data sharing rights still being negotiated",
        "Naming inconsistency between \u201Cbenchmark\u201D and \u201Cdiagnostic\u201D offerings causing market confusion",
        "Free trial signups dropped to 6 in February \u2014 conversion funnel needs improvement",
      ],

      decisionQuestion:
        "Do we renew the ISIS subscription or switch to CMA?",
      decisionOptions: [
        {
          label: "Option A: Renew ISIS",
          description:
            "at $30K/year. Maintains data continuity and existing integrations. Negotiate for better terms before May 28 deadline.",
        },
        {
          label: "Option B: Switch to CMA",
          description:
            "Lower cost alternative. Requires validation that CMA data quality meets forecasting model requirements.",
        },
      ],

      callToAction:
        "Finalize Everstream contract terms and lock in benchmark vs. diagnostic naming before April webinar.",
    },
  },

  // =========================================================================
  // 7. Fabian Group — ERP Assessment
  // =========================================================================
  {
    filename: "fabian_group_preread_mar24.docx",
    config: {
      clientName: "Fabian Group",
      owners: "Weston Baker / Terry Hooten",
      weekOf: "Week of Mar 24",
      workstreams: "ERP Assessment",

      blockedText:
        "Project kickoff is stalled pending CEO approval:",
      blockedBullets: [
        "Vlada Rassin (CEO) has not yet signed off on the engagement \u2014 board anticipates completion",
        "Statement of Work requires sign-off before any billable work begins",
        "Team is pre-loading by synthesizing existing documents and demos from Voltage, but cannot proceed formally",
        "Addison may need to be involved to expedite Vlada\u2019s approval",
      ],

      shippedText:
        "Team has prepared by synthesizing existing client documents and vendor demos from Voltage. AI-powered Claude skill being developed for reusable ERP assessment methodology. Claude Excel plugin demoed for financial modeling (52-week cash projections, forensic accounting). Engagement framework is ready to deploy once approved.",

      decisionQuestion:
        "How do we accelerate Vlada\u2019s approval?",
      decisionOptions: [
        {
          label: "Option A: Engage Addison",
          description:
            "to facilitate board-level push for SOW sign-off. Faster but adds a political dimension.",
        },
        {
          label: "Option B: Direct outreach",
          description:
            "Billy or Greg reach out to Vlada directly with a concise value summary and timeline to close.",
        },
      ],

      callToAction:
        "SOW sign-off is the single blocker. Determine escalation path to Vlada this week.",
    },
  },

  // =========================================================================
  // 8. Thunderbird Minerals — Savant Implementation
  // =========================================================================
  {
    filename: "thunderbird_minerals_preread_mar24.docx",
    config: {
      clientName: "Thunderbird Minerals",
      owners: "Weston Baker / Billy Leigh",
      weekOf: "Week of Mar 24",
      workstreams: "Savant AI Implementation",

      isGreen: true,
      greenText:
        "Green. Implementing Savant platform ($5K/year) for AI-powered PDF processing of revenue statements. Four-week implementation plan on track. Justin Shaw providing sample PDFs and setting up Savant access. Broader use cases beyond PDF processing being scoped for future phases.",

      callToAction: null,
    },
  },

  // =========================================================================
  // 9. Hari Mari — Amazon / E-commerce
  // =========================================================================
  {
    filename: "hari_mari_preread_mar24.docx",
    config: {
      clientName: "Hari Mari",
      owners: "Weston Baker",
      weekOf: "Week of Mar 24",
      workstreams: "Amazon & E-commerce",

      shippedText:
        "Amazon selling model determined unprofitable; strategic pivot to wholesale and DTC underway. Account health issues with shipping compliance identified and being addressed.",

      blockedText:
        "Multiple Amazon platform access issues are blocking progress:",
      blockedBullets: [
        "Developer API access requires account owner permissions \u2014 Hortensia and Avi need to grant access",
        "Password reset and admin access needed for the Ops Amazon account",
        "Payment method updates required before developer app access can be provisioned",
        "Amazon AI is altering product pages without authorization, creating content drift",
        "Unauthorized sellers creating vendor conflicts on listings",
      ],

      decisionQuestion:
        "Does Hari Mari want to continue investing in the Amazon channel?",
      decisionOptions: [
        {
          label: "Option A: Fix and maintain",
          description:
            "Resolve access issues, clean up listings, and run Amazon as a reduced-margin channel alongside DTC.",
        },
        {
          label: "Option B: Wind down Amazon",
          description:
            "Shift fully to wholesale and DTC. Redirect Amazon ops budget to higher-margin channels.",
        },
      ],

      callToAction:
        "Hortensia and Avi must provide developer API permissions and account admin access before any technical work can proceed.",
    },
  },

  // =========================================================================
  // 10. Mos Vita / Mas Vida Health — Accounting & Inventory
  // =========================================================================
  {
    filename: "mos_vita_preread_mar24.docx",
    config: {
      clientName: "Mos Vita / Mas Vida Health",
      owners: "Robert Shapiro / Shafi",
      weekOf: "Week of Mar 24",
      workstreams: "Accounting & Inventory",

      blockedText:
        "Resource risk has emerged due to unexpected staff departure:",
      blockedBullets: [
        "AP clerk unexpectedly resigned \u2014 creates coverage gap for accounts payable processing",
        "Inventory reconciliation scope expanding through 2025, increasing workload beyond original estimate",
      ],

      shippedText:
        "Engagement scope expanding into extensive inventory reconciliation. Shafi managing day-to-day execution with Robert Shapiro overseeing. Robert owns all client communications for technical teams.",

      decisionQuestion:
        "How do we cover the AP clerk gap?",
      decisionOptions: [
        {
          label: "Option A: Sayer provides interim AP support",
          description:
            "Staff a temporary resource to cover AP processing while Mos Vita hires a replacement. Keeps operations running.",
        },
        {
          label: "Option B: Client hires directly",
          description:
            "Mos Vita sources their own AP replacement. Lower cost but risk of processing delays during the gap.",
        },
      ],

      callToAction:
        "Robert Shapiro to confirm AP coverage plan with Mos Vita leadership this week.",
    },
  },

  // =========================================================================
  // 11. Dewise — Post-Merger Integration (Green)
  // =========================================================================
  {
    filename: "dewise_preread_mar24.docx",
    config: {
      clientName: "Dewise",
      owners: "Weston Baker / Greg Dyer",
      weekOf: "Week of Mar 24",
      workstreams: "Post-Merger Integration",

      isGreen: true,
      greenText:
        "Green, no blockers. Weekly syncs continuing on schedule. Siddique Mirajwale onboarded and attending. No escalations this week.",

      callToAction: null,
    },
  },

  // =========================================================================
  // 12. Epicor Partnership — Channel & Referral
  // =========================================================================
  {
    filename: "epicor_partnership_preread_mar24.docx",
    config: {
      clientName: "Epicor Partnership",
      owners: "Billy Leigh / Terry Hooten",
      weekOf: "Week of Mar 24",
      workstreams: "Channel & Referral",

      shippedText:
        "Sayer\u2013Epicor sync completed. Established unified communication protocol with Sayer as single point of contact for Five Lakes. Brenda Nobleza confirmed Epicor\u2019s support for holistic partner management model. Referral partnership opportunity identified \u2014 Sayer refers qualified manufacturing leads, Epicor handles implementations. Centralized ERP implementation playbook creation initiated using Notion, Google Drive, and Claude AI.",

      blockedText:
        "Partnership formalization needs follow-through:",
      blockedBullets: [
        "Brenda needs to send referral program details and process documentation to Billy",
        "Dew Point contacted Five Lakes client directly \u2014 Epicor team needs to address internally to prevent recurrence",
        "ERP implementation playbook is scoped but not yet built \u2014 working session with Terry and Weston needed",
      ],

      decisionQuestion:
        "Do we formalize the Epicor referral partnership now?",
      decisionOptions: [
        {
          label: "Option A: Formalize now",
          description:
            "Lock in the referral program while momentum is high. Sayer begins referring mid-market manufacturing leads immediately.",
        },
        {
          label: "Option B: Wait for Five Lakes proof point",
          description:
            "Deliver Five Lakes successfully first, then use it as the case study to negotiate better referral terms.",
        },
      ],

      callToAction:
        "Billy to follow up with Brenda on referral program details. Schedule working session for ERP playbook creation.",
    },
  },
];

// =============================================================================
// MAIN
// =============================================================================
async function main() {
  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`Generating ${projects.length} pre-read documents...\n`);

  for (const project of projects) {
    try {
      const buffer = await generatePreread(project.config);
      const outputPath = path.join(OUTPUT_DIR, project.filename);
      fs.writeFileSync(outputPath, buffer);
      console.log(`  [OK] ${project.filename}`);
    } catch (err) {
      console.error(`  [FAIL] ${project.filename}: ${err.message}`);
    }
  }

  console.log(`\nDone. Files written to: ${OUTPUT_DIR}`);
}

main();
