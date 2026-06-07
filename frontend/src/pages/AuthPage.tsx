import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tab, Tabs, useTheme as useMuiTheme } from '@mui/material'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import ThemeToggle from '../components/ThemeToggle'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'

export default function AuthPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { resolved } = useTheme()
  const muiTheme = useMuiTheme()
  const [tab, setTab] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const isDark = resolved === 'dark'

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  const handleTabChange = (_: React.SyntheticEvent, newVal: number) => {
    setTab(newVal)
    setAnimKey((k) => k + 1)
  }

  return (
    <div
      className="noise-overlay min-h-screen bg-bg flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Theme toggle — top right */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Ambient blobs */}
      <div
        className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C17D3C 0%, transparent 70%)', opacity: isDark ? 0.1 : 0.07 }}
      />
      <div
        className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6B3D10 0%, transparent 70%)', opacity: isDark ? 0.08 : 0.05 }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-[420px] rounded-2xl overflow-hidden"
        style={{
          background: isDark ? 'rgba(20,20,20,0.88)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(24px)',
          border: `1px solid var(--color-border)`,
          boxShadow: isDark
            ? '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)'
            : '0 24px 60px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)',
        }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
              <span className="font-display text-white text-sm font-bold">A</span>
            </div>
            <span className="font-display text-xl tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              AuthApp
            </span>
          </div>
          <p className="text-sm mt-2 font-body" style={{ color: 'var(--color-text-muted)' }}>
            {tab === 0 ? 'Welcome back — sign in to continue.' : 'Create your account to get started.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="px-8 pt-5">
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              minHeight: 36,
              '& .MuiTabs-indicator': { backgroundColor: '#C17D3C', height: 2, borderRadius: 2 },
              '& .MuiTab-root': {
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.8125rem',
                fontWeight: 500,
                textTransform: 'none',
                letterSpacing: '0.04em',
                color: muiTheme.palette.text.secondary,
                minHeight: 36,
                padding: '6px 12px',
                '&.Mui-selected': { color: muiTheme.palette.text.primary },
              },
            }}
          >
            <Tab label="Sign in" disableRipple />
            <Tab label="Create account" disableRipple />
          </Tabs>
        </div>

        {/* Form panels */}
        <div className="px-8 py-6">
          <div key={animKey} style={{ animation: 'slideIn 0.3s ease forwards' }}>
            {tab === 0 ? <LoginForm /> : <SignupForm />}
          </div>
        </div>

        {/* Footer toggle */}
        <div className="px-8 pb-6 text-center">
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {tab === 0 ? "Don't have an account? " : 'Already have an account? '}
            <button
              className="text-accent hover:text-accent-light transition-colors underline underline-offset-2 font-medium"
              onClick={() => handleTabChange({} as React.SyntheticEvent, tab === 0 ? 1 : 0)}
            >
              {tab === 0 ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
