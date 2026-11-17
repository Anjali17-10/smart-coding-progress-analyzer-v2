import express from "express";
import cors from "cors";

import { fetchLeetCodeData } from "./services/leetcodeService.js";
import { fetchCodeforcesData } from "./services/codeforcesService.js";
import { fetchCodeChefData } from "./services/codechefService.js";
import { computeUnifiedAnalytics } from "./services/analyticsEngine.js";
import { generateAIInsights } from "./services/aiInsightsService.js";
import { getMLPredictions } from "./services/mlPredictionService.js";
import { generateStudyPlan } from "./services/studyPlannerService.js";
import {
  getInterviewQuestions,
  evaluateInterviewSolution,
  computeInterviewReadiness,
} from "./services/interviewPrepService.js";

const app = express();
app.use(cors());
app.use(express.json());

// -------------------------------------------------------------
// Core Platform Endpoints (Extended with Topic & Contest Data)
// -------------------------------------------------------------

// LeetCode route
app.get("/api/leetcode/:username", async (req, res) => {
  try {
    const data = await fetchLeetCodeData(req.params.username);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Codeforces routes
app.get("/api/codeforces/:handle", async (req, res) => {
  try {
    const data = await fetchCodeforcesData(req.params.handle);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Codeforces backwards-compatibility routes
app.get("/api/codeforces/:handle/solved", async (req, res) => {
  try {
    const data = await fetchCodeforcesData(req.params.handle);
    res.json({ solved: data.solved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/codeforces/:handle/history", async (req, res) => {
  try {
    const data = await fetchCodeforcesData(req.params.handle);
    res.json(data.ratingHistory || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CodeChef route
app.get("/api/codechef/:username", async (req, res) => {
  try {
    const data = await fetchCodeChefData(req.params.username);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// Feature 1: Unified Cross-Platform Coding Analytics
// -------------------------------------------------------------
app.post("/api/analytics/unified", (req, res) => {
  try {
    const { lcData, cfData, ccData } = req.body;
    const analytics = computeUnifiedAnalytics({ lcData, cfData, ccData });
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// Feature 2: AI-Powered Performance Insights (Gemini / Heuristic)
// -------------------------------------------------------------
app.post("/api/ai/insights", async (req, res) => {
  try {
    const { analytics, apiKey } = req.body;
    if (!analytics) {
      return res.status(400).json({ error: "Missing analytics payload" });
    }
    const insights = await generateAIInsights(analytics, apiKey);
    res.json(insights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// Feature 3: ML-Based Performance Prediction & Archetypes
// -------------------------------------------------------------
app.post("/api/ml/predict", async (req, res) => {
  try {
    const { analytics, cfHistory, currentRating } = req.body;
    if (!analytics) {
      return res.status(400).json({ error: "Missing analytics payload" });
    }
    const predictions = await getMLPredictions(analytics, cfHistory, currentRating);
    res.json(predictions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// Feature 4: AI-Powered Study Planner
// -------------------------------------------------------------
app.post("/api/planner/generate", (req, res) => {
  try {
    const { analytics, hoursPerWeek, targetGoal, customWeakTopics } = req.body;
    const plan = generateStudyPlan({
      analytics,
      hoursPerWeek: Number(hoursPerWeek) || 10,
      targetGoal,
      customWeakTopics,
    });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// Feature 5: AI Interview Preparation Module
// -------------------------------------------------------------
app.get("/api/interview/questions", (req, res) => {
  try {
    const { topic } = req.query;
    const questions = getInterviewQuestions(topic);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/interview/evaluate", (req, res) => {
  try {
    const { questionId, code, language, hintsUsed, timeSpentSeconds } = req.body;
    const evaluation = evaluateInterviewSolution({
      questionId,
      code,
      language,
      hintsUsed,
      timeSpentSeconds,
    });
    res.json(evaluation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/interview/readiness", (req, res) => {
  try {
    const { sessions } = req.body;
    const readiness = computeInterviewReadiness(sessions);
    res.json(readiness);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// Presets / Quick Demo Endpoints for Recruiter & Evaluator Testing
// -------------------------------------------------------------
app.get("/api/presets", (req, res) => {
  res.json([
    {
      id: "anjali",
      name: "Anjali (Active Student)",
      description: "Consistent problem solver with solid string/arrays, developing DP & contest confidence.",
      handles: {
        leetcode: "anjali_17_10",
        codeforces: "Anjali021",
        codechef: "sane_ring_4",
      },
    },
    {
      id: "grinder",
      name: "Alex (Contest Grinder)",
      description: "High contest volume and fast implementation, declining recent rating from early WAs.",
      handles: {
        leetcode: "neal_wu",
        codeforces: "tourist",
        codechef: "gennady",
      },
    },
    {
      id: "interview",
      name: "Sam (Interview Prep Aspirant)",
      description: "Focusing heavily on Medium/Hard LeetCode problems for upcoming placements.",
      handles: {
        leetcode: "lee215",
        codeforces: "errichto",
        codechef: "aryan",
      },
    },
  ]);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Smart Coding Progress Analyzer API running on port ${PORT}`);
});
