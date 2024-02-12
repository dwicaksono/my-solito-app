import { Text } from 'app/design/typography'
import { View, TextInputed, Trigger } from 'app/design/view'
import { useForm, Control, Controller } from 'react-hook-form'
import LogoSvg from './logo'

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
          <Trigger
            title="Login"
            color={'orange'}
            className="rounded-2xl bg-orange-400"
            onPress={() => console.log('masuk')}
          />
        </View>
      </View>
    </View>
  )
}

export default FormLogin
