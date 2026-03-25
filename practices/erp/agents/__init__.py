"""ERP practice agents."""

from practices.erp.agents.vendor_research import VendorResearchAgent
from practices.erp.agents.requirements import RequirementsAgent
from practices.erp.agents.scoring import ScoringAgent
from practices.erp.agents.recommendation import RecommendationAgent

__all__ = [
    "VendorResearchAgent",
    "RequirementsAgent",
    "ScoringAgent",
    "RecommendationAgent",
]
