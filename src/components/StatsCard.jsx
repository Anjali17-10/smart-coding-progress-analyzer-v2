export default function StatsCard({
  leetcode,
  codeforces,
  codechef,
  cfData,
}) {
  return (
    <div className="mt-8">

      {/* Summary Card */}
      <div className="mb-6 bg-slate-900 text-white rounded-2xl p-6 shadow-lg">
       <h2 className="text-3xl font-bold">
          Coding Progress Overview
        </h2>

     <div className="flex justify-between mt-6">
  <div>
    <p className="text-slate-300">Connected Platforms</p>
    <p className="text-3xl font-bold">3</p>
  </div>

  <div>
    <p className="text-slate-300">Total Solved</p>
    <p className="text-3xl font-bold">----</p>
  </div>
</div>
      </div>

      {/* Platform Cards */}
    <div className="grid gap-6 md:grid-cols-3">

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 shadow-md hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
          <h2 className="font-bold text-lg mb-3">
            🟡 LeetCode
          </h2>

          <p>
            <span className="font-semibold">Username:</span>{" "}
            {leetcode}
          </p>

     <div className="mt-4">
  <p className="text-sm text-slate-500">Solved</p>
  <p className="text-3xl font-bold">----</p>
</div>
          <p>
            <span className="font-semibold">Rating:</span> ----
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-md hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
          <h2 className="font-bold text-lg mb-3">
            🔵 Codeforces
          </h2>

          <p>
            <span className="font-semibold">Handle:</span>{" "}
            {codeforces}
          </p>

<p>
  <span className="font-semibold">Rating:</span>{" "}
  {cfData?.rating || "----"}
</p>

<p>
  <span className="font-semibold">Rank:</span>{" "}
  {cfData?.rank || "----"}
</p>

<p>
  <span className="font-semibold">Max Rating:</span>{" "}
  {cfData?.maxRating || "----"}
</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 shadow-md hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
          <h2 className="font-bold text-lg mb-3">
            🟤 CodeChef
          </h2>

          <p>
            <span className="font-semibold">Username:</span>{" "}
            {codechef}
          </p>

          <p>
            <span className="font-semibold">Rating:</span> ----
          </p>

          <p>
            <span className="font-semibold">Stars:</span> ----
          </p>
        </div>

      </div>
    </div>
  );
}