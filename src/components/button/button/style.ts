import { Colors, CommonStyles, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  btn: {
    ...CommonStyles.flexRowCenter,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  btnDisabled: {
    backgroundColor: Colors.disabled,
  },
  btnLabelDisabled: {
    color: Colors.gray50,
  },
  btnLabel: {
    ...Typography.body16SemiBold,
    color: Colors.white,
  },
})
