import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

function StreakChart({ habits }) {
  const data = habits.map((h) => ({
    name: h.name.length > 12 ? h.name.slice(0, 12) + "…" : h.name,
    streak: h.streak,
  }));

  return (
    <div className="chart-section">
      <p className="add-label">Streak chart</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }}label={{ value: "Habit", position: "insideBottom", offset: -5 }}/>
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }}label={{ value: "Streak", angle: -90, position: "insideLeft" }}/>
          <Tooltip />
          <Bar dataKey="streak" fill="#1a1a1a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StreakChart;