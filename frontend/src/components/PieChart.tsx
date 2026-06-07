import { Chart } from "chart.js";
import { Expense } from "@/data/data";
import { fmt } from "@/utils/functions";
import { useEffect, useRef } from "react";
import { CATEGORY_COLORS } from "@/utils/list";

function PieChart({ data, isDark }: { data: Expense[]; isDark: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const chart = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const byCategory: Record<string, number> = {};
    data.forEach((e) => {
      byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
    });
    const labels = Object.keys(byCategory);
    const values = labels.map((l) => byCategory[l]);
    const colors = labels.map((l) => CATEGORY_COLORS[l] || "#94a3b8");

    chart.current?.destroy();
    chart.current = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors,
            borderColor: isDark ? "#111" : "#fff",
            borderWidth: 3,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: isDark ? "#9ca3af" : "#6b7280",
              font: { family: "DM Sans", size: 11 },
              padding: 14,
              boxWidth: 10,
              boxHeight: 10,
            },
          },
          tooltip: {
            callbacks: { label: (ctx) => ` ${ctx.label}: ${fmt(ctx.parsed)}` },
          },
        },
      },
    });
    return () => {
      chart.current?.destroy();
    };
  }, [data, isDark]);

  return <canvas ref={ref} />;
}

export default PieChart;
