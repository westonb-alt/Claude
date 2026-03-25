# Sayer Consulting — Agent Platform

A modular, reusable codebase of AI agents built to accelerate consulting engagements across Sayer's practice areas.

## Architecture

```
sayer/
├── core/                  # Shared library — reusable across all practices
│   ├── agents/            # Base agent classes and orchestration
│   ├── prompts/           # Shared prompt templates
│   ├── integrations/      # Connectors (Slack, Notion, Google, HubSpot)
│   └── utils/             # Common utilities (logging, config, file I/O)
│
├── practices/             # One directory per practice area
│   ├── erp/               # Fabian — ERP Selection & Implementation
│   │   ├── agents/        # ERP-specific agents
│   │   ├── prompts/       # ERP-specific prompt templates
│   │   ├── templates/     # Deliverable templates (scorecards, RFPs, etc.)
│   │   └── data/          # Local data (vendor info, client config)
│   └── _template/         # Skeleton for new practice modules
│
├── docs/                  # Roadmap, architecture decisions, guides
├── scripts/               # CLI entry points and automation
└── tests/                 # Mirrors source structure
```

## Practices

| Practice | Codename | Status | Description |
|----------|----------|--------|-------------|
| ERP | Fabian | In Progress | ERP selection, implementation, post-go-live support |

## Getting Started

```bash
# Install dependencies
pip install -e ".[dev]"

# Run the ERP selection agent
python -m scripts.run_agent erp vendor-research --client fabian
```

## Philosophy

- **Modular**: Every practice reuses the same core patterns
- **Incremental**: Start simple, add complexity only when needed
- **Consultant-first**: Built for Sayer consultants, extensible to clients later
- **Local-first**: Data lives in files today, migrates to cloud when ready
