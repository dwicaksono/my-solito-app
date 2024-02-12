import { Provider } from 'app/provider'
import { Stack } from 'expo-router'
export function Stacks({ children, ...props }) {
  return (
    <Provider>
      <Stack>{children}</Stack>
    </Provider>
  )
}
