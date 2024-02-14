import { useGlobalState } from 'app/provider'
import { Text } from 'react-native'

function Cart() {
  const { dataCart } = useGlobalState()
  return <Text>{JSON.stringify(dataCart)}</Text>
}

export default Cart
