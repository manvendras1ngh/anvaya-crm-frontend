import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, SortAsc, SortDesc, X } from "lucide-react";
import type {
  LeadStatus,
  LeadPriority,
  LeadSource,
  SalesAgent,
} from "@/utils/types";
import { useLeadsQueryFilter } from "@/hooks/useLeadsQueryFilter";

export interface FilterState {
  priority: LeadPriority | "all";
  leadSource: LeadSource | "all";
  sortBy: "priority" | "timeToClose" | "none";
  sortOrder: "asc" | "desc";
}

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  salesAgents: SalesAgent[];
  availableTags: string[];
}

export function FilterBar({
  filters,
  onFiltersChange,
  salesAgents,
  availableTags,
}: FilterBarProps) {
  const { status, salesAgent, tags, setQueryFilter } = useLeadsQueryFilter();
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setQueryFilter({ status, salesAgent, tags: [...tags, tag] });
    }
  };

  const removeTag = (tag: string) => {
    setQueryFilter({
      status,
      salesAgent,
      tags: tags.filter((t) => t !== tag),
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      priority: "all",
      leadSource: "all",
      sortBy: "none",
      sortOrder: "asc",
    });
    setQueryFilter({ status: "all", salesAgent: "all", tags: [] });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (status !== "all") count++;
    if (filters.priority !== "all") count++;
    if (salesAgent !== "all") count++;
    if (filters.leadSource !== "all") count++;
    if (tags.length > 0) count++;
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
            variant={status === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setQueryFilter({ status: "all", salesAgent, tags })}
          >
            All
          </Button>
          <Button
            variant={status === "New" ? "default" : "outline"}
            size="sm"
            onClick={() => setQueryFilter({ status: "New", salesAgent, tags })}
          >
            New
          </Button>
          <Button
            variant={status === "Contacted" ? "default" : "outline"}
            size="sm"
            onClick={() =>
              setQueryFilter({
                status: "Contacted",
                salesAgent,
                tags,
              })
            }
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
            All Filters
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
              onClick={clearAllFilters}
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {isExpanded && (
        <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <Select
                value={status}
                onValueChange={(value) =>
                  setQueryFilter({
                    status: value as LeadStatus | "all",
                    salesAgent,
                    tags,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
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
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sales Agent Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Sales Agent
              </label>
              <Select
                value={salesAgent}
                onValueChange={(value) =>
                  setQueryFilter({ status, salesAgent: value, tags })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  {salesAgents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.name}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Lead Source Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Lead Source
              </label>
              <Select
                value={filters.leadSource}
                onValueChange={(value) => updateFilter("leadSource", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="Cold Call">Cold Call</SelectItem>
                  <SelectItem value="Advertisement">Advertisement</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Tags</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Button
                  key={tag}
                  variant={tags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    tags.includes(tag) ? removeTag(tag) : addTag(tag)
                  }
                  className="h-8"
                >
                  {tag}
                </Button>
              ))}
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-sm text-gray-500">Selected tags:</span>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md"
                  >
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-600"
                      onClick={() => removeTag(tag)}
                    />
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sorting */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                Sort by:
              </span>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => updateFilter("sortBy", value)}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Sorting</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
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
                  {filters.sortOrder === "asc" ? "Ascending" : "Descending"}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
