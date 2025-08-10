import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import type { ChartConfiguration } from "chart.js/auto";
import type { Lead } from "../utils/types";
import useDataContext from "../contexts/DataContext";

interface LeadsDistributionByAgentChartProps {
  leads: Lead[];
}

export function LeadsDistributionByAgentChart({
  leads,
}: LeadsDistributionByAgentChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const { salesAgentData } = useDataContext();

  useEffect(() => {
    if (!canvasRef.current || salesAgentData.length === 0) return;

    // calculate leads count by sales agent
    const agentCounts = leads.reduce((acc, lead) => {
      acc[lead.salesAgent] = (acc[lead.salesAgent] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const allAgentCounts: Record<string, number> = {};
    salesAgentData.forEach((agent) => {
      allAgentCounts[agent.name] = agentCounts[agent.name] || 0;
    });

    const labels = Object.keys(allAgentCounts);
    const data = Object.values(allAgentCounts);
    const totalLeads = leads.length;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const backgroundColors = [
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
    ];

    const config: ChartConfiguration = {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            label: "Number of Leads",
            data,
            backgroundColor: backgroundColors,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Leads Distribution by Agent",
            font: {
              size: 16,
              weight: "bold",
            },
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.parsed;
                const percentage = ((value / totalLeads) * 100).toFixed(1);
                return `${label}: ${value} leads (${percentage}%)`;
              },
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
  }, [leads, salesAgentData]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="h-96">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
