import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import type { ChartConfiguration } from "chart.js/auto";
import type { Lead } from "../utils/types";

interface LeadsStatusDistributionChartProps {
  leads: Lead[];
}

export function LeadsStatusDistributionChart({
  leads,
}: LeadsStatusDistributionChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Calculate leads count by status
    const statusCounts = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(statusCounts);
    const data = Object.values(statusCounts);
    const totalLeads = leads.length;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const config: ChartConfiguration = {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Number of Leads",
            data,
            backgroundColor: [
              "#3B82F6", // Blue
              "#10B981", // Green
              "#F59E0B", // Yellow
              "#EF4444", // Red
              "#8B5CF6", // Purple
            ],
            borderColor: [
              "#2563EB",
              "#059669",
              "#D97706",
              "#DC2626",
              "#7C3AED",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Total Leads in Pipeline: ${totalLeads}`,
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
              text: "Number of Leads",
            },
          },
          x: {
            title: {
              display: true,
              text: "Lead Status",
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
  }, [leads]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="h-90">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
