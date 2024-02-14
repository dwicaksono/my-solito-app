import { TopNavigation } from 'app/components'
import { UserInfo } from 'app/features/user/screen'
import { Ionicons } from '@expo/vector-icons'

function User() {
  return (
    <UserInfo
      navigation={
        <TopNavigation
          href="/"
          leftIcon={
            <Ionicons name="arrow-back-sharp" size={28} color="black" />
          }
          cartIcon={<Ionicons name="cart" size={28} color="black" />}
        />
      }
    />
  )
}

export default User
