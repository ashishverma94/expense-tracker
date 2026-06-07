import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { IconButton, Tooltip, Button } from "@mui/material";
import { Add, LogoutOutlined, TrendingUp } from "@mui/icons-material";

const Navbar = ({ setAddOpen }: { setAddOpen: any }) => {
  const { resolved } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isDark = resolved === "dark";

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <header
      className={`sticky top-0 z-30 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 h-14 backdrop-blur-md border-b ${
        isDark
          ? "bg-[#0a0f0a]/80 border-white/[0.06]"
          : "bg-green-50/80 border-black/[0.06]"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-7 md:w-9 h-7 md:h-9 rounded-lg md:rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
          <TrendingUp sx={{ fontSize: 18, color: "#fff" }} />
        </div>
        <span
          className={`font-bold text-sm tracking-tight ${isDark ? "text-gray-50" : "text-gray-900"}`}
        >
          ExpenseTracker
        </span>
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        {user && (
          <div
            className={`hidden sm:flex items-center gap-2 rounded-lg px-3 py-1.5 ml-2 ${
              isDark
                ? "bg-white/[0.05] border border-white/[0.08]"
                : "bg-white border border-black/[0.08]"
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
              <span className="text-green-500 text-xs font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <span
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              {user.name}
            </span>
          </div>
        )}

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
            display: { xs: "none", sm: "flex" },
          }}
        >
          Add
        </Button>

        <Tooltip title="Logout">
          <IconButton
            onClick={handleLogout}
            size="small"
            sx={{ color: isDark ? "#6b7280" : "#9ca3af", ml: 0.5 }}
          >
            <LogoutOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </header>
  );
};

export default Navbar;
