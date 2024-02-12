import { SafeArea } from './safe-area'
import { create } from 'zustand'

export function Provider({ children }: { children: React.ReactNode }) {
  return <SafeArea>{children}</SafeArea>
}

export const useLogin = create<{
  isLogin: boolean
  setIsLogin: (boolean) => void
}>((set) => ({
  isLogin: false,
  setIsLogin: (login) => set(() => ({ isLogin: login })),
}))
