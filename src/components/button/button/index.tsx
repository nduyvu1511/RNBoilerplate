import { Spin } from '@/components'
import { Colors, CommonStyles } from '@/theme'
import { IconProps } from '@/types'
import React from 'react'
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableHighlight,
  TouchableHighlightProps,
  ViewStyle,
} from 'react-native'
import { styles } from './style'

export type ButtonProps = Pick<
  TouchableHighlightProps,
  | 'onPress'
  | 'onPressIn'
  | 'onPressOut'
  | 'onLongPress'
  | 'disabled'
  | 'hitSlop'
  | 'delayPressOut'
  | 'delayPressIn'
> & {
  label?: string
  labelStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
  mode?: 'text' | 'outlined' | 'contained' | 'elevated'
  color?: string
  textColor?: string
  loading?: boolean
  icon?: (props?: IconProps) => JSX.Element
}

export const Button = ({
  mode = 'contained',
  loading,
  color,
  style,
  icon,
  label,
  labelStyle,
  textColor,
  disabled,
  ...props
}: ButtonProps) => {
  //   const {
  //     btnStyles,
  //     textStyles,
  //   }: { btnStyles: StyleProp<ViewStyle>; textStyles: StyleProp<TextStyle> } = useMemo(() => {
  //     const btnStyles: StyleProp<ViewStyle> = [styles.btn, disabled && styles.btnDisabled]
  //     const textStyles: StyleProp<TextStyle> = [styles.btnLabel, disabled && styles.btnLabelDisabled]

  //     return { btnStyles, textStyles }
  //   }, [mode, disabled])

  return (
    <TouchableHighlight
      disabled={disabled || loading}
      underlayColor={Colors.primary}
      style={[styles.btn, disabled && styles.btnDisabled, style]}
      {...props}>
      <>
        {loading ? <Spin size={14} fill={Colors.white} style={CommonStyles.mr8} /> : null}
        <Text numberOfLines={1} style={[styles.btnLabel, disabled && styles.btnLabelDisabled]}>
          {label}
        </Text>
      </>
    </TouchableHighlight>
  )
}
