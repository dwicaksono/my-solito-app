import { formatRupiah } from 'app/api'
import { Scroll, View, Pressabled } from 'app/design/view'
import { Text } from 'app/design/typography'
import { SolitoImage } from 'solito/image'
import { Pressable } from 'react-native'
import { useGlobalState } from 'app/provider'
import { Row } from 'app/design/layout'
import { Link } from 'solito/link'

interface CardScrollHistoryProps {
  isProductsPending: boolean
  products: any[]
  isCart?: boolean
}
const CardScrollHistory = ({
  isProductsPending,
  products,
  isCart = false,
}: CardScrollHistoryProps) => {
  const { addCart, increaseItem, decreaseItem, removeCart } = useGlobalState()

  const adjustQty = (id: number, type: 'inc' | 'dec') => {
    if (type === 'inc') {
      increaseItem(id)
    } else if (
      type === 'dec' &&
      products.find((item) => item.id === id).qty > 1
    ) {
      decreaseItem(id)
    }
  }

  const handleProductItem = (product: any, isCart: boolean) => {
    if (isCart) {
      removeCart(product)
    } else {
      addCart(product)
    }
  }

  return (
    <Scroll className=" flex-1 px-8 ">
      {!isProductsPending &&
        products.length > 0 &&
        products.map((product) => (
          <View
            className="mt-4 flex-1 border-b border-gray-400/40 p-4 lg:rounded-lg lg:border"
            key={product.id}
          >
            <View className="flex flex-row gap-3 ">
              <Link href={`/product/${product.id}`}>
                <View className="relative h-32 w-32 overflow-hidden rounded-md border border-gray-400/40 object-cover p-8">
                  <SolitoImage
                    contentFit="cover"
                    contentPosition="top center"
                    src={product.image}
                    fill
                    alt="A cool artist's image."
                  />
                </View>
              </Link>
              <View className=" flex-1 flex-col ">
                <Text
                  numberOfLines={2}
                  className=" w-36 whitespace-pre-wrap font-semibold lg:w-full "
                >
                  {product.title}
                </Text>
                <Text numberOfLines={2} className="mb-2 text-xs font-light">
                  {product.description}
                </Text>
                <Text className="mb-1 w-full whitespace-pre-wrap  text-right font-semibold">
                  Price: {formatRupiah(product.price)}
                </Text>
                {isCart && (
                  <Text className="mb-1  w-full whitespace-pre-wrap  text-right font-semibold">
                    Subtotal: {formatRupiah(product.subPrice)}
                  </Text>
                )}

                {isCart && (
                  <Row className="item center mb-2 w-full flex-1 flex-row  justify-between">
                    <View className="w-fit border border-gray-400/40 p-1">
                      <Text>Qty: {product.qty}</Text>
                    </View>
                    <View className="item center flex w-1/2 flex-row justify-center border border-gray-400/40">
                      <Pressabled
                        className="mr-1 flex w-1/2 flex-row items-center justify-center border-r border-gray-400/40"
                        onPress={() => adjustQty(product.id, 'dec')}
                      >
                        <Text className="text-center">-</Text>
                      </Pressabled>
                      <Pressabled
                        className="flex w-1/2 flex-row items-center justify-center"
                        onPress={() => adjustQty(product.id, 'inc')}
                      >
                        <Text className="text-center">+</Text>
                      </Pressabled>
                    </View>
                  </Row>
                )}
                <Pressable onPress={() => handleProductItem(product, isCart)}>
                  <View className="w-full rounded-md bg-orange-400 p-2  shadow-md">
                    <Text className="text-center font-semibold text-white">
                      {!isCart ? 'Beli Lagi' : 'Delete'}
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
    </Scroll>
  )
}

export default CardScrollHistory
