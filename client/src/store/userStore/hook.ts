import { UserStoreContext } from '@/store/userStore'
import type { UserState } from '@/types'
import { useContext } from 'react'
import { useStoreWithEqualityFn } from 'zustand/traditional'

export const useUserStoreContext = <T>(selector: (state: UserState) => T): T => {
  const userStoreContext = useContext(UserStoreContext)

  if (!userStoreContext) {
    throw new Error('useUserStoreContext must be used within UserStoreProvider')
  }

  return useStoreWithEqualityFn(userStoreContext, selector)
}
