import React, { useState } from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { styles } from './style'

export type CollapsibleProps = {
  children: React.ReactNode
  expanded: boolean
  duration?: number
}

export const Collapsible = ({ children, expanded, duration = 300 }: CollapsibleProps) => {
  const [height, setHeight] = useState(0)
  const animatedHeight = useSharedValue(0)

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight)
    }
  }

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height, { duration }) : withTiming(0, { duration })

    return {
      height: animatedHeight.value,
    }
  }, [expanded, height])

  return (
    <Animated.View style={[styles.overFlowHidden, collapsableStyle]}>
      <View style={styles.content} onLayout={onLayout}>
        {children}
      </View>
    </Animated.View>
  )
}
