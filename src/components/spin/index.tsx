import { Icon } from '@/assets'
import { Colors, CommonStyles } from '@/theme'
import { IconProps } from '@/types'
import React, { useEffect, useRef } from 'react'
import { Animated, Easing, StyleProp, View, ViewStyle } from 'react-native'

export type SpinProps = IconProps & {
  style?: StyleProp<ViewStyle>
}

const Spin = ({ style, ...iconProps }: SpinProps) => {
  const spinValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    spin()
  }, [])

  const spin = () => {
    spinValue.setValue(0)
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin())
  }

  const spinAnimation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View style={[CommonStyles.flexCenter, style]}>
      <Animated.View style={[{ transform: [{ rotate: spinAnimation }] }]}>
        <Icon.LoadingIcon size={24} fill={Colors.gray70} {...iconProps} />
      </Animated.View>
    </View>
  )
}

export { Spin }
