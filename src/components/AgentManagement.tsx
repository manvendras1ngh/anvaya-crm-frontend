import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LeadCard } from "./LeadCard";
import { AgentLeadFilter } from "./AgentLeadFilter";
import type { AgentLeadFilterState } from "./AgentLeadFilter";
import useDataContext from "@/contexts/DataContext";
import { User, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AgentManagement() {
  const { leadsData, salesAgentData } = useDataContext();
  const params = useParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<AgentLeadFilterState>({
    status: "all",
    priority: "all",
    sortBy: "none",
    sortOrder: "asc",
  });

  // Find the agent by ID
  const agentData = salesAgentData.find((agent) => agent.id === params.id);

  // Get leads assigned to this agent
  const agentLeads = useMemo(() => {
    if (!agentData) return [];
    return leadsData.filter((lead) => lead.salesAgent === agentData.name);
  }, [leadsData, agentData]);

  // Apply filters and sorting
  const filteredAndSortedLeads = useMemo(() => {
    let filtered = agentLeads;

    // Apply filters
    if (filters.status !== "all") {
      filtered = filtered.filter((lead) => lead.status === filters.status);
    }

    if (filters.priority !== "all") {
      filtered = filtered.filter((lead) => lead.priority === filters.priority);
    }

    // Apply sorting
    if (filters.sortBy === "timeToClose") {
      filtered = [...filtered].sort((a, b) => {
        if (filters.sortOrder === "asc") {
          return a.timeToClose - b.timeToClose;
        } else {
          return b.timeToClose - a.timeToClose;
        }
      });
    }

    return filtered;
  }, [agentLeads, filters]);

  // Calculate agent stats
  const agentStats = useMemo(() => {
    if (!agentData) return null;

    const totalLeads = agentLeads.length;
    const newLeads = agentLeads.filter((lead) => lead.status === "new").length;
    const activeLeads = agentLeads.filter(
      (lead) => lead.status !== "closed"
    ).length;
    const closedLeads = agentLeads.filter(
      (lead) => lead.status === "closed"
    ).length;

    return {
      totalLeads,
      newLeads,
      activeLeads,
      closedLeads,
      conversionRate:
        totalLeads > 0 ? Math.round((closedLeads / totalLeads) * 100) : 0,
    };
  }, [agentData, agentLeads]);

  if (!agentData) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Agent Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The requested agent could not be found.
          </p>
          <Button onClick={() => navigate("/sales")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sales Team
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate("/agents")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sales Team
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Agent Management</h1>
      </div>

      {/* Agent Details Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {agentData.name}
              </h2>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <Mail className="h-4 w-4" />
                <span>{agentData.email}</span>
              </div>
              {agentData.createdAt && (
                <p className="text-sm text-gray-500 mt-1">
                  Joined {agentData.createdAt.toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {/* Agent Performance Stats */}
          {/* {agentStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {agentStats.totalLeads}
                </p>
                <p className="text-sm text-gray-500">Total Leads</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {agentStats.activeLeads}
                </p>
                <p className="text-sm text-gray-500">Active</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {agentStats.closedLeads}
                </p>
                <p className="text-sm text-gray-500">Closed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {agentStats.conversionRate}%
                </p>
                <p className="text-sm text-gray-500">Conversion</p>
              </div>
            </div>
          )} */}
        </div>
      </div>

      {/* Lead Filters */}
      <AgentLeadFilter filters={filters} onFiltersChange={setFilters} />

      {/* Leads Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Assigned Leads ({filteredAndSortedLeads.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedLeads.map((lead) => (
            <div onClick={() => navigate(`/lead/${lead.id}`)} key={lead.id}>
              <LeadCard lead={lead} />
            </div>
          ))}
        </div>

        {filteredAndSortedLeads.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {agentLeads.length === 0
              ? "No leads assigned to this agent yet."
              : "No leads found for the selected filters."}
          </div>
        )}
      </div>
    </div>
  );
}
