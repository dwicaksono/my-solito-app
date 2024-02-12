import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { View } from 'app/design/view'

import { baseUrl } from 'app/api'
import { useLogin } from 'app/provider'
import { Button } from 'react-native'
import { FormLogin } from 'app/components'
export function HomeScreen() {
  const { isLogin, setIsLogin } = useLogin()
  console.log(isLogin)
  if (!isLogin) {
    return <FormLogin />
  }
  return (
    <View className="flex-1 items-center justify-center p-3">
      <H1 className="text-emerald-600">Welcome to Test Project.</H1>
      <H1 className="text-emerald-600">
        this flag login {JSON.stringify(isLogin)}
      </H1>
      <View className="max-w-xl">
        <P className="text-center">
          Here is a basic starter to show you how you can navigate from one
          screen to another. This screen uses the same code on Next.js and React
          Native.
        </P>
        <P className="text-center">One Component</P>
      </View>
      <View className="h-[32px]" />
      <Row className="space-x-8">
        <TextLink href="/user/fernando">Regular Link</TextLink>
        <Text>{baseUrl}</Text>
      </Row>
    </View>
  )
}
