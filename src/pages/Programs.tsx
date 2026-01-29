import { useState } from "react";
import { mockPrograms, Program } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Plus,
  Music,
  BookOpen,
  Heart,
  Megaphone,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, typeof Music> = {
  worship: Music,
  discipleship: BookOpen,
  fellowship: Heart,
  outreach: Megaphone,
  leadership: Crown,
};

const categoryColors: Record<string, string> = {
  worship: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  discipleship: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  fellowship: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  outreach: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  leadership: "bg-chart-5/10 text-chart-5 border-chart-5/20",
};

const Programs = () => {
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredPrograms = mockPrograms.filter(
    (program) => categoryFilter === "all" || program.category === categoryFilter
  );

  const activePrograms = mockPrograms.filter((p) => p.isActive);
  const totalParticipants = mockPrograms.reduce((sum, p) => sum + p.participantCount, 0);
  const avgEngagement = Math.round(
    mockPrograms.reduce((sum, p) => sum + p.engagementScore, 0) / mockPrograms.length
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="page-header mb-0">
          <h1 className="page-title">Programs & Activities</h1>
          <p className="page-description">
            Track and manage youth ministry programs
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Program
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activePrograms.length}</p>
                <p className="text-sm text-muted-foreground">Active Programs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <Users className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalParticipants}</p>
                <p className="text-sm text-muted-foreground">Total Participants</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgEngagement}%</p>
                <p className="text-sm text-muted-foreground">Avg Engagement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="worship">Worship</SelectItem>
            <SelectItem value="discipleship">Discipleship</SelectItem>
            <SelectItem value="fellowship">Fellowship</SelectItem>
            <SelectItem value="outreach">Outreach</SelectItem>
            <SelectItem value="leadership">Leadership</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Showing {filteredPrograms.length} programs
        </p>
      </div>

      {/* Program Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => {
          const Icon = categoryIcons[program.category] || Calendar;
          return (
            <Card key={program.id} className="group hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "p-2 rounded-lg border",
                        categoryColors[program.category]
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <Badge variant="outline" className="mt-1 capitalize">
                        {program.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge
                    variant={program.isActive ? "default" : "secondary"}
                    className={
                      program.isActive
                        ? "bg-success/10 text-success border-success/20"
                        : ""
                    }
                  >
                    {program.isActive ? "Active" : "Past"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="line-clamp-2">
                  {program.description}
                </CardDescription>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{program.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>
                      {program.participantCount}
                      {program.maxCapacity && ` / ${program.maxCapacity}`} participants
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Engagement Score</span>
                    <span className="font-medium">{program.engagementScore}%</span>
                  </div>
                  <Progress value={program.engagementScore} className="h-2" />
                </div>

                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Programs;
