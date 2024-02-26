import React from 'react'
import useSWRMutation from 'swr/mutation'

export type UseAsyncParams = {}

export const useAsync = () => {
  const {} = useSWRMutation('')
  const { trigger, isMutating } = useSWRMutation('/api/user', () => {})

  return {}
}
