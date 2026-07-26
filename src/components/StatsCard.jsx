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
  (cfSolved || 0);
  return (
    
    <div className="mt-8">

      {/* Summary Card */}
      <div className="mb-6 bg-slate-900 text-white rounded-2xl p-6 shadow-lg">
       <h2 className="text-3xl font-bold">
          Coding Progress Overview
        </h2>
       <p className="text-slate-400 mt-2">
  Last Updated: {lastUpdated}
</p>
     <div className="flex justify-between mt-6">
  <div>
    <p className="text-slate-300">Connected Platforms</p>
    <p className="text-3xl font-bold">3</p>
  </div>

  <div>
    <p className="text-slate-300">Total Solved</p>
   <p className="text-3xl font-bold">
        {totalSolved}
    </p>
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
  <a
    href={`https://leetcode.com/u/${leetcode}/`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:underline"
  >
    {leetcode}
  </a>
</p>

  <div className="mt-4">
    <p className="text-sm text-slate-500">
      Problems Solved
    </p>

    <p className="text-3xl font-bold">
      {lcData?.solved?.solvedProblem ?? "----"}
    </p>
  </div>

  <p>
    <span className="font-semibold">Easy:</span>{" "}
    {lcData?.solved?.easySolved ?? "----"}
  </p>

  <p>
    <span className="font-semibold">Medium:</span>{" "}
    {lcData?.solved?.mediumSolved ?? "----"}
  </p>

  <p>
    <span className="font-semibold">Hard:</span>{" "}
    {lcData?.solved?.hardSolved ?? "----"}
  </p>

  <p>
    <span className="font-semibold">Contest Rating:</span>{" "}
    ----
  </p>

  <p>
    <span className="font-semibold">Global Rank:</span>{" "}
    ----
  </p>
</div>
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-md hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
          <h2 className="font-bold text-lg mb-3">
            🔵 Codeforces
          </h2>

          <p>
            <span className="font-semibold">Handle:</span>{" "}
            <a
  href={`https://codeforces.com/profile/${codeforces}`}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 hover:underline"
>
  {codeforces}
</a>
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
            <a
  href={`https://www.codechef.com/users/${codechef}`}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 hover:underline"
>
  {codechef}
</a>
          </p>

         <p>
  <span className="font-semibold">Rating:</span>{" "}
  {ccData?.rating || "----"}
</p>

<p>
  <span className="font-semibold">Stars:</span>{" "}
  {ccData?.stars || "----"}⭐
</p>

<p>
  <span className="font-semibold">Solved:</span>{" "}
  {ccData?.solvedProblems || "----"}+
</p>

<p>
  <span className="font-semibold">Max Rating:</span>{" "}
  {ccData?.maxRating || "----"}
</p>
        </div>

      </div>
    </div>
  );
}