import { mockYouths } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingDown } from "lucide-react";

export function RecentActivityFeed() {
  const atRiskYouths = mockYouths.filter((y) => y.engagementStatus === "at-risk").slice(0, 4);

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">At-Risk Youth</h3>
          <p className="text-sm text-muted-foreground">Members needing follow-up</p>
        </div>
        <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
          <AlertTriangle className="h-3 w-3 mr-1" />
          {atRiskYouths.length} flagged
        </Badge>
      </div>
      <div className="space-y-4">
        {atRiskYouths.map((youth) => (
          <div
            key={youth.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-warning/20 text-warning text-sm">
                {youth.firstName[0]}{youth.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground truncate">
                  {youth.firstName} {youth.lastName}
                </p>
                <Badge variant="outline" className="status-at-risk text-xs">
                  {youth.attendanceRate}% attendance
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {youth.notes || `Last seen ${youth.lastAttendance}`}
              </p>
              <div className="flex items-center gap-1 mt-1 text-xs text-warning">
                <TrendingDown className="h-3 w-3" />
                <span>Engagement score: {youth.engagementScore}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
