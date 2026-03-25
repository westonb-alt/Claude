"""Recommendation Agent — Produces executive-ready ERP selection recommendation."""

from __future__ import annotations

from typing import Any

from core.agents.base import BaseAgent


class RecommendationAgent(BaseAgent):
    """Synthesizes all prior analysis into a final recommendation document.

    Workflow:
    1. Takes scorecard + vendor research + requirements as input
    2. Produces an executive summary with clear recommendation
    3. Includes risk analysis and next steps
    """

    @property
    def name(self) -> str:
        return "ERP Recommendation"

    @property
    def system_prompt(self) -> str:
        return self.load_prompt(
            "recommendation_system",
            client_name=self.config.client_name,
        )

    def execute(self, input_data: dict[str, Any]) -> dict[str, Any]:
        scorecard = input_data.get("scorecard", "")
        vendor_research = input_data.get("vendor_analysis", "")
        requirements = input_data.get("requirements_matrix", "")

        self.log("Generating recommendation...")

        prompt = f"""Produce an executive-ready ERP selection recommendation based on the following analysis.

## Requirements
{requirements}

## Vendor Research
{vendor_research}

## Scorecard
{scorecard}

## Instructions
Create a recommendation document with:

1. **Executive Summary** (1 paragraph) — Clear recommendation with confidence level
2. **Recommendation** — Primary vendor choice with rationale
3. **Runner-Up** — Second choice and when it would be preferred
4. **Risk Analysis** — Top risks with the recommended vendor and mitigation strategies
5. **Implementation Roadmap** — High-level phases and timeline estimate
6. **Cost Summary** — Estimated total cost of ownership (3-year view)
7. **Next Steps** — Immediate action items for the client

Tone: Professional, confident, balanced. Written for C-suite and VP-level stakeholders.
"""

        response = self.chat(prompt)

        output = {
            "client": self.config.client_name,
            "recommendation": response,
        }

        self.save_output(
            f"{self.config.client_name}_recommendation.json",
            output,
        )
        self.save_output(
            f"{self.config.client_name}_recommendation.md",
            response,
        )

        self.log("Recommendation complete.", style="bold green")
        return output
