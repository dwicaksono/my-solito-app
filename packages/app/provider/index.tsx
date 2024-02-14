import { QueryProvider } from './QueryProvider'
import { SafeArea } from './safe-area'
import { create } from 'zustand'
import Toast from 'react-native-toast-message'

interface initialState {
  isLogin: boolean
  setIsLogin: (boolean) => void
  dataCart: any[] | []
  addCart: (product: any) => void
  removeCart: (product: any) => void
  totalCart: number
}

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <SafeArea>
        {children}
        <Toast />
      </SafeArea>
    </QueryProvider>
  )
}

export const useGlobalState = create<initialState>((set) => ({
  isLogin: false,
  setIsLogin: (login) => {
    set(() => ({ isLogin: login }))
  },
  dataCart: [],
  totalCart: 0,
  addCart: (product) => {
    set((state) => {
      const itemExists = state.dataCart.find((item) => item.id === product.id)

      if (itemExists) {
        const updatedData = state.dataCart.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              qty: item.qty + 1,
              subPrice: (item.qty + 1) * product.price,
            }
          }
          return item
        })

        return { dataCart: updatedData, totalCart: state.totalCart + 1 }
      } else {
        return {
          dataCart: [
            ...state.dataCart,
            { ...product, qty: 1, subPrice: product.price },
          ],
          totalCart: state.totalCart + 1,
        }
      }
    })
  },
  removeCart: (product) => {
    set((state) => ({
      dataCart: state.dataCart.filter((item) => item.id !== product.id),
    }))
  },
}))
