import {
  CardHistory,
  CardScrollHistory,
  MobileNavigation,
} from 'app/components'
import { useScrollY } from 'app/hooks'
import { useGlobalState } from 'app/provider'
import { Platform, ScrollView, View } from 'react-native'

const Cart = () => {
  const { dataCart } = useGlobalState()
  const { handleScroll, scrollY } = useScrollY()

  return (
    <View className="relative flex-1 bg-purple-500">
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
          {/* <View className=" h-[400px] overflow-hidden rounded-md object-cover  p-8 lg:h-[80%]  lg:w-1/2">
            <Text>Cart</Text>
          </View> */}
          <CardScrollHistory isProductsPending={false} products={dataCart} />
          <CardHistory isPending={false} products={dataCart} />
        </View>
      </ScrollView>
    </View>
  )
}

export default Cart
