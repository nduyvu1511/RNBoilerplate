import { Colors } from '@/theme'
import { IconProps } from '@/types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const SearchIcon = ({ size = 14, fill = Colors.gray50 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.94997 11.9C2.66389 11.9 0 9.23609 0 5.95C0 2.66391 2.66389 0 5.94997 0C9.23604 0 11.8999 2.66391 11.8999 5.95C11.8999 7.3408 11.4228 8.62014 10.6232 9.63324L13.7949 12.805C14.0683 13.0784 14.0683 13.5216 13.7949 13.7949C13.5215 14.0683 13.0783 14.0683 12.805 13.7949L9.63324 10.6232C8.62014 11.4228 7.34078 11.9 5.94997 11.9ZM9.21227 9.12178C9.19602 9.13533 9.18024 9.14973 9.16498 9.16499C9.14974 9.18023 9.13535 9.196 9.1218 9.21224C8.30228 10.0091 7.18351 10.4999 5.95013 10.4999C3.43724 10.4999 1.40015 8.4628 1.40015 5.9499C1.40015 3.43701 3.43724 1.3999 5.95013 1.3999C8.46301 1.3999 10.5001 3.43701 10.5001 5.9499C10.5001 7.18339 10.0093 8.30223 9.21227 9.12178Z"
        fill={fill}
      />
    </Svg>
  )
}
