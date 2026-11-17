import { useState } from "react";
import { IconTarget, IconAlertTriangle, IconCheckCircle } from "./Icons";

export default function TopicMasteryMatrix({ topicMastery = [] }) {
  const [filter, setFilter] = useState("all");

  const filteredTopics = topicMastery.filter(t => {
    if (filter === "all") return true;
    return t.status.toLowerCase() === filter.toLowerCase();
  });

  const weakCount = topicMastery.filter(t => t.status === "Weak").length;
  const strongCount = topicMastery.filter(t => t.status === "Strong").length;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <IconTarget className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-800">
              DSA Topic Mastery Matrix
            </h3>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Cross-platform breakdown of problem-solving patterns vs standard algorithmic benchmarks
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === "all" ? "bg-slate-900 text-white shadow" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Topics ({topicMastery.length})
          </button>
          <button
            onClick={() => setFilter("weak")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              filter === "weak" ? "bg-rose-600 text-white shadow" : "bg-rose-50 text-rose-700 hover:bg-rose-100"
            }`}
          >
            <IconAlertTriangle className="w-3.5 h-3.5" />
            Weak Areas ({weakCount})
          </button>
          <button
            onClick={() => setFilter("strong")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              filter === "strong" ? "bg-emerald-600 text-white shadow" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            <IconCheckCircle className="w-3.5 h-3.5" />
            Strong ({strongCount})
          </button>
        </div>
      </div>

      {/* Grid of Topics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTopics.map((topic) => {
          const isWeak = topic.status === "Weak";
          const isStrong = topic.status === "Strong";

          const badgeBg = isWeak
            ? "bg-rose-50 text-rose-700 border-rose-200"
            : isStrong
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-amber-50 text-amber-700 border-amber-200";

          const barColor = isWeak
            ? "bg-rose-500"
            : isStrong
            ? "bg-emerald-500"
            : "bg-amber-500";

          return (
            <div
              key={topic.key}
              className={`p-4 rounded-xl border transition-all hover:shadow-md ${
                isWeak ? "border-rose-200 bg-rose-50/20" : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-slate-800 text-sm">
                  {topic.name}
                </h4>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${badgeBg}`}
                >
                  {topic.status}
                </span>
              </div>

              <div className="flex items-baseline justify-between text-xs text-slate-500 mb-1.5">
                <span>
                  Solved: <strong className="text-slate-800">{topic.solved}</strong> / {topic.benchmark}
                </span>
                <span className="font-semibold">{topic.percentage}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${Math.min(100, topic.percentage)}%` }}
                />
              </div>

              {isWeak && (
                <p className="mt-2 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                  <span>⚠️ High Priority Gap</span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

