import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ConsistencyChart({ lcData }) {
  const data = [
    {
      difficulty: "Easy",
      solved: lcData?.solved?.easySolved || 0,
    },
    {
      difficulty: "Medium",
      solved: lcData?.solved?.mediumSolved || 0,
    },
    {
      difficulty: "Hard",
      solved: lcData?.solved?.hardSolved || 0,
    },
  ];

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        LeetCode Problem Distribution
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="difficulty" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="solved"
            fill="#10b981"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}