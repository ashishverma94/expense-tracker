import { Skeleton } from "@mui/material";

function ChartCardSkeleton({
  isDark,
  height = "h-56",
  className = "",
}: {
  isDark: boolean;
  height?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl p-5 ${className} ${
        isDark
          ? "bg-white/[0.04] border border-white/[0.07]"
          : "bg-white border border-black/[0.07]"
      }`}
    >
      <Skeleton variant="text" width={120} height={16} />
      <Skeleton variant="text" width={90} height={12} />
      <Skeleton variant="rounded" className={height} />
    </div>
  );
}

export default ChartCardSkeleton;
