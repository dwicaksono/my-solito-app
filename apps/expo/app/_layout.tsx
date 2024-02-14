import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { Provider } from 'app/provider'
import { HomeScreen } from 'app/features/home/screen'
import { useCheckToken } from 'app/hooks'
import { View, Text } from 'react-native'
import { CartIcon, ShirtIcon, TopNavigation } from 'app/components'

export default function Root() {
  const { isLogin } = useCheckToken()
  if (!isLogin) {
    return (
      <Provider>
        <HomeScreen />
      </Provider>
    )
  }
  return (
    <Provider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.1)',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            marginBottom: 5,
          },
          tabBarActiveTintColor: '#FB923C',
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: 'Products',
            tabBarIcon({ color, size, focused }) {
              return (
                <FontAwesome name={'shopping-bag'} size={15} color={color} />
              )
            },

            tabBarButton: isLogin ? undefined : () => null, // Hide tab base on auth
          }}
        />
        <Tabs.Screen
          name="user"
          options={{
            title: 'Profile',
            tabBarIcon({ color, size, focused }) {
              return <FontAwesome name={'user'} size={15} color={color} />
            },

            tabBarButton: isLogin ? undefined : () => null, // Hide tab base on auth
          }}
        />
      </Tabs>
    </Provider>
  )
}
