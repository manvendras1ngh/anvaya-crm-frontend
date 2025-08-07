import { useNavigate } from "react-router-dom";
import type { SalesAgent } from "@/utils/types";
import { User, Mail } from "lucide-react";

interface SalesAgentCardProps {
  agent: SalesAgent;
}

export function SalesAgentCard({ agent }: SalesAgentCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/agent/${agent.id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{agent.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Mail className="h-4 w-4" />
            <span>{agent.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}