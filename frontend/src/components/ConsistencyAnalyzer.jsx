import { IconClock, IconCheckCircle, IconAlertTriangle, IconSparkles } from "./Icons";

export default function ConsistencyAnalyzer({ consistency = {} }) {
  const {
    activeDaysLast30 = 20,
    activeDaysLast90 = 55,
    currentStreak = 4,
    longestStreak = 18,
    totalActiveDays = 140,
    rateLast30Pct = 67,
    verdict = "Consistent",
    gapWarning = null,
  } = consistency;

  const isHigh = rateLast30Pct >= 70;
  const isLow = rateLast30Pct < 45;

  const statusBadge = isHigh
    ? "bg-emerald-100 text-emerald-800 border-emerald-300"
    : isLow
    ? "bg-rose-100 text-rose-800 border-rose-300"
    : "bg-amber-100 text-amber-800 border-amber-300";

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <IconClock className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Consistency & Learning Gap Analyzer
            </h3>
            <p className="text-xs text-slate-500">
              Pattern retention and habit cadence over the last 90 days
            </p>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${statusBadge}`}>
          {verdict} ({rateLast30Pct}% Active)
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500">🔥 Current Streak</p>
          <p className="text-2xl font-black text-slate-800 mt-1">
            {currentStreak} <span className="text-xs font-normal text-slate-500">days</span>
          </p>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500">🏆 Longest Streak</p>
          <p className="text-2xl font-black text-slate-800 mt-1">
            {longestStreak} <span className="text-xs font-normal text-slate-500">days</span>
          </p>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500">📅 Active (30 Days)</p>
          <p className="text-2xl font-black text-indigo-600 mt-1">
            {activeDaysLast30} / 30
          </p>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500">📈 Total Active Days</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {totalActiveDays} <span className="text-xs font-normal text-slate-500">days</span>
          </p>
        </div>
      </div>

      {/* Consistency Progress Bar */}
      <div className="mt-5">
        <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-medium">
          <span>Monthly Consistency Cadence</span>
          <span>{rateLast30Pct}% Active</span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isHigh ? "bg-emerald-500" : isLow ? "bg-rose-500" : "bg-amber-500"
            }`}
            style={{ width: `${Math.min(100, rateLast30Pct)}%` }}
          />
        </div>
      </div>

      {/* Gap Warning or Insight */}
      {gapWarning && (
        <div
          className={`mt-4 p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
            isLow
              ? "bg-rose-50 border-rose-200 text-rose-800"
              : isHigh
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-amber-50 border-amber-200 text-amber-800"
          }`}
        >
          {isLow ? (
            <IconAlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          ) : isHigh ? (
            <IconCheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
          ) : (
            <IconSparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
          )}
          <span>{gapWarning}</span>
        </div>
      )}
    </div>
  );
}

