import { formatRupiah } from 'app/api'
import { Scroll } from 'app/design/view'
import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { SolitoImage } from 'solito/image'
import { Pressable } from 'react-native'
import { useGlobalState } from 'app/provider'

const CardScrollHistory = ({ isProductsPending, products }) => {
  const { addCart } = useGlobalState()
  return (
    <Scroll className=" flex-1 px-8 lg:h-[400px] ">
      {!isProductsPending &&
        products.length > 0 &&
        products.map((product) => (
          <View
            className="mt-4 flex-1 border-b border-gray-400/40 p-4 lg:rounded-lg lg:border"
            key={product.id}
          >
            <View className="flex flex-row gap-3">
              <View className="relative h-32 w-32 overflow-hidden rounded-md border border-gray-400/40 object-cover p-8">
                <SolitoImage
                  contentFit="cover"
                  contentPosition="top center"
                  src={product.image}
                  fill
                  alt="A cool artist's image."
                />
              </View>
              <View className=" flex-1 flex-col justify-between">
                <Text className="line-clamp-2 w-36  whitespace-pre-wrap lg:w-64 ">
                  {product.title}
                </Text>
                <View className="gap-2">
                  <Text className="w-36 whitespace-pre-wrap text-right text-lg font-semibold ">
                    {formatRupiah(product.price)}
                  </Text>
                  <Pressable onPress={() => addCart(product)}>
                    <View className="rounded-md bg-orange-400 p-2   shadow-md">
                      <Text className="text-center font-semibold text-white">
                        Beli Lagi
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        ))}
    </Scroll>
  )
}

export default CardScrollHistory
