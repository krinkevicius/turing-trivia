import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserStoreProvider } from '@/store/userStore'
import { GameStoreProvider } from '@/store/gameStore'
import ErrorBoundary from '@/components/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserStoreProvider>
      <GameStoreProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </GameStoreProvider>
    </UserStoreProvider>
  </React.StrictMode>,
)
