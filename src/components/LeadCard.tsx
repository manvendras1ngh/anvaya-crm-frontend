import type { Lead } from "../utils/types";
import { cn } from "../lib/utils";

interface LeadCardProps {
  lead: Lead;
}

const statusColors = {
  New: "bg-blue-100 text-blue-800",
  Contacted: "bg-yellow-100 text-yellow-800",
  Qualified: "bg-green-100 text-green-800",
  "Proposal Sent": "bg-purple-100 text-purple-800",
  Closed: "bg-gray-100 text-gray-800",
};

const priorityColors = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
};

export function LeadCard({ lead }: LeadCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium text-gray-900">{lead.name}</h3>
        <div className="flex gap-2">
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
              priorityColors[lead.priority]
            )}
          >
            {lead.priority}
          </span>
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
              statusColors[lead.status]
            )}
          >
            {lead.status.replace("-", " ")}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="font-medium">Sales Agent:</span>
          <span>{lead.salesAgent}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Lead Source:</span>
          <span className="capitalize">{lead.source.replace("-", " ")}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Time to Close:</span>
          <span>{lead.timeToClose} Days</span>
        </div>
        {lead.email && (
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{lead.email}</span>
          </div>
        )}
        {lead.phone && (
          <div className="flex justify-between">
            <span className="font-medium">Phone:</span>
            <span>{lead.phone}</span>
          </div>
        )}
        {lead.company && (
          <div className="flex justify-between">
            <span className="font-medium">Company:</span>
            <span>{lead.company}</span>
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
        Created: {lead.createdAt.toLocaleDateString()}
      </div>
    </div>
  );
}
