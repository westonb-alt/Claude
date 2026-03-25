"""Gap Analysis Agent — Identifies requirement gaps and produces validation interview scripts."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from core.agents.base import BaseAgent


class GapAnalysisAgent(BaseAgent):
    """Analyzes existing documentation to identify requirement gaps and produce interview scripts.

    Workflow:
    1. Takes existing requirements/documentation as input
    2. Identifies gaps, inconsistencies, and unvalidated assumptions
    3. Produces structured interview scripts for stakeholder validation
    4. Outputs a gap report with prioritized items
    """

    @property
    def name(self) -> str:
        return "ERP Gap Analysis"

    @property
    def system_prompt(self) -> str:
        return self.load_prompt(
            "gap_analysis_system",
            client_name=self.config.client_name,
        )

    def execute(self, input_data: dict[str, Any]) -> dict[str, Any]:
        # Load the gap analysis document if it exists
        gap_analysis_path = Path(
            f"practices/erp/data/clients/{self.config.client_name}_gap_analysis.md"
        )
        existing_gaps = ""
        if gap_analysis_path.exists():
            existing_gaps = gap_analysis_path.read_text()

        # Load the knowledge base if it exists
        kb_path = Path(
            f"practices/erp/data/clients/{self.config.client_name}_knowledge_base.md"
        )
        knowledge_base = ""
        if kb_path.exists():
            knowledge_base = kb_path.read_text()

        new_documentation = input_data.get("documentation", "")
        focus_area = input_data.get("focus_area", "all")

        self.log("Running gap analysis...")

        prompt = f"""Analyze the following documentation and produce a comprehensive gap analysis.

## Existing Gap Analysis
{existing_gaps}

## Knowledge Base
{knowledge_base}

## New Documentation to Analyze
{new_documentation}

## Focus Area
{focus_area}

## Instructions

### Part 1: Gap Identification
Review all documentation and identify:
1. **Missing requirements** — areas where no requirement has been documented but should be
2. **Incomplete requirements** — documented but lacking detail for vendor evaluation
3. **Conflicting requirements** — contradictions between different sources
4. **Unvalidated assumptions** — things stated as fact but not confirmed with stakeholders
5. **Integration gaps** — missing connections between systems
6. **Process gaps** — business processes that aren't covered by any requirement

### Part 2: Stakeholder Interview Scripts
For each gap category, produce:
1. **Who to interview** — specific role/person
2. **Questions to ask** — 3-5 targeted questions per gap area
3. **What good answers look like** — expected responses that would close the gap
4. **Red flags** — answers that would indicate deeper problems

### Part 3: Priority Matrix
Rank all gaps by:
- **Impact** (High/Medium/Low) — how much this affects vendor selection
- **Confidence** (High/Medium/Low) — how confident we are in current information
- **Effort to close** (High/Medium/Low) — how much work to validate

Format the output as a structured document suitable for the consulting team to execute.
"""

        response = self.chat(prompt)

        output = {
            "client": self.config.client_name,
            "focus_area": focus_area,
            "gap_analysis": response,
        }

        self.save_output(
            f"{self.config.client_name}_gap_analysis_report.json",
            output,
        )
        self.save_output(
            f"{self.config.client_name}_gap_analysis_report.md",
            response,
        )

        self.log("Gap analysis complete.", style="bold green")
        return output
