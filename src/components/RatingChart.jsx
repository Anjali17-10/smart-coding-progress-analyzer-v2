import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function RatingChart({
  cfData,
  lcData,
}) {

  const data = [
 {
  platform: "LeetCode",
  rating: Math.round(
    lcData?.contest?.contestRating || 0
  ),
},
    {
      platform: "Codeforces",
      rating: cfData?.rating || 0,
    },
    {
      platform: "CodeChef",
      rating: 1700,
    },
  ];

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Rating Comparison
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="platform" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="rating"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}