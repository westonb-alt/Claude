"""Requirements Gathering Agent — Structures client needs into an ERP requirements matrix."""

from __future__ import annotations

from typing import Any

from core.agents.base import BaseAgent


class RequirementsAgent(BaseAgent):
    """Structures client needs into a formal ERP requirements matrix.

    Workflow:
    1. Takes raw client input (interview notes, existing docs, wish lists)
    2. Categorizes requirements by module/function
    3. Outputs a weighted requirements matrix
    """

    @property
    def name(self) -> str:
        return "ERP Requirements Gathering"

    @property
    def system_prompt(self) -> str:
        return self.load_prompt(
            "requirements_system",
            client_name=self.config.client_name,
        )

    def execute(self, input_data: dict[str, Any]) -> dict[str, Any]:
        raw_notes = input_data.get("notes", "")
        existing_systems = input_data.get("existing_systems", "")
        pain_points = input_data.get("pain_points", "")

        self.log("Processing requirements...")

        prompt = f"""Based on the following client input, produce a structured ERP requirements matrix.

## Raw Input
{raw_notes}

## Existing Systems
{existing_systems}

## Key Pain Points
{pain_points}

## Instructions
Produce a requirements matrix with the following structure:
1. **Functional Requirements** — grouped by ERP module (Finance, Supply Chain, HR, Manufacturing, etc.)
2. **Technical Requirements** — hosting, integrations, security, scalability
3. **Operational Requirements** — training, support, implementation timeline
4. **Budget Constraints** — licensing, implementation, ongoing costs

For each requirement:
- Assign a priority: Must Have / Should Have / Nice to Have
- Add a weight (1-10) for scoring purposes
- Note any dependencies or conflicts between requirements

Format as a clean, structured document that can be shared with vendors.
"""

        response = self.chat(prompt)

        output = {
            "client": self.config.client_name,
            "requirements_matrix": response,
        }

        self.save_output(
            f"{self.config.client_name}_requirements.json",
            output,
        )

        self.log("Requirements matrix complete.", style="bold green")
        return output
