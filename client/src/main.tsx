import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserStoreProvider } from '@/store/userStore'
import { GameStoreProvider } from '@/store/gameStore'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserStoreProvider>
      <GameStoreProvider>
        <App />
      </GameStoreProvider>
    </UserStoreProvider>
  </React.StrictMode>,
)
