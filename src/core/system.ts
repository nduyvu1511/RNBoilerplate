import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback'
import { showMessage } from 'react-native-flash-message'
import { ToastOptions, ToastPosition, ToastType } from '@/types'

class CoreSystem {
  static startHaptics = async () => {}

  static toast = async ({
    message,
    description,
    duration = 2000,
    position = ToastPosition.top,
    type = ToastType.default,
    onPress,
    onLongPress,
  }: ToastOptions) => {
    showMessage({
      type,
      message,
      description,
      duration: 1000000000,
      position: ToastPosition.top,
      hideStatusBar: true,
      onPress,
      onLongPress,
    })
  }
}

export { CoreSystem }
