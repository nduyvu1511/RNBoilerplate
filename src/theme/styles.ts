import { StyleSheet } from 'react-native'

export const CommonStyles = StyleSheet.create({
  flexRowItemsCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRowCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRowSpaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  absoluteInset: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mr8: { marginRight: 8 },
  flex1: { flex: 1 },
})
