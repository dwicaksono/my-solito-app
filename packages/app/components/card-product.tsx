import { formatRupiah } from 'app/api'
import { Row } from 'app/design/layout'
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { StyleSheet } from 'react-native'
import { SolitoImage } from 'solito/image'
import StarIcon from './star-icon'

const CardProduct = ({ image, title, price, rate, count }) => {
  return (
    <View className="m-4 overflow-hidden rounded-md bg-white">
      <View className="w-36 overflow-hidden rounded-md" style={styles.shadow}>
        <View className="relative h-32 w-36  bg-slate-400 object-cover object-center">
          <SolitoImage
            contentFit="cover"
            contentPosition="top center"
            alt="picture of product"
            fill
            src={image}
            sizes="100%"
            priority
          />
          <View className="item-center absolute right-0 flex  justify-center rounded-b-full bg-orange-400 px-3 py-2 backdrop-blur-md lg:bg-orange-400/50">
            <StarIcon stroke="white" width={15} />
            <Text className="text-xs font-bold text-white lg:text-[10px]">
              {rate}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex w-36 flex-col p-2">
        <Text numberOfLines={2} className="whitespace-break-spaces  text-xs">
          {title}
        </Text>
        <View className="mt-3 w-full flex-1 flex-row items-center justify-between ">
          <Text className="text-xs font-semibold">{formatRupiah(price)}</Text>
          <Text className=" text-right text-[10px] font-semibold">
            {count} terjual
          </Text>
        </View>
      </View>
    </View>
  )
}

export default CardProduct

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // for Android
  },
})
