import { ReactNode } from 'react'

export type IconProps = {
  fill?: string
  size?: number
}

export type IconWithHeightAndWidthProps = Pick<IconProps, 'fill'> & {
  height?: number
  width?: number
}

export type Option<T extends string | number> = {
  value: T
  label: string
}

export type IdAndName<T extends string | number = number> = {
  id: T
  name: string
}

export type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>

export type RequiredExceptFor<T, TOptional extends keyof T> = Required<Omit<T, TOptional>> &
  Partial<Pick<T, TOptional>>

export type VisibleAction = {
  close: () => void
  open: () => void
}

export type ChildrenProps = {
  children: ReactNode
}

export type LngLat<T extends string | number> = {
  latitude: T
  longitude: T
}

export type BooleanAction = {
  close: () => void
  open: () => void
}
