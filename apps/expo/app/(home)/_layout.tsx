import React from 'react'
import { Stack } from 'expo-router'
import { Stacks } from '../src/stack'

const TabsLayout = () => {
  return (
    <Stacks>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
    </Stacks>
  )
}

export default TabsLayout
