import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LeadStats as LeadStatsType } from "../utils/types";
import { LeadCard } from "./LeadCard";
import { LeadStats } from "./LeadStats";
import { AddLeadForm } from "./AddLeadForm";
import useDataContext from "@/contexts/DataContext";
import { FilterBar } from "./FilterBar";
import type { FilterState } from "./FilterBar";

export function Dashboard() {
  const navigate = useNavigate();
  const { leadsData, loading, error } = useDataContext();

  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    priority: "all",
    salesAgent: "all",
    leadSource: "all",
    tags: [],
    sortBy: "none",
    sortOrder: "asc",
  });

  const filteredAndSortedLeads = useMemo(() => {
    let filtered = leadsData;

    // Apply filters
    if (filters.status !== "all") {
      filtered = filtered.filter((lead) => lead.status === filters.status);
    }

    if (filters.priority !== "all") {
      filtered = filtered.filter((lead) => lead.priority === filters.priority);
    }

    if (filters.salesAgent !== "all") {
      filtered = filtered.filter(
        (lead) => lead.salesAgent === filters.salesAgent
      );
    }

    if (filters.leadSource !== "all") {
      filtered = filtered.filter((lead) => lead.source === filters.leadSource);
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter(
        (lead) =>
          lead.tags && filters.tags.some((tag) => lead.tags!.includes(tag))
      );
    }

    // Apply sorting
    if (filters.sortBy !== "none") {
      filtered = [...filtered].sort((a, b) => {
        let aValue: any, bValue: any;

        if (filters.sortBy === "priority") {
          const priorityOrder = { High: 3, Medium: 2, Low: 1 } as const;
          aValue = priorityOrder[a.priority as keyof typeof priorityOrder];
          bValue = priorityOrder[b.priority as keyof typeof priorityOrder];
        } else if (filters.sortBy === "timeToClose") {
          aValue = a.timeToClose;
          bValue = b.timeToClose;
        }

        if (filters.sortOrder === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [leadsData, filters]);

  // Get unique sales agents and tags for filter options
  const salesAgents = useMemo(() => {
    return [...new Set(leadsData.map((lead) => lead.salesAgent))];
  }, [leadsData]);

  const availableTags = useMemo(() => {
    const tags = leadsData.flatMap((lead) => lead.tags || []);
    return [...new Set(tags)].filter((tag) => tag.trim() !== "");
  }, [leadsData]);

  // Calculate real stats from actual data
  const leadStats = useMemo((): LeadStatsType => {
    const stats = leadsData.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      New: stats["New"] || 0,
      Contacted: stats["Contacted"] || 0,
      Qualified: stats["Qualified"] || 0,
      "Proposal Sent": stats["Proposal Sent"] || 0,
      Closed: stats["Closed"] || 0,
    };
  }, [leadsData]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading leads...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-red-800 font-semibold">Error loading data</h2>
          <p className="text-red-600 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>

        <AddLeadForm />
      </div>

      <LeadStats stats={leadStats} />

      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
        salesAgents={salesAgents}
        availableTags={availableTags}
      />

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedLeads.map((lead) => (
            <div onClick={() => navigate(`/lead/${lead.id}`)} key={lead.id}>
              <LeadCard lead={lead} />
            </div>
          ))}
        </div>

        {filteredAndSortedLeads.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No leads found for the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}
