import { IconProps } from '@/types'
import { Colors } from '@/theme'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const ExpandIcon = ({ size = 24, fill = Colors.gray50 }: IconProps) => {
  return (
    <Svg stroke={fill} fill={fill} strokeWidth="0" viewBox="0 0 24 24" height={size} width={size}>
      <Path
        fill="none"
        strokeWidth="2"
        d="M10,14 L2,22 M1,15 L1,23 L9,23 M22,2 L14,10 M15,1 L23,1 L23,9"></Path>
    </Svg>
  )
}
