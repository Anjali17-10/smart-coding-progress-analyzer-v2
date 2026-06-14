import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ProgressChart({
  cfData,
  cfSolved,
}) {

  const data = [
    {
      platform: "LeetCode",
      solved: 850,
    },
 {
  platform: "Codeforces",
  solved: cfSolved,
},
    {
      platform: "CodeChef",
      solved: 120,
    },
  ];

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Problems Solved by Platform
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="platform" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="solved"
            fill="#0f172a"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}