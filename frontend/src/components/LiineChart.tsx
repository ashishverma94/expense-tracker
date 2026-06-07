import { Chart } from "chart.js";
import { Expense } from "@/data/data";
import { useEffect, useRef } from "react";
import { monthLabel } from "@/utils/functions";

function LineChart({ data, isDark }: { data: Expense[]; isDark: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const chart = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const byMonth: Record<string, number> = {};
    data.forEach((e) => {
      const key = monthLabel(e.expenseDate);
      byMonth[key] = (byMonth[key] || 0) + e.amount;
    });
    const entries = Object.entries(byMonth).sort(
      (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime(),
    );

    const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
    const tickColor = isDark ? "#9ca3af" : "#6b7280";

    chart.current?.destroy();
    chart.current = new Chart(ref.current, {
      type: "line",
      data: {
        labels: entries.map(([k]) => k),
        datasets: [
          {
            label: "Monthly Spending",
            data: entries.map(([, v]) => v),
            borderColor: "#22c55e",
            backgroundColor: "rgba(34,197,94,0.1)",
            borderWidth: 2.5,
            pointBackgroundColor: "#22c55e",
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: tickColor, font: { family: "DM Sans", size: 11 } },
          },
          y: {
            grid: { color: gridColor },
            ticks: {
              color: tickColor,
              font: { family: "DM Sans", size: 11 },
              callback: (v) => `₹${Number(v).toLocaleString("en-IN")}`,
            },
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

export default LineChart;
