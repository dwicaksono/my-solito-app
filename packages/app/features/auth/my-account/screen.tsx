import { useLogin } from 'app/provider'
import { Platform, Text, View } from 'react-native'
import { Link } from 'solito/link'
import { useRouter } from 'solito/router'
export default function MyAccountScreen() {
  const { replace } = useRouter()
  const { setIsLogin } = useLogin()
  const backtohome = () => {
    setIsLogin(false)
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
  return (
    <View className="bg-background flex flex-1 items-center justify-center">
      <Text>Welcome, set the params.</Text>
      <Text className="mt-3 text-pink-500" onPress={backtohome}>
        Sign Out
      </Text>
    </View>
  )
}
