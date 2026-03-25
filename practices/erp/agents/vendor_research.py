"""Vendor Research Agent — Researches and compares ERP vendors against client requirements."""

from __future__ import annotations

from typing import Any

from core.agents.base import BaseAgent, AgentConfig


class VendorResearchAgent(BaseAgent):
    """Researches ERP vendors and produces structured comparison data.

    Workflow:
    1. Takes client requirements as input
    2. Researches relevant ERP vendors
    3. Produces a structured vendor comparison matrix
    """

    @property
    def name(self) -> str:
        return "ERP Vendor Research"

    @property
    def system_prompt(self) -> str:
        return self.load_prompt(
            "vendor_research_system",
            client_name=self.config.client_name,
        )

    def execute(self, input_data: dict[str, Any]) -> dict[str, Any]:
        requirements = input_data.get("requirements", "")
        industry = input_data.get("industry", "")
        budget_range = input_data.get("budget_range", "")
        company_size = input_data.get("company_size", "")

        self.log("Starting vendor research...")

        prompt = f"""Analyze the following client requirements and provide a structured ERP vendor comparison.

## Client Profile
- Industry: {industry}
- Company Size: {company_size}
- Budget Range: {budget_range}

## Requirements
{requirements}

## Instructions
1. Identify the top 3-5 ERP vendors that best fit these requirements
2. For each vendor, provide:
   - Product name and edition
   - Key strengths for this client's needs
   - Key risks or gaps
   - Estimated cost range
   - Implementation timeline estimate
   - Industry fit rating (1-5)
3. Provide a preliminary ranking with rationale

Format your response as a structured analysis suitable for a consultant to review and refine.
"""

        response = self.chat(prompt)

        output = {
            "client": self.config.client_name,
            "input": input_data,
            "vendor_analysis": response,
        }

        self.save_output(
            f"{self.config.client_name}_vendor_research.json",
            output,
        )

        self.log("Vendor research complete.", style="bold green")
        return output
