import type { LeadStats as LeadStatsType } from "../utils/types";

interface LeadStatsProps {
  stats: LeadStatsType;
}

export function LeadStats({ stats }: LeadStatsProps) {
  const statItems = [
    { label: "New", value: stats.New, color: "text-black-600" },
    { label: "Contacted", value: stats.Contacted, color: "text-black-600" },
    { label: "Qualified", value: stats.Qualified, color: "text-black-600" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Lead Status</h3>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
        {statItems.map((item) => (
          <div key={item.label} className="text-center">
            <div className={`text-2xl font-bold ${item.color}`}>
              {item.value}
            </div>
            <div className="text-sm text-gray-600">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
