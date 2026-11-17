import { useState } from "react";
import {
  IconBrain,
  IconSparkles,
  IconCheckCircle,
  IconAlertTriangle,
  IconTrophy,
  IconClock,
  IconTarget,
  IconRefresh,
} from "./Icons";

export default function AIInsightsView({
  insights,
  analytics,
  onRefresh,
  loading = false,
}) {
  const [apiKey, setApiKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);

  if (!insights) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center shadow-xl border border-slate-100">
        <IconBrain className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-700">No Insights Generated Yet</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
          Analyze developer handles first to generate personalized AI performance insights.
        </p>
      </div>
    );
  }

  const {
    executiveSummary = "",
    strengths = [],
    weaknesses = [],
    contestStrategy = "",
    consistencyAnalysis = "",
    actionPlan = [],
    source = "Intelligent Diagnostic Engine",
  } = insights;

  return (
    <div className="space-y-6">
      {/* Top Banner with Source & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
            <IconBrain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">
              AI-Powered Performance Insights
            </h3>
            <p className="text-xs text-slate-500">
              Generated via: <strong className="text-purple-700">{source}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
          >
            {showKeyInput ? "Hide API Key" : "Configure Gemini Key"}
          </button>

          <button
            onClick={() => onRefresh(apiKey)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg shadow transition disabled:opacity-50"
          >
            <IconRefresh className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Analyzing..." : "Re-generate Insights"}
          </button>
        </div>
      </div>

      {/* Gemini API Key Drawer (Optional) */}
      {showKeyInput && (
        <div className="p-4 bg-purple-50/50 border border-purple-200 rounded-2xl text-xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-purple-900">Optional Google Gemini API Key</span>
            <span className="text-[11px] text-purple-600">Free tier supported</span>
          </div>
          <input
            type="password"
            placeholder="AIzaSy..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full bg-white border border-purple-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <p className="text-[11px] text-purple-700">
            If left blank, the system automatically uses the built-in Intelligent Diagnostic Rule Engine calibrated with identical heuristics.
          </p>
        </div>
      )}

      {/* Hero Diagnostic Quote (Prompt's specific highlight) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white rounded-3xl p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">
          <IconSparkles className="w-4 h-4 text-purple-300" />
          <span>Executive Diagnostic Verdict</span>
        </div>

        <blockquote className="text-lg md:text-xl font-medium leading-relaxed text-slate-100 italic border-l-4 border-purple-400 pl-4 py-1">
          "{executiveSummary}"
        </blockquote>

        <p className="mt-4 text-xs text-slate-400">
          Synthesized directly from your real cross-platform problem counts, contest delta, and 30-day activity logs.
        </p>
      </div>

      {/* Strengths & Vulnerabilities Side-by-Side */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Strengths Card */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex flex-col">
          <div className="flex items-center gap-2.5 mb-4 text-emerald-600">
            <span className="p-2 bg-emerald-50 rounded-xl">
              <IconCheckCircle className="w-5 h-5" />
            </span>
            <h4 className="font-bold text-slate-800 text-base">
              Identified Algorithmic Strengths
            </h4>
          </div>

          <ul className="space-y-3 text-xs text-slate-600 flex-1">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/40 border border-emerald-100">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Vulnerabilities Card */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex flex-col">
          <div className="flex items-center gap-2.5 mb-4 text-rose-600">
            <span className="p-2 bg-rose-50 rounded-xl">
              <IconAlertTriangle className="w-5 h-5" />
            </span>
            <h4 className="font-bold text-slate-800 text-base">
              Critical Vulnerabilities & Blind Spots
            </h4>
          </div>

          <ul className="space-y-3 text-xs text-slate-600 flex-1">
            {weaknesses.map((weak, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/40 border border-rose-100">
                <span className="text-rose-600 font-bold">⚠️</span>
                <span>{weak}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contest Strategy & Consistency Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Contest Strategy */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
          <div className="flex items-center gap-2.5 mb-3 text-amber-600">
            <span className="p-2 bg-amber-50 rounded-xl">
              <IconTrophy className="w-5 h-5" />
            </span>
            <h4 className="font-bold text-slate-800 text-base">
              Contest Psychology & Strategy
            </h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {contestStrategy}
          </p>
        </div>

        {/* Consistency Analysis */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
          <div className="flex items-center gap-2.5 mb-3 text-indigo-600">
            <span className="p-2 bg-indigo-50 rounded-xl">
              <IconClock className="w-5 h-5" />
            </span>
            <h4 className="font-bold text-slate-800 text-base">
              Consistency & Habit Assessment
            </h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {consistencyAnalysis}
          </p>
        </div>
      </div>

      {/* Tactical 4-Point Action Plan */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
        <div className="flex items-center gap-2.5 mb-5 text-slate-800">
          <span className="p-2 bg-slate-900 text-white rounded-xl">
            <IconTarget className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-slate-800 text-base">
              Tactical High-Yield Action Plan
            </h4>
            <p className="text-xs text-slate-500">
              Immediate adjustments to break past your current rating ceiling
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {actionPlan.map((action, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {action.step || idx + 1}
                </span>
                <h5 className="font-bold text-slate-800 text-xs">
                  {action.title}
                </h5>
              </div>
              <p className="text-xs text-slate-600 pl-8 leading-relaxed">
                {action.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

