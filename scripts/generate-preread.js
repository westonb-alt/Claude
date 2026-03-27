/**
 * Sayer Pre-Read Generator
 *
 * Generates branded one-page project pre-read documents (.docx)
 * for the weekly project sync meeting.
 *
 * Usage:
 *   node generate-preread.js
 *
 * To integrate into a codebase:
 *   const { generatePreread } = require('./generate-preread');
 *   generatePreread(config).then(buffer => fs.writeFileSync('output.docx', buffer));
 *
 * Dependencies:
 *   npm install docx
 */

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  BorderStyle, WidthType, ShadingType, VerticalAlign
} = require("docx");

// =============================================================================
// BRAND TOKENS
// =============================================================================
const BRAND = {
  yellow: "FEC700",
  black: "000000",
  white: "FFFFFF",
  grey700: "2E2E2E",
  grey600: "7E7E7E",
  grey500: "BCBCBC",
  grey300: "E3E3E3",
  font: "Calibri",
};

const SECTION_STYLES = {
  shipped: {
    label: "Shipped",
    labelColor: "0F6E56",
    bgColor: "E8F5EE",
    accentColor: "1D9E75",
  },
  blocked: {
    label: "Blocked / at risk",
    labelColor: "993C1D",
    bgColor: "FEF0EB",
    accentColor: "D85A30",
  },
  decision: {
    label: "Decision needed",
    labelColor: "185FA5",
    bgColor: "EBF3FC",
    accentColor: "378ADD",
  },
  green: {
    label: "Status",
    labelColor: "0F6E56",
    bgColor: "E8F5EE",
    accentColor: "1D9E75",
  },
};

// =============================================================================
// LAYOUT HELPERS
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
          top: noBorder,
          bottom: noBorder,
          left: { style: BorderStyle.SINGLE, size: 12, color: s.accentColor },
          right: noBorder,
        },
        width: { size: 9360, type: WidthType.DXA },
        shading: { fill: s.bgColor, type: ShadingType.CLEAR },
        margins: { top: 140, bottom: 140, left: 240, right: 240 },
        children: [
          new Paragraph({
            spacing: { after: 100 },
            children: [new TextRun({
              text: s.label,
              font: BRAND.font,
              size: 17,
              bold: true,
              color: s.labelColor,
              allCaps: true,
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
    children: [new TextRun({
      text,
      font: BRAND.font,
      size: 20,
      color: BRAND.grey700,
    })]
  });
}

function bodyTextSpaced(text) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [new TextRun({
      text,
      font: BRAND.font,
      size: 20,
      color: BRAND.grey700,
    })]
  });
}

function boldBodyText(text) {
  return new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({
      text,
      font: BRAND.font,
      size: 21,
      bold: true,
      color: BRAND.grey700,
    })]
  });
}

function optionText(label, description) {
  return new Paragraph({
    spacing: { after: 50 },
    children: [
      new TextRun({ text: label + " ", font: BRAND.font, size: 20, bold: true, color: BRAND.grey700 }),
      new TextRun({ text: description, font: BRAND.font, size: 20, color: BRAND.grey700 }),
    ]
  });
}

function bulletItem(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 30 },
    children: [new TextRun({ text, font: BRAND.font, size: 20, color: BRAND.grey700 })]
  });
}

function spacer(twips) {
  return new Paragraph({ spacing: { before: twips }, children: [] });
}

// =============================================================================
// GENERATOR
// =============================================================================

/**
 * Generate a pre-read document buffer.
 *
 * @param {Object} config
 * @param {string} config.clientName       - e.g. "APC Consulting"
 * @param {string} config.owners           - e.g. "Weston Baker / Cameron Taggart"
 * @param {string} config.weekOf           - e.g. "Week of Mar 24"
 * @param {string} config.workstreams      - e.g. "Commission & BI"
 *
 * @param {string} config.shippedText      - Paragraph text for shipped section
 *
 * @param {string} config.blockedText      - Intro paragraph for blocked section
 * @param {string[]} config.blockedBullets - Array of bullet strings for blocked section
 *
 * @param {string} config.decisionQuestion - Bold question for decision section
 * @param {Object[]} config.decisionOptions - Array of { label, description } for options
 *
 * @param {string} config.callToAction     - Bold statement at the bottom
 *
 * @param {boolean} [config.isGreen]       - If true, renders a green "no blockers" pre-read
 * @param {string} [config.greenText]      - One-liner for green status
 *
 * @returns {Promise<Buffer>} .docx file buffer
 */
async function generatePreread(config) {
  const {
    clientName,
    owners,
    weekOf,
    workstreams,
    shippedText,
    blockedText,
    blockedBullets = [],
    decisionQuestion,
    decisionOptions = [],
    callToAction,
    isGreen = false,
    greenText,
  } = config;

  // Build section content
  const contentChildren = [];

  if (isGreen) {
    // Green project: single status block
    contentChildren.push(
      spacer(260),
      sectionBlock("green", [bodyText(greenText || "Green, no blockers.")]),
    );
  } else {
    // Full pre-read: shipped, blocked, decision
    contentChildren.push(
      spacer(260),
      sectionBlock("shipped", [bodyText(shippedText)]),
      spacer(180),
      sectionBlock("blocked", [
        bodyTextSpaced(blockedText),
        ...blockedBullets.map(b => bulletItem(b)),
      ]),
      spacer(180),
      sectionBlock("decision", [
        boldBodyText(decisionQuestion),
        ...decisionOptions.map(opt => optionText(opt.label, opt.description)),
      ]),
    );
  }

  // Call to action
  if (callToAction) {
    contentChildren.push(
      spacer(220),
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
            margins: { top: 120, bottom: 120, left: 240, right: 240 },
            children: [new Paragraph({
              spacing: { after: 0 },
              children: [new TextRun({
                text: callToAction,
                font: BRAND.font,
                size: 20,
                bold: true,
                color: BRAND.grey700,
              })]
            })]
          })]
        })]
      }),
    );
  }

  const doc = new Document({
    styles: {
      default: { document: { run: { font: BRAND.font, size: 21 } } },
    },
    numbering: {
      config: [{
        reference: "bullets",
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: "\u2022",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 420, hanging: 210 } } }
        }]
      }]
    },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1100, right: 1440, bottom: 900, left: 1440 }
        }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            spacing: { after: 0 },
            children: [
              new TextRun({ text: "sayer", font: BRAND.font, size: 16, bold: true, color: BRAND.yellow }),
              new TextRun({ text: "   Pre-Read  |  Weekly Project Sync", font: BRAND.font, size: 16, color: BRAND.grey500 }),
            ]
          })]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: "Internal Use Only", font: BRAND.font, size: 14, color: BRAND.grey500, italics: true })]
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
                margins: { top: 200, bottom: 200, left: 280, right: 120 },
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    spacing: { after: 40 },
                    children: [new TextRun({ text: clientName, font: BRAND.font, size: 32, bold: true, color: BRAND.white })]
                  }),
                  new Paragraph({
                    spacing: { after: 0 },
                    children: [new TextRun({ text: owners, font: BRAND.font, size: 19, color: BRAND.grey500 })]
                  }),
                ]
              }),
              new TableCell({
                borders: noBorders,
                width: { size: 2860, type: WidthType.DXA },
                shading: { fill: BRAND.yellow, type: ShadingType.CLEAR },
                margins: { top: 200, bottom: 200, left: 200, right: 200 },
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    spacing: { after: 40 },
                    children: [new TextRun({ text: weekOf, font: BRAND.font, size: 19, bold: true, color: BRAND.black })]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    spacing: { after: 0 },
                    children: [new TextRun({ text: workstreams, font: BRAND.font, size: 17, color: BRAND.grey700 })]
                  }),
                ]
              }),
            ]
          })]
        }),
        ...contentChildren,
      ]
    }]
  });

  return Packer.toBuffer(doc);
}

// =============================================================================
// EXAMPLE: APC Pre-Read (Week of Mar 24, 2026)
// =============================================================================
if (require.main === module) {
  const config = {
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
  };

  generatePreread(config).then(buffer => {
    const outputPath = "./apc_preread_mar24.docx";
    fs.writeFileSync(outputPath, buffer);
    console.log(`Generated: ${outputPath}`);
  });
}

module.exports = { generatePreread, BRAND, SECTION_STYLES };
