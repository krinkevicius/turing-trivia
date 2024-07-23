import { UserStoreContext, createUserStore } from '@/store/userStore'
import type { UserStore } from '@/store/userStore'
import type { UserProviderProps } from '@/types'
import { useRef } from 'react'

export const UserStoreProvider = ({ children, ...props }: UserProviderProps) => {
  const storeRef = useRef<UserStore>()
  if (!storeRef.current) {
    storeRef.current = createUserStore(props)
  }
  return <UserStoreContext.Provider value={storeRef.current}>{children}</UserStoreContext.Provider>
}
