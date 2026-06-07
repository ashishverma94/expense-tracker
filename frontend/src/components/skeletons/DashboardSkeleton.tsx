import { Skeleton } from "@mui/material";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import RecentSkeleton from "@/components/skeletons/RecentSkleton";
import StatCardSkeleton from "@/components/skeletons/StatCardSkeleton";
import ChartCardSkeleton from "@/components/skeletons/ChartCardSkeleton";
import CategorySummarySkeleton from "@/components/skeletons/CategorySummarySkeleton";


function DashboardSkeleton({ isDark }: { isDark: boolean }) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      <div className="flex flex-row items-center justify-between">
        <div>
          <Skeleton
            variant="text"
            width={120}
            height={28}
            sx={{
              bgcolor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
              borderRadius: 1,
            }}
          />
          <Skeleton
            variant="text"
            width={180}
            height={16}
            sx={{
              bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              borderRadius: 1,
              mt: 0.5,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} isDark={isDark} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <ChartCardSkeleton isDark={isDark} className="lg:col-span-3" />
        <ChartCardSkeleton isDark={isDark} className="lg:col-span-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RecentSkeleton isDark={isDark} />
        <CategorySummarySkeleton isDark={isDark} />
      </div>

      <TableSkeleton isDark={isDark} />
    </main>
  );
}

export default DashboardSkeleton