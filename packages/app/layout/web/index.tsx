import { View } from 'app/design/view'
import { Row } from 'app/design/layout'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { Link } from 'solito/link'
import { LogoSvg } from 'app/components'
import { ProfileIcon, CartIcon } from 'app/components'
import { useCheckToken } from 'app/hooks'
import { Text } from 'app/design/typography'
import { useGlobalState } from 'app/provider'

const tabs: Array<{
  pathname: string
  isActive(pathname: string): boolean
  name: string
  protected?: boolean
  component?: React.ReactNode
}> = [
  {
    pathname: '/user',
    isActive: (pathname) => pathname.startsWith('/user'),
    name: 'Profile',
    protected: true,
    component: <ProfileIcon />,
  },
  {
    pathname: '/cart',
    isActive: (pathname) => pathname.startsWith('/cart'),
    name: 'Cart',
    component: <CartIcon />,
    protected: true,
  },
]

const height = 34

// this will only run on Web
export function WebLayout({ children }: { children: React.ReactNode }) {
  const { dataCart } = useGlobalState()
  const { pathname } = useRouter()
  const { isLogin } = useCheckToken()
  if (!isLogin) {
    return <>{children}</>
  }
  return (
    <>
      <Row className="fixed top-0 z-40 flex w-full items-center justify-between border-b border-b-orange-300 bg-white/50 p-4 drop-shadow-md backdrop-blur-sm">
        <Row>
          <Link href="/">
            <LogoSvg width={height} height={height} />
          </Link>
        </Row>
        <Row className=" w-fit justify-end gap-8">
          {tabs.map((tab) => {
            const active = tab.isActive(pathname)
            if (tab.protected && !isLogin) {
              return null
            }
            return (
              <Fragment key={tab.pathname}>
                <Link href={tab.pathname}>
                  <View
                    className={`${
                      active && 'bg-orange-400'
                    } relative h-7 w-7 items-center rounded-full transition-all duration-500`}
                  >
                    <View className="absolute -left-1 bottom-0">
                      {tab.component}
                    </View>
                    {tab.pathname === '/cart' && dataCart.length > 0 && (
                      <View className="absolute right-0 top-0 flex h-4 w-4  animate-bounce items-center justify-center rounded-full bg-red-500">
                        <Text className="text-xs text-white">
                          {dataCart.length}
                        </Text>
                      </View>
                    )}
                  </View>
                </Link>
              </Fragment>
            )
          })}
        </Row>
      </Row>
      <View className="pt-16">{children}</View>
    </>
  )
}
