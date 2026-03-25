"""Base agent class that all practice agents inherit from."""

from __future__ import annotations

import json
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import anthropic
from rich.console import Console

console = Console()


@dataclass
class AgentConfig:
    """Configuration for an agent instance."""

    client_name: str
    practice: str
    model: str = "claude-sonnet-4-20250514"
    max_tokens: int = 4096
    data_dir: Path = field(default_factory=lambda: Path("data"))
    output_dir: Path = field(default_factory=lambda: Path("output"))

    def __post_init__(self):
        self.data_dir = Path(self.data_dir)
        self.output_dir = Path(self.output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)


class BaseAgent(ABC):
    """Base class for all Sayer agents.

    Provides:
    - Anthropic API client management
    - Prompt template loading
    - Structured output handling
    - File I/O utilities
    """

    def __init__(self, config: AgentConfig):
        self.config = config
        self.client = anthropic.Anthropic()
        self.messages: list[dict[str, Any]] = []

    @property
    @abstractmethod
    def name(self) -> str:
        """Human-readable agent name."""

    @property
    @abstractmethod
    def system_prompt(self) -> str:
        """System prompt for this agent."""

    def chat(self, user_message: str) -> str:
        """Send a message and get a response."""
        self.messages.append({"role": "user", "content": user_message})

        response = self.client.messages.create(
            model=self.config.model,
            max_tokens=self.config.max_tokens,
            system=self.system_prompt,
            messages=self.messages,
        )

        assistant_message = response.content[0].text
        self.messages.append({"role": "assistant", "content": assistant_message})
        return assistant_message

    def run(self, input_data: dict[str, Any] | None = None) -> dict[str, Any]:
        """Execute the agent's primary workflow. Override in subclasses."""
        return self.execute(input_data or {})

    @abstractmethod
    def execute(self, input_data: dict[str, Any]) -> dict[str, Any]:
        """Core execution logic. Implemented by each practice agent."""

    def load_prompt(self, prompt_name: str, **kwargs: str) -> str:
        """Load a prompt template and fill in variables."""
        prompt_path = Path(f"practices/{self.config.practice}/prompts/{prompt_name}.md")
        if not prompt_path.exists():
            prompt_path = Path(f"core/prompts/{prompt_name}.md")
        if not prompt_path.exists():
            raise FileNotFoundError(f"Prompt template not found: {prompt_name}")

        template = prompt_path.read_text()
        for key, value in kwargs.items():
            template = template.replace(f"{{{{{key}}}}}", value)
        return template

    def save_output(self, filename: str, data: Any) -> Path:
        """Save agent output to the output directory."""
        output_path = self.config.output_dir / filename
        if isinstance(data, (dict, list)):
            output_path.write_text(json.dumps(data, indent=2))
        else:
            output_path.write_text(str(data))
        console.print(f"[green]Saved:[/green] {output_path}")
        return output_path

    def load_data(self, filename: str) -> str:
        """Load data from the practice data directory."""
        data_path = self.config.data_dir / filename
        if not data_path.exists():
            raise FileNotFoundError(f"Data file not found: {data_path}")
        return data_path.read_text()

    def log(self, message: str, style: str = "bold blue"):
        """Print a formatted log message."""
        console.print(f"[{style}][{self.name}][/{style}] {message}")
