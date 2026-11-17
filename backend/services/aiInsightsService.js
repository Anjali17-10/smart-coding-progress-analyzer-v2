// AI-Powered Performance Insights Service
// Integrates Gemini LLM API (if GEMINI_API_KEY is available) with an Intelligent Heuristic Expert Engine

import fetch from "node-fetch";

export async function generateAIInsights(analytics, apiKey = process.env.GEMINI_API_KEY) {
  const {
    totalSolved,
    weakTopics,
    strongTopics,
    contestMetrics,
    consistency,
    difficultyBreakdown,
  } = analytics;

  const weakTopicNames = weakTopics.map(w => w.name).join(", ") || "Dynamic Programming, Graphs";
  const strongTopicNames = strongTopics.map(s => s.name).join(", ") || "Arrays & Strings, Two Pointers";
  const momentumText = contestMetrics.overallMomentum === "Declining"
    ? `declined over the last few contests (net delta: ${contestMetrics.combinedDelta} pts)`
    : contestMetrics.overallMomentum === "Accelerating"
    ? `surged upward (+${contestMetrics.combinedDelta} pts) showing strong competitive form`
    : `stabilized around ${contestMetrics.cfRating || contestMetrics.ccRating || 1400} with low volatility`;

  // Try live Gemini API if key is present
  if (apiKey) {
    try {
      const prompt = `
You are an elite competitive programming and technical interview coach.
Analyze the following developer metrics and generate a high-impact, realistic diagnostic report.

DEVELOPER DATA:
- Total Solved Problems: ${totalSolved} (Easy: ${difficultyBreakdown.easy}, Medium: ${difficultyBreakdown.medium}, Hard: ${difficultyBreakdown.hard})
- Strong Topics: ${strongTopicNames}
- Weak / Stagnant Topics: ${weakTopicNames}
- Contest Momentum: ${momentumText}
- Peak vs Current Rating: CF Peak: ${contestMetrics.cfMaxRating}, Current: ${contestMetrics.cfRating}; CC Rating: ${contestMetrics.ccRating}
- Consistency: ${consistency.rateLast30Pct}% active days in last 30 days. Current streak: ${consistency.currentStreak} days. Verdict: ${consistency.verdict}.
- Noticeable Gaps: ${consistency.gapWarning || "None"}

OUTPUT FORMAT (Respond in valid JSON):
{
  "executiveSummary": "A concise 2-3 sentence personalized diagnostic summarizing their strength, critical weak spot, contest rating trend, and primary immediate corrective action. Model it like: 'Your performance in arrays and strings is consistent, but dynamic programming remains an area for improvement. Your contest rating has declined over the last three contests. Consider focusing on medium-level DP problems and participating in at least two contests weekly.'",
  "strengths": ["Array of 3 specific algorithmic strengths based on data"],
  "weaknesses": ["Array of 3 specific technical vulnerabilities / gap areas"],
  "contestStrategy": "1-2 paragraphs analyzing their contest psychology, rating volatility, and concrete contest habits (e.g. upsolving, penalty management).",
  "consistencyAnalysis": "Paragraph analyzing their practice cadence and fatigue/inactivity risks.",
  "actionPlan": [
    { "step": 1, "title": "Immediate Tactical Shift", "detail": "Actionable task" },
    { "step": 2, "title": "Problem Difficulty Calibration", "detail": "Actionable task" },
    { "step": 3, "title": "Contest & Upsolving Routine", "detail": "Actionable task" },
    { "step": 4, "title": "Pattern Recognition Focus", "detail": "Actionable task" }
  ]
}
Return ONLY valid JSON.
      `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" },
          }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          return {
            ...parsed,
            source: "Gemini 1.5 Flash (Live LLM)",
          };
        }
      }
    } catch (e) {
      console.warn("[AI Insights] Gemini call failed, using intelligent expert heuristic:", e.message);
    }
  }

  // High-Quality Intelligent Heuristic Expert Engine
  // Synthesizes deeply customized diagnostic matching the exact user stats
  return generateDeterministicInsights(analytics, weakTopicNames, strongTopicNames, momentumText);
}

function generateDeterministicInsights(analytics, weakTopicsStr, strongTopicsStr, momentumText) {
  const { contestMetrics, consistency, difficultyBreakdown, weakTopics } = analytics;
  const topWeak = weakTopics[0]?.name || "Dynamic Programming";
  const secondWeak = weakTopics[1]?.name || "Graph Algorithms";

  const isDeclining = contestMetrics.overallMomentum === "Declining";
  const isAccelerating = contestMetrics.overallMomentum === "Accelerating";

  let executiveSummary = "";
  if (isDeclining) {
    executiveSummary = `Your performance in ${strongTopicsStr} is consistent, but ${topWeak.toLowerCase()} and ${secondWeak.toLowerCase()} remain clear areas for improvement. Your contest rating has declined over recent rounds (${contestMetrics.combinedDelta} pts delta). Consider dedicating 60% of your upcoming study blocks to medium-level ${topWeak} problems and committing to at least two structured contests weekly with mandatory upsolving.`;
  } else if (isAccelerating) {
    executiveSummary = `Your recent trajectory is impressive with an upward rating acceleration (+${contestMetrics.combinedDelta} pts), fueled by solid mastery in ${strongTopicsStr}. To maintain this momentum and avoid plateauing, transition your focus from standard implementations into advanced ${topWeak.toLowerCase()} and timed Division 2 problems.`;
  } else {
    executiveSummary = `Your problem-solving volume in ${strongTopicsStr} has established a reliable foundation, but progress has reached a plateau due to recurring gaps in ${topWeak.toLowerCase()}. Your contest ratings are stable but lack upward velocity. Shifting from easy problem volume to targeted medium/hard problem solving will unlock the next rating tier.`;
  }

  const strengths = [
    `Strong problem-solving fluidity in foundational patterns (${strongTopicsStr}), enabling quick solves on Div. 3 problems A/B.`,
    `Demonstrated stamina with ${analytics.totalSolved} total problems solved across platforms.`,
    `Medium problem volume (${difficultyBreakdown.medium} solved) shows willingness to push beyond basic syntactic challenges.`,
  ];

  const weaknesses = [
    `Critical vulnerability in ${topWeak}: low solve conversion on state-transition and recurrence-relation challenges.`,
    `Under-representation in Hard problems (${difficultyBreakdown.hard} solved, representing only ${Math.round((difficultyBreakdown.hard / (analytics.totalSolved || 1)) * 100)}% of total portfolio).`,
    consistency.rateLast30Pct < 60
      ? `Practice inconsistency (${consistency.rateLast30Pct}% active days in the last month) creates decay in algorithmic intuition.`
      : `Contest performance volatility: tendency to lose rating during rounds featuring non-standard problem formulations.`,
  ];

  const contestStrategy = isDeclining
    ? `Your rating trajectory indicates contest fatigue or premature submission penalties. Often, rushing problem B or C results in multiple Wrong Answer penalties that outweigh the speed advantage. Practice a strict 5-minute invariant check (testing edge cases, zero inputs, maximum integer limits) before every submission.`
    : `To break past your current ceiling, implement the '1-Problem Upsolve' rule: within 24 hours of every contest, thoroughly read editorial and re-implement the first problem you failed to solve in-contest without looking at other users' code.`;

  const consistencyAnalysis = consistency.rateLast30Pct >= 70
    ? `Outstanding daily rhythm (${consistency.activeDaysLast30}/30 active days). Your high frequency primes your muscle memory. Make sure you balance quantity with cognitive depth rather than re-solving familiar patterns.`
    : `Current consistency sits at ${consistency.rateLast30Pct}% active days over the last month. Irregular practice gaps force your brain to repeatedly re-learn edge case nuances. Aim for a micro-habit: even on busy days, solve one 15-minute warmup problem.`;

  const actionPlan = [
    {
      step: 1,
      title: `Dedicated ${topWeak} Sprint`,
      detail: `Solve 12 curated Medium ${topWeak} problems over the next 10 days, focusing strictly on identifying base cases and optimal subproblems.`,
    },
    {
      step: 2,
      title: "Hard Difficulty Exposure",
      detail: "Attempt at least two Hard problems per week without opening hints for the first 30 minutes to build mental endurance.",
    },
    {
      step: 3,
      title: "Pre-Submission Invariant Protocol",
      detail: "Manually trace inputs on paper with n=1, n=max, and duplicate elements before submitting in contests to eliminate avoidable 50-point rating penalties.",
    },
    {
      step: 4,
      title: "Mandatory Post-Contest Upsolving",
      detail: "Dedicate 90 minutes every Sunday to upsolve problem C/D from the weekend contest before checking the editorial.",
    },
  ];

  return {
    executiveSummary,
    strengths,
    weaknesses,
    contestStrategy,
    consistencyAnalysis,
    actionPlan,
    source: "Intelligent Diagnostic Engine (Rule-Calibrated)",
  };
}

