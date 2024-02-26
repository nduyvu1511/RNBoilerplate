import { Colors } from '@/theme'
import { IconProps } from '@/types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const ArrowDownIcon = ({ size = 24, fill = Colors.gray70 }: IconProps) => {
  return (
    <Svg
      stroke={fill}
      fill={fill}
      stroke-width="0"
      viewBox="0 0 512 512"
      width={size}
      height={size}>
      <Path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></Path>
    </Svg>
  )
}