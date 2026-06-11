export default function StatsCard({
  leetcode,
  codeforces,
  codechef,
}) {
  return (
    <div className="mt-8 bg-slate-50 rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">
        User Information
      </h2>

      <div className="space-y-3">
        <p>
          <span className="font-semibold">LeetCode:</span>{" "}
          {leetcode || "Not provided"}
        </p>

        <p>
          <span className="font-semibold">Codeforces:</span>{" "}
          {codeforces || "Not provided"}
        </p>

        <p>
          <span className="font-semibold">CodeChef:</span>{" "}
          {codechef || "Not provided"}
        </p>
      </div>
    </div>
  );
}