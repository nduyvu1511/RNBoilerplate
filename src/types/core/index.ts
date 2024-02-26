export enum HapticFeedbackType {
  selection = 'selection',
  impactLight = 'impactLight',
  impactMedium = 'impactMedium',
  impactHeavy = 'impactHeavy',
  rigid = 'rigid',
  soft = 'soft',
  notificationSuccess = 'notificationSuccess',
  notificationWarning = 'notificationWarning',
  notificationError = 'notificationError',
  clockTick = 'clockTick',
  contextClick = 'contextClick',
  keyboardPress = 'keyboardPress',
  keyboardRelease = 'keyboardRelease',
  keyboardTap = 'keyboardTap',
  longPress = 'longPress',
  textHandleMove = 'textHandleMove',
  virtualKey = 'virtualKey',
  virtualKeyRelease = 'virtualKeyRelease',
  effectClick = 'effectClick',
  effectDoubleClick = 'effectDoubleClick',
  effectHeavyClick = 'effectHeavyClick',
  effectTick = 'effectTick',
}

export enum ToastPosition {
  'top' = 'top',
  'bottom' = 'bottom',
  'center' = 'center',
}

export enum ToastType {
  'info' = 'info',
  'none' = 'none',
  'danger' = 'danger',
  'default' = 'default',
  'success' = 'success',
  'warning' = 'warning',
}

export type ToastOptions = {
  message: string
  description?: string
  duration?: number
  type?: ToastType
  position?: ToastPosition
  onLongPress?(): void
  onPress?(): void
}
