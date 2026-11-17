import { IconSparkles, IconRefresh } from "./Icons";

export default function InputForm({
  leetcode,
  setLeetcode,
  codeforces,
  setCodeforces,
  codechef,
  setCodechef,
  onAnalyze,
  loading,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-800">
            Multi-Platform Developer Accounts
          </h2>
          <p className="text-xs text-slate-500">
            Connect LeetCode, Codeforces, and CodeChef handles to analyze progress
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {/* LeetCode Handle */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            LeetCode Username
          </label>
          <input
            type="text"
            value={leetcode}
            onChange={(e) => setLeetcode(e.target.value)}
            placeholder="e.g. anjali_17_10"
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
          />
        </div>

        {/* Codeforces Handle */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            Codeforces Handle
          </label>
          <input
            type="text"
            value={codeforces}
            onChange={(e) => setCodeforces(e.target.value)}
            placeholder="e.g. Anjali021"
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>

        {/* CodeChef Handle */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-600" />
            CodeChef Username
          </label>
          <input
            type="text"
            value={codechef}
            onChange={(e) => setCodechef(e.target.value)}
            placeholder="e.g. sane_ring_4"
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          />
        </div>
      </div>

      <div className="mt-5">
        <button
          onClick={onAnalyze}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${
            loading
              ? "bg-slate-400 text-white cursor-not-allowed"
              : "bg-slate-900 hover:bg-slate-800 text-white hover:scale-[1.01] hover:shadow-xl"
          }`}
        >
          {loading ? (
            <>
              <IconRefresh className="w-4 h-4 animate-spin text-white" />
              <span>Analyzing Cross-Platform Data & Training Models...</span>
            </>
          ) : (
            <>
              <IconSparkles className="w-4 h-4 text-yellow-300" />
              <span>Run Intelligent Analytics & AI Diagnostics</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
