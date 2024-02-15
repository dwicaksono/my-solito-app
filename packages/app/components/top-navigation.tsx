import React from 'react'
import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { Link } from 'solito/link'
import { useGlobalState } from 'app/provider'

interface TopNavigationProps {
  href: string
  leftIcon: React.ReactNode
  cartIcon: React.ReactNode
}
const TopNavigation = ({ href, leftIcon, cartIcon }: TopNavigationProps) => {
  const { dataCart } = useGlobalState()
  return (
    <View className="mt-8 flex flex-row justify-between p-4">
      <Link href={href}>{leftIcon}</Link>
      <Link href="/cart">
        <View className="relative flex items-center justify-center">
          {cartIcon}
          {dataCart.length > 0 && (
            <View className="absolute right-0 top-0 flex h-4 w-4  items-center justify-center rounded-full bg-red-500">
              <Text className="text-xs text-white">{dataCart.length}</Text>
            </View>
          )}
        </View>
      </Link>
    </View>
  )
}

export default TopNavigation
