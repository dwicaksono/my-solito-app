import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useLogin } from 'app/provider'
import { HomeScreen } from 'app/features/home/screen'
import { View } from 'app/design/view'

export default function Root() {
  const { isLogin } = useLogin()
  if (!isLogin) {
    return <HomeScreen />
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowOffset: {
            width: 0,
            height: -1,
          },
        },
        tabBarActiveTintColor: '#F65CB6',
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon({ color, size, focused }) {
            return (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={color}
              />
            )
          },
          tabBarButton: isLogin ? undefined : () => null, // Hide tab base on auth
        }}
      />
      <Tabs.Screen
        name="(user)"
        options={{
          title: 'User',
          tabBarIcon({ color, size, focused }) {
            return (
              <Ionicons
                name={focused ? 'people-circle' : 'people-circle-outline'}
                size={size}
                color={color}
              />
            )
          },
          tabBarButton: isLogin ? undefined : () => null, // Hide tab base on auth
        }}
      />
      <Tabs.Screen
        name="(account)"
        options={{
          title: 'My Account',
          tabBarIcon({ color, size, focused }) {
            return (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={size}
                color={color}
              />
            )
          },
          tabBarButton: isLogin ? undefined : () => null, // Hide tab base on auth
        }}
      />
    </Tabs>
  )
}
