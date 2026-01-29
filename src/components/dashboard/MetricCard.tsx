import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    label: string;
  };
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  trend = "neutral",
  className,
}: MetricCardProps) {
  return (
    <div className={cn("metric-card group", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="stat-label">{title}</p>
          <p className="stat-value">{value}</p>
          {change && (
            <p
              className={cn(
                "text-sm font-medium flex items-center gap-1",
                trend === "up" && "text-success",
                trend === "down" && "text-destructive",
                trend === "neutral" && "text-muted-foreground"
              )}
            >
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {change.value > 0 ? "+" : ""}
              {change.value}% {change.label}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
