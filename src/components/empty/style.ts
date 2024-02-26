import { Colors, CommonStyles, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    ...CommonStyles.flexCenter,
    paddingHorizontal: 16,
    flex: 1,
  },
  title: {
    marginTop: 24,
    ...Typography.body18SemiBold,
    textAlign: 'center',
  },
  description: {
    ...Typography.body14Normal,
    color: Colors.gray70,
    marginTop: 12,
    textAlign: 'center',
  },
})
