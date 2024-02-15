import AsyncStorage from '@react-native-async-storage/async-storage'

export const baseUrl = 'https://fakestoreapi.com'

export const login = async (username: string, password: string) => {
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    })
    const responseJson = await res.json()
    return responseJson
  } catch (error) {
    return error
  }
}

// token
export const storeDataToken = async (value: string) => {
  try {
    await AsyncStorage.setItem('token', value)
  } catch (e) {
    console.log(e)
  }
}
export const storeDataCart = async (value: any) => {
  try {
    await AsyncStorage.setItem('cart', value)
  } catch (e) {
    console.log(e)
  }
}

export const getDataCart = async () => {
  try {
    const value = await AsyncStorage.getItem('cart')
    if (value !== null) {
      return value
    }
  } catch (e) {
    console.log(e)
  }
}
export const getDataToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token')
    if (value !== null) {
      return value
    }
  } catch (e) {
    console.log(e)
  }
}

export const clearCart = async () => {
  try {
    await AsyncStorage.removeItem('cart')
  } catch (e) {
    console.log(e)
  }
}
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('token')
  } catch (e) {
    console.log(e)
  }
}

export const getProducts = async (queryParams?: Record<string, string>) => {
  try {
    let url = `${baseUrl}/products`
    if (queryParams) {
      url = `${url}?${new URLSearchParams(queryParams).toString()}`
    }
    const res = await fetch(url)
    const responseJson = await res.json()
    return responseJson
  } catch (error) {
    return error
  }
}

export const getOneProduct = async (id: string) => {
  try {
    const res = await fetch(`${baseUrl}/products/${id}`)
    const responseJson = await res.json()
    return responseJson
  } catch (error) {
    return error
  }
}
export const getCategory = async () => {
  try {
    const res = await fetch(`${baseUrl}/products/categories`)
    const responseJson = await res.json()
    return responseJson
  } catch (error) {
    return error
  }
}

export const getOneUser = async () => {
  try {
    const res = await fetch(`${baseUrl}/users/1`)
    const responseJson = await res.json()
    return responseJson
  } catch (error) {
    return error
  }
}

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount)
}

export const sumTotalPayment = (data: any[]) => {
  let sum = 0

  if (data?.length > 0) {
    sum = data.reduce((accumulator, data) => {
      return accumulator + data?.subPrice
    }, 0)
  }
  if (!isNaN(sum)) {
    const result = formatRupiah(sum)
    return result
  }
}
