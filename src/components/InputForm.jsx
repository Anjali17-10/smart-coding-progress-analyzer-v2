export default function InputForm({
  leetcode,
  setLeetcode,
  codeforces,
  setCodeforces,
  codechef,
  setCodechef,
  onAnalyze,
}) {
  return (
    <div className="mt-8 space-y-5">
      <div>
        <label className="block font-medium mb-2">
          🟡 LeetCode Username
        </label>
        <input
          type="text"
          value={leetcode}
          onChange={(e) => setLeetcode(e.target.value)}
          placeholder="anjali_17_10"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:shadow-xl transition-all duration-200"
        />
      </div>

      <div>
        <label className="block font-medium mb-2">
          🔵 Codeforces Handle
        </label>
        <input
          type="text"
          value={codeforces}
          onChange={(e) => setCodeforces(e.target.value)}
          placeholder="Anjali021"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-xl transition-all duration-200"
        />
      </div>

      <div>
        <label className="block font-medium mb-2">
          🟤 CodeChef Username
        </label>
        <input
          type="text"
          value={codechef}
          onChange={(e) => setCodechef(e.target.value)}
          placeholder="sane_ring_4"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:shadow-xl transition-all duration-200"
        />
      </div>

      <button
        onClick={onAnalyze}
        className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
      >
        Analyze Progress
      </button>
    </div>
  );
}