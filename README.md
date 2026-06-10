# LangGraph 智能旅行助手

基于 LangGraph 和 LangChain 构建的智能旅行行程规划系统，支持多 Agent 协作、流式响应、预算控制和地图可视化。

> 本项目为 hello-agents 在 LangGraph 上的重构版本，目前所有流程均已跑通，后续将持续完善新功能。欢迎大家提出宝贵的意见和建议，一起学习一起进大厂！

---

## 目录

- [功能特性](#功能特性)
- [技术架构](#技术架构)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [API 接口](#api-接口)
- [前端使用说明](#前端使用说明)
- [技术栈](#技术栈)
- [注意事项](#注意事项)
- [开发计划](#开发计划)

---

## 功能特性

### 核心功能

| 功能 | 说明 |
|------|------|
| **智能行程规划** | 根据目的地、日期、偏好自动生成详细行程，支持多城市联游 |
| **预算控制** | 支持设置预算范围，AI 根据预算合理安排景点、餐饮和住宿 |
| **实时进度反馈** | SSE 流式响应，实时展示 Agent 执行进度 |
| **地图可视化** | 高德地图集成，展示景点位置和驾车路线 |
| **多轮对话** | 支持自然语言交互，逐步完善行程需求 |
| **行程持久化** | 每次规划结果自动保存为 JSON 文件 |
| **PDF 导出** | 将行程计划导出为 PDF 文件 |
| **Human-in-the-loop** | 行程生成后需用户确认，可修改或重新规划 |

### 技术亮点

- **多 LLM 支持**：DeepSeek、阿里云百炼、MiniMax，灵活切换
- **多 Agent 协作**：LangGraph 状态机管理 POI 搜索、天气查询、酒店推荐、行程规划等多个 Agent
- **高德地图 API**：POI 搜索、天气查询、酒店推荐、地理编码、静态地图
- **类型安全**：后端 Pydantic + 前端 TypeScript 全栈类型校验
- **对话记忆系统**：基于会话的记忆管理，保存用户偏好和对话历史
- **向量检索**：预留 embedding 服务接口，支持景点知识库构建
- **响应式 UI**：Vue 3 + Element Plus，支持桌面端和移动端

---

## 技术架构

### 系统架构图

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Vue 3)                       │
│  ┌─────────┐  ┌─────────┐ ┌─────────┐  ┌─────────────────┐ │
│  │  Home   │  │ Result │  │  Chat   │  │   Pinia Store │ │
│  │ (表单)  │  │ (结果)  │  │ (对话)  │  │ trip / chat     │ │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────────┬────────┘ │
│       │            │           │                │ │
│       └────────────┴───────────┴────────────────┘          │
│                         │ Axios / Fetch │
└─────────────────────────┼───────────────────────────────────┘
                          │ HTTP /SSE
┌─────────────────────────┼───────────────────────────────────┐
│                   Backend (FastAPI) │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    API Routes │  │
│  │  /trip/* │  /chat/*  │  /map/*  │  /config/*       │  │
│  └─────────────────────────┬────────────────────────────┘  │
│                            │                                │
│  ┌─────────────────────────┴────────────────────────────┐ │
│  │                   Service Layer                       │ │
│  │  AmapService │ EmbeddingService                       │ │
│ └─────────────────────────┬────────────────────────────┘ │
│                            │                                │
│  ┌─────────────────────────┴────────────────────────────┐ │
│  │                 LangGraph Agent Layer │ │
│  │                                                      │ │
│  │  ┌──────────┐  ┌───────────┐  ┌────────┐            │ │
│  │  │  POI     │→ │  Weather │→ │ Hotel │→ Planner │ │
│  │  │ Agent │  │  Agent │  │ Agent │ Agent │ │
│  │ └──────────┘  └───────────┘  └────────┘            │ │
│  │                         ↓ │ │
│  │              ┌─────────────────┐                    │ │
│  │              │ Human Review │                    │ │
│  │              │ (人工审核节点)   │                    │ │
│  │              └─────────────────┘                    │ │
│  └─────────────────────────┬────────────────────────────┘ │
│                            │                                │
│  ┌─────────────────────────┴────────────────────────────┐ │
│  │                   LLM Factory │ │
│  │  DeepSeek │ 阿里云百炼 │ OpenAI │ MiniMax │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │   Memory     │  │   Config     │  │   Cities Data │  │
│  │   Manager │  │   (Pydantic) │  │   (中国城市) │  │
│  └───────────────┘  └──────────────┘  └─────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Agent 协作流程

```
用户请求
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│                      LangGraph State │
│  session_id │ city │ dates │ preferences │ budget │ ... │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
┌──────────────┐    ┌─────────────┐    ┌─────────┐   ┌───────────┐
│  POI Search  │───→│ Weather   │───→│  Hotel  │───→│  Planner  │
│景点搜索     │    │  天气查询    │    │ 酒店推荐 │    │  行程规划  │
└──────────────┘   └─────────────┘    └─────────┘    └───────────┘
       │                                                    │
       └────────────┐ │
                    ▼ ▼
           ┌────────────────┐                    ┌──────────────┐
           │ AmapService │                    │  Human │
           │ 高德地图服务 │                    │  Review      │
           │ - search_poi   │                    │  人工审核    │
           │ - get_weather  │                    └──────┬───────┘
           │ - search_hotels│ │
           └────────────────┘                           ▼
                                               ┌──────────────┐
                                                │   END │
                                                │   完成 │
                                                └──────────────┘
```

### 数据模型

```
AgentState (LangGraph 状态)
├── 基本信息: session_id, city, start_date, end_date, travel_days
├── 用户偏好: transportation, accommodation, preferences, free_text_input
├── Agent输出: pois[], weather[], hotels[], itinerary[]
├── 执行状态: current_node, status, steps[], errors[]
├── Human-in-loop: need_human_review, human_feedback
└── 元数据: llm_provider, created_at, updated_at

TripPlan (行程计划)
├── 基本信息: city, start_date, end_date, cities[]
├── 每日行程: days[]
│   ├── DayPlan: date, day_index, city, description
│   ├── attractions[]: Attraction (景点)
│   ├── meals[]: Meal (早餐/午餐/晚餐)
│   └── hotel: Hotel (住宿)
├── 天气信息: weather_info[]
├── 总体建议: overall_suggestions
└── 预算: budget (景点/酒店/餐饮/交通/总计)
```

---

## 项目结构

```
PlannerAgent-main/
├── backend/ # 后端服务 (Python + FastAPI)
│   ├── app/
│   │   ├── __init__.py
│   │   ├── api/ # API 路由层
│   │   │   ├── __init__.py
│   │   │   ├── main.py               # FastAPI 应用入口
│   │   │   └── routes/ # 路由模块
│   │   │       ├── __init__.py
│   │   │       ├── trip.py           # 行程规划接口 (同步/流式/反馈)
│   │   │       ├── chat.py           # 多轮对话接口 (天气/景点/酒店查询)
│   │   │       ├── map.py            # 地图服务接口 (POI/天气/酒店/地理编码)
│   │   │       └── config.py         # 系统配置接口 (LLM提供商/城市数据)
│   │   │
│   │   ├── agents/                   # LangGraph Agent 层
│   │   │   ├── __init__.py
│   │   │   ├── graph.py              # LangGraph 主图定义
│   │   │   ├── nodes/                # Agent 节点
│   │   │   │   ├── __init__.py
│   │   │   │   ├── poi_agent.py      # POI 搜索节点
│   │   │   │   ├── weather_agent.py # 天气查询节点
│   │   │   │   ├── hotel_agent.py   # 酒店推荐节点
│   │   │   │   ├── planner_agent.py # 行程规划主节点
│   │   │   │   └── human_review.py # 人工审核节点
│   │   │   └── tools/ # Agent 工具
│   │   │       ├── __init__.py
│   │   │       └── amap_tools.py    # 高德地图工具
│   │   │
│   │   ├── core/                     # 核心模块
│   │   │   ├── __init__.py
│   │   │   ├── config.py            # Pydantic 配置管理
│   │   │   ├── llm.py               # LLM 工厂 (多模型切换)
│   │   │   ├── memory.py           # 对话记忆系统
│   │   │   └── cities.py            # 中国城市数据
│   │   │
│   │   ├── models/                   # 数据模型
│   │   │   ├── __init__.py
│   │   │   └── schemas.py          # Pydantic 模型定义
│   │   │
│   │   ├── services/                # 外部服务封装
│   │   │   ├── __init__.py
│   │   │   ├── amap_service.py # 高德地图 API 服务
│   │   │   └── embedding_service.py # 向量嵌入服务
│   │   │
│   │   └── saved_results/           # 行程结果存储目录
│   │
│   ├── requirements.txt             # Python 依赖
│   ├── .env                         # 环境变量 (需配置)
│   └── run.py                       # 启动脚本
│
├── frontend/ # 前端应用 (Vue 3 + TypeScript + Vite)
│   ├── src/
│   │   ├── App.vue                  # 根组件
│   │   ├── main.ts                  # 入口文件
│   │   │
│   │   ├── views/                   # 页面组件
│   │   │   ├── Home.vue            # 表单模式主页
│   │   │   ├── Result.vue         # 结果展示页
│   │   │   └── Chat.vue           # 对话模式页
│   │   │
│   │   ├── stores/                  # Pinia 状态管理
│   │   │   ├── trip.ts            # 行程状态 (表单数据/结果/会话ID)
│   │   │   └── chat.ts           # 对话状态 (历史消息)
│   │   │
│   │   ├── services/               # API 服务层
│   │   │   └── api.ts            # Axios 封装 + API 方法
│   │   │
│   │   ├── types/                  # TypeScript 类型
│   │   │   └── index.ts # 类型定义
│   │   │
│   │   └── data/                  # 静态数据
│   │       └── cities.ts         # 城市列表
│   │
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── .env # 环境变量 (需配置)
│
├── README.md
└── .gitignore
```

---

## 快速开始

### 环境要求

- Python 3.10+
- Node.js 18+
- Conda (推荐)

### 1. 后端配置

```bash
cd backend

# 创建并激活 Conda 环境
conda create -n agent_planner python=3.10
conda activate agent_planner

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
# 或者手动创建 .env 文件
```

编辑 `backend/.env` 文件：

```env
# ===========================================
# LLM 配置 (至少配置一个)
# ===========================================

# DeepSeek (推荐)
DEEPSEEK_API_KEY=your_deepseek_api_key
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-chat

# 阿里云百炼 (通义千问)
ALIYUN_DASHSCOPE_API_KEY=your_aliyun_api_key
ALIYUN_MODEL=qwen-plus

# MiniMax
MINIMAX_API_KEY=your_minimax_api_key
MINIMAX_BASE_URL=https://api.minimaxi.com/v1
MINIMAX_MODEL=MMML-Embedding-Delete

# OpenAI (可选)
OPENAI_API_KEY=your_openai_api_key
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4-turbo-preview

# ===========================================
# 高德地图 API (必需)
# ===========================================
AMAP_API_KEY=your_amap_web_api_key

# ===========================================
# LangSmith 追踪 (可选)
# ===========================================
LANGCHAIN_TRACING_V2=false
LANGCHAIN_API_KEY=your_langsmith_key
LANGCHAIN_PROJECT=trip-planner-agent

# ===========================================
# 应用配置
# ===========================================
DEBUG=false
LOG_LEVEL=INFO
```

启动后端服务：

```bash
python run.py
# 或
uvicorn app.api.main:app --host 0.0.0.0 --port 8000 --reload
```

后端启动后访问 http://localhost:8000/docs 查看 API 文档。

### 2. 前端配置

```bash
cd frontend

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
```

编辑 `frontend/.env` 文件：

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_AMAP_KEY=your_amap_js_api_key
```

> **注意**：高德地图需要分别申请 Web API Key（后端用）和 JS API Key（前端地图用）。

启动前端服务：

```bash
npm run dev
```

访问 http://localhost:5173 开始使用。

---

## API 接口

### 行程规划

####同步规划

```http
POST /api/trip/plan
Content-Type: application/json

{
  "city": "武汉",
  "start_date": "2026-04-23",
  "end_date": "2026-04-24",
  "travel_days": 2,
  "transportation": "公共交通",
  "accommodation": "舒适型酒店",
  "preferences": ["历史文化", "美食"],
  "free_text_input": "想看黄鹤楼",
  "budget": [1000, 3000],
  "llm_provider": "deepseek"
}
```

#### 流式规划 (SSE)

```http
POST /api/trip/plan/stream
Content-Type: application/json

# 返回 SSE 流式事件
data: {"step": 1, "node": "init", "status": "running", "message": "正在初始化..."}
data: {"step": 2, "node": "poi_search", "status": "running", "message": "正在搜索景点..."}
data: {"step": 2, "node": "poi_search", "status": "completed", "message": "找到 20 个景点"}
data: {"step": 3, "node": "hotel", "status": "completed", "message": "酒店搜索完成，找到 5 家酒店"}
data: {"step": 4, "node": "weather", "status": "completed", "message": "获取到 2 天预报"}
data: {"step": 5, "node": "planner", "status": "completed", "message": "行程规划完成，共 2 天行程"}
data: {"step": 6, "node": "complete", "status": "completed", "data": {"itinerary": {...}}}
```

#### 用户反馈

```http
POST /api/trip/feedback
Content-Type: application/json

{
  "session_id": "session_xxx",
  "action": "approve", // approve / modify / reject
  "comment": "行程很棒！"
}
```

### 多轮对话

```http
POST /api/chat/message
Content-Type: application/json

{
  "session_id": "session_xxx",
  "message": "武汉天气怎么样？",
  "llm_provider": "deepseek"
}
```

### 地图服务

```http
GET /api/map/poi?keywords=景点&city=武汉
GET /api/map/weather?city=武汉
GET /api/map/hotels?city=武汉&hotel_type=舒适型酒店
GET /api/map/geocode?address=黄鹤楼&city=武汉
```

### 系统配置

```http
GET /api/config/llm-providers   # 获取可用的 LLM 提供商
GET /api/config/cities         # 获取城市列表
GET /api/config/settings # 获取公开配置
```

---

## 前端使用说明

### 表单模式

1. 选择目的地城市（支持多选，实现多城市联游）
2. 选择出发和返回日期（自动计算旅行天数）
3. 选择交通方式和住宿偏好
4. 勾选旅行偏好（历史文化、自然风光、美食等）
5. 设置预算范围（滑动条调整，显示预算等级提示）
6. 选择 AI 模型（DeepSeek / 阿里云百炼 / MiniMax）
7. 点击「开始规划行程」
8. 实时查看 Agent 执行进度（SSE 流式更新）
9. 规划完成后自动跳转到结果页

### 对话模式

支持自然语言交互，例如：
- "我想去北京玩三天"
- "预算大概两千块"
- "喜欢历史文化景点"
- "帮我推荐一些美食"
- "武汉天气怎么样？"

### 结果展示

- **行程概览**：城市、日期、天数
- **景点地图**：高德地图展示景点位置标记和驾车路线，每天不同颜色
- **每日行程**：可折叠的每日详情卡片
  - 景点列表：名称、评分、地址、游玩时长、门票价格
  - 餐饮推荐：早餐/午餐/晚餐，真实餐厅名称
  - 住宿安排：酒店名称、类型、价格范围、评分
- **预算估算**：分类费用统计（景点/酒店/餐饮/交通）
- **总体建议**：AI 给出的旅行注意事项
- **PDF导出**：将行程计划导出为 PDF 文件

---

## 技术栈

### 后端

| 技术 | 版本 | 用途 |
|------|------|------|
| FastAPI | | Web 框架 |
| LangChain | | LLM 应用框架 |
| LangGraph | | Agent 状态机 |
| Pydantic | | 数据验证 |
| httpx | | 异步 HTTP 客户端 |
| tenacity | | 重试机制 |
| uvicorn | | ASGI 服务器 |

### 前端

| 技术 | 用途 |
|------|------|
| Vue 3 | 前端框架 |
| TypeScript | 类型安全 |
| Vite | 构建工具 |
| Element Plus | UI 组件库 |
| Pinia | 状态管理 |
| Vue Router | 路由管理 |
| Axios | HTTP 客户端 |
| dayjs | 日期处理 |
| html2canvas | HTML 转图片 |
| jspdf | PDF 生成 |

### 外部服务

| 服务 | 用途 |
|------|------|
| 高德地图 API | POI 搜索、天气查询、酒店推荐、地理编码、静态地图 |
| DeepSeek API | LLM 服务（默认） |
| 阿里云百炼 | LLM 服务（通义千问） |
| MiniMax | LLM 服务 |
| OpenAI | LLM 服务 |

---

## 注意事项

1. **API Key 安全**：请勿将 `.env` 文件提交到版本控制，已在 `.gitignore` 中忽略
2. **高德地图 Key**：需要分别申请 Web 服务 API Key（后端）和 JS API Key（前端地图）
3. **LLM 费用**：使用 DeepSeek、阿里云百炼、MiniMax 等会产生 API 调用费用
4. **预算控制**：AI 生成的预算为估算值，实际花费可能有所不同
5. **会话记忆**：对话历史存储在内存中，服务重启后会清空
6. **流式响应**：部分浏览器或代理可能不支持 SSE 流式响应

---

## 开发计划

- [ ] 添加更多 LLM 提供商（OpenAI GPT-4、Claude）
- [ ] 支持行程分享功能（生成分享链接）
- [ ] 添加用户收藏和历史记录（持久化存储）
- [ ] 优化移动端体验
- [ ] 添加景点评价和图片（Unsplash 集成）
- [ ] 向量知识库：基于 embedding 的景点知识检索
- [ ] 多语言支持（英文界面）
- [ ] 高级配置：自定义每日行程数量、休息时间等