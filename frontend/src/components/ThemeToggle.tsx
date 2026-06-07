import { Tooltip } from '@mui/material'
import { LightModeOutlined, DarkModeOutlined, SettingsBrightnessOutlined } from '@mui/icons-material'
import { useTheme, ThemeMode } from '../hooks/useTheme'

const OPTIONS: { mode: ThemeMode; Icon: React.ElementType; label: string }[] = [
  { mode: 'light', Icon: LightModeOutlined, label: 'Light mode' },
  { mode: 'system', Icon: SettingsBrightnessOutlined, label: 'System theme' },
  { mode: 'dark', Icon: DarkModeOutlined, label: 'Dark mode' },
]

export default function ThemeToggle() {
  const { mode, setMode } = useTheme()

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-border bg-surface-subtle p-0.5">
      {OPTIONS.map(({ mode: m, Icon, label }) => {
        const active = mode === m
        return (
          <Tooltip key={m} title={label} placement="bottom">
            <button
              onClick={() => setMode(m)}
              aria-label={label}
              className={[
                'flex items-center justify-center w-7 h-7 rounded-md transition-all duration-200',
                active
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-hover',
              ].join(' ')}
            >
              <Icon sx={{ fontSize: 15 }} />
            </button>
          </Tooltip>
        )
      })}
    </div>
  )
}
