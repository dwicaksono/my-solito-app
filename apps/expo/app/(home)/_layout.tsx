import React from 'react'
import { Stack } from 'expo-router'
import { Stacks } from '../src/stack'
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { TopNavigation, CartIcon, ShirtIcon } from 'app/components'

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
