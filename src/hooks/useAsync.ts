import { Screen, Tabs } from '@/common'
import { checkAnyKeyInObjectHasValue } from '@/helpers'
import { useCommonSlice, useUserSlice } from '@/store'
import { AsyncHandlerConfigV2, AsyncHandlerV2 } from '@/types'
import { useEffect, useState } from 'react'
import { showMessage } from 'react-native-flash-message'
import { navigationRef } from '../navigation'

const useAsync = (externalConfig?: AsyncHandlerConfigV2) => {
  const token = useUserSlice((state) => state.token)
  const setPopUpVisible = useCommonSlice((state) => state.setPopUpVisible)
  const setBackdropVisible = useCommonSlice((state) => state.setBackdropVisible)

  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      setBackdropVisible(false)
      setPopUpVisible()
    }
  }, [])

  const handleRequest = async <Params = any, Response = any>({
    config,
    params,
    fetcher,
    onSuccess,
    onError,
    onMissingToken,
  }: AsyncHandlerV2<Params, Response>) => {
    const method = config?.method || 'POST'
    const {
      errorMsg = 'Có lỗi xảy ra, vui lòng thử lại sau',
      successMsg = 'Thành công',
      showBackdrop = method === 'POST',
      showErrorMsg = method === 'POST',
      showSuccessMsg = method === 'POST',
      requiredToken = true,
      shouldNavigateToLoginIfNoTokenFound,
      messageOptions,
    } = { ...externalConfig, ...config } || {}

    if (requiredToken && !token) {
      onMissingToken
        ? onMissingToken()
        : shouldNavigateToLoginIfNoTokenFound
        ? navigationRef?.navigate?.(Tabs.AuthTab, { screen: Screen.Login })
        : showMessage({
            message: 'Vui lòng đăng nhập để tiếp tục',
            type: 'warning',
          })
      return
    }

    try {
      showBackdrop ? setBackdropVisible(true) : setLoading(true)
      const res = await fetcher(params)

      if (res?.success) {
        await onSuccess?.(res?.data)
        showSuccessMsg &&
          showMessage({
            type: 'success',
            message: successMsg || 'Thành công',
            ...messageOptions,
          })

        showBackdrop ? setBackdropVisible(false) : setLoading(false)
      } else {
        await onError?.(res)
        showBackdrop ? setBackdropVisible(false) : setLoading(false)

        const message = res?.message || errorMsg
        if (!message?.toLowerCase()?.includes?.('odoo')) {
          showErrorMsg && showMessage({ type: 'danger', message: message, ...messageOptions })
        }
      }
    } catch (error) {
      showBackdrop ? setBackdropVisible(false) : setLoading(false)
      showErrorMsg && showMessage({ type: 'danger', message: errorMsg, ...messageOptions })
      onError?.(error)
    }
  }

  const asyncHandler = async <Params = any, Response = any>(params: AsyncHandlerV2<Params, Response>) => {
    const popupParams = params?.config?.popupParams || externalConfig?.popupParams
    if (checkAnyKeyInObjectHasValue(popupParams)) {
      setPopUpVisible({
        ...popupParams,
        onDismiss: setPopUpVisible,
        onLeftBtnPress: setPopUpVisible,
        onRightBtnPress: () => handleRequest(params),
      })
    } else {
      handleRequest(params)
    }
  }

  return { asyncHandler, isLoading }
}

export { useAsync }

export {}
