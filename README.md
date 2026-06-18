# 🐛 BugRisk

### **Association Rule–Driven Defect Intelligence & Risk Hotspot Miner**

<div align="center">

[![React](https://img.shields.io/badge/Frontend-React_19_+_Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://bugrisk.vercel.app)
[![Spring Boot](https://img.shields.io/badge/Backend-Spring_Boot_3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://bugrisk-backend.onrender.com)
[![FastAPI](https://img.shields.io/badge/ML_Service-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://bugrisk-ml.onrender.com/docs)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL_15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](#)
[![Redis](https://img.shields.io/badge/Cache-Redis_7-DC382D?style=for-the-badge&logo=redis&logoColor=white)](#)
[![Docker](https://img.shields.io/badge/Orchestration-Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](#)

**Discover hidden defect patterns. Identify risk hotspots. Explain failures before they happen.**

[🌐 Live Application](https://bugrisk.vercel.app) · [⚙️ Backend API Gateway](https://bugrisk-backend.onrender.com) · [🐍 Interactive ML Docs](https://bugrisk-ml.onrender.com/docs)

</div>

---

## 📖 Product Overview

BugRisk is a full-stack, production-grade defect intelligence platform. It mines historical bug reports using **FP-Growth** and **Apriori** association rule mining algorithms to uncover latent, recurring relationships between code modules, subsystem environments, language configurations, tech stacks, and defect severities.

```
┌──────────────────────────────────────────────────────────────────┐
│                      THE DEFECT PARADIGM SHIFT                   │
├─────────────────────────────────┬────────────────────────────────┤
│      TRADITIONAL QA ASKS        │         BUGRISK ANSWERS        │
├─────────────────────────────────┼────────────────────────────────┤
│  • What already broke?          │  • Which modules will fail?    │
│  • Where are the active bugs?   │  • Which stack patterns repeat? │
│  • How do we patch this crash?  │  • Where is the systemic risk? │
└─────────────────────────────────┴────────────────────────────────┘
```

By ingests CSV telemetry data, processing rule mining through a non-blocking **Server-Sent Events (SSE)** pipeline, persisting results to **PostgreSQL**, and caching high-frequency queries in **Redis**, BugRisk provides software engineering teams with actionable, predictive defect prevention metrics.

---

## 🚀 Mined Insights Visual Gallery

### 1. Premium Portfolio Landing Page
> Built using Framer Motion, canvas networks, and dark-mode glassmorphism to explain the predictive paradigm at first glance.
![Landing Page](docs/screenshots/00_landing_page.png)

---

### 2. Executive AI Command Center
> Real-time executive dashboard summarizing system-wide metrics, highest-risk hotspots, and automated root-cause briefings.
![AI Command Center](docs/screenshots/01_command_center.png)

---

### 3. Interactive Graph Explorer
> Force-directed relationship map rendered with React Flow, linking languages, tech stacks, and severities via rule lift weights.
![System Graph Explorer](docs/screenshots/03_graph_explorer.png)

---

### 4. Mined Rules Database & Deduplicator
> Paginated, sortable, and searchable rules engine featuring Jaccard similarity clustering to collapse overlapping patterns.
![Mined Rules Database](docs/screenshots/02_rules_explorer.png)

---

### 5. Module Hotspots Explainability Drawer
> Clicking any hotspot module reveals its DRI (Defect Risk Index) gauge, category contributions, and contributing rules.
![Module Hotspots](docs/screenshots/04_module_hotspots.png)
![Explainability Drawer](docs/screenshots/07_explainability_drawer.png)

---

### 6. ML Analytics & Playground
> PostgreSQL-backed trend lines plotting avg lift, confidence distributions, and playground comparisons between FP-Growth and Apriori.
![ML Analytics](docs/screenshots/05_ml_analytics.png)
![Algorithm Playground](docs/screenshots/08_algo_playground.png)

---

## ✨ Features Spotlight

### 🔬 Dataset Intelligence Engine
* **Automated Ingestion**: Upload any telemetry CSV and generate an instant health overview.
* **Schema Validation**: Rejects invalid inputs missing required variables (`module`, `subsystem`, `language`, `tech_stack`, `bug_type`, `severity`).
* **Completeness Scoring**: Computes completeness rates per column and detects duplicate entries.
* **Quality Score Index**: Dynamic 0-100 score weighted based on data cleanliness and duplicate penalties.

### ⛏️ Mined Association Rules
* **Configurable Mining**: Adjust support, confidence, and lift thresholds on-the-fly.
* **FP-Growth Algorithm**: High-performance mining using frequent-pattern trees to bypass expensive candidate generation.
* **Apriori Algorithm**: Implemented for performance comparison and execution benchmarking.
* **Metric Extraction**: Mined rules expose raw *Support*, *Confidence*, and *Lift* indicators:
  $$\text{module=auth} + \text{language=Java} \implies \text{severity=critical} \quad [\text{Support: } 0.08, \text{ Conf: } 99.2\%, \text{ Lift: } 10.19]$$

### 🎯 Defect Risk Index (DRI)
* **Weghted Risk Formulas**: Calculates a standardized Defect Risk Index (0–100) per module based on rule frequencies, confidence levels, and severity modifiers.
* **Category Contribution Map**: Categorizes risks under Security, Performance, Integration, and Core to identify failure patterns.

### ⚡ Same-Origin Pipeline Streaming
* **Real-time Progress Tracker**: Streams 8 distinct scan stages using Server-Sent Events (SSE).
* **Ingestion Integrity**: Guarantees database transaction commits and Redis eviction *before* firing the completion event to the frontend, preventing stale UI state renders.

---

## 🏗 Architecture & System Topology

```mermaid
graph TD
    classDef frontend fill:#1e3b8a,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef gateway fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#fff;
    classDef mlservice fill:#3b0764,stroke:#8b5cf6,stroke-width:2px,color:#fff;
    classDef database fill:#78350f,stroke:#f59e0b,stroke-width:2px,color:#fff;
    classDef cache fill:#7f1d1d,stroke:#ef4444,stroke-width:2px,color:#fff;

    F["React + Vite Frontend<br>(React Flow · Recharts · SSE)"]:::frontend
    G["Spring Boot Gateway API<br>(JWT Security · WebClient · SseEmitter)"]:::gateway
    M["FastAPI ML Service<br>(FP-Growth · Apriori · Risk Engine)"]:::mlservice
    DB[("PostgreSQL 15 Database<br>(Mined Rules · Risks · History)")]:::database
    RD[("Redis Cache<br>(Rule & Risk Cache TTL)")]:::cache

    F -->|HTTP API & JWT Auth| G
    F -->|Server-Sent Events| G
    G <-->|Fetch Analytics & Rules| M
    G -->|JPA Persistence| DB
    G <-->|Rule & Risk Cache| RD
```

### Microservices Specification

| Service | Protocol | Default Port | Responsibility |
|---------|----------|--------------|----------------|
| **`frontend`** | HTTP | `5173` | React SPA + Nginx Reverse Proxy |
| **`backend`** | HTTP / SSE | `8080` | Spring Security Gateway, Auth, DB Persistence, Cache Eviction |
| **`ml-service`** | HTTP | `8000` | FastAPI Server, FP-Growth/Apriori Engines, Dataset Profiler |
| **`postgres`** | JDBC | `5435` | PostgreSQL 15 database storing rules, risks, scans, and audit trails |
| **`redis`** | RESP | `6379` | High-performance Valkey/Redis instance caching rules and risks |

---

## 🔄 End-to-End Workflow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant FE as React Frontend
    participant GW as Spring Boot Gateway
    participant ML as FastAPI ML Service
    participant DB as PostgreSQL
    participant RD as Redis Cache

    User->>FE: Upload Dataset CSV & Run Scan
    FE->>GW: POST /api/v1/scan/upload (Forward file)
    GW->>ML: Forward file bytes synchronously
    ML-->>GW: Return profile & validation schema
    GW-->>FE: Return profile details (Activate scan)
    FE->>GW: GET /api/v1/scan/stream (SSE connection)
    loop SSE Stage Progress (15% -> 100%)
        GW->>ML: Trigger mining stream parameters
        ML-->>GW: Emit progress (DATASET_INGEST -> COMPLETED)
        GW->>DB: Save rules & risks to PostgreSQL
        GW->>RD: Invalidate & Evict expired caches
        GW-->>FE: Send stage event update chunk
    end
    FE->>GW: GET /api/v1/risk (Refresh data)
    GW->>FE: Return fresh prediction dashboard
```

---

## ⚡ Tech Stack

* **Frontend**: React 19, Vite, React Flow, Recharts, Axios, Framer Motion
* **Styling**: Responsive Vanilla CSS + CURATED Dark-Mode Design System
* **Backend**: Spring Boot 3, Spring Security, JWT (HS384), WebClient
* **ML Service**: FastAPI, Pandas, MLxtend (FP-Growth + Apriori)
* **Database**: PostgreSQL 15, Spring Data JPA, Hibernate
* **Caching**: Redis 7 (Valkey 8)
* **Deployment**: Docker, Docker Compose, Vercel (Frontend), Render (Services)

---

## 📦 Local Quick Start

### Prerequisites
* Docker Desktop installed
* 4 GB RAM allocated to Docker containers

### 1. Clone the Repository
```bash
git clone https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases.git
cd BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases
```

### 2. Orchestrate Container Stack
```bash
docker-compose up --build -d
```
*Note: First boot will compile the Spring Boot jar and build the Vite production package, taking ~3 minutes. Subsequent boots start in ~15 seconds.*

### 3. Access the Platform
Open your browser and navigate to:
```
http://localhost:5173
```
* **Default Credentials**: `admin` / `admin123` (or `engineer` / `engineer123`)

---

## ✅ System Validation Highlights

We run strict automated validation routines to guarantee system stability and consistency:

| Target Component | Validation Check | Status | Evidence |
|------------------|------------------|--------|----------|
| **Gateway Ingestion** | Schema mismatch rejection | PASS | Invalid CSV triggers HTTP 400 with missing columns details |
| **Deduplication** | Overlapping rules collapse | PASS | Mined Rules view clusters duplicate rules using Jaccard indexes |
| **Persistence** | Named volume preservation | PASS | Uploaded CSV files survive docker container restarts |
| **Cache Sync** | Race condition eviction | PASS | SSE completed event delays until DB commits, ensuring 100% list/drilldown alignment |
| **State Retention** | Page refreshes state recovery | PASS | `localStorage` synchronizes and restores active tab and active dataset selection |

---

## 🔮 Future Roadmap

- [ ] **LLM Integration**: Connect OpenAI/Gemini endpoints to output natural-language mitigation recommendations.
- [ ] **GitHub Webhooks**: Connect repository URLs directly to run scans on push.
- [ ] **CI/CD Risk Gates**: A GitHub Action CLI tool to fail builds if module risk thresholds are exceeded.
- [ ] **Predictive Trend Lines**: LSTM time-series forecast to project risk scores into future sprints.

---

## 👨‍💻 Project Developer

**Pratham Rana**  
*B.Tech in Information Technology*  
[GitHub Profile](https://github.com/PrathamMrana) | [BugRisk Repository](https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases)
