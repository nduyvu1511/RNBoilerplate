import { Colors } from '@/theme'
import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type FooterViewProps = {
  children: JSX.Element | JSX.Element[]
  padding?: number
  style?: StyleProp<ViewStyle>
}

export const FooterView = ({ children, padding = 16, style }: FooterViewProps) => {
  const { bottom } = useSafeAreaInsets()

  return (
    <View
      style={[
        {
          backgroundColor: Colors.white,
        },
        style,
        {
          padding: padding,
          paddingBottom: bottom > padding ? bottom : padding,
        },
      ]}>
      {children}
    </View>
  )
}
