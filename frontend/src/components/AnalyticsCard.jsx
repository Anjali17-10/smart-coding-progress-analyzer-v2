export default function AnalyticsCard({
  cfData,
  cfSolved,
  history,
  ccData,
}) {
  const contests = history.length;

  return (
    <div className="mt-8 bg-slate-900 text-white rounded-2xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold mb-8">
        Analytics
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <p className="text-slate-400">
            🏆 Codeforces Rank
          </p>

          <p className="text-2xl font-bold">
            {cfData?.rank || "----"}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            ⭐ Codeforces Max Rating
          </p>

          <p className="text-2xl font-bold">
            {cfData?.maxRating || "----"}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            ✅ Codeforces Problems
          </p>

          <p className="text-2xl font-bold">
            {cfSolved || 0}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            🎯 Codeforces Contests
          </p>

          <p className="text-2xl font-bold">
            {contests}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            🍛 CodeChef Rating
          </p>

          <p className="text-2xl font-bold">
            {ccData?.rating || "----"}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            ⭐ CodeChef Stars
          </p>

          <p className="text-2xl font-bold">
            {ccData?.stars || "----"}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            ✅ CodeChef Problems
          </p>

          <p className="text-2xl font-bold">
            {ccData?.solvedProblems || 0}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            🚀 CodeChef Max Rating
          </p>

          <p className="text-2xl font-bold">
            {ccData?.maxRating || "----"}
          </p>
        </div>

      </div>
    </div>
  );
}