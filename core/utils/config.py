"""Configuration loading utilities."""

from __future__ import annotations

from pathlib import Path
from typing import Any

import yaml


def load_client_config(practice: str, client_name: str) -> dict[str, Any]:
    """Load client-specific configuration from YAML."""
    config_path = Path(f"practices/{practice}/data/clients/{client_name}.yaml")
    if not config_path.exists():
        return {"client_name": client_name, "practice": practice}
    return yaml.safe_load(config_path.read_text())


def load_practice_config(practice: str) -> dict[str, Any]:
    """Load practice-level configuration."""
    config_path = Path(f"practices/{practice}/config.yaml")
    if not config_path.exists():
        return {"practice": practice}
    return yaml.safe_load(config_path.read_text())
