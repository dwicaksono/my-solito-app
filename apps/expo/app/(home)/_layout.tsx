import { Stack } from 'expo-router'
import { Stacks } from '../src/stack'

export const ustabe_setting = {
  initialRouteName: 'index',
}
const TabsLayout = () => {
  return (
    <Stacks>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
    </Stacks>
  )
}

export default TabsLayout
