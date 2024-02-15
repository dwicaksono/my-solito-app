import { useQuery } from '@tanstack/react-query'
import { getDataToken, getOneUser } from 'app/api'
import { useGlobalState } from 'app/provider'
import { useCallback, useEffect, useState } from 'react'

export const useCheckToken = () => {
  const { isLogin, setIsLogin } = useGlobalState()
  useEffect(() => {
    const getData = async () => {
      const token = await getDataToken()
      if (token !== undefined && token !== null) {
        setIsLogin(true)
      }
    }
    getData().catch((e) => console.log(e))
  }, [])
  return { isLogin }
}

export const useGetUser = () => {
  const { data, isError, isPending } = useQuery({
    queryKey: ['user', 1],
    queryFn: () => getOneUser(),
  })
  return { data, isError, isPending }
}

export const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0)

  const handleScroll = useCallback((event: any) => {
    setScrollY(event.nativeEvent.contentOffset.y)
  }, [])
  return { handleScroll, scrollY }
}
