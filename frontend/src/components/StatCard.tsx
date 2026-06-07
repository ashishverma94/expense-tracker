import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

function StatCard({
  label,
  value,
  icon,
  sub,
  trend,
  isDark,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  sub?: string;
  trend?: "up" | "down" | null;
  isDark: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 flex flex-col gap-3 transition-transform hover:scale-[1.02] ${
        isDark
          ? "bg-white/[0.04] border border-white/[0.08]"
          : "bg-white border border-black/[0.07]"
      }`}
      style={{
        boxShadow: isDark
          ? "0 4px 24px rgba(0,0,0,0.3)"
          : "0 4px 20px rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-medium uppercase tracking-wide ${isDark ? "text-gray-500" : "text-gray-400"}`}
        >
          {label}
        </span>
        <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center text-green-500">
          {icon}
        </div>
      </div>
      <div>
        <div
          className={`text-2xl font-bold tracking-tight ${isDark ? "text-gray-50" : "text-gray-900"}`}
        >
          {value}
        </div>
        {sub && (
          <div className="flex items-center gap-1 mt-1">
            {trend === "up" && (
              <ArrowUpward sx={{ fontSize: 12, color: "#22c55e" }} />
            )}
            {trend === "down" && (
              <ArrowDownward sx={{ fontSize: 12, color: "#ef4444" }} />
            )}
            <span
              className="text-xs"
              style={{
                color:
                  trend === "up"
                    ? "#22c55e"
                    : trend === "down"
                      ? "#ef4444"
                      : isDark
                        ? "#6b7280"
                        : "#9ca3af",
              }}
            >
              {sub}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
