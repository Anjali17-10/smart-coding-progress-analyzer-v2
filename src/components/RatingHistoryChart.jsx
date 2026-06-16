
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function RatingHistoryChart({ history }) {

  const data = history.map((contest) => ({
    contest: contest.contestName,
    rating: contest.newRating,
  }));

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Codeforces Rating History
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis hide />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="rating"
            stroke="#2563eb"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}