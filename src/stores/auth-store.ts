import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      immer((set) => ({
        user: null,
        isLoading: false,
        error: null,

        setUser: (user) =>
          set((state) => {
            state.user = user
            state.error = null
          }),

        setLoading: (isLoading) =>
          set((state) => {
            state.isLoading = isLoading
          }),

        setError: (error) =>
          set((state) => {
            state.error = error
          }),

        logout: () =>
          set((state) => {
            state.user = null
            state.error = null
          }),
      })),
      {
        name: 'auth-store',
        partialize: (state) => ({ user: state.user }),
      }
    ),
    {
      name: 'AuthStore',
    }
  )
)