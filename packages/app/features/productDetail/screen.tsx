import { useQuery } from '@tanstack/react-query'
import { formatRupiah, getOneProduct } from 'app/api'
import {
  ArrowIcon,
  CartIcon,
  Loading,
  MobileNavigation,
  TopNavigation,
} from 'app/components'
import { Row } from 'app/design/layout'
import { Text } from 'app/design/typography'
import { Pressabled, View } from 'app/design/view'
import { useScrollY } from 'app/hooks'
import { useGlobalState } from 'app/provider'
import { ScrollView } from 'moti'
import { useState } from 'react'
import { Platform } from 'react-native'
import { createParam } from 'solito'
import { SolitoImage } from 'solito/image'
import { Link } from 'solito/link'
import { useRouter } from 'solito/router'
type Params = {
  id?: string
}

const { useParams } = createParam<Params>()
const ProductDetail = () => {
  const { addCart, totalCart } = useGlobalState()
  const { params } = useParams()
  const { push } = useRouter()
  const { handleScroll, scrollY } = useScrollY()

  const { data, isPending } = useQuery({
    queryKey: ['productDetail', params.id || ''],
    queryFn: () => getOneProduct(params.id || ''),
  })

  if (isPending) {
    return <Loading />
  }

  const handleAddToCart = (type: 'buy' | 'cart', data: any) => {
    addCart(data)
    if (type === 'buy') {
      push('/cart')
    }
  }
  return (
    <View className="relative flex-1 ">
      {Platform.OS !== 'web' && (
        <MobileNavigation
          totalCart={totalCart}
          title={data.title}
          isScroll={scrollY > 10}
        />
      )}
      <ScrollView className=" " onScroll={handleScroll}>
        <View className="   lg:flex lg:flex-row">
          <View className=" h-[400px] overflow-hidden rounded-md object-cover p-8 lg:h-screen  lg:w-1/2">
            <SolitoImage
              contentFit="cover"
              contentPosition="top center"
              src={data.image}
              fill
              alt="detail product"
              sizes="100%"
            />
          </View>
          <View className="flex bg-white p-8 lg:flex-1">
            <Text className="">{data.rating.count} terjual</Text>
            <Text className="text-3xl font-semibold">{data.title}</Text>
            <Text className="">{data.category}</Text>
            <Text className="text-2xl font-semibold text-red-600">
              {formatRupiah(data.price)}
            </Text>
            <Text className="mt-8 text-3xl font-semibold">Description</Text>
            <Text className="">{data.description}</Text>

            <View className="mt-8 w-full flex-row ">
              <Pressabled
                className="mr-3 w-1/2 border-2 border-orange-400 bg-orange-200 py-4 text-center"
                onPress={() => handleAddToCart('cart', data)}
              >
                <Text className="text-center font-bold text-orange-400">
                  Masukan Keranjang
                </Text>
              </Pressabled>
              <Pressabled
                className="w-1/2  bg-orange-400 py-4 text-center"
                onPress={() => handleAddToCart('buy', data)}
              >
                <Text className="text-center font-bold text-white">
                  Beli Sekarang
                </Text>
              </Pressabled>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ProductDetail
