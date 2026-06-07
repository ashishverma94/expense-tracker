import { Skeleton } from "@mui/material";

function RecentSkeleton({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`rounded-2xl p-5 lg:col-span-2 ${
        isDark
          ? "bg-white/[0.04] border border-white/[0.07]"
          : "bg-white border border-black/[0.07]"
      }`}
    >
      <Skeleton variant="text" width={150} height={16} />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`flex items-center justify-between py-2 px-3 rounded-xl ${
              isDark ? "bg-white/[0.03]" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Skeleton variant="rounded" width={32} height={32} />
              <div>
                <Skeleton variant="text" width={120} height={14} />
                <Skeleton variant="text" width={80} height={11} />
              </div>
            </div>
            <Skeleton variant="text" width={60} height={14} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentSkeleton;
