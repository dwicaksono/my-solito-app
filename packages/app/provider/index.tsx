import { QueryProvider } from './QueryProvider'
import { SafeArea } from './safe-area'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { clearCart } from 'app/api'

interface initialStateStore {
  isLogin: boolean
  dataCart: any[] | []
  totalCart: number
  setIsLogin: (login: boolean) => void
  addCart: (product: any) => void
  removeCart: (product: any) => void
  decreaseItem: (id: number | string) => void
  increaseItem: (id: number | string) => void
  clearPersistedData: () => void
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

export const useGlobalState = create<initialStateStore>()(
  persist(
    (set) => ({
      isLogin: false,
      dataCart: [],
      totalCart: 0,
      setIsLogin: (login) => {
        set(() => ({ isLogin: login }))
      },
      addCart: (product) => {
        set((state) => {
          const itemExists = state.dataCart.find(
            (item) => item.id === product.id,
          )

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
      increaseItem: (id: number | string) => {
        set((state) => {
          const increaseData = state.dataCart.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                qty: item.qty + 1,
                subPrice: item.subPrice + item.price,
                totalCart: state.totalCart + 1,
              }
            }
            return item
          })
          return { dataCart: increaseData, totalCart: state.totalCart + 1 }
        })
      },
      decreaseItem: (id: number | string) => {
        set((state) => {
          const decreaseData = state.dataCart.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                qty: item.qty - 1,
                subPrice:
                  item.subPrice <= item.price
                    ? item.price
                    : item.subPrice - item.price,
              }
            }
            return item
          })
          return { dataCart: decreaseData, totalCart: state.totalCart - 1 }
        })
      },
      removeCart: (product) => {
        set((state) => ({
          dataCart: state.dataCart.filter((item) => item.id !== product.id),
          totalCart: state.totalCart - product.qty,
        }))
      },
      clearPersistedData: () => {
        clearCart()
        set({ dataCart: [], totalCart: 0 })
      },
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
