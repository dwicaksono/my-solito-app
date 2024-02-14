import React from 'react'
import Svg, { Circle, SvgProps } from 'react-native-svg'
const RingIcon = (props: SvgProps) => {
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
      <Circle cx="9" cy="9" r="7" />
      <Circle cx="15" cy="15" r="7" />
    </Svg>
  )
}

export default RingIcon
