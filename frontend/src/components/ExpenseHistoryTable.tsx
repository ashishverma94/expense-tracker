import { Expense } from "@/data/data";
import { fmt } from "@/utils/functions";
import { useTheme } from "@/context/ThemeContext";
import { CATEGORIES, CATEGORY_COLORS } from "@/utils/list";
import { useState, useMemo, Dispatch, SetStateAction } from "react";
import { IconButton, Tooltip, Chip, TablePagination } from "@mui/material";
import { Edit, Close, Delete, Search, FilterList } from "@mui/icons-material";

interface ExpenseTableProps {
  expenses: Expense[];
  setEditTarget: Dispatch<SetStateAction<Expense | null>>;
  setDeleteTarget: Dispatch<SetStateAction<Expense | null>>;
}

const ExpenseHistoryTable = ({
  expenses,
  setEditTarget,
  setDeleteTarget,
}: ExpenseTableProps) => {
  const { resolved } = useTheme();

  const isDark = resolved === "dark";

  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [sortField, setSortField] = useState<"expenseDate" | "amount">(
    "expenseDate",
  );
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const ROWS = 5;

  const filtered = useMemo(() => {
    let list = [...expenses];
    if (filterCat !== "All")
      list = list.filter((e) => e.category === filterCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q),
      );
    }
    list.sort((a, b) => {
      const va =
        sortField === "amount" ? a.amount : new Date(a.expenseDate).getTime();
      const vb =
        sortField === "amount" ? b.amount : new Date(b.expenseDate).getTime();
      return sortDir === "asc" ? va - vb : vb - va;
    });
    return list;
  }, [expenses, filterCat, search, sortField, sortDir]);

  const paginated = filtered.slice(page * ROWS, page * ROWS + ROWS);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const shadow = isDark
    ? "0 4px 24px rgba(0,0,0,0.3)"
    : "0 4px 20px rgba(0,0,0,0.06)";
  const divider = isDark ? "border-white/[0.07]" : "border-black/[0.07]";

  return (
    <div
      className={`rounded-2xl overflow-hidden ${
        isDark
          ? "bg-white/[0.04] border border-white/[0.07]"
          : "bg-white border border-black/[0.07]"
      }`}
      style={{ boxShadow: shadow }}
    >
      <div
        className={`flex flex-col sm:flex-row sm:items-center gap-3 p-5 border-b ${divider}`}
      >
        <div className="flex-1">
          <h2
            className={`text-sm font-semibold ${isDark ? "text-gray-50" : "text-gray-900"}`}
          >
            Expense History
          </h2>
          <p
            className={`text-xs mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            {filtered.length} records
          </p>
        </div>

        <div
          className={`flex items-center gap-2 px-3 h-9 rounded-xl flex-1 max-w-xs border ${
            isDark
              ? "bg-white/[0.05] border-white/[0.08]"
              : "bg-gray-50 border-black/[0.08]"
          }`}
        >
          <Search
            sx={{ fontSize: 14, color: isDark ? "#6b7280" : "#9ca3af" }}
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            placeholder="Search..."
            className={`flex-1 bg-transparent min-h-10 outline-none text-sm ${isDark ? "text-gray-100 placeholder:text-gray-600" : "text-gray-800 placeholder:text-gray-400"}`}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className={isDark ? "text-gray-500" : "text-gray-400"}
            >
              <Close sx={{ fontSize: 13 }} />
            </button>
          )}
        </div>

        <div
          className={`flex items-center gap-2 px-3 h-9 rounded-xl border ${
            isDark
              ? "bg-white/[0.05] border-white/[0.08]"
              : "bg-gray-50 border-black/[0.08]"
          }`}
        >
          <FilterList
            sx={{ fontSize: 14, color: isDark ? "#6b7280" : "#9ca3af" }}
          />
          <select
            value={filterCat}
            onChange={(e) => {
              setFilterCat(e.target.value);
              setPage(0);
            }}
            className={`bg-transparent outline-none text-sm cursor-pointer ${isDark ? "text-gray-100" : "text-gray-800"}`}
          >
            <option
              value="All"
              style={{ background: isDark ? "#1a1a1a" : "#fff" }}
            >
              All
            </option>
            {CATEGORIES.map((c) => (
              <option
                key={c}
                value={c}
                style={{ background: isDark ? "#1a1a1a" : "#fff" }}
              >
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table
          className="w-full text-sm"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr className={isDark ? "bg-white/[0.03]" : "bg-gray-50/60"}>
              {[
                { label: "Title", field: null, cls: "pl-5 text-left" },
                { label: "Category", field: null, cls: "text-left" },
                {
                  label: "Date",
                  field: "expenseDate" as const,
                  cls: "hidden sm:table-cell text-left",
                },
                {
                  label: "Amount",
                  field: "amount" as const,
                  cls: "text-right",
                },
                { label: "Actions", field: null, cls: "pr-4" },
              ].map(({ label, field, cls }) => (
                <th
                  key={label || "act"}
                  onClick={() => field && toggleSort(field)}
                  className={`py-3 px-3 text-xs font-semibold uppercase tracking-wide ${cls} ${
                    isDark ? "text-gray-600" : "text-gray-400"
                  } ${field ? "cursor-pointer select-none" : ""}`}
                >
                  <span className="inline-flex items-center gap-1">
                    {label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className={`py-12 text-center text-sm ${isDark ? "text-gray-600" : "text-gray-400"}`}
                >
                  No expenses found.
                </td>
              </tr>
            ) : (
              paginated.map((e, i) => (
                <tr
                  key={e._id}
                  className={`group transition-colors ${i > 0 ? `border-t ${divider}` : ""} ${
                    isDark ? "hover:bg-white/[0.02]" : "hover:bg-gray-50/70"
                  }`}
                >
                  <td className="py-3 pl-5 pr-3">
                    <p
                      className={`font-medium truncate max-w-[150px] ${isDark ? "text-gray-100" : "text-gray-800"}`}
                    >
                      {e.title}
                    </p>
                    {e.notes && (
                      <p
                        className={`text-xs truncate max-w-[150px] ${isDark ? "text-gray-500" : "text-gray-400"}`}
                      >
                        {e.notes}
                      </p>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <Chip
                      label={e.category}
                      size="small"
                      sx={{
                        fontSize: "0.7rem",
                        height: 22,
                        background: `${CATEGORY_COLORS[e.category] || "#94a3b8"}20`,
                        color: CATEGORY_COLORS[e.category] || "#94a3b8",
                        border: `1px solid ${CATEGORY_COLORS[e.category] || "#94a3b8"}40`,
                      }}
                    />
                  </td>
                  <td
                    className={`py-3 px-3 hidden sm:table-cell text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {new Date(e.expenseDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-3 text-right font-semibold text-red-500">
                    {fmt(e.amount)}
                  </td>
                  <td className="py-3 pr-4 pl-2">
                    <div className="flex items-center justify-center gap-0.5">
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => setEditTarget(e)}
                          sx={{
                            color: isDark ? "#6b7280" : "#9ca3af",
                            "&:hover": {
                              color: "#22c55e",
                              background: "rgba(34,197,94,0.1)",
                            },
                            borderRadius: "8px",
                            p: "4px",
                          }}
                        >
                          <Edit sx={{ fontSize: 15 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => setDeleteTarget(e)}
                          sx={{
                            color: isDark ? "#6b7280" : "#9ca3af",
                            "&:hover": {
                              color: "#ef4444",
                              background: "rgba(239,68,68,0.1)",
                            },
                            borderRadius: "8px",
                            p: "4px",
                          }}
                        >
                          <Delete sx={{ fontSize: 15 }} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination — no rows-per-page selector */}
      <div className={`border-t ${divider}`}>
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          rowsPerPage={ROWS}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPageOptions={[]}
          sx={{ color: isDark ? "#9ca3af" : "#6b7280" }}
        />
      </div>
    </div>
  );
};

export default ExpenseHistoryTable;
