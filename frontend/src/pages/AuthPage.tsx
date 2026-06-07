import { Tab, Tabs } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import { Search, Receipt, PieChart, TrendingUp } from "@mui/icons-material";

const FEATURES = [
  {
    icon: <Receipt sx={{ fontSize: 16 }} />,
    title: "Track Expenses",
    desc: "Log every rupee with category, date & notes.",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
  },
  {
    icon: <PieChart sx={{ fontSize: 16 }} />,
    title: "Visual Insights",
    desc: "Doughnut & line charts reveal where money goes.",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
  },
  {
    icon: <TrendingUp sx={{ fontSize: 16 }} />,
    title: "Monthly Trends",
    desc: "Compare spending patterns month over month.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
  },
  {
    icon: <Search sx={{ fontSize: 16 }} />,
    title: "Search & Filter",
    desc: "Find any expense instantly by title or category.",
    color: "#ec4899",
    bg: "rgba(236,72,153,0.12)",
  },
];

const STATS = [
  { value: "25+", label: "Categories" },
  { value: "100%", label: "Private" },
];

export default function AuthPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { resolved } = useTheme();
  const [tab, setTab] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const isDark = resolved === "dark";

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  const handleTabChange = (_: React.SyntheticEvent, newVal: number) => {
    setTab(newVal);
    setAnimKey((k) => k + 1);
  };

  const pageBg = isDark ? "#080d08" : "#f0fdf4";
  const heroBg = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.7)";
  const heroBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.9)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const formBg = isDark ? "rgba(15,20,15,0.92)" : "rgba(255,255,255,0.96)";
  const formBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textPrimary = isDark ? "#f0fdf4" : "#052e16";
  const textSecondary = isDark ? "#86efac" : "#166534";
  const textMuted = isDark ? "#6b7280" : "#9ca3af";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-2 lg:p-6 relative overflow-hidden"
      style={{ background: pageBg, fontFamily: "DM Sans, sans-serif" }}
    >
      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-6xl flex items-stretch gap-3">
        <div
          className="hidden lg:flex flex-1 rounded-2xl p-4 md:p-8 flex-col justify-between gap-8"
          style={{
            background: heroBg,
            border: `1px solid ${heroBorder}`,
            backdropFilter: "blur(20px)",
            boxShadow: isDark
              ? "0 20px 60px rgba(0,0,0,0.4)"
              : "0 20px 60px rgba(0,0,0,0.06)",
          }}
        >
          {/* Brand + headline */}
          <div>
            <div className="flex items-center gap-2.5 mb-7">
              <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                <TrendingUp sx={{ fontSize: 18, color: "#fff" }} />
              </div>
              <span
                className="font-bold text-sm tracking-widest uppercase"
                style={{ color: textSecondary }}
              >
                ExpenseTracker
              </span>
            </div>

            <h1
              className="text-4xl xl:text-5xl font-bold leading-tight tracking-tight mb-4"
              style={{ color: textPrimary }}
            >
              Take control of{" "}
              <span
                style={{
                  color: "#22c55e",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(34,197,94,0.35)",
                  textUnderlineOffset: "6px",
                }}
              >
                your money
              </span>
            </h1>

            <p
              className="text-sm leading-relaxed"
              style={{ color: textMuted, maxWidth: 380 }}
            >
              A clean, fast expense tracker built for individuals. Log,
              visualise, and understand your spending — all in one place, with
              zero complexity.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-7 mt-6">
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: textPrimary }}
                  >
                    {value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: textMuted }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature cards 2×2 */}
          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map(({ icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="rounded-xl p-4 flex gap-3 items-start transition-transform duration-200 hover:scale-[1.02]"
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  boxShadow: isDark
                    ? "0 2px 12px rgba(0,0,0,0.2)"
                    : "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: bg, color }}
                >
                  {icon}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold mb-0.5"
                    style={{ color: textPrimary }}
                  >
                    {title}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: textMuted }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="w-full lg:w-[420px] flex-shrink-0 rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: formBg,
            backdropFilter: "blur(28px)",
            border: `1px solid ${formBorder}`,
            boxShadow: isDark
              ? "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)"
              : "0 24px 60px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)",
          }}
        >
          <div
            className="px-7 pt-4 md:pt-7 pb-4 md:pb-5"
            style={{ borderBottom: `1px solid ${formBorder}` }}
          >
            <div className="flex items-center gap-2 md:gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                <TrendingUp sx={{ fontSize: 18, color: "#fff" }} />
              </div>
              <span
                className="font-bold text-xl tracking-tight"
                style={{ color: textPrimary }}
              >
                Get Started
              </span>
            </div>
            <p className="text-sm mt-2" style={{ color: textMuted }}>
              {tab === 0
                ? "Welcome back — sign in to continue."
                : "Create your account to get started."}
            </p>
          </div>

          <div
            className="lg:hidden mx-7 mt-5 rounded-xl p-4"
            style={{
              background: isDark
                ? "rgba(34,197,94,0.06)"
                : "rgba(34,197,94,0.05)",
              border: "1px solid rgba(34,197,94,0.15)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                <TrendingUp sx={{ fontSize: 13, color: "#fff" }} />
              </div>
              <span
                className="text-xs font-bold tracking-wide"
                style={{ color: textSecondary }}
              >
                EXPENSETRACKER
              </span>
            </div>
            <p
              className="text-xs leading-relaxed mb-3"
              style={{ color: textMuted }}
            >
              Log, visualise &amp; understand your spending — all in one place.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {FEATURES.map(({ icon, title, color, bg }) => (
                <div
                  key={title}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1"
                  style={{ background: bg, border: `1px solid ${color}30` }}
                >
                  <span style={{ color, display: "flex" }}>{icon}</span>
                  <span className="text-xs font-medium" style={{ color }}>
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="px-7 pt-3 md:pt-5">
            <Tabs
              value={tab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                minHeight: 36,
                "& .MuiTabs-indicator": {
                  backgroundColor: "#22c55e",
                  height: 2,
                  borderRadius: 2,
                },
                "& .MuiTab-root": {
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  textTransform: "none",
                  color: textMuted,
                  minHeight: 36,
                  padding: "6px 12px",
                  "&.Mui-selected": { color: textPrimary },
                },
              }}
            >
              <Tab label="Sign in" disableRipple />
              <Tab label="Create account" disableRipple />
            </Tabs>
          </div>

          {/* Form body */}
          <div className="p-4 md:p-6">
            <div
              key={animKey}
              style={{ animation: "slideIn 0.3s ease forwards" }}
            >
              {tab === 0 ? <LoginForm /> : <SignupForm />}
            </div>
          </div>

          <div className="px-7 pb-7 mt-auto text-center">
            <p className="text-xs" style={{ color: textMuted }}>
              {tab === 0
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                className="text-green-500 hover:text-green-400 transition-colors underline underline-offset-2 font-medium"
                onClick={() =>
                  handleTabChange({} as React.SyntheticEvent, tab === 0 ? 1 : 0)
                }
              >
                {tab === 0 ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
