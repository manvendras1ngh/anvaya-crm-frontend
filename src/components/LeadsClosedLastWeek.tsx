import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import type { ChartConfiguration } from "chart.js/auto";
import { reportApi } from "@/services/api";

interface ClosedLeadData {
  id: string;
  name: string;
  salesAgent: string;
  closedAt: string;
}

export function LeadsClosedLastWeek() {
  const [closedLeads, setClosedLeads] = useState<ClosedLeadData[]>([]);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const fetchClosedLeads = async () => {
    try {
      setLoading(true);
      const res = await reportApi.getLeadsClosedLastWeek();
      setClosedLeads(res);
    } catch (error) {
      console.error("Error getting leads closed last week:", error);
      setClosedLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClosedLeads();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || loading) return;

    if (closedLeads.length === 0) {
      return;
    }

    // group leads by sales agent
    const agentCounts: Record<string, number> = {};
    closedLeads.forEach((lead) => {
      agentCounts[lead.salesAgent] = (agentCounts[lead.salesAgent] || 0) + 1;
    });

    const labels = Object.keys(agentCounts);
    const data = Object.values(agentCounts);
    const totalClosed = closedLeads.length;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const config: ChartConfiguration = {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Leads Closed",
            data,
            backgroundColor: [
              "#3B82F6", // Blue
              "#10B981", // Green
              "#F59E0B", // Yellow
              "#EF4444", // Red
              "#8B5CF6", // Purple
              "#F97316", // Orange
              "#06B6D4", // Cyan
              "#84CC16", // Lime
              "#EC4899", // Pink
              "#6B7280", // Gray
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Leads Closed Last Week: ${totalClosed} total`,
            font: {
              size: 16,
              weight: "bold",
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
            title: {
              display: true,
              text: "Number of Leads Closed",
            },
          },
          x: {
            title: {
              display: true,
              text: "Sales Agent",
            },
          },
        },
      },
    };

    chartRef.current = new Chart(canvasRef.current, config);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [closedLeads, loading]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="h-96 flex items-center justify-center">
          <p className="text-gray-600">Loading leads closed last week...</p>
        </div>
      </div>
    );
  }

  if (closedLeads.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="h-96 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No Leads Closed Last Week
            </h3>
            <p className="text-gray-600">
              No leads were closed in the past 7 days.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="h-96">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
