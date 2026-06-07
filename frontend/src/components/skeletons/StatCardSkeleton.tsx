import { Skeleton } from "@mui/material";

function StatCardSkeleton({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`rounded-2xl p-5 flex flex-col gap-3 ${
        isDark
          ? "bg-white/[0.04] border border-white/[0.07]"
          : "bg-white border border-black/[0.07]"
      }`}
    >
      <div className="flex items-center justify-between">
        <Skeleton variant="text" width={80} height={14} />
        <Skeleton variant="rounded" width={36} height={36} />
      </div>
      <div>
        <Skeleton variant="text" width={100} height={32} />
        <Skeleton variant="text" width={120} height={12} />
      </div>
    </div>
  );
}

export default StatCardSkeleton;
