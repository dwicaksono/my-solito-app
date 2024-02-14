import { Text } from 'app/design/typography'
import { View, TextInputed, Trigger } from 'app/design/view'
import { useForm, Controller } from 'react-hook-form'
import LogoSvg from './logo'
import { Pressable } from 'react-native'
import { login, storeDataToken } from 'app/api'
import { useGlobalState } from 'app/provider'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
const FormLogin = () => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const { setIsLogin } = useGlobalState()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: { username: string; password: string }) => {
      const { username, password } = data
      return login(username, password)
    },
    onSuccess: (data) => {
      console.log(data.token)
      if (data?.token) {
        setIsLogin(true)
        storeDataToken(data.token)
      } else {
        alert('Username or password is wrong!')
      }
    },
  })

  const onsubmit = async (data: any) => {
    console.log(data)
    const { username, password } = data
    mutateAsync({ username, password })
  }

  return (
    <View className=" flex-1 items-center justify-center">
      <LogoSvg className="h-32 w-32" />
      <View className="w-full  p-4 lg:w-1/4">
        <Text className="my-1 ml-0">Username</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputed
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              className="w-full rounded-md border border-gray-400 p-2 focus-within:outline-none"
            />
          )}
          name="username"
          rules={{ required: true }}
        />
        <Text className="mb-1 ml-0 mt-4">Password</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputed
              secureTextEntry={true}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              className="w-full rounded-md border border-gray-400 p-2 focus-within:outline-none"
            />
          )}
          name="password"
          rules={{ required: true }}
        />
        <View className="mt-8 flex justify-end">
          <Pressable onPress={handleSubmit(onsubmit)} disabled={isPending}>
            <View className="w-full items-center justify-center rounded-md bg-orange-400 p-2 ">
              {isPending ? (
                <Text className="text-lg text-white">Loading...</Text>
              ) : (
                <Text className="text-lg text-white">Login</Text>
              )}
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default FormLogin
