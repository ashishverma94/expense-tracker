import {
  Add,
  Receipt,
  TrendingUp,
  CalendarMonth,
  AccountBalanceWallet,
} from "@mui/icons-material";
import {
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
} from "@/api/expense";
import { Expense } from "@/data/data";
import { Button } from "@mui/material";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import PieChart from "@/components/PieChart";
import { Chart, registerables } from "chart.js";
import LineChart from "@/components/LiineChart";
import { useTheme } from "@/context/ThemeContext";
import { fmt, monthLabel } from "@/utils/functions";
import { useState, useMemo, useEffect } from "react";
import DeleteDialog from "@/components/DeleteDialog";
import ExpenseDialog from "@/components/ExpenseDialog";
import { CATEGORIES, CATEGORY_COLORS } from "@/utils/list";
import ExpenseHistoryTable from "@/components/ExpenseHistoryTable";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";

Chart.register(...registerables);

type ExpenseForm = Pick<
  Expense,
  "title" | "amount" | "category" | "notes" | "expenseDate"
>;

export default function DashboardPage() {
  const { resolved } = useTheme();
  const isDark = resolved === "dark";
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Expense | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Expense | null>(null);

  const totalExpenses = useMemo(
    () => expenses?.reduce((s, e) => s + e.amount, 0),
    [expenses],
  );

  const now = new Date();

  const thisMonthTotal = useMemo(
    () =>
      expenses
        ?.filter((e) => {
          const d = new Date(e.expenseDate);
          return (
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
          );
        })
        .reduce((s, e) => s + e.amount, 0),
    [expenses],
  );

  const lastMonthTotal = useMemo(() => {
    const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return expenses
      ?.filter((e) => {
        const d = new Date(e.expenseDate);
        return (
          d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear()
        );
      })
      .reduce((s, e) => s + e.amount, 0);
  }, [expenses]);

  const trend: "up" | "down" | null =
    thisMonthTotal > lastMonthTotal
      ? "up"
      : thisMonthTotal < lastMonthTotal
        ? "down"
        : null;

  const monthCount = new Set(expenses?.map((e) => monthLabel(e.expenseDate)))
    .size;

  const recent5 = [...expenses]
    ?.sort(
      (a, b) =>
        new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime(),
    )
    .slice(0, 5);

  const handleSave = async (expense: ExpenseForm) => {
    try {
      if (editTarget?._id) {
        const updated = await updateExpense(editTarget._id, expense);
        setExpenses((prev) =>
          prev.map((e) => (e._id === updated._id ? updated : e)),
        );
      } else {
        const created = await createExpense(expense);
        setExpenses((prev) => [created, ...prev]);
      }
      setEditTarget(null);
      setAddOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?._id) return;
    try {
      await deleteExpense(deleteTarget._id);
      setExpenses((prev) => prev.filter((e) => e._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const card = `rounded-2xl p-5 ${isDark ? "bg-white/[0.04] border border-white/[0.07]" : "bg-white border border-black/[0.07]"}`;
  const shadow = isDark
    ? "0 4px 24px rgba(0,0,0,0.3)"
    : "0 4px 20px rgba(0,0,0,0.06)";

  return (
    <div
      className={`min-h-screen font-sans ${isDark ? "bg-[#0a0f0a]" : "bg-green-50"}`}
    >
      <Navbar setAddOpen={setAddOpen} />

      {loading ? (
        <DashboardSkeleton isDark={isDark} />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
          <div className="flex flex-row items-center justify-between">
            <div>
              <h1
                className={`text-2xl font-bold tracking-tight ${isDark ? "text-gray-50" : "text-gray-900"}`}
              >
                Dashboard
              </h1>
              <p
                className={`text-sm mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Overview of your spending
              </p>
            </div>
            <Button
              startIcon={<Add />}
              onClick={() => setAddOpen(true)}
              size="small"
              variant="contained"
              sx={{
                ml: 1,
                textTransform: "none",
                borderRadius: "10px",
                background: "#22c55e",
                "&:hover": { background: "#16a34a" },
                fontWeight: 600,
                fontSize: "0.8rem",
                px: 2,
                height: 32,
                display: { xs: "flex", sm: "none" },
              }}
            >
              Add
            </Button>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              label="Total Spent"
              value={fmt(totalExpenses)}
              icon={<AccountBalanceWallet sx={{ fontSize: 17 }} />}
              isDark={isDark}
            />
            <StatCard
              label="This Month"
              value={fmt(thisMonthTotal)}
              icon={<CalendarMonth sx={{ fontSize: 17 }} />}
              trend={trend}
              isDark={isDark}
            />
            <StatCard
              label="Transactions"
              value={`${expenses.length}`}
              icon={<Receipt sx={{ fontSize: 17 }} />}
              isDark={isDark}
            />
            <StatCard
              label="Monthly Avg"
              value={fmt(totalExpenses / Math.max(1, monthCount))}
              icon={<TrendingUp sx={{ fontSize: 17 }} />}
              sub="across all months"
              isDark={isDark}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div
              className={`${card} lg:col-span-3`}
              style={{ boxShadow: shadow }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2
                    className={`text-sm font-semibold ${isDark ? "text-gray-50" : "text-gray-900"}`}
                  >
                    Monthly Trend
                  </h2>
                  <p
                    className={`text-xs mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  >
                    Spending over time
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span
                    className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  >
                    Monthly
                  </span>
                </div>
              </div>
              <div className="h-56">
                <LineChart data={expenses} isDark={isDark} />
              </div>
            </div>

            <div
              className={`${card} lg:col-span-2`}
              style={{ boxShadow: shadow }}
            >
              <h2
                className={`text-sm font-semibold mb-1 ${isDark ? "text-gray-50" : "text-gray-900"}`}
              >
                By Category
              </h2>
              <p
                className={`text-xs mb-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                Where money goes
              </p>
              <div className="h-56">
                <PieChart data={expenses} isDark={isDark} />
              </div>
            </div>
          </div>

          {/* Recent + Category bars */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div
              className={`${card} lg:col-span-2`}
              style={{ boxShadow: shadow }}
            >
              <h2
                className={`text-sm font-semibold mb-4 ${isDark ? "text-gray-50" : "text-gray-900"}`}
              >
                Recent Transactions
              </h2>
              <div className="space-y-1.5">
                {recent5.map((e) => (
                  <div
                    key={e._id}
                    className={`flex items-center justify-between py-2 px-3 rounded-xl ${
                      isDark ? "bg-white/[0.03]" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                        style={{
                          background: CATEGORY_COLORS[e.category] || "#94a3b8",
                        }}
                      >
                        {e.category.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${isDark ? "text-gray-100" : "text-gray-800"}`}
                        >
                          {e.title}
                        </p>
                        <p
                          className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
                        >
                          {e.category} ·{" "}
                          {new Date(e.expenseDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-red-500 flex-shrink-0 ml-2">
                      -{fmt(e.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={card} style={{ boxShadow: shadow }}>
              <h2
                className={`text-sm font-semibold mb-4 ${isDark ? "text-gray-50" : "text-gray-900"}`}
              >
                Category Summary
              </h2>
              <div className="space-y-3">
                {CATEGORIES.map((cat) => {
                  const total = expenses
                    .filter((e) => e.category === cat)
                    .reduce((s, e) => s + e.amount, 0);
                  if (!total) return null;
                  const pct = Math.round((total / totalExpenses) * 100);
                  return (
                    <div key={cat}>
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
                        >
                          {cat}
                        </span>
                        <span
                          className={`text-xs font-semibold ${isDark ? "text-gray-200" : "text-gray-700"}`}
                        >
                          {fmt(total)}
                        </span>
                      </div>
                      <div
                        className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-white/[0.08]" : "bg-gray-100"}`}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            background: CATEGORY_COLORS[cat],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <ExpenseHistoryTable
            expenses={expenses}
            setEditTarget={setEditTarget}
            setDeleteTarget={setDeleteTarget}
          />
        </main>
      )}

      <ExpenseDialog
        open={addOpen || !!editTarget}
        onClose={() => {
          setAddOpen(false);
          setEditTarget(null);
        }}
        initial={editTarget}
        onSave={handleSave}
        isDark={isDark}
      />
      <DeleteDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={deleteTarget?.title ?? ""}
        isDark={isDark}
      />
    </div>
  );
}
