import { Text } from 'app/design/typography'
import { TextInputed, View } from 'app/design/view'

import {
  BigHero,
  CardHistory,
  CardProduct,
  CloverIcon,
  ElectronicIcon,
  FormLogin,
  Loading,
  RingIcon,
  ShirtIcon,
} from 'app/components'
import { useCheckToken } from 'app/hooks'
import { useQuery } from '@tanstack/react-query'
import { getCategory, getProducts } from 'app/api'
import { FlatList, Platform, ScrollView } from 'react-native'
import { Link } from 'solito/link'
import { useEffect, useState } from 'react'
export function HomeScreen() {
  const [scrollY, setScrollY] = useState(0)
  const { data, isPending } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategory(),
  })
  const { data: products, isPending: isPendingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    if (Platform.OS === 'web') {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const { isLogin } = useCheckToken()
  if (!isLogin) {
    return <FormLogin />
  }

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y
    setScrollY(scrollPosition)
  }
  if (isPending) {
    return <Loading />
  }
  return (
    <View>
      <View className="fixed z-50 w-full lg:top-16">
        <BigHero />
        <View className="absolute h-60 w-full bg-white/30 p-16 md:h-[400px]">
          <TextInputed
            className=" rounded-full bg-white px-2 text-xs text-gray-400 md:px-4 md:py-4"
            placeholder="Search"
          />
        </View>
      </View>
      <ScrollView onScroll={handleScroll}>
        <View className="justify-\ flex w-full items-center lg:mt-[400px]">
          <View className="flex w-full flex-row items-start justify-between px-8 py-4 shadow-lg backdrop-blur-lg  lg:mt-10 lg:w-fit lg:justify-center lg:rounded-xl lg:bg-orange-400">
            {!isPending &&
              data?.length > 0 &&
              data.map((category) => (
                <View
                  className="flex w-20 items-center justify-center gap-2 lg:w-32 "
                  key={category}
                >
                  <View className="justify-top flex w-fit flex-col items-start  rounded-md  bg-white p-2 lg:p-4">
                    {listIconCategory(category)}
                  </View>
                  <Text className="text-center">{category}</Text>
                </View>
              ))}
          </View>
          <View className="flex w-full justify-center lg:mt-10">
            <FlatList
              scrollEnabled={false}
              numColumns={Platform.OS === 'web' ? 4 : 2}
              key={Platform.OS === 'web' ? 4 : 2}
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Link href={`/product/${item.id}`}>
                  <CardProduct
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    rate={item.rating.rate}
                    count={item.rating.count}
                  />
                </Link>
              )}
              contentContainerStyle={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const listIconCategory = (category) => {
  const typeIcon = {
    electronics: <ElectronicIcon stroke="orange" />,
    jewelery: <RingIcon stroke="orange" />,
    "men's clothing": <ShirtIcon stroke="orange" />,
    "women's clothing": <CloverIcon stroke="orange" />,
  }
  return typeIcon[category]
}
