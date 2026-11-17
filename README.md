# 🚀 Smart Coding Progress Analyzer v2.0 (AI & ML Enhanced)

A modern full-stack developer analytics platform that aggregates problem-solving and contest statistics across **LeetCode**, **Codeforces**, and **CodeChef**, powered by **Machine Learning** performance models, **AI diagnostic insights**, **adaptive study planning**, and **technical mock interview preparation**.

---

## ✨ Features Overview

### 📊 Feature 1: Intelligent Coding Analytics
- **Cross-Platform Aggregation:** Connects LeetCode, Codeforces, and CodeChef to unify total solved problems, ratings, and contest histories.
- **DSA Topic Mastery Matrix:** Analyzes solve distributions across canonical DSA topics (Dynamic Programming, Graphs, Trees & BST, Two Pointers, Binary Search, Greedy, Math, Backtracking, etc.) and tags them as **Strong**, **Moderate**, or **Weak / Critical Gap**.
- **Contest Performance & Rating Momentum:** Tracks peak vs current ratings and computes rating momentum (e.g. *Declining -38 pts*, *Accelerating +62 pts*, or *Stable*) over recent rounds.
- **Consistency & Learning Gap Analyzer:** Calculates daily active streaks, 30/90-day activity retention rates, and flags inactivity gaps that risk pattern decay.

### 🧠 Feature 2: AI-Powered Performance Insights
- **Executive Diagnostic:** Generates personalized, human-level performance summaries based directly on real user metrics:
  > *"Your performance in arrays and strings is consistent, but dynamic programming remains an area for improvement. Your contest rating has declined over the last three contests. Consider focusing on medium-level DP problems and participating in at least two contests weekly."*
- **Multidimensional Analysis:**
  - 🌟 **Identified Strengths:** High-fluidity patterns and tactical speed.
  - ⚠️ **Critical Vulnerabilities:** Low conversion on state transitions and recursion gaps.
  - 🎯 **Contest Psychology & Strategy:** Submission penalty management and invariant checks.
  - ⏱️ **Habit Cadence:** Activity frequency and cognitive fatigue risks.
  - 🚀 **High-Yield Tactical Action Plan:** Concrete, numbered corrective steps.
- **Dual Engine:** Supports live **Google Gemini API** (`gemini-1.5-flash`) or built-in deterministic heuristic rule engine when offline.

### 📈 Feature 3: ML-Based Performance Prediction & Archetypes
- **Contest Rating Forecast:** Weighted Ridge Regression trained over historical contest rounds to project 30-day and 90-day rating trends.
- **Honest Scientific Validation:** Provides **95% Confidence Intervals** (uncertainty envelope) along with explicit validation error metrics (**MAE**, **RMSE**).
- **Milestone Projector:** Calculates daily solving pace and forecasts estimated days to the next 100/500 problem milestone.
- **Topic Stagnation Risk Detection:** Identifies topics with decaying activity or difficulty plateaus (High, Moderate, Low risk) with suggested interventions.
- **Developer Pattern Clustering (Archetypes):** Unsupervised K-Means clustering across 6 behavioral dimensions (`Contest Frequency`, `Hard Ratio`, `Medium Ratio`, `Topic Breadth`, `Rating Momentum`, `Consistency`) categorizing developers into:
  - ⚡ *The Contest Grinder*
  - 🧭 *The Breadth-First Explorer*
  - 🔬 *The Deep Specialist*
  - ⚖️ *The Balanced Ascendant*
  - 🏃 *The Inconsistent Sprinter*

### 📅 Feature 4: AI-Powered Adaptive Study Planner
- **Personalized Scheduling:** Dynamically builds a 7-day weekly schedule based on actual weak topics, available hours (5–25 hrs/week), and target milestones.
- **Curated Problem Recommendations:** Direct platform links to curated LeetCode and Codeforces problems targeting specific gaps.
- **Daily Time Budgeting:** Breaks days into concept review, hands-on variation solving, speed drills, and mandatory contest upsolving.
- **Interactive Checklists & Markdown Export:** Check off completed tasks to track weekly completion percentage and copy formatted Markdown with one click.

### 💼 Feature 5: AI Technical Interview Preparation
- **Topic-Specific Question Generator:** Select questions across Dynamic Programming, Graphs, Trees, and Two Pointers tailored for SDE-1, SDE-2, and FAANG interviews.
- **Mock Interview Studio:**
  - 45-minute countdown interview timer.
  - Interactive multi-language code editor (JavaScript, Python, C++, Java).
- **Progressive Hint Engine:** Multi-level hints (Intuition ➔ State Invariant ➔ Edge Cases/Pseudocode ➔ Full Reference Solution) with score penalties for hint usage.
- **AI Solution Evaluator:** Analyzes code for Time & Space Complexity, Edge Case Coverage, and issues a Hiring Recommendation (*Strong Hire*, *Hire*, *Lean Hire*, *Needs Improvement*).
- **Interview Readiness Index:** Tracks mock interview performance to calculate an overall technical readiness score.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Recharts, SVG Icon Library |
| **Backend API** | Node.js (v22), Express.js, CORS, Cheerio, Native Fetch |
| **Machine Learning** | Python 3.10, Scikit-learn (Ridge Regression, K-Means), Pandas, NumPy, SciPy |
| **AI / LLM** | Google Gemini API (REST / JSON schema) with Heuristic Engine Fallback |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18+ (v20+ recommended)
- **Python**: v3.9+ with `scikit-learn`, `pandas`, and `numpy` installed

### 2. Backend Setup
```bash
cd backend
npm install
node server.js
```
The backend server runs on `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📂 Project Architecture

```
smart-coding-progress-analyzer-v2/
├── backend/
│   ├── server.js                      # Main Express server & API routes
│   ├── ml/
│   │   └── ml_engine.py               # Python Scikit-Learn ML script
│   └── services/
│       ├── leetcodeService.js         # LeetCode GraphQL & topic tags
│       ├── codeforcesService.js       # Codeforces submissions & rating delta
│       ├── codechefService.js         # CodeChef web scraping & stars
│       ├── analyticsEngine.js         # Cross-platform mastery & consistency (Feature 1)
│       ├── aiInsightsService.js       # Gemini LLM & heuristic diagnostics (Feature 2)
│       ├── mlPredictionService.js     # ML bridge & uncertainty bounds (Feature 3)
│       ├── studyPlannerService.js     # Adaptive weekly schedule generator (Feature 4)
│       └── interviewPrepService.js    # Mock interview studio & evaluation (Feature 5)
│
└── frontend/
    ├── vite.config.js                 # Vite proxy configuration for /api
    └── src/
        ├── App.jsx                    # Multi-tab dashboard layout
        ├── services/
        │   └── apiService.js          # Unified API client & fallback handlers
        └── components/
            ├── Navbar.jsx             # Tab navigation & 1-click demo profiles
            ├── InputForm.jsx          # Platform handles input bar
            ├── StatsCard.jsx          # Multi-platform summary metrics
            ├── TopicMasteryMatrix.jsx # DSA topic mastery grid (Feature 1)
            ├── WeakTopicsAlert.jsx    # Critical gap alert banner (Feature 1)
            ├── ContestPerformanceCard.jsx # Rating momentum & volatility (Feature 1)
            ├── ConsistencyAnalyzer.jsx # 30/90-day streak & activity tracker (Feature 1)
            ├── AIInsightsView.jsx     # AI diagnostic & action plan (Feature 2)
            ├── MLPredictionView.jsx   # 95% CI rating forecast & archetypes (Feature 3)
            ├── StudyPlannerView.jsx   # 7-day interactive schedule & problems (Feature 4)
            ├── InterviewPrepView.jsx  # Mock interview simulator & evaluator (Feature 5)
            ├── Icons.jsx              # Vector SVG iconography
            └── Footer.jsx             # Project footer & credits
```

---

## ⚖️ Validation & Predictive Integrity

> **Important Note:** In compliance with best ML engineering practices, rating predictions are statistical projections calculated using recency-weighted Ridge regression over actual contest histories. Every forecast includes upper and lower 95% confidence intervals and explicit Mean Absolute Error (MAE) metrics rather than claiming false certainty.

