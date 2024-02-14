import { useGlobalState } from 'app/provider'
import React from 'react'

const Cart = () => {
  const { dataCart } = useGlobalState()
  return <div>{JSON.stringify(dataCart)}</div>
}

export default Cart
