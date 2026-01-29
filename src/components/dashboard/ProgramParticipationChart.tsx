import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { programParticipationData } from "@/data/mockData";

const categoryColors: Record<string, string> = {
  worship: "hsl(var(--chart-1))",
  discipleship: "hsl(var(--chart-2))",
  fellowship: "hsl(var(--chart-3))",
  outreach: "hsl(var(--chart-4))",
  leadership: "hsl(var(--chart-5))",
};

export function ProgramParticipationChart() {
  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Program Participation</h3>
          <p className="text-sm text-muted-foreground">Active participants by program</p>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={programParticipationData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              formatter={(value: number) => [`${value} participants`, "Participants"]}
            />
            <Bar dataKey="participants" radius={[0, 6, 6, 0]} barSize={32}>
              {programParticipationData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={categoryColors[entry.category] || "hsl(var(--chart-1))"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
