import React, { ReactNode } from 'react'
import { Image, ImageProps, StyleProp, Text, View, ViewStyle } from 'react-native'
import { styles } from './style'

export interface EmptyProps {
  title: string | ReactNode
  description?: string | ReactNode
  style?: StyleProp<ViewStyle>
  imageProps?: ImageProps
  children?: React.ReactNode
}

export const Empty = ({ title, description, style, children, imageProps }: EmptyProps) => {
  return (
    <View style={[styles.container, style]}>
      {React.isValidElement(title) ? title : <Text style={styles.title}>{title}</Text>}
      {React.isValidElement(description) ? (
        description
      ) : (
        <Text style={styles.description}>{description}</Text>
      )}
      <View>{imageProps ? <Image {...imageProps} /> : null}</View>

      {children}
    </View>
  )
}
