import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { Link } from 'solito/link'
import CartIcon from './CartIcon'
import ArrowIcon from './arrow-icon'
import { FC } from 'react'

interface MobileNavigationProps {
  totalCart: number
  title: string
  isScroll: boolean
  isCart?: boolean
}

const MobileNavigation: FC<MobileNavigationProps> = ({
  totalCart,
  title,
  isScroll,
  isCart = false,
}) => {
  return (
    <View
      className={`absolute top-0 z-50 flex h-32 w-full transform items-center justify-between ${
        isScroll ? 'bg-white' : 'bg-transparent'
      } px-4 pt-16 transition-all duration-500`}
    >
      <View className="flex w-full flex-row items-center justify-between ">
        <Link href="/">
          <View className="rounded-full bg-orange-400 p-2">
            <ArrowIcon className="w-32" stroke="white" />
          </View>
        </Link>
        {isScroll && (
          <Text
            numberOfLines={1}
            className="line-clamp-1 w-40 whitespace-break-spaces  text-xl font-bold"
          >
            {title}
          </Text>
        )}
        {!isCart && (
          <Link href="/cart">
            <View className="relative rounded-full bg-orange-400 p-2">
              <CartIcon className="w-32" stroke="white" />
              {totalCart > 0 ? (
                <View className="absolute right-0 top-0 flex h-4 w-4  animate-bounce items-center justify-center rounded-full bg-red-500">
                  <Text className="text-xs text-white">{totalCart}</Text>
                </View>
              ) : null}
            </View>
          </Link>
        )}
      </View>
    </View>
  )
}

export default MobileNavigation
