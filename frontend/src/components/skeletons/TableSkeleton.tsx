import { Skeleton } from "@mui/material";

function TableSkeleton({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden ${
        isDark
          ? "bg-white/[0.04] border border-white/[0.07]"
          : "bg-white border border-black/[0.07]"
      }`}
    >
      <div
        className={`flex flex-col sm:flex-row sm:items-center gap-3 p-5 border-b ${
          isDark ? "border-white/[0.07]" : "border-black/[0.07]"
        }`}
      >
        <div className="flex-1">
          <Skeleton variant="text" width={130} height={16} />
          <Skeleton variant="text" width={70} height={12} />
        </div>
        <Skeleton variant="rounded" width={180} height={36} />
        <Skeleton variant="rounded" width={130} height={36} />
      </div>

      {/* Table header row */}
      <div
        className={`flex items-center gap-4 py-3 px-5 ${isDark ? "bg-white/[0.03]" : "bg-gray-50/60"}`}
      >
        {[140, 90, 100, 60, 40].map((w, i) => (
          <Skeleton key={i} variant="text" width={w} height={12} />
        ))}
      </div>

      {/* Table rows */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`flex items-center gap-4 py-3.5 px-5 border-t ${
            isDark ? "border-white/[0.04]" : "border-black/[0.04]"
          }`}
        >
          <div className="flex-1 min-w-0">
            <Skeleton
              variant="text"
              width={130}
              height={14}
              sx={{
                bgcolor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                borderRadius: 1,
              }}
            />
            <Skeleton
              variant="text"
              width={90}
              height={11}
              sx={{
                bgcolor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                borderRadius: 1,
                mt: 0.3,
              }}
            />
          </div>
          <Skeleton
            variant="rounded"
            width={72}
            height={22}
            sx={{
              bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
              borderRadius: "6px",
            }}
          />
          <Skeleton
            variant="text"
            width={90}
            height={13}
            sx={{
              bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
              borderRadius: 1,
            }}
            className="hidden sm:block"
          />
          <Skeleton
            variant="text"
            width={65}
            height={14}
            sx={{
              bgcolor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
              borderRadius: 1,
              ml: "auto",
            }}
          />
        </div>
      ))}

      {/* Pagination bar */}
      <div
        className={`flex items-center justify-end gap-3 px-5 py-3 border-t ${isDark ? "border-white/[0.07]" : "border-black/[0.07]"}`}
      >
        <Skeleton
          variant="text"
          width={100}
          height={13}
          sx={{
            bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            borderRadius: 1,
          }}
        />
        <Skeleton
          variant="rounded"
          width={70}
          height={28}
          sx={{
            bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            borderRadius: "8px",
          }}
        />
      </div>
    </div>
  );
}

export default TableSkeleton;
