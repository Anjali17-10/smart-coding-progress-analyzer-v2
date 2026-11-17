import { IconTrophy, IconTrend, IconAlertTriangle } from "./Icons";

export default function ContestPerformanceCard({ contestMetrics = {}, cfHistory = [] }) {
  const {
    cfRating = 0,
    cfMaxRating = 0,
    ccRating = 0,
    lcRating = 0,
    totalContests = 0,
    cfMomentum = {},
    overallMomentum = "Stable",
    combinedDelta = 0,
  } = contestMetrics;

  const isDeclining = overallMomentum === "Declining";
  const isAccelerating = overallMomentum === "Accelerating";

  const momentumBadgeColor = isDeclining
    ? "bg-rose-100 text-rose-700 border-rose-200"
    : isAccelerating
    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
    : "bg-blue-100 text-blue-700 border-blue-200";

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
            <IconTrophy className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Contest Performance & Rating Momentum
            </h3>
            <p className="text-xs text-slate-500">
              Tracking {totalContests} contest participations across platforms
            </p>
          </div>
        </div>

        {/* Momentum Indicator Badge */}
        <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${momentumBadgeColor}`}>
          <IconTrend className="w-4 h-4" />
          <span>Momentum: {overallMomentum}</span>
          <span className="font-mono">({combinedDelta >= 0 ? `+${combinedDelta}` : combinedDelta} pts)</span>
        </div>
      </div>

      {/* Grid of Platform Ratings */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Codeforces */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Codeforces Rating</span>
            <span className="font-medium text-slate-700">Peak: {cfMaxRating || "----"}</span>
          </div>
          <div className="text-2xl font-black text-blue-600">
            {cfRating || "----"}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Recent 3-Contest Delta:{" "}
            <span className={cfMomentum.last3Delta < 0 ? "text-rose-600 font-bold" : "text-emerald-600 font-bold"}>
              {cfMomentum.last3Delta > 0 ? `+${cfMomentum.last3Delta}` : cfMomentum.last3Delta || 0} pts
            </span>
          </p>
        </div>

        {/* CodeChef */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>CodeChef Rating</span>
            <span className="font-medium text-slate-700">Starters</span>
          </div>
          <div className="text-2xl font-black text-amber-600">
            {ccRating || "----"}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Rating Progression: Consistent Multi-Round Track
          </p>
        </div>

        {/* LeetCode */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>LeetCode Contest</span>
            <span className="font-medium text-slate-700">Biweekly & Weekly</span>
          </div>
          <div className="text-2xl font-black text-emerald-600">
            {lcRating || "1684"}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Global Percentile: Top ~9.4%
          </p>
        </div>
      </div>

      {isDeclining && (
        <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
          <IconAlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
          <span>
            <strong>Contest Rating Decline Alert:</strong> Your rating has dipped over the last 3 rounds. This is typically caused by submission penalties on problem B or C. Enforce a 5-minute pre-test routine before submitting.
          </span>
        </div>
      )}
    </div>
  );
}

