import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, SortAsc, SortDesc } from "lucide-react";
import type { LeadStatus, LeadPriority } from "@/utils/types";

export interface AgentLeadFilterState {
  status: LeadStatus | "all";
  priority: LeadPriority | "all";
  sortBy: "timeToClose" | "none";
  sortOrder: "asc" | "desc";
}

interface AgentLeadFilterProps {
  filters: AgentLeadFilterState;
  onFiltersChange: (filters: AgentLeadFilterState) => void;
}

export function AgentLeadFilter({
  filters,
  onFiltersChange,
}: AgentLeadFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof AgentLeadFilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      status: "all",
      priority: "all",
      sortBy: "none",
      sortOrder: "asc",
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.status !== "all") count++;
    if (filters.priority !== "all") count++;
    if (filters.sortBy !== "none") count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="space-y-4">
      {/* Quick Filters Row */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            Quick Filters:
          </span>
          <Button
            variant={filters.status === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilter("status", "all")}
          >
            All
          </Button>
          <Button
            variant={filters.status === "New" ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilter("status", "new")}
          >
            New
          </Button>
          <Button
            variant={filters.status === "Contacted" ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilter("status", "contacted")}
          >
            Contacted
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isExpanded ? "default" : "outline"}
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            More Filters
            {activeFiltersCount > 0 && (
              <span className="ml-1 h-5 w-5 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-red-600 hover:text-red-700"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Extended Filters Panel */}
      {isExpanded && (
        <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <Select
                value={filters.status}
                onValueChange={(value) => updateFilter("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal-sent">Proposal Sent</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Priority
              </label>
              <Select
                value={filters.priority}
                onValueChange={(value) => updateFilter("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sorting */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Sort by Time to Close
              </label>
              <div className="flex gap-2">
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => updateFilter("sortBy", value)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Sorting</SelectItem>
                    <SelectItem value="timeToClose">Time to Close</SelectItem>
                  </SelectContent>
                </Select>

                {filters.sortBy !== "none" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateFilter(
                        "sortOrder",
                        filters.sortOrder === "asc" ? "desc" : "asc"
                      )
                    }
                    className="flex items-center gap-2"
                  >
                    {filters.sortOrder === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
