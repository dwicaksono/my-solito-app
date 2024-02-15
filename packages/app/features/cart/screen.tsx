import { CardScrollHistory, Loading, MobileNavigation } from 'app/components'
import { useScrollY } from 'app/hooks'
import { useGlobalState } from 'app/provider'
import { Platform, ScrollView } from 'react-native'
import { Pressabled, View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { sumTotalPayment } from 'app/api'
import { useRouter } from 'solito/router'
import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'

const Cart = () => {
  const { dataCart, clearPersistedData } = useGlobalState()
  const { handleScroll } = useScrollY()
  const { push } = useRouter()
  const [isLoading, setLoading] = useState(false)
  const totalPrice = sumTotalPayment(dataCart)

  const handlerCheckout = () => {
    setLoading(true)
  }

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setLoading(false)
        Toast.show({
          type: 'success',
          text1: 'Checkout Success',
          topOffset: 100,
        })
        clearPersistedData()
        push('/')
      }, 1000)
    }
  }, [isLoading, push])

  if (dataCart.length === 0) {
    return (
      <View className="mt-32 flex-1 items-center justify-center">
        <Text>No Data</Text>
      </View>
    )
  }
  if (isLoading) {
    return <Loading />
  }
  return (
    <View className="relative flex-1 lg:mx-auto lg:h-screen lg:max-w-3xl">
      {Platform.OS !== 'web' && (
        <MobileNavigation
          totalCart={0}
          title="Keranjang Saya"
          isScroll={true}
          isCart
        />
      )}
      <ScrollView className="mt-32" onScroll={handleScroll}>
        <View className=" h-screen  lg:flex lg:flex-row">
          <CardScrollHistory
            isProductsPending={false}
            products={dataCart}
            isCart
          />
        </View>
      </ScrollView>
      <View className="fixed bottom-0 flex w-full flex-row items-center justify-between rounded-t-xl bg-orange-400 p-3 lg:max-w-3xl">
        <Text className="font-semibold text-white ">Total : {totalPrice}</Text>
        <Pressabled
          className="rounded-lg bg-white p-2"
          onPress={handlerCheckout}
        >
          <Text className="font-semibold">Checkout</Text>
        </Pressabled>
      </View>
    </View>
  )
}

export default Cart
