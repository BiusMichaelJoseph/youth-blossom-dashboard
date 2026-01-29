import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

interface DashboardFiltersProps {
  filters: {
    ageGroup: string;
    gender: string;
    ministry: string;
    timePeriod: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

export function DashboardFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: DashboardFiltersProps) {
  const hasActiveFilters = Object.values(filters).some((v) => v && v !== "all");

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-card rounded-xl border border-border">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      <Select value={filters.ageGroup} onValueChange={(v) => onFilterChange("ageGroup", v)}>
        <SelectTrigger className="w-[140px] h-9">
          <SelectValue placeholder="Age Group" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Ages</SelectItem>
          <SelectItem value="13-15">13-15</SelectItem>
          <SelectItem value="16-18">16-18</SelectItem>
          <SelectItem value="19-24">19-24</SelectItem>
          <SelectItem value="25-30">25-30</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.gender} onValueChange={(v) => onFilterChange("gender", v)}>
        <SelectTrigger className="w-[120px] h-9">
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genders</SelectItem>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.ministry} onValueChange={(v) => onFilterChange("ministry", v)}>
        <SelectTrigger className="w-[160px] h-9">
          <SelectValue placeholder="Ministry Area" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Ministries</SelectItem>
          <SelectItem value="worship">Worship</SelectItem>
          <SelectItem value="media">Media</SelectItem>
          <SelectItem value="outreach">Outreach</SelectItem>
          <SelectItem value="discipleship">Discipleship</SelectItem>
          <SelectItem value="children">Children's Ministry</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.timePeriod} onValueChange={(v) => onFilterChange("timePeriod", v)}>
        <SelectTrigger className="w-[140px] h-9">
          <SelectValue placeholder="Time Period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
          <SelectItem value="quarter">This Quarter</SelectItem>
          <SelectItem value="year">This Year</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="h-9 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
