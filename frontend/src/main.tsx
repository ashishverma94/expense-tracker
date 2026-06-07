import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import MuiThemeWrapper from './MuiThemeWrapper'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MuiThemeWrapper>
          <CssBaseline />
          <AuthProvider>
            <App />
          </AuthProvider>
        </MuiThemeWrapper>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
