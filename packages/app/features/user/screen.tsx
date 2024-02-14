import { View } from 'app/design/view'
import { H1, P, Text } from 'app/design/typography'
import { useQuery } from '@tanstack/react-query'
import { getOneUser, getProducts, logout } from 'app/api'
import { Row } from 'app/design/layout'
import {
  CardHistory,
  ProfileIcon,
  CardScrollHistory,
  Loading,
} from 'app/components'
import { Platform } from 'react-native'
import { useGlobalState } from 'app/provider'
import { useRouter } from 'solito/router'

export function UserInfo({ navigation }: { navigation?: React.ReactNode }) {
  const { data, isError, isPending } = useQuery({
    queryKey: ['user', 1],
    queryFn: () => getOneUser(),
  })
  const { data: products, isPending: isProductsPending } = useQuery({
    queryKey: ['limit'],
    queryFn: () => getProducts({ limit: '' }),
  })

  if (isPending) {
    return <Loading />
  }
  return (
    <View className=" flex-1">
      {navigation}
      <View className=" px-8 pt-4 ">
        <DetailRow {...data} />
        <H1 className="mt-4 capitalize text-slate-700">Transaction History</H1>
      </View>
      {Platform.OS === 'web' ? (
        <CardHistory isPending={isProductsPending} products={products} />
      ) : (
        <CardScrollHistory
          isProductsPending={isProductsPending}
          products={products}
        />
      )}
    </View>
  )
}

const DetailRow = ({ ...props }) => {
  const { setIsLogin } = useGlobalState()
  const { replace } = useRouter()

  const backtohome = () => {
    setIsLogin(false)
    logout()
    if (Platform.OS === 'web') {
      replace({
        pathname: '/',
      })
    } else {
      replace({
        pathname: '/(home)',
      })
    }
  }
  const { phone, email, username, address } = props
  return (
    <View className="flex-row items-center gap-x-3 ">
      <ProfileAvatar />

      <Row className="flex-col">
        <Text className="text-lg font-semibold capitalize">{username}</Text>
        <Text className="text-xs font-light">{phone}</Text>
        <Text className="text-xs font-light">{email}</Text>
        <Text className="text-xs font-light">{`${address.street} ${address.number} ${address.city}`}</Text>
        <Text className="mt-3 font-bold text-pink-500" onPress={backtohome}>
          Sign Out
        </Text>
      </Row>
    </View>
  )
}

const ProfileAvatar = () => {
  return (
    <View className="flex w-fit items-start justify-start">
      <View className=" flex h-20 w-20 items-center justify-center rounded-full bg-orange-400">
        <ProfileIcon className="5 h-10 w-10 text-white" />
      </View>
    </View>
  )
}
