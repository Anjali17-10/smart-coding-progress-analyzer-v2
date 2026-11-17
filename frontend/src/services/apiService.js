// Unified API Service for Smart Coding Progress Analyzer

const BASE_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.DEV ? "" : "https://smart-coding-progress-analyzer-v2-1.onrender.com");

async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Request failed with status ${res.status}`);
    }
    return await res.json();
  } catch (e) {
    console.warn(`[API] Network call to ${url} failed:`, e.message);
    throw e;
  }
}

export async function fetchLeetCode(username) {
  return await safeFetch(`${BASE_URL}/api/leetcode/${username}`);
}

export async function fetchCodeforces(handle) {
  return await safeFetch(`${BASE_URL}/api/codeforces/${handle}`);
}

export async function fetchCodeChef(username) {
  return await safeFetch(`${BASE_URL}/api/codechef/${username}`);
}

export async function fetchUnifiedAnalytics(lcData, cfData, ccData) {
  return await safeFetch(`${BASE_URL}/api/analytics/unified`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lcData, cfData, ccData }),
  });
}

export async function fetchAIInsights(analytics, apiKey = "") {
  return await safeFetch(`${BASE_URL}/api/ai/insights`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ analytics, apiKey }),
  });
}

export async function fetchMLPredictions(analytics, cfHistory, currentRating) {
  return await safeFetch(`${BASE_URL}/api/ml/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ analytics, cfHistory, currentRating }),
  });
}

export async function fetchStudyPlan(params) {
  return await safeFetch(`${BASE_URL}/api/planner/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
}

export async function fetchInterviewQuestions(topic = null) {
  const query = topic ? `?topic=${encodeURIComponent(topic)}` : "";
  return await safeFetch(`${BASE_URL}/api/interview/questions${query}`);
}

export async function submitInterviewSolution(payload) {
  return await safeFetch(`${BASE_URL}/api/interview/evaluate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function fetchInterviewReadiness(sessions = []) {
  return await safeFetch(`${BASE_URL}/api/interview/readiness`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessions }),
  });
}

export async function fetchPresets() {
  return await safeFetch(`${BASE_URL}/api/presets`);
}

