import { Image, ScrollView, Text, TouchableOpacity } from 'react-native'
import { Link } from 'solito/link'
import { Fragment } from 'react'
import { useRouter } from 'solito/router'
import { View } from 'app/design/view'
// import { AuthGate } from '../auth/gate'

const users = [
  {
    id: 'Guillermo Rauch',
    avatar:
      'https://pbs.twimg.com/profile_images/1576257734810312704/ucxb4lHy_400x400.jpg',
  },
  {
    id: 'Charlie Cheever',
    avatar:
      'https://pbs.twimg.com/profile_images/418503340872306688/cwVZFE3e_400x400.jpeg',
  },
  {
    id: 'Fernando Rojo',
    avatar:
      'https://pbs.twimg.com/profile_images/1182392379761987591/9XPy4NfP_400x400.jpg',
  },
  {
    id: 'Evan Bacon',
    avatar:
      'https://pbs.twimg.com/profile_images/1576625400205250561/wGfn72X__400x400.jpg',
  },
]

export function UsersListScreen() {
  const { push } = useRouter()
  return (
    <ScrollView>
      <View>
        {users.map((user) => {
          return (
            <Fragment key={user.id}>
              <Link href={`/user/${user.id}`}>
                <View className="flex gap-16">
                  <Image
                    source={{ uri: user.avatar, cache: 'force-cache' }}
                    alt="icon"
                  />

                  {/* <TouchableOpacity
                    onPress={() =>
                      push({ pathname: '/user', query: { id: user.id } })
                    }
                  > */}

                  <Text>{user.id}</Text>
                  {/* </TouchableOpacity> */}
                </View>
              </Link>
            </Fragment>
          )
        })}
      </View>
    </ScrollView>
  )
}
