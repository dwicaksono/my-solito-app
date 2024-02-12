// import { useAuth } from 'app/features/auth/context'
import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { Link } from 'solito/link'
import { useLogin } from 'app/provider'

const tabs: Array<{
  pathname: string
  isActive(pathname: string): boolean
  name: string
  protected?: boolean
}> = [
  {
    pathname: '/',
    isActive: (pathname) => pathname === '/',
    name: 'Home',
  },
  {
    pathname: '/user',
    isActive: (pathname) => pathname.startsWith('/user'),
    name: 'Users',
    protected: true,
  },
  {
    pathname: '/account',
    isActive: (pathname) => pathname.startsWith('/account'),
    name: 'My Account',
  },
]

const height = 34

// this will only run on Web
export function WebLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter()
  const { isLogin } = useLogin()
  if (!isLogin) {
    return <>{children}</>
  }
  return (
    <>
      <View className=" justify-center bg-slate-500 p-8">
        <Row className="justify-center gap-4">
          {tabs.map((tab) => {
            const active = tab.isActive(pathname)
            if (tab.protected && !isLogin) {
              return null
            }
            return (
              <Fragment key={tab.pathname}>
                <Link href={tab.pathname}>
                  <Text
                    className={`${
                      active ? 'text-pink-500' : 'text-white'
                    } font-bold`}
                  >
                    {tab.name}
                  </Text>
                </Link>
              </Fragment>
            )
          })}
        </Row>
        {/* <Text
          href="https://twitter.com/fernandotherojo"
          hrefAttrs={{
            target: '_blank',
            rel: 'noreferrer',
          }}
        >
          by Fernando Rojo
        </Text> */}
      </View>
      {children}
    </>
  )
}
