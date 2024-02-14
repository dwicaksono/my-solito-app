import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Provider } from 'app/provider'
import { Stack } from 'expo-router'
import { TextInputComponent } from 'react-native'
export function Stacks({ children, ...props }) {
  return (
    <Provider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'white',
          },
        }}
      >
        {children}
      </Stack>
    </Provider>
  )
}
