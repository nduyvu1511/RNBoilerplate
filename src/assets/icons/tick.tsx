import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconProps } from '@/types'
import { Colors } from '@/theme'

export const TickIcon = ({ size = 24, fill = Colors.gray50 }: IconProps) => {
  return (
    <Svg stroke={fill} fill={fill} strokeWidth="0" viewBox="0 0 512 512" height={size} width={size}>
      <Path d="M186.301 339.893L96 249.461l-32 30.507L186.301 402 448 140.506 416 110z"></Path>
    </Svg>
  )
}
