import React from 'react'
import Svg, { Path, SvgProps, Rect, Circle } from 'react-native-svg'
const ElectronicIcon = (props: SvgProps) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Rect width="18" height="18" x="3" y="3" rx="2" />
      <Path d="M11 9h4a2 2 0 0 0 2-2V3" />
      <Circle cx="9" cy="9" r="2" />
      <Path d="M7 21v-4a2 2 0 0 1 2-2h4" />
      <Circle cx="15" cy="15" r="2" />
    </Svg>
  )
}

export default ElectronicIcon
