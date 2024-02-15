import { formatRupiah } from 'app/api'
import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { SolitoImage } from 'solito/image'
import { Pressable } from 'react-native'
import { useGlobalState } from 'app/provider'
import { Link } from 'solito/link'

const CardHistory = ({ isPending, products }) => {
  const { addCart } = useGlobalState()
  return (
    <View className="grid gap-4 px-8 md:grid-cols-2 lg:grid-cols-3">
      {!isPending &&
        products.length > 0 &&
        products.map((product) => (
          <View
            className="flex flex-row gap-3 rounded-md border border-gray-400/40 p-4 shadow-md"
            key={product.id}
          >
            <Link href={`/product/${product.id}`}>
              <View className="relative h-32 w-32 overflow-hidden rounded-md  object-cover p-8">
                <SolitoImage
                  contentFit="cover"
                  contentPosition="top center"
                  src={product.image}
                  fill
                  alt="A cool artist's image."
                  sizes="100%"
                />
              </View>
            </Link>
            <View className="flex flex-1 flex-col flex-wrap justify-between overflow-hidden">
              <Text className="line-clamp-2 w-full ">{product.title}</Text>
              <View className="flex flex-row items-center justify-between">
                <Text className="w-full font-semibold ">
                  {formatRupiah(product.price)}
                </Text>
                <Pressable onPress={() => addCart(product)}>
                  <View className="rounded-sm bg-orange-400 px-2  py-1 shadow-md">
                    <Text className="font-semibold text-white">Beli Lagi</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
    </View>
  )
}

export default CardHistory
