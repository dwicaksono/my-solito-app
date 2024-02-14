import { SolitoImageProvider } from 'solito/image'
import { QueryProvider } from './QueryProvider'
import { SafeArea } from './safe-area'
import { create } from 'zustand'

interface initialState {
  isLogin: boolean
  setIsLogin: (boolean) => void
  dataCart: any[]
  addCart: (cart) => void
  removeCart: (cart) => void
}

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <SafeArea>{children}</SafeArea>
    </QueryProvider>
  )
}

export const useGlobalState = create<initialState>((set) => ({
  isLogin: false,
  setIsLogin: (login) => {
    set(() => ({ isLogin: login }))
  },
  dataCart: [],
  addCart: (cart) => set((state) => ({ dataCart: [...state.dataCart, cart] })),
  removeCart: (cart) =>
    set((state) => ({
      dataCart: state.dataCart.filter((item) => item.id !== cart.id),
    })),
}))
