export default function AnalyticsCard({
  cfData,
  cfSolved,
  history,
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
            🏆 Current Rank
          </p>

          <p className="text-2xl font-bold">
            {cfData?.rank}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            ⭐ Max Rating
          </p>

          <p className="text-2xl font-bold">
            {cfData?.maxRating}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            ✅ Problems Solved
          </p>

          <p className="text-2xl font-bold">
            {cfSolved}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            🎯 Contests Participated
          </p>

          <p className="text-2xl font-bold">
            {contests}
          </p>
        </div>

      </div>
    </div>
  );
}