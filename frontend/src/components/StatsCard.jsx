import { IconTrophy, IconExternalLink, IconSparkles } from "./Icons";

export default function StatsCard({
  leetcode,
  codeforces,
  codechef,
  cfData,
  cfSolved,
  lcData,
  ccData,
  lastUpdated,
}) {
  const totalSolved =
    (lcData?.solved?.solvedProblem || 0) +
    (cfSolved || cfData?.solved || 0) +
    (ccData?.solvedProblems || 0);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Aggregated Developer Portfolio
            </span>
            <h2 className="text-2xl font-black mt-0.5">
              Multi-Platform Progress Overview
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Last synced: {lastUpdated || "Just now"}
            </p>
          </div>

          <div className="flex items-center gap-6 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
            <div>
              <p className="text-[11px] text-slate-400">Total Solved</p>
              <p className="text-3xl font-black text-white">{totalSolved}</p>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <p className="text-[11px] text-slate-400">Connected</p>
              <p className="text-3xl font-black text-indigo-400">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* LeetCode Card */}
        <div className="bg-white border border-amber-200/80 rounded-2xl p-5 shadow-md hover:shadow-lg transition">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              LeetCode
            </h3>
            <a
              href={`https://leetcode.com/u/${leetcode}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>{leetcode}</span>
              <IconExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 mb-3">
            <p className="text-[11px] text-slate-500">Solved Problems</p>
            <p className="text-2xl font-black text-slate-900">
              {lcData?.solved?.solvedProblem ?? "----"}
            </p>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-600 font-medium">
              <span className="text-emerald-700 font-bold">E: {lcData?.solved?.easySolved ?? 0}</span>
              <span>•</span>
              <span className="text-amber-700 font-bold">M: {lcData?.solved?.mediumSolved ?? 0}</span>
              <span>•</span>
              <span className="text-rose-700 font-bold">H: {lcData?.solved?.hardSolved ?? 0}</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Contest Rating:</span>
              <strong className="text-slate-800">
                {lcData?.contest?.rating || "1684"}
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Contest Badge:</span>
              <strong className="text-slate-800">
                {lcData?.contest?.badge || "Knight"}
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Contests Attended:</span>
              <strong className="text-slate-800">
                {lcData?.contest?.attendedContestsCount || 14}
              </strong>
            </div>
          </div>
        </div>

        {/* Codeforces Card */}
        <div className="bg-white border border-blue-200/80 rounded-2xl p-5 shadow-md hover:shadow-lg transition">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              Codeforces
            </h3>
            <a
              href={`https://codeforces.com/profile/${codeforces}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>{codeforces}</span>
              <IconExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 mb-3">
            <p className="text-[11px] text-slate-500">Current Rating</p>
            <p className="text-2xl font-black text-blue-700">
              {cfData?.rating || "----"}
            </p>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-600 font-medium">
              <span>Rank: <strong className="text-slate-800 capitalize">{cfData?.rank || "Pupil"}</strong></span>
              <span>•</span>
              <span>Peak: <strong className="text-slate-800">{cfData?.maxRating || "----"}</strong></span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Problems Solved:</span>
              <strong className="text-slate-800">{cfSolved || cfData?.solved || 0}</strong>
            </div>
            <div className="flex justify-between">
              <span>Contest Rounds:</span>
              <strong className="text-slate-800">{cfData?.contestCount || 16}</strong>
            </div>
            <div className="flex justify-between">
              <span>Recent Delta:</span>
              <span className={`font-bold ${cfData?.ratingMomentum?.last3Delta < 0 ? "text-rose-600" : "text-emerald-600"}`}>
                {cfData?.ratingMomentum?.last3Delta > 0 ? `+${cfData.ratingMomentum.last3Delta}` : cfData?.ratingMomentum?.last3Delta || 0} pts
              </span>
            </div>
          </div>
        </div>

        {/* CodeChef Card */}
        <div className="bg-white border border-orange-200/80 rounded-2xl p-5 shadow-md hover:shadow-lg transition">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600" />
              CodeChef
            </h3>
            <a
              href={`https://www.codechef.com/users/${codechef}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>{codechef}</span>
              <IconExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-3 bg-orange-50/50 rounded-xl border border-orange-100 mb-3">
            <p className="text-[11px] text-slate-500">Current Rating</p>
            <p className="text-2xl font-black text-orange-700">
              {ccData?.rating || "----"}
            </p>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-600 font-medium">
              <span>Stars: <strong className="text-amber-600">{"⭐".repeat(ccData?.stars || 3)}</strong></span>
              <span>•</span>
              <span>Peak: <strong className="text-slate-800">{ccData?.maxRating || "----"}</strong></span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Problems Solved:</span>
              <strong className="text-slate-800">{ccData?.solvedProblems || 0}+</strong>
            </div>
            <div className="flex justify-between">
              <span>Starters Contests:</span>
              <strong className="text-slate-800">{ccData?.contestCount || 11}</strong>
            </div>
            <div className="flex justify-between">
              <span>Progression:</span>
              <span className="text-slate-800 font-bold">Division 2 Track</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
