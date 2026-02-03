import { useState, useMemo } from "react";
import { Search, Filter, Plus, Grid, List, AlertTriangle, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockYouths as initialYouths, Youth } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { YouthProfileSheet } from "@/components/directory/YouthProfileSheet";
import { AddYouthDialog } from "@/components/directory/AddYouthDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

const YouthDirectory = () => {
  const [youths, setYouths] = useState<Youth[]>(initialYouths);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [engagementFilter, setEngagementFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedYouth, setSelectedYouth] = useState<Youth | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredYouths = useMemo(() => {
    return youths.filter((youth) => {
      const matchesSearch =
        youth.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        youth.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        youth.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || youth.status === statusFilter;
      const matchesAge = ageFilter === "all" || youth.ageGroup === ageFilter;
      const matchesEngagement =
        engagementFilter === "all" || youth.engagementStatus === engagementFilter;
      return matchesSearch && matchesStatus && matchesAge && matchesEngagement;
    });
  }, [youths, searchQuery, statusFilter, ageFilter, engagementFilter]);

  const handleAddYouth = (newYouth: Partial<Youth>) => {
    setYouths((prev) => [...prev, newYouth as Youth]);
  };

  const handleExport = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Age Group", "Status", "Education", "Occupation", "Engagement"].join(","),
      ...youths.map((y) =>
        [
          `${y.firstName} ${y.lastName}`,
          y.email,
          y.phone,
          y.ageGroup,
          y.status,
          y.educationStatus,
          y.occupation || "N/A",
          y.engagementStatus,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "youth_directory.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    toast({
      title: "Export Complete",
      description: `Exported ${youths.length} youth records to CSV.`,
    });
  };

  const getEngagementBadge = (status: string) => {
    const styles = {
      engaged: "status-engaged",
      "at-risk": "status-at-risk",
      disengaged: "status-disengaged",
    };
    return styles[status as keyof typeof styles] || "";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="page-header mb-0">
          <h1 className="page-title">Youth Directory</h1>
          <p className="page-description">
            Manage and view all registered youth members
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Youth
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={ageFilter} onValueChange={setAgeFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Age" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ages</SelectItem>
              <SelectItem value="13-15">13-15</SelectItem>
              <SelectItem value="16-18">16-18</SelectItem>
              <SelectItem value="19-24">19-24</SelectItem>
              <SelectItem value="25-30">25-30</SelectItem>
            </SelectContent>
          </Select>
          <Select value={engagementFilter} onValueChange={setEngagementFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Engagement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="engaged">Engaged</SelectItem>
              <SelectItem value="at-risk">At Risk</SelectItem>
              <SelectItem value="disengaged">Disengaged</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center border rounded-lg p-0.5 bg-muted/50">
            <Button
              variant={viewMode === "table" ? "secondary" : "ghost"}
              size="sm"
              className="h-8 px-2"
              onClick={() => setViewMode("table")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              className="h-8 px-2"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredYouths.length} of {youths.length} youth members
      </p>

      {/* Table View */}
      {viewMode === "table" && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[250px]">Name</TableHead>
                <TableHead>Age Group</TableHead>
                <TableHead>Small Group</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredYouths.map((youth) => (
                <TableRow
                  key={youth.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedYouth(youth)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback
                          className={cn(
                            "text-sm font-medium",
                            youth.engagementStatus === "engaged" && "bg-success/20 text-success",
                            youth.engagementStatus === "at-risk" && "bg-warning/20 text-warning",
                            youth.engagementStatus === "disengaged" && "bg-destructive/20 text-destructive"
                          )}
                        >
                          {youth.firstName[0]}{youth.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {youth.firstName} {youth.lastName}
                          </p>
                          {youth.engagementStatus === "at-risk" && (
                            <Tooltip>
                              <TooltipTrigger>
                                <AlertTriangle className="h-4 w-4 text-warning" />
                              </TooltipTrigger>
                              <TooltipContent>Needs follow-up</TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{youth.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{youth.ageGroup}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {youth.smallGroup || "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            youth.attendanceRate >= 80 && "bg-success",
                            youth.attendanceRate >= 50 && youth.attendanceRate < 80 && "bg-warning",
                            youth.attendanceRate < 50 && "bg-destructive"
                          )}
                          style={{ width: `${youth.attendanceRate}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{youth.attendanceRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getEngagementBadge(youth.engagementStatus)}>
                      {youth.engagementStatus.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={youth.status === "active" ? "default" : "secondary"}
                      className={youth.status === "active" ? "bg-success/10 text-success border-success/20" : ""}
                    >
                      {youth.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedYouth(youth);
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredYouths.map((youth) => (
            <div
              key={youth.id}
              className="p-4 rounded-xl border border-border bg-card hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedYouth(youth)}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback
                    className={cn(
                      "text-sm font-medium",
                      youth.engagementStatus === "engaged" && "bg-success/20 text-success",
                      youth.engagementStatus === "at-risk" && "bg-warning/20 text-warning",
                      youth.engagementStatus === "disengaged" && "bg-destructive/20 text-destructive"
                    )}
                  >
                    {youth.firstName[0]}{youth.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">
                      {youth.firstName} {youth.lastName}
                    </p>
                    {youth.engagementStatus === "at-risk" && (
                      <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{youth.ageGroup}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Attendance</span>
                  <span className="font-medium">{youth.attendanceRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={getEngagementBadge(youth.engagementStatus)}>
                    {youth.engagementStatus.replace("-", " ")}
                  </Badge>
                  <Badge
                    variant={youth.status === "active" ? "default" : "secondary"}
                    className={youth.status === "active" ? "bg-success/10 text-success border-success/20" : ""}
                  >
                    {youth.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Profile Sheet */}
      <YouthProfileSheet
        youth={selectedYouth}
        open={!!selectedYouth}
        onOpenChange={(open) => !open && setSelectedYouth(null)}
      />

      {/* Add Youth Dialog */}
      <AddYouthDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSave={handleAddYouth}
      />
    </div>
  );
};

export default YouthDirectory;
