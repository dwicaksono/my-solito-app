import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { Stacks } from '../src/stack'

const TabsLayout = () => {
  return (
    <Stacks>
      <Stack.Screen name="index" options={{ title: 'My Account' }} />
    </Stacks>
  )
}

export default TabsLayout
