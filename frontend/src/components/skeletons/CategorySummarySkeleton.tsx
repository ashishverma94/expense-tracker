import { Skeleton } from "@mui/material";

function CategorySummarySkeleton({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`rounded-2xl p-5 ${
        isDark
          ? "bg-white/[0.04] border border-white/[0.07]"
          : "bg-white border border-black/[0.07]"
      }`}
    >
      <Skeleton variant="text" width={130} height={16} />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1.5">
              <Skeleton variant="text" width={60} height={12} />
              <Skeleton variant="text" width={50} height={12} />
            </div>
            <Skeleton variant="rounded" height={6} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySummarySkeleton
