import type { UserStore } from '@/store/userStore'
import { createContext } from 'react'

export const UserStoreContext = createContext<UserStore | null>(null)
