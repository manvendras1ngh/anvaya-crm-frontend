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

    // Calculate closed and non-closed lead count
    const statusCounts = leads.reduce((acc, lead) => {
      if (lead.status === "Closed") {
        acc["Closed"] = (acc["Closed"] || 0) + 1;
      } else {
        acc["Non Closed"] = (acc["Non Closed"] || 0) + 1;
      }

      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(statusCounts);
    const data = Object.values(statusCounts);

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const config: ChartConfiguration = {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            label: "Total leads",
            data,
            backgroundColor: [
              "#FFC300", // yellow
              "#8B5CF6", // Blue
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Total closed and non-closed leads`,
            font: {
              size: 16,
              weight: "bold",
            },
          },
          legend: {
            display: false,
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
