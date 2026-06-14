import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", solved: 3 },
  { day: "Tue", solved: 7 },
  { day: "Wed", solved: 5 },
  { day: "Thu", solved: 10 },
  { day: "Fri", solved: 6 },
  { day: "Sat", solved: 8 },
  { day: "Sun", solved: 4 },
];

export default function ConsistencyChart() {
  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Weekly Consistency
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="solved"
            stroke="#10b981"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}