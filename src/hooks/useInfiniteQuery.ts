import { DEFAULT_PAGINATION } from '@/constants'
import {
  HTTPError,
  Pagination,
  QueryListParamsNoPage,
  UseQueryInfiniteList,
  UseQueryInfiniteListRes,
} from '@/types'
import { isNumber, removeEmptyValueFromObject } from '@/utils'
import { useCallback, useState } from 'react'
import useSWRInfinite from 'swr/infinite'

export const useQueryInfiniteList = <
  Data = any,
  Params extends QueryListParamsNoPage = any,
  AdditionalParams = undefined,
>({
  key,
  config,
  initialParams = {} as Params,
  initialAdditionalParams,
  fetcher,
  mutateFetcherResponse, // If the response data is different from the defined data type, use this to modify the response correctly
}: UseQueryInfiniteList<Data, Params, AdditionalParams>): UseQueryInfiniteListRes<
  Data,
  Params,
  AdditionalParams
> => {
  const [additionalParams, setAdditionalParams] = useState<AdditionalParams>(
    initialAdditionalParams as AdditionalParams,
  )
  const [params, setParams] = useState<Params>(() => {
    const { limit, ...restParams } = initialParams
    return restParams as Params
  })

  const [revalidatedAll, setRevalidatedAll] = useState<boolean>(false)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const [pagination, setPagination] = useState<Pagination>(() => {
    const pagination: Pagination = { ...DEFAULT_PAGINATION }
    if (initialParams?.limit) {
      pagination.limit = initialParams.limit
    }
    return pagination
  })

  const getKey = useCallback(
    (pageIndex: number, previousData: Data[]) => {
      if (previousData && !previousData.length) return null

      return [key, pageIndex + 1, params]
    },
    [params],
  )

  const fetcherHandler = useCallback(
    async ([key, page, params]: [string, number, Params]): Promise<Data[]> => {
      setRevalidatedAll(true)

      try {
        const response = await fetcher({
          limit: pagination.limit,
          page,
          ...params,
        })
        const { data = [], totalCount } = mutateFetcherResponse
          ? mutateFetcherResponse(response)
          : response?.data || {}

        if (isNumber(totalCount) && totalCount > 0) {
          setPagination({ ...pagination, total: totalCount, page })
        }

        return mutateFetcherResponse ? mutateFetcherResponse(response).data : data
      } catch (error) {
        if (page > 1) {
          setPagination({ ...pagination, total: 0, page })
          return []
        }

        throw new Error('Không thể tải dữ liệu, vui lòng thử lại sau')
      }
    },
    [],
  )

  const {
    data = [],
    error,
    size,
    setSize,
    isLoading,
    isValidating,
    mutate,
  } = useSWRInfinite<Data[], HTTPError>(getKey, fetcherHandler, {
    parallel: true,
    revalidateAll: !revalidatedAll,
    revalidateFirstPage: true,
    ...config,
  })

  const flattenData = data.flat()
  // const hasMore = flattenData?.length < pagination.total
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < pagination.limit)
  // const isRefreshing = isValidating && revalidatedAll && data && data.length === size

  const getMore = useCallback(async () => {
    if (isReachingEnd || isLoadingMore) return

    setSize(size + 1)
  }, [isReachingEnd, isLoadingMore])

  const filter = useCallback(
    async (_params: Partial<Params>, additionalParams?: AdditionalParams) => {
      setParams(removeEmptyValueFromObject<Params>({ ...params, ..._params }))

      if (additionalParams) {
        setAdditionalParams(additionalParams)
      }
    },
    [params],
  )

  const refresh = useCallback(async () => {
    setParams(initialParams as Params)
    setAdditionalParams(initialAdditionalParams as AdditionalParams)

    setIsRefreshing(true)
    await mutate()
    setIsRefreshing(false)
  }, [])

  return {
    refresh,
    getMore,
    filter,
    mutate,
    error,
    data: flattenData,
    params,
    isEmpty,
    isLoading,
    isValidating,
    isRefreshing,
    isReachingEnd,
    isLoadingMore,
    additionalParams,
    pagination: { ...pagination, page: size },
  }
}
