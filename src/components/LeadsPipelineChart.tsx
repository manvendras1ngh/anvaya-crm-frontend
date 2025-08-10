import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import type { ChartConfiguration } from "chart.js/auto";
import { reportApi } from "@/services/api";

export function LeadsPipelineChart() {
  const [pipeline, setPipeline] = useState<Record<string, number>>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const fetchLeadsInPipeline = async () => {
    try {
      const totalLeads = await reportApi.getTotalLeadsInPipeline();
      setPipeline(totalLeads);
    } catch (error) {
      console.error("Error getting leads in pipeline");
    }
  };

  useEffect(() => {
    fetchLeadsInPipeline();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !pipeline) return;

    const labels = ["Closed", "Non Closed"];
    const data = Object.values(pipeline);

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
  }, [pipeline]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="h-90">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
