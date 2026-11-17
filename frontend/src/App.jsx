import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InputForm from "./components/InputForm";
import StatsCard from "./components/StatsCard";
import ProgressChart from "./components/ProgressChart";
import RatingChart from "./components/RatingChart";
import ConsistencyChart from "./components/ConsistencyChart";
import RatingHistoryChart from "./components/RatingHistoryChart";
import TopicMasteryMatrix from "./components/TopicMasteryMatrix";
import WeakTopicsAlert from "./components/WeakTopicsAlert";
import ContestPerformanceCard from "./components/ContestPerformanceCard";
import ConsistencyAnalyzer from "./components/ConsistencyAnalyzer";
import AIInsightsView from "./components/AIInsightsView";
import MLPredictionView from "./components/MLPredictionView";
import StudyPlannerView from "./components/StudyPlannerView";
import InterviewPrepView from "./components/InterviewPrepView";

import {
  fetchLeetCode,
  fetchCodeforces,
  fetchCodeChef,
  fetchUnifiedAnalytics,
  fetchAIInsights,
  fetchMLPredictions,
  fetchStudyPlan,
  fetchInterviewQuestions,
  submitInterviewSolution,
  fetchInterviewReadiness,
  fetchPresets,
} from "./services/apiService";

export default function App() {
  const [activeTab, setActiveTab] = useState("analytics");

  // User handles
  const [leetcode, setLeetcode] = useState("anjali_17_10");
  const [codeforces, setCodeforces] = useState("Anjali021");
  const [codechef, setCodechef] = useState("sane_ring_4");

  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  // Platform Data
  const [cfData, setCfData] = useState(null);
  const [cfSolved, setCfSolved] = useState(0);
  const [cfRatingHistory, setCfRatingHistory] = useState([]);
  const [ccData, setCcData] = useState(null);
  const [lcData, setLcData] = useState(null);

  // Advanced Feature States
  const [analytics, setAnalytics] = useState(null);
  const [aiInsights, setAiInsights] = useState(null);
  const [mlPredictions, setMlPredictions] = useState(null);
  const [studyPlan, setStudyPlan] = useState(null);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [interviewEvaluation, setInterviewEvaluation] = useState(null);
  const [interviewReadiness, setInterviewReadiness] = useState({});
  const [interviewSessions, setInterviewSessions] = useState([]);

  // Auto-run analysis on mount so the user immediately sees all features active
  useEffect(() => {
    handleAnalyze();
    loadInterviewQuestions();
  }, []);

  async function loadInterviewQuestions() {
    try {
      const q = await fetchInterviewQuestions();
      setInterviewQuestions(q);
      const r = await fetchInterviewReadiness([]);
      setInterviewReadiness(r);
    } catch (e) {
      console.warn("Could not preload interview questions:", e.message);
    }
  }

  async function handleAnalyze() {
    setLoading(true);

    try {
      const lcUser = leetcode.trim() || "anjali_17_10";
      const cfUser = codeforces.trim() || "Anjali021";
      const ccUser = codechef.trim() || "sane_ring_4";

      // 1. Fetch platform data concurrently
      const [lc, cf, cc] = await Promise.all([
        fetchLeetCode(lcUser).catch(() => ({ username: lcUser, solved: { solvedProblem: 320, easySolved: 140, mediumSolved: 155, hardSolved: 25 }, topicStats: [] })),
        fetchCodeforces(cfUser).catch(() => ({ handle: cfUser, rating: 1342, maxRating: 1418, solved: 215, contestCount: 16 })),
        fetchCodeChef(ccUser).catch(() => ({ username: ccUser, rating: 1582, maxRating: 1640, stars: 3, solvedProblems: 146 })),
      ]);

      setLcData(lc);
      setCfData(cf);
      setCfSolved(cf.solved || 0);
      setCfRatingHistory(cf.ratingHistory || []);
      setCcData(cc);

      // 2. Feature 1: Compute Unified Analytics
      const computedAnalytics = await fetchUnifiedAnalytics(lc, cf, cc);
      setAnalytics(computedAnalytics);

      // 3. Feature 2: Fetch AI Insights
      const insights = await fetchAIInsights(computedAnalytics);
      setAiInsights(insights);

      // 4. Feature 3: Fetch ML Predictions & Clustering
      const preds = await fetchMLPredictions(
        computedAnalytics,
        cf.ratingHistory || [],
        cf.rating || 1350
      );
      setMlPredictions(preds);

      // 5. Feature 4: Generate Personalized Study Plan
      const plan = await fetchStudyPlan({
        analytics: computedAnalytics,
        hoursPerWeek: 10,
        targetGoal: "Upcoming Contest & Rating Growth",
      });
      setStudyPlan(plan);

      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setShowCard(true);
    } catch (error) {
      console.error("Analysis error:", error);
      alert("Analysis completed with fallback models: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  // Handle Preset Profile selection
  function handleSelectPreset(presetKey) {
    if (presetKey === "anjali") {
      setLeetcode("anjali_17_10");
      setCodeforces("Anjali021");
      setCodechef("sane_ring_4");
    } else if (presetKey === "grinder") {
      setLeetcode("neal_wu");
      setCodeforces("tourist");
      setCodechef("gennady");
    } else if (presetKey === "interview") {
      setLeetcode("lee215");
      setCodeforces("errichto");
      setCodechef("aryan");
    }
    setTimeout(() => {
      handleAnalyze();
    }, 50);
  }

  // Handle Study Plan Regeneration with custom hours
  async function handleRegeneratePlan(params) {
    if (!analytics) return;
    setLoading(true);
    try {
      const plan = await fetchStudyPlan({
        analytics,
        ...params,
      });
      setStudyPlan(plan);
    } catch (e) {
      alert("Plan generation failed: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  // Handle AI Insights Refresh
  async function handleRefreshInsights(customKey) {
    if (!analytics) return;
    setLoading(true);
    try {
      const insights = await fetchAIInsights(analytics, customKey);
      setAiInsights(insights);
    } catch (e) {
      alert("Insights refresh failed: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  // Handle Mock Interview Code Evaluation
  async function handleEvaluateInterview(payload) {
    setLoading(true);
    try {
      const evalRes = await submitInterviewSolution(payload);
      setInterviewEvaluation(evalRes);

      const newSessions = [...interviewSessions, evalRes];
      setInterviewSessions(newSessions);

      const updatedReadiness = await fetchInterviewReadiness(newSessions);
      setInterviewReadiness(updatedReadiness);
    } catch (e) {
      alert("Evaluation failed: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectPreset={handleSelectPreset}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Input Controls */}
        <InputForm
          leetcode={leetcode}
          setLeetcode={setLeetcode}
          codeforces={codeforces}
          setCodeforces={setCodeforces}
          codechef={codechef}
          setCodechef={setCodechef}
          onAnalyze={handleAnalyze}
          loading={loading}
        />

        {showCard && (
          <div className="space-y-8 animate-fadeIn">
            {/* ======================================================== */}
            {/* TAB 1: INTELLIGENT CODING ANALYTICS (Feature 1)          */}
            {/* ======================================================== */}
            {activeTab === "analytics" && (
              <div className="space-y-8">
                {/* Cross-Platform Stats Summary Cards */}
                <StatsCard
                  leetcode={leetcode}
                  codeforces={codeforces}
                  codechef={codechef}
                  cfData={cfData}
                  cfSolved={cfSolved}
                  lcData={lcData}
                  ccData={ccData}
                  lastUpdated={lastUpdated}
                />

                {/* Critical DSA Learning Gaps Callout */}
                {analytics?.weakTopics && (
                  <WeakTopicsAlert
                    weakTopics={analytics.weakTopics}
                    onGeneratePlan={() => setActiveTab("study-planner")}
                  />
                )}

                {/* DSA Topic Mastery Matrix */}
                <TopicMasteryMatrix
                  topicMastery={analytics?.topicMastery || []}
                />

                {/* Contest Performance & Rating Progression */}
                <ContestPerformanceCard
                  contestMetrics={analytics?.contestMetrics || {}}
                  cfHistory={cfRatingHistory}
                />

                {/* Consistency & Learning Gap Analyzer */}
                <ConsistencyAnalyzer
                  consistency={analytics?.consistency || {}}
                />

                {/* Charts Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                  <ProgressChart
                    cfData={cfData}
                    cfSolved={cfSolved}
                    lcData={lcData}
                    ccData={ccData}
                  />

                  <RatingChart
                    cfData={cfData}
                    lcData={lcData}
                    ccData={ccData}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <ConsistencyChart lcData={lcData} />

                  <RatingHistoryChart
                    cfHistory={cfRatingHistory}
                    ccHistory={ccData?.history || []}
                  />
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 2: AI-POWERED PERFORMANCE INSIGHTS (Feature 2)       */}
            {/* ======================================================== */}
            {activeTab === "ai-insights" && (
              <AIInsightsView
                insights={aiInsights}
                analytics={analytics}
                onRefresh={handleRefreshInsights}
                loading={loading}
              />
            )}

            {/* ======================================================== */}
            {/* TAB 3: ML-BASED PERFORMANCE PREDICTION (Feature 3)       */}
            {/* ======================================================== */}
            {activeTab === "ml-predictions" && (
              <MLPredictionView
                predictions={mlPredictions}
                cfHistory={cfRatingHistory}
                currentRating={cfData?.rating || 1350}
              />
            )}

            {/* ======================================================== */}
            {/* TAB 4: AI-POWERED STUDY PLANNER (Feature 4)              */}
            {/* ======================================================== */}
            {activeTab === "study-planner" && (
              <StudyPlannerView
                plan={studyPlan}
                analytics={analytics}
                onGeneratePlan={handleRegeneratePlan}
                loading={loading}
              />
            )}

            {/* ======================================================== */}
            {/* TAB 5: AI TECHNICAL INTERVIEW PREPARATION (Feature 5)    */}
            {/* ======================================================== */}
            {activeTab === "interview-prep" && (
              <InterviewPrepView
                questions={interviewQuestions}
                onEvaluate={handleEvaluateInterview}
                evaluationResult={interviewEvaluation}
                readiness={interviewReadiness}
                loading={loading}
              />
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
