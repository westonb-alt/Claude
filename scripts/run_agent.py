"""CLI entry point for running Sayer agents.

Usage:
    python -m scripts.run_agent erp vendor-research --client fabian
    python -m scripts.run_agent erp requirements --client fabian
    python -m scripts.run_agent erp scoring --client fabian
    python -m scripts.run_agent erp gap-analysis --client fabian
    python -m scripts.run_agent erp full-workflow --client fabian
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from rich.console import Console

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from core.agents.base import AgentConfig
from core.utils.config import load_client_config
from practices.erp.agents import (
    VendorResearchAgent,
    RequirementsAgent,
    ScoringAgent,
    RecommendationAgent,
    GapAnalysisAgent,
)

console = Console()

AGENT_MAP = {
    "erp": {
        "vendor-research": VendorResearchAgent,
        "requirements": RequirementsAgent,
        "scoring": ScoringAgent,
        "recommendation": RecommendationAgent,
        "gap-analysis": GapAnalysisAgent,
    }
}


def run_single_agent(practice: str, agent_name: str, client: str, input_file: str | None = None):
    """Run a single agent."""
    if practice not in AGENT_MAP:
        console.print(f"[red]Unknown practice:[/red] {practice}")
        console.print(f"Available: {', '.join(AGENT_MAP.keys())}")
        sys.exit(1)

    if agent_name not in AGENT_MAP[practice]:
        console.print(f"[red]Unknown agent:[/red] {agent_name}")
        console.print(f"Available: {', '.join(AGENT_MAP[practice].keys())}")
        sys.exit(1)

    client_config = load_client_config(practice, client)

    config = AgentConfig(
        client_name=client,
        practice=practice,
        data_dir=Path(f"practices/{practice}/data"),
        output_dir=Path(f"output/{client}"),
    )

    agent_class = AGENT_MAP[practice][agent_name]
    agent = agent_class(config)

    input_data = {}
    if input_file:
        input_data = json.loads(Path(input_file).read_text())

    console.print(f"\n[bold]Running {agent.name} for {client}[/bold]\n")
    result = agent.run(input_data)
    console.print(f"\n[bold green]Done.[/bold green]\n")
    return result


def run_full_workflow(practice: str, client: str):
    """Run the full agent workflow for a practice."""
    if practice != "erp":
        console.print(f"[red]Full workflow not yet implemented for:[/red] {practice}")
        sys.exit(1)

    console.print(f"\n[bold]Running full ERP workflow for {client}[/bold]\n")

    config = AgentConfig(
        client_name=client,
        practice=practice,
        data_dir=Path(f"practices/{practice}/data"),
        output_dir=Path(f"output/{client}"),
    )

    # Step 1: Requirements
    req_agent = RequirementsAgent(config)
    req_result = req_agent.run()

    # Step 2: Vendor Research
    research_agent = VendorResearchAgent(config)
    research_result = research_agent.run(req_result)

    # Step 3: Scoring
    scoring_agent = ScoringAgent(config)
    score_result = scoring_agent.run({**req_result, **research_result})

    # Step 4: Recommendation
    rec_agent = RecommendationAgent(config)
    rec_result = rec_agent.run({**req_result, **research_result, **score_result})

    console.print(f"\n[bold green]Full workflow complete for {client}.[/bold green]")
    return rec_result


def main():
    parser = argparse.ArgumentParser(description="Run Sayer consulting agents")
    parser.add_argument("practice", help="Practice area (e.g., erp)")
    parser.add_argument("agent", help="Agent to run (e.g., vendor-research, full-workflow)")
    parser.add_argument("--client", required=True, help="Client name")
    parser.add_argument("--input", help="Path to JSON input file", default=None)

    args = parser.parse_args()

    if args.agent == "full-workflow":
        run_full_workflow(args.practice, args.client)
    else:
        run_single_agent(args.practice, args.agent, args.client, args.input)


if __name__ == "__main__":
    main()
