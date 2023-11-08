import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SocketContextProvider } from './contexts/SocketContext.tsx'
import { AlertContextProvider } from './contexts/AlertContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AlertContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AlertContextProvider>
  </React.StrictMode>,
)
