import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { engagementDistributionData } from "@/data/mockData";

const COLORS = [
  "hsl(var(--engaged))",
  "hsl(var(--at-risk))",
  "hsl(var(--disengaged))",
];

export function EngagementPieChart() {
  return (
    <div className="chart-container">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Engagement Status</h3>
        <p className="text-sm text-muted-foreground">Distribution of youth engagement levels</p>
      </div>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={engagementDistributionData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="count"
              nameKey="status"
              strokeWidth={0}
            >
              {engagementDistributionData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              formatter={(value: number, name: string) => [`${value} youth`, name]}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
