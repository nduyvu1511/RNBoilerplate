import { Empty, EmptyProps, Spin } from '@/components'
import { DEFAULT_LIMIT } from '@/constants'
import { UseQueryInfiniteListRes } from '@/types'
import { Colors, Typography } from '@/theme'
import { FlashList, FlashListProps } from '@shopify/flash-list'
import React, { forwardRef } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type PartialElement = JSX.Element | null | undefined

export type InfiniteListNoQueryQueryProps<Data> = FlashListProps<Data> &
  Required<Pick<FlashListProps<Data>, 'renderItem' | 'estimatedItemSize'>> & {
    emptyComponentProps?: EmptyProps
    LoadingComponent?: PartialElement
    LoadingItemComponent?: PartialElement
  } & Pick<UseQueryInfiniteListRes<Data>, 'getMore' | 'isLoading' | 'isLoadingMore'> &
  Partial<Pick<UseQueryInfiniteListRes<Data>, 'error' | 'refresh'>> & {
    limit?: number
  }

const InfiniteListNoQueryChild = <Data extends any>(
  {
    getMore,
    refresh,
    error,
    isLoading,
    isLoadingMore,
    limit = DEFAULT_LIMIT,

    LoadingComponent,
    LoadingItemComponent,
    ListFooterComponent,
    emptyComponentProps,
    onRefresh,
    renderItem,
    ...props
  }: InfiniteListNoQueryQueryProps<Data>,
  ref?: React.MutableRefObject<FlashList<Data>>,
) => {
  const { bottom } = useSafeAreaInsets()

  return error ? (
    <Empty title={error?.message || 'Có lỗi xảy ra, vui lòng thử lại'}>
      <Pressable onPress={refresh}>
        <Text style={[Typography.body14Medium, { color: Colors.active }]}>Tải lại trang</Text>
      </Pressable>
    </Empty>
  ) : isLoading ? (
    LoadingComponent ||
    (LoadingItemComponent ? (
      <ScrollView scrollEnabled={false} style={{ flex: 1, backgroundColor: Colors.white }}>
        {Array.from({ length: limit }).map((_, index) => (
          <View key={index}>{LoadingItemComponent}</View>
        ))}
      </ScrollView>
    ) : (
      <Spin size={28} style={{ paddingVertical: 24, backgroundColor: Colors.white }} />
    ))
  ) : (
    <FlashList
      ref={ref}
      scrollEventThrottle={16}
      onEndReachedThreshold={0.4}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      renderItem={renderItem}
      onEndReached={getMore}
      ListEmptyComponent={
        <Empty
          style={{ flex: 1, backgroundColor: Colors.white, paddingVertical: 32 }}
          title="Không có dữ liệu nào"
          {...emptyComponentProps}
        />
      }
      ListFooterComponent={
        <>
          {isLoadingMore ? <Spin style={{ paddingVertical: 12 }} /> : null}
          {ListFooterComponent || <View style={{ height: bottom / 2 }} />}
        </>
      }
      {...props}
    />
  )
}

export const InfiniteListNoQuery = forwardRef(InfiniteListNoQueryChild) as <Data = any>(
  props: InfiniteListNoQueryQueryProps<Data> & {
    ref?: React.MutableRefObject<FlashList<Data>>
  },
) => ReturnType<typeof InfiniteListNoQueryChild>
