import { Icon } from '@/assets'
import React from 'react'
import FlashMessage from 'react-native-flash-message'

export const Toast = () => {
  return <FlashMessage position="top" icon={<Icon.CloseIcon />} />
}
