import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function RatingHistoryChart({
  cfHistory,
  ccHistory,
}) {

  const maxLength = Math.max(
    cfHistory.length,
    ccHistory.length
  );

  const data = [];

  for (let i = 0; i < maxLength; i++) {
    data.push({
      contest: i + 1,

      codeforces:
        cfHistory[i]?.newRating ??
        cfHistory[i]?.rating ??
        null,

      codechef:
        ccHistory[i]
          ? Number(ccHistory[i].rating)
          : null,
    });
  }

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Rating History
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="contest" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="codeforces"
            stroke="#2563eb"
            strokeWidth={3}
            dot={false}
            name="Codeforces"
          />

          <Line
            type="monotone"
            dataKey="codechef"
            stroke="#ea580c"
            strokeWidth={3}
            dot={false}
            name="CodeChef"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}