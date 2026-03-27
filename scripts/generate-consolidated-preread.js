/**
 * Consolidated Pre-Read Generator
 * Generates a single branded .docx with all active projects,
 * one project per page.
 *
 * Usage: node scripts/generate-consolidated-preread.js
 */

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, PageBreak,
  BorderStyle, WidthType, ShadingType, VerticalAlign
} = require("docx");

const { BRAND, SECTION_STYLES } = require("./generate-preread");

// =============================================================================
// LAYOUT HELPERS (reused from generate-preread, adapted for multi-page doc)
// =============================================================================
const noBorder = { style: BorderStyle.NONE, size: 0 };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function sectionBlock(styleKey, bodyParagraphs) {
  const s = SECTION_STYLES[styleKey];
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({
      children: [new TableCell({
        borders: {
          top: noBorder, bottom: noBorder,
          left: { style: BorderStyle.SINGLE, size: 12, color: s.accentColor },
          right: noBorder,
        },
        width: { size: 9360, type: WidthType.DXA },
        shading: { fill: s.bgColor, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 200, right: 200 },
        children: [
          new Paragraph({
            spacing: { after: 60 },
            children: [new TextRun({
              text: s.label, font: BRAND.font, size: 15,
              bold: true, color: s.labelColor, allCaps: true,
            })]
          }),
          ...bodyParagraphs
        ]
      })]
    })]
  });
}

function bodyText(text) {
  return new Paragraph({
    spacing: { after: 0 },
    children: [new TextRun({ text, font: BRAND.font, size: 18, color: BRAND.grey700 })]
  });
}

function bodyTextSpaced(text) {
  return new Paragraph({
    spacing: { after: 60 },
    children: [new TextRun({ text, font: BRAND.font, size: 18, color: BRAND.grey700 })]
  });
}

function boldBodyText(text) {
  return new Paragraph({
    spacing: { after: 60 },
    children: [new TextRun({ text, font: BRAND.font, size: 18, bold: true, color: BRAND.grey700 })]
  });
}

function optionText(label, description) {
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({ text: label + " ", font: BRAND.font, size: 18, bold: true, color: BRAND.grey700 }),
      new TextRun({ text: description, font: BRAND.font, size: 18, color: BRAND.grey700 }),
    ]
  });
}

function bulletItem(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 20 },
    children: [new TextRun({ text, font: BRAND.font, size: 18, color: BRAND.grey700 })]
  });
}

function spacer(twips) {
  return new Paragraph({ spacing: { before: twips }, children: [] });
}

// =============================================================================
// PROJECT DATA
// =============================================================================
const projects = [
  {
    clientName: "APC Consulting",
    owners: "Weston Baker / Cameron Taggart",
    workstreams: "Commission & BI",
    shippedText: "Commission infrastructure built and validated. Master table v3 reconciled across 14 suppliers, Power BI dashboards live, HubSpot properties configured, QuotaPath integration confirmed.",
    blockedText: "Kane introduced a new three-level commission structure one day before final delivery:",
    blockedBullets: [
      "Master table, ETL logic, and split calculations need rebuilding for new tiers",
      "HubSpot properties and Power BI dashboards require remapping",
      "Open questions sent to Kane on Mar 17 remain unanswered",
    ],
    decisionQuestion: "Does Kane want us to deliver or wait?",
    decisionOptions: [
      { label: "A: Deliver now", description: "on original structure. New tiers become a separate phase." },
      { label: "B: Pause and rebuild", description: "for new structure. Requires Kane\u2019s answers and a scope conversation." },
    ],
    callToAction: "Commercial conversation with Kane needed before the team can move.",
  },
  {
    clientName: "Five Lakes Mfg",
    owners: "Weston Baker / Shraddha Hegde",
    workstreams: "BI & Data Pipeline",
    shippedText: "Mapped BearingPoint and Order-to-Production fields to Passport ERP. Linux server access established. First BearingPoint report ETA Mar 27. Sayer proposed building cloud infra; John agreed.",
    blockedText: "Multiple clarifications required from Five Lakes:",
    blockedBullets: [
      "Cloud infra access needed \u2014 Sayer building on AWS but needs credentials from Jamie",
      "Material Cost Report template not provided",
      "Google Sheets walkthrough needed for correct data source tabs",
      "Order-to-Production PDF conversion rules unclear (SCH/TICKET values)",
    ],
    decisionQuestion: "How do we unblock infrastructure?",
    decisionOptions: [
      { label: "A: Sayer builds", description: "cloud infra on AWS. Need Jamie\u2019s credentials by next sync." },
      { label: "B: Wait on FLM IT", description: "to provision. Timeline slips but avoids cost ambiguity." },
    ],
    callToAction: "Schedule report design call with Brent/John. Jamie to provide cloud credentials.",
  },
  {
    clientName: "Five Lakes Mfg",
    owners: "Terry Hooten / Weston Baker",
    workstreams: "ERP Assessment",
    shippedText: "NetSuite intro and follow-up with Nunya/Oracle complete. Phase 1 plan: order-to-cash + inventory for Oct go-live. Epicor follow-up held. Sayer established as sole PM for ERP.",
    blockedText: "ERP costs higher than expected; vendor negotiations ongoing:",
    blockedBullets: [
      "~$585K total over 3 years (licensing + implementation + integration)",
      "Client hasn\u2019t seen final pricing \u2014 Terry leading budget alignment",
      "Dew Point contacted client directly, creating confusion",
      "Manufacturing module selection still open (NetSuite vs. Epicor)",
    ],
    decisionQuestion: "Which ERP path?",
    decisionOptions: [
      { label: "A: NetSuite", description: "via Nunya. Oct 1 go-live. ~$585K/3yr. Manufacturing module TBD." },
      { label: "B: Epicor Kinetic", description: "Purpose-built for mfg. Quote tool integration clearer. Needs full scoping." },
    ],
    callToAction: "Terry to present cost comparison. On-site scoping sessions needed.",
  },
  {
    clientName: "Five Lakes Mfg",
    owners: "Weston Baker / Cameron Taggart",
    workstreams: "HubSpot & CRM",
    shippedText: "Account-based rep assignment agreed. CRM permissions configured. LinkedIn integration strategy outlined for May. Customer issue tracking migration to HubSpot Service Hub scoped.",
    blockedText: "Items needed before April 6 launch:",
    blockedBullets: [
      "PDF storage confirmation (HubSpot native vs. AWS linked)",
      "Quote properties need verification in production",
      "Erica\u2019s invite needs resending; Alexis Bates needs onboarding",
      "Jason departs April 10 \u2014 training must happen week of April 6",
    ],
    decisionQuestion: "On track for April 6?",
    decisionOptions: [
      { label: "A: Launch April 6", description: "as planned. Training this week, all access confirmed." },
      { label: "B: Soft launch April 6", description: "core users live, broader team April 13 after Jason\u2019s window." },
    ],
    callToAction: "Confirm Service Hub, schedule training, onboard Alexis before Jason departs.",
  },
  {
    clientName: "NAKS Inc. (Valesco)",
    owners: "Billy Leigh / Tim Hainey",
    workstreams: "NetSuite Integration",
    shippedText: "On-site discovery complete. NetSuite at 85\u201390%. Rick Dodson confirmed as accounting lead. Invoicing backlog cleanup underway (Jan by Mar 31, Feb by Apr 7, Mar by Apr 15). Scope locked to integration only.",
    blockedText: "Coordination challenges remain:",
    blockedBullets: [
      "Unclear how Sayer works alongside BSP and Dan Cavolo (current ERP PM)",
      "Manufacturing module not yet selected \u2014 blocks planning",
      "Kaitlynn asked about AI for invoicing backlog (currently manual)",
      "Mandatory on-site April 6 \u2014 team alignment needed before then",
    ],
    decisionQuestion: "Sayer\u2019s role vs. existing BSP team?",
    decisionOptions: [
      { label: "A: Sayer leads", description: "and absorbs PM from BSP. Clean ownership." },
      { label: "B: Sayer advises", description: "alongside BSP. Lower friction but risk of duplicated effort." },
    ],
    callToAction: "Pre-kickoff call with Rick to clarify roles before April 6 on-site.",
  },
  {
    clientName: "ResinSmart / RTI Global",
    owners: "Cameron Taggart / Weston Baker",
    workstreams: "Product & Go-to-Market",
    shippedText: "$360K NPK deal closed. Pipeline at $600K. Client Data Strategy nearing completion. Paid media at $5,500/mo. Resin price forecasting built with Claude AI. Benchmark landing page in dev.",
    blockedText: "Strategic decisions and renewals pending:",
    blockedBullets: [
      "ISIS subscription ($30K/yr) due May 28 \u2014 debating renewal vs. CMA",
      "Everstream contract terms and data sharing still being negotiated",
      "Free trial signups dropped to 6 in Feb \u2014 conversion needs work",
    ],
    decisionQuestion: "Renew ISIS or switch to CMA?",
    decisionOptions: [
      { label: "A: Renew ISIS", description: "at $30K/yr. Data continuity. Negotiate better terms." },
      { label: "B: Switch to CMA", description: "Lower cost. Validate data quality first." },
    ],
    callToAction: "Finalize Everstream terms and naming before April webinar.",
  },
  {
    clientName: "Fabian Group",
    owners: "Weston Baker / Terry Hooten",
    workstreams: "ERP Assessment",
    shippedText: "Team prepared: existing docs synthesized, Voltage demos reviewed. Claude ERP assessment skill in development. Engagement framework ready to deploy.",
    blockedText: "Kickoff stalled pending CEO approval:",
    blockedBullets: [
      "Vlada Rassin (CEO) has not signed off \u2014 board anticipates completion",
      "SOW requires sign-off before billable work begins",
      "Addison may need to be involved to expedite",
    ],
    decisionQuestion: "How do we accelerate Vlada\u2019s approval?",
    decisionOptions: [
      { label: "A: Engage Addison", description: "for board-level push. Faster but adds political dimension." },
      { label: "B: Direct outreach", description: "Billy/Greg reach Vlada with value summary and timeline." },
    ],
    callToAction: "SOW sign-off is the single blocker. Determine escalation path this week.",
  },
  {
    clientName: "Thunderbird Minerals",
    owners: "Weston Baker / Billy Leigh",
    workstreams: "Savant AI Implementation",
    isGreen: true,
    greenText: "Green. Savant platform ($5K/yr) for AI-powered PDF processing of revenue statements. Four-week implementation on track. Justin Shaw providing sample PDFs.",
  },
  {
    clientName: "Hari Mari",
    owners: "Weston Baker",
    workstreams: "Amazon & E-commerce",
    shippedText: "Amazon selling model determined unprofitable; pivoting to wholesale and DTC. Account health issues with shipping compliance identified.",
    blockedText: "Amazon platform access issues blocking all progress:",
    blockedBullets: [
      "Developer API access requires owner permissions from Hortensia/Avi",
      "Password reset and admin access needed for Ops account",
      "Amazon AI altering product pages without authorization",
      "Unauthorized sellers creating vendor conflicts",
    ],
    decisionQuestion: "Continue investing in Amazon?",
    decisionOptions: [
      { label: "A: Fix and maintain", description: "as reduced-margin channel alongside DTC." },
      { label: "B: Wind down", description: "Shift fully to wholesale/DTC. Redirect budget." },
    ],
    callToAction: "Hortensia/Avi must provide API permissions and admin access to proceed.",
  },
  {
    clientName: "Mos Vita / Mas Vida Health",
    owners: "Robert Shapiro / Shafi",
    workstreams: "Accounting & Inventory",
    shippedText: "Engagement expanding into extensive inventory reconciliation. Shafi managing execution, Robert overseeing and owning client comms.",
    blockedText: "Resource risk from unexpected staff departure:",
    blockedBullets: [
      "AP clerk unexpectedly resigned \u2014 coverage gap for accounts payable",
      "Inventory reconciliation scope expanding, increasing workload beyond estimate",
    ],
    decisionQuestion: "How to cover the AP gap?",
    decisionOptions: [
      { label: "A: Sayer interim", description: "AP support. Staff temp resource while Mos Vita hires." },
      { label: "B: Client hires", description: "directly. Lower cost but risk of processing delays." },
    ],
    callToAction: "Robert to confirm AP coverage plan with Mos Vita leadership this week.",
  },
  {
    clientName: "Dewise",
    owners: "Weston Baker / Greg Dyer",
    workstreams: "Post-Merger Integration",
    isGreen: true,
    greenText: "Green, no blockers. Weekly syncs continuing on schedule. Siddique Mirajwale onboarded. No escalations this week.",
  },
  {
    clientName: "Epicor Partnership",
    owners: "Billy Leigh / Terry Hooten",
    workstreams: "Channel & Referral",
    shippedText: "Sayer\u2013Epicor sync complete. Unified comms protocol established. Referral partnership identified. ERP playbook creation initiated.",
    blockedText: "Partnership formalization needs follow-through:",
    blockedBullets: [
      "Brenda needs to send referral program details to Billy",
      "Dew Point contacted client directly \u2014 Epicor must address internally",
      "ERP playbook scoped but not yet built",
    ],
    decisionQuestion: "Formalize the Epicor referral partnership now?",
    decisionOptions: [
      { label: "A: Formalize now", description: "while momentum is high. Begin referring leads immediately." },
      { label: "B: Wait for proof point", description: "Deliver Five Lakes first, then negotiate better terms." },
    ],
    callToAction: "Billy to follow up with Brenda. Schedule ERP playbook working session.",
  },
];

// =============================================================================
// BUILD DOCUMENT
// =============================================================================
async function generateConsolidated() {
  const sections = projects.map((p, idx) => {
    const contentChildren = [];

    if (p.isGreen) {
      contentChildren.push(
        spacer(200),
        sectionBlock("green", [bodyText(p.greenText || "Green, no blockers.")]),
      );
    } else {
      contentChildren.push(
        spacer(200),
        sectionBlock("shipped", [bodyText(p.shippedText)]),
        spacer(120),
        sectionBlock("blocked", [
          bodyTextSpaced(p.blockedText),
          ...(p.blockedBullets || []).map(b => bulletItem(b)),
        ]),
        spacer(120),
        sectionBlock("decision", [
          boldBodyText(p.decisionQuestion),
          ...(p.decisionOptions || []).map(opt => optionText(opt.label, opt.description)),
        ]),
      );
    }

    if (p.callToAction) {
      contentChildren.push(
        spacer(160),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [9360],
          rows: [new TableRow({
            children: [new TableCell({
              borders: {
                top: { style: BorderStyle.SINGLE, size: 6, color: BRAND.yellow },
                bottom: { style: BorderStyle.SINGLE, size: 6, color: BRAND.yellow },
                left: { style: BorderStyle.SINGLE, size: 6, color: BRAND.yellow },
                right: { style: BorderStyle.SINGLE, size: 6, color: BRAND.yellow },
              },
              width: { size: 9360, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 200, right: 200 },
              children: [new Paragraph({
                spacing: { after: 0 },
                children: [new TextRun({
                  text: p.callToAction,
                  font: BRAND.font, size: 18, bold: true, color: BRAND.grey700,
                })]
              })]
            })]
          })]
        }),
      );
    }

    return {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1000, right: 1440, bottom: 800, left: 1440 }
        }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            spacing: { after: 0 },
            children: [
              new TextRun({ text: "sayer", font: BRAND.font, size: 16, bold: true, color: BRAND.yellow }),
              new TextRun({ text: "   Pre-Read  |  Weekly Project Sync  |  Week of Mar 24", font: BRAND.font, size: 16, color: BRAND.grey500 }),
            ]
          })]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: `${idx + 1} of ${projects.length}  |  `, font: BRAND.font, size: 14, color: BRAND.grey500 }),
              new TextRun({ text: "Internal Use Only", font: BRAND.font, size: 14, color: BRAND.grey500, italics: true }),
            ]
          })]
        })
      },
      children: [
        // Title banner
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [6500, 2860],
          rows: [new TableRow({
            children: [
              new TableCell({
                borders: noBorders,
                width: { size: 6500, type: WidthType.DXA },
                shading: { fill: BRAND.grey700, type: ShadingType.CLEAR },
                margins: { top: 160, bottom: 160, left: 240, right: 100 },
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    spacing: { after: 30 },
                    children: [new TextRun({ text: p.clientName, font: BRAND.font, size: 28, bold: true, color: BRAND.white })]
                  }),
                  new Paragraph({
                    spacing: { after: 0 },
                    children: [new TextRun({ text: p.owners, font: BRAND.font, size: 17, color: BRAND.grey500 })]
                  }),
                ]
              }),
              new TableCell({
                borders: noBorders,
                width: { size: 2860, type: WidthType.DXA },
                shading: { fill: BRAND.yellow, type: ShadingType.CLEAR },
                margins: { top: 160, bottom: 160, left: 160, right: 160 },
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    spacing: { after: 30 },
                    children: [new TextRun({ text: p.isGreen ? "GREEN" : "ACTIVE", font: BRAND.font, size: 17, bold: true, color: BRAND.black })]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    spacing: { after: 0 },
                    children: [new TextRun({ text: p.workstreams, font: BRAND.font, size: 15, color: BRAND.grey700 })]
                  }),
                ]
              }),
            ]
          })]
        }),
        ...contentChildren,
      ]
    };
  });

  const doc = new Document({
    styles: {
      default: { document: { run: { font: BRAND.font, size: 18 } } },
    },
    numbering: {
      config: [{
        reference: "bullets",
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: "\u2022",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 180 } } }
        }]
      }]
    },
    sections,
  });

  return Packer.toBuffer(doc);
}

// =============================================================================
// MAIN
// =============================================================================
const OUTPUT_DIR = path.join(__dirname, "..", "output", "prereads");

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const buffer = await generateConsolidated();
  const outputPath = path.join(OUTPUT_DIR, "all_projects_preread_mar24.docx");
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated: ${outputPath}`);
}

main();
