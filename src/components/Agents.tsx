import { SalesAgentCard } from "./SalesAgentCard";
import { AddAgentForm } from "./AddAgentForm";
import useDataContext from "@/contexts/DataContext";

export function Agents() {
  const { salesAgentData } = useDataContext();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Sales Team</h1>
        <AddAgentForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {salesAgentData.map((agent) => (
          <SalesAgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      {salesAgentData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No sales agents found. Add your first team member to get started.
        </div>
      )}
    </div>
  );
}
