"""Scoring Agent — Generates weighted scorecards comparing vendors against requirements."""

from __future__ import annotations

from typing import Any

from core.agents.base import BaseAgent


class ScoringAgent(BaseAgent):
    """Produces weighted vendor scorecards from requirements + vendor research.

    Workflow:
    1. Takes requirements matrix + vendor research as input
    2. Scores each vendor against each requirement
    3. Produces a weighted scorecard with rankings
    """

    @property
    def name(self) -> str:
        return "ERP Vendor Scoring"

    @property
    def system_prompt(self) -> str:
        return self.load_prompt(
            "scoring_system",
            client_name=self.config.client_name,
        )

    def execute(self, input_data: dict[str, Any]) -> dict[str, Any]:
        requirements = input_data.get("requirements_matrix", "")
        vendor_research = input_data.get("vendor_analysis", "")

        self.log("Generating vendor scorecard...")

        prompt = f"""Generate a weighted vendor scorecard based on the following inputs.

## Requirements Matrix
{requirements}

## Vendor Research
{vendor_research}

## Instructions
1. Create a scoring matrix where:
   - Rows = requirements (grouped by category)
   - Columns = vendors
   - Each cell = score (1-5) with brief justification
2. Apply the requirement weights to calculate weighted scores
3. Produce a final ranking with:
   - Total weighted score per vendor
   - Top 3 strengths per vendor
   - Top 3 risks per vendor
   - Overall recommendation tier (Strong Fit / Good Fit / Partial Fit / Poor Fit)

Format as a clear scorecard suitable for executive presentation.
"""

        response = self.chat(prompt)

        output = {
            "client": self.config.client_name,
            "scorecard": response,
        }

        self.save_output(
            f"{self.config.client_name}_scorecard.json",
            output,
        )

        self.log("Scorecard complete.", style="bold green")
        return output
