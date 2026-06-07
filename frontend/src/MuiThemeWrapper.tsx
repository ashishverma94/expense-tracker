import { ReactNode, useMemo } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import { useTheme } from './context/ThemeContext'

function buildMuiTheme(resolved: 'light' | 'dark') {
  const isDark = resolved === 'dark'
  return createTheme({
    palette: {
      mode: resolved,
      primary: {
        main: '#C17D3C',
        light: '#E09A56',
        dark: '#9E6230',
      },
      background: {
        default: isDark ? '#0D0D0D' : '#F7F5F2',
        paper: isDark ? '#141414' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#E8E0D5' : '#1A1410',
        secondary: isDark ? '#B0A898' : '#4A4540',
      },
      divider: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)',
    },
    typography: {
      fontFamily: '"DM Sans", sans-serif',
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.75rem',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.2s ease, color 0.2s ease',
          },
        },
      },
    },
  })
}

export default function MuiThemeWrapper({ children }: { children: ReactNode }) {
  const { resolved } = useTheme()
  const muiTheme = useMemo(() => buildMuiTheme(resolved), [resolved])
  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
}
