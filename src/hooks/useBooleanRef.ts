import { BooleanAction } from '@/types'
import { MutableRefObject, useCallback, useRef } from 'react'

export type UseBooleanRef = {
  ref: MutableRefObject<BooleanAction>
  onOpen: () => void
  onClose: () => void
}

export const useBooleanRef = (): UseBooleanRef => {
  const ref = useRef<BooleanAction>(null)

  const onClose = useCallback(() => ref.current?.close(), [])

  const onOpen = useCallback(() => ref.current?.open(), [])

  return {
    ref,
    onClose,
    onOpen,
  }
}
