import { useCallback, useState } from 'react'

export type UseBoolean = {
  visible: boolean
  open: () => void
  close: () => void
  toggle: () => void
  setVisible: (visible: boolean) => void
}

export const useBoolean = (externalVisible = false): UseBoolean => {
  const [visible, setVisible] = useState<boolean>(externalVisible)

  const close = useCallback(() => setVisible(false), [])

  const open = useCallback(() => setVisible(true), [])

  const toggle = useCallback(() => setVisible(visible => !visible), [])

  return {
    visible,
    open,
    close,
    toggle,
    setVisible,
  }
}
