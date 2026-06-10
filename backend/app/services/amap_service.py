"""高德地图 API 服务封装"""

import httpx
import json
from typing import List, Dict, Any, Optional
from tenacity import retry, stop_after_attempt, wait_exponential

from ..core.config import get_settings
from ..models.schemas import POI, Weather, Hotel, Location


class AmapService:
    """高德地图服务"""

    def __init__(self):
        settings = get_settings()
        self.api_key = settings.amap_api_key
        self.base_url = "https://restapi.amap.com/v3"

        print(f"[Amap] 初始化高德地图服务")
        print(f"[Amap] API Key: {self.api_key[:8]}...{self.api_key[-4:] if self.api_key else '未配置'}")

        if not self.api_key:
            raise ValueError("高德地图 API Key 未配置")

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
    async def search_poi(
        self,
        keywords: str,
        city: str,
        citylimit: bool = True,
        page_size: int = 20
    ) -> List[POI]:
        """搜索 POI"""
        print(f"\n{'='*60}")
        print(f"[Amap] search_poi 开始")
        print(f"[Amap] 关键词: {keywords}, 城市: {city}")
        print(f"{'='*60}")

        params = {
            "key": self.api_key,
            "keywords": keywords,
            "city": city,
            "citylimit": "true" if citylimit else "false",
            "offset": page_size,
            "output": "json"
        }

        print(f"[Amap] 请求URL: {self.base_url}/place/text")
        print(f"[Amap] 请求参数: {json.dumps({k: v for k, v in params.items() if k != 'key'}, ensure_ascii=False)}")

        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(f"{self.base_url}/place/text", params=params)
            print(f"[Amap] 响应状态码: {response.status_code}")
            response.raise_for_status()
            data = response.json()

        print(f"[Amap] API status: {data.get('status')}, info: {data.get('info')}")
        print(f"[Amap] 响应数据: {json.dumps(data, ensure_ascii=False)[:500]}...")

        if data.get("status") != "1":
            print(f"[Amap] API 返回错误: {data.get('info')}")
            return []

        pois = data.get("pois", [])
        print(f"[Amap] 返回 POI 数量: {len(pois)}")

        result = []
        for i, poi in enumerate(pois):
            location_str = poi.get("location", "")
            location_obj = None
            if location_str and "," in location_str:
                try:
                    parts = location_str.split(",")
                    lon, lat = float(parts[0]), float(parts[1])
                    if lon != 0.0 and lat != 0.0:
                        location_obj = Location(longitude=lon, latitude=lat)
                except (ValueError, IndexError) as e:
                    print(f"[Amap] 坐标解析失败: {location_str}, error: {e}")

            # 处理tel字段，可能是列表或字符串
            tel_value = poi.get("tel", "")
            if isinstance(tel_value, list):
                tel_value = "; ".join([str(t) for t in tel_value if t]) if tel_value else ""

            # 处理rating字段
            rating_value = None
            try:
                biz_ext = poi.get("biz_ext", {})
                if biz_ext and biz_ext.get("rating"):
                    rating_value = float(biz_ext.get("rating", 0))
            except (ValueError, TypeError):
                rating_value = None

            poi_obj = POI(
                id=poi.get("id", ""),
                name=poi.get("name", ""),
                address=poi.get("address", "") or f"{poi.get('pname', '')}{poi.get('cityname', '')}{poi.get('adname', '')}",
                city=city,
                location=location_obj,
                category=poi.get("type", ""),
                rating=rating_value,
                tel=tel_value,
            )
            result.append(poi_obj)
            print(f"[Amap] POI[{i+1}]: {poi_obj.name}, 地址: {poi_obj.address}, 坐标: ({location_obj.longitude if location_obj else 'N/A'}, {location_obj.latitude if location_obj else 'N/A'})")

        print(f"[Amap] search_poi 完成，返回 {len(result)} 个有效POI")
        print(f"{'='*60}\n")
        return result

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
    async def get_weather(self, city: str) -> List[Weather]:
        """获取天气预报"""
        print(f"\n{'='*60}")
        print(f"[Amap] get_weather 开始")
        print(f"[Amap] 城市: {city}")
        print(f"{'='*60}")

        params = {
            "key": self.api_key,
            "city": city,
            "extensions": "all",
            "output": "json"
        }

        print(f"[Amap] 请求URL: {self.base_url}/weather/weatherInfo")
        print(f"[Amap] 请求参数: {json.dumps({k: v for k, v in params.items() if k != 'key'}, ensure_ascii=False)}")

        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(f"{self.base_url}/weather/weatherInfo", params=params)
            print(f"[Amap] 响应状态码: {response.status_code}")
            response.raise_for_status()
            data = response.json()

        print(f"[Amap] API status: {data.get('status')}, info: {data.get('info')}")
        print(f"[Amap] 响应数据: {json.dumps(data, ensure_ascii=False)[:800]}...")

        if data.get("status") != "1":
            print(f"[Amap] API 返回错误: {data.get('info')}")
            return []

        forecasts = data.get("forecasts", [])
        if not forecasts:
            print("[Amap] 没有 forecasts 数据")
            return []

        casts = forecasts[0].get("casts", [])
        print(f"[Amap] 返回天气数据天数: {len(casts)}")

        result = []
        for i, cast in enumerate(casts):
            weather = Weather(
                date=cast.get("date", ""),
                day_weather=cast.get("dayweather", ""),
                night_weather=cast.get("nightweather", ""),
                day_temp=cast.get("daytemp", "0"),
                night_temp=cast.get("nighttemp", "0"),
                wind_direction=cast.get("daywind", ""),
                wind_power=cast.get("daypower", "")
            )
            result.append(weather)
            print(f"[Amap] 天气[{i+1}]: {weather.date} - 白天: {weather.day_weather} {weather.day_temp}C, 夜间: {weather.night_weather} {weather.night_temp}C, 风向: {weather.wind_direction}, 风力: {weather.wind_power}级")

        print(f"[Amap] get_weather 完成，返回 {len(result)} 天天气数据")
        print(f"{'='*60}\n")
        return result

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
    async def search_hotels(
        self,
        city: str,
        hotel_type: str = "酒店",
        page_size: int = 10
    ) -> List[Hotel]:
        """搜索酒店"""
        print(f"\n{'='*60}")
        print(f"[Amap] search_hotels 开始")
        print(f"[Amap] 城市: {city}, 类型: {hotel_type}")
        print(f"{'='*60}")

        pois = await self.search_poi(f"{hotel_type}酒店", city, citylimit=True, page_size=page_size)

        hotels = []
        for i, poi in enumerate(pois):
            hotel = Hotel(
                name=poi.name,
                address=poi.address,
                location=poi.location,
                rating=str(poi.rating) if poi.rating else "",
                type=poi.category or "酒店"
            )
            hotels.append(hotel)
            print(f"[Amap] Hotel[{i+1}]: {hotel.name}, 地址: {hotel.address}, 评分: {hotel.rating}")

        print(f"[Amap] search_hotels 完成，返回 {len(hotels)} 家酒店")
        print(f"{'='*60}\n")
        return hotels

    async def search_poi_batch(
        self,
        cities: List[str],
        keywords: str,
        page_size: int = 20
    ) -> List[POI]:
        """批量搜索多个城市的 POI"""
        print(f"\n{'='*60}")
        print(f"[Amap] search_poi_batch 开始")
        print(f"[Amap] 城市列表: {cities}, 关键词: {keywords}")
        print(f"{'='*60}")

        all_pois = []
        for city in cities:
            try:
                pois = await self.search_poi(keywords, city, citylimit=True, page_size=page_size)
                print(f"[Amap] {city} 搜索到 {len(pois)} 个 POI")
                all_pois.extend(pois)
            except Exception as e:
                print(f"[Amap] {city} 搜索失败: {e}")

        # 去重
        seen = set()
        unique_pois = []
        for poi in all_pois:
            if poi.name not in seen:
                seen.add(poi.name)
                unique_pois.append(poi)

        print(f"[Amap] search_poi_batch 完成，共 {len(unique_pois)} 个唯一 POI")
        print(f"{'='*60}\n")
        return unique_pois

    async def search_hotels_batch(
        self,
        cities: List[str],
        hotel_type: str = "酒店",
        page_size: int = 10
    ) -> List[Hotel]:
        """批量搜索多个城市的酒店"""
        print(f"\n{'='*60}")
        print(f"[Amap] search_hotels_batch 开始")
        print(f"[Amap] 城市列表: {cities}, 类型: {hotel_type}")
        print(f"{'='*60}")

        all_hotels = []
        for city in cities:
            try:
                hotels = await self.search_hotels(city, hotel_type, page_size)
                print(f"[Amap] {city} 搜索到 {len(hotels)} 家酒店")
                all_hotels.extend(hotels)
            except Exception as e:
                print(f"[Amap] {city} 酒店搜索失败: {e}")

        # 去重（按酒店名）
        seen = set()
        unique_hotels = []
        for hotel in all_hotels:
            if hotel.name not in seen:
                seen.add(hotel.name)
                unique_hotels.append(hotel)

        print(f"[Amap] search_hotels_batch 完成，共 {len(unique_hotels)} 家唯一酒店")
        print(f"{'='*60}\n")
        return unique_hotels

    async def get_weather_batch(
        self,
        cities: List[str]
    ) -> Dict[str, List[Weather]]:
        """批量获取多个城市的天气"""
        print(f"\n{'='*60}")
        print(f"[Amap] get_weather_batch 开始")
        print(f"[Amap] 城市列表: {cities}")
        print(f"{'='*60}")

        weather_dict = {}
        for city in cities:
            try:
                weather = await self.get_weather(city)
                print(f"[Amap] {city} 获取到 {len(weather)} 天天气")
                weather_dict[city] = weather
            except Exception as e:
                print(f"[Amap] {city} 天气查询失败: {e}")
                weather_dict[city] = []

        print(f"[Amap] get_weather_batch 完成")
        print(f"{'='*60}\n")
        return weather_dict

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
    async def geocode(self, address: str, city: Optional[str] = None) -> Optional[Location]:
        """地理编码"""
        print(f"\n[Amap] geocode 开始")
        print(f"[Amap] 地址: {address}, 城市: {city}")

        params = {
            "key": self.api_key,
            "address": address,
            "output": "json"
        }
        if city:
            params["city"] = city

        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(f"{self.base_url}/geocode/geo", params=params)
            print(f"[Amap] 响应状态码: {response.status_code}")
            response.raise_for_status()
            data = response.json()

        print(f"[Amap] API status: {data.get('status')}, info: {data.get('info')}")

        if data.get("status") != "1":
            return None

        geocodes = data.get("geocodes", [])
        if not geocodes:
            return None

        location_str = geocodes[0].get("location", "")
        if not location_str or "," not in location_str:
            return None

        parts = location_str.split(",")
        location = Location(longitude=float(parts[0]), latitude=float(parts[1]))
        print(f"[Amap] 坐标: ({location.longitude}, {location.latitude})")

        return location

    async def get_static_map(
        self,
        city: str,
        markers: Optional[str] = None,
        width: int = 800,
        height: int = 500
    ) -> bytes:
        """获取静态地图图片"""
        params = {
            "key": self.api_key,
            "city": city,
            "zoom": 11,
            "size": f"{width}*{height}",
            "scale": 2,
            "traffic": 0
        }

        if markers:
            params["markers"] = f"mid,0x008000,A:{markers}"

        async with httpx.AsyncClient(timeout=15) as client:
            response = await client.get(
                "https://restapi.amap.com/v3/staticmap",
                params=params
            )
            response.raise_for_status()
            return response.content


# 单例
_amap_service: Optional[AmapService] = None


def get_amap_service() -> AmapService:
    """获取高德地图服务实例"""
    global _amap_service
    if _amap_service is None:
        _amap_service = AmapService()
    return _amap_service