import { useNavigate } from 'react-router-dom'
import { IconButton, Tooltip } from '@mui/material'
import { LogoutOutlined, GridViewOutlined } from '@mui/icons-material'
import { useAuth } from '../hooks/useAuth'
import ThemeToggle from '../components/ThemeToggle'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200"
      style={{ background: 'var(--color-bg)', color: 'var(--color-text-primary)' }}>

      {/* Topbar */}
      <header
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
            <span className="font-display text-white text-xs font-bold">A</span>
          </div>
          <span className="font-display text-lg tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            AuthApp
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user && (
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-1.5"
              style={{ background: 'var(--color-surface-subtle)', border: '1px solid var(--color-border)' }}
            >
              <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent text-xs font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-body" style={{ color: 'var(--color-text-secondary)' }}>
                {user.name}
              </span>
            </div>
          )}

          <Tooltip title="Logout">
            <IconButton
              onClick={handleLogout}
              size="small"
              sx={{
                color: 'var(--color-text-muted)',
                '&:hover': { color: 'var(--color-text-primary)' },
              }}
            >
              <LogoutOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
        <div className="text-center animate-fade-up">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{
              background: 'rgba(193,125,60,0.10)',
              border: '1px solid rgba(193,125,60,0.25)',
            }}
          >
            <GridViewOutlined sx={{ color: '#C17D3C', fontSize: 28 }} />
          </div>
          <h1 className="font-display text-3xl mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Dashboard
          </h1>
          <p className="text-sm max-w-xs mx-auto leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            You're authenticated! This is a protected route. Add your content here.
          </p>
        </div>

        {/* Placeholder cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-4">
          {['Users', 'Sessions', 'Analytics'].map((label, i) => (
            <div
              key={label}
              className="rounded-xl p-5 animate-fade-up transition-colors duration-200"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                animationDelay: `${0.1 * (i + 1)}s`,
              }}
            >
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>
                {label}
              </p>
              <p className="font-display text-2xl" style={{ color: 'var(--color-text-primary)' }}>—</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Data coming soon</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
