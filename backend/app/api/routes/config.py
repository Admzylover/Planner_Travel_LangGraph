"""系统配置 API 路由"""

from fastapi import APIRouter

from ...core.config import get_settings
from ...core.llm import LLMFactory
from ...core.cities import CITIES_DATA

router = APIRouter(prefix="/config", tags=["系统配置"])


@router.get("/llm-providers")
async def get_llm_providers():
    """获取可用的 LLM 提供商列表"""
    providers = LLMFactory.get_available_providers()
    settings = get_settings()

    return {
        "current": settings.llm_provider,
        "available": providers
    }


@router.get("/settings")
async def get_public_settings():
    """获取公开的配置信息"""
    settings = get_settings()

    return {
        "app_name": settings.app_name,
        "app_version": settings.app_version,
        "default_llm": settings.llm_provider
    }


@router.get("/cities")
async def get_cities():
    """获取所有省份和城市数据"""
    return {
        "cities": [
            {
                "province": p.province,
                "provinceCode": p.province_code,
                "cities": [{"name": c.name, "adcode": c.adcode} for c in p.cities]
            }
            for p in CITIES_DATA
        ]
    }
