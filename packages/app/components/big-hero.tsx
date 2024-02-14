import { View } from 'app/design/view'
import React from 'react'
import { SolitoImage } from 'solito/image'

const BigHero = () => {
  return (
    <View className=" h-60 w-full items-center justify-center object-cover md:h-[400px]">
      <SolitoImage
        src="https://plus.unsplash.com/premium_photo-1661924270281-f19d44ab4a47?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="pic"
        fill
        contentPosition={'center'}
        contentFit={'cover'}
      />
    </View>
  )
}

export default BigHero
