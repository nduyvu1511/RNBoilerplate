import { Colors } from '@/theme'
import React from 'react'
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native'

export type TextProps = RNTextProps & {
  color?: string
  fontSize?: number
  lineHeight?: number
  fontWeight?: '400' | '500' | '600' | '700'
}

export const Text = ({
  fontSize = 14,
  lineHeight = 20,
  fontWeight = '400',
  color = Colors.text,
  style,
  ...props
}: TextProps) => {
  return (
    <RNText
      style={[{ fontFamily: 'Inter-Regular', fontSize, lineHeight, color, fontWeight }, style]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({})
