import useDataContext from "@/contexts/DataContext";
import { LeadsPipelineChart } from "./LeadsPipelineChart";
import { LeadsStatusDistributionChart } from "./LeadsStatusDistributionChart";
import { LeadsDistributionByAgentChart } from "./LeadsDistributionByAgentChart";
import { LeadsClosedLastWeek } from "./LeadsClosedLastWeek";

export function Reports() {
  const { leadsData, loading, error } = useDataContext();

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports</h1>
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports</h1>
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-red-600">Error loading reports: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Closed Leads in Pipeline
          </h2>
          <LeadsPipelineChart />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Total Leads in Pipeline
          </h2>
          <LeadsStatusDistributionChart leads={leadsData} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Leads Distribution
          </h2>
          <LeadsDistributionByAgentChart leads={leadsData} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Leads Closed Last Week
          </h2>
          <LeadsClosedLastWeek />
        </div>
      </div>
    </div>
  );
}
