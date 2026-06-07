import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, IconButton } from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  PersonAddOutlined,
} from "@mui/icons-material";
import { useAuth } from "../hooks/useAuth";
import { useFormField } from "../hooks/useFormField";

export default function SignupForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const name = useFormField();
  const email = useFormField();
  const password = useFormField();

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");

    if (password.value.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      login(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Registration failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="form-group" style={{ animationDelay: "0.1s" }}>
        <label htmlFor="signup-name" className="auth-label">
          Full name
        </label>
        <input
          id="signup-name"
          type="text"
          className="auth-input"
          placeholder="Jane Doe"
          autoComplete="name"
          required
          {...name}
        />
      </div>

      <div className="form-group" style={{ animationDelay: "0.15s" }}>
        <label htmlFor="signup-email" className="auth-label">
          Email address
        </label>
        <input
          id="signup-email"
          type="email"
          className="auth-input"
          placeholder="you@example.com"
          autoComplete="email"
          required
          {...email}
        />
      </div>

      <div className="form-group" style={{ animationDelay: "0.2s" }}>
        <label htmlFor="signup-password" className="auth-label">
          Password
          <span
            className="ml-2 normal-case font-normal"
            style={{ color: "var(--color-text-muted)" }}
          >
            min. 6 chars
          </span>
        </label>
        <div className="relative">
          <input
            id="signup-password"
            type={showPass ? "text" : "password"}
            className="auth-input pr-10"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            {...password}
          />
          <IconButton
            size="small"
            onClick={() => setShowPass((p) => !p)}
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-text-muted)",
            }}
            tabIndex={-1}
          >
            {showPass ? (
              <VisibilityOff fontSize="small" />
            ) : (
              <Visibility fontSize="small" />
            )}
          </IconButton>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="auth-btn-primary mt-1 flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={16} sx={{ color: "white" }} />
        ) : (
          <>
            <PersonAddOutlined fontSize="small" />
            Create account
          </>
        )}
      </button>
    </form>
  );
}
