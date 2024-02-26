import { Regex } from '@/constants'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

export function isValidHttpUrl(string: string) {
  let url: URL

  try {
    url = new URL(string)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

export function formatMoneyVND(num: number | string, prefix = ' đ'): string {
  if (typeof num === 'number') {
    num = Math.floor(num)
    return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}${prefix ? `${prefix}` : ''}`
  } else if (typeof num === 'string') {
    return `${num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}${prefix ? ` ${prefix}` : ''}`
  }

  return num
}

export function formatNumberInput(value: string, separator = ',') {
  value += ''
  const list = value.split('.')
  const prefix = list[0].charAt(0) === '-' ? '-' : ''
  let num = prefix ? list[0].slice(1) : list[0]
  let result = ''
  while (num.length > 3) {
    result = `${separator}${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`
}

export function toFirstUpperCase(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function toFirstLowerCase(string: string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

export function convertViToEn(str: string, toUpperCase = false) {
  if (!str) return ''

  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư

  return toUpperCase ? str.toUpperCase() : str
}

export function checkAnyKeyInObjectHasValue(object: Object | undefined) {
  const array = Object.values(object || {})
  if (!array?.length) return false
  return array.some(value => value !== '' && value !== null && value !== undefined)
}

export function checkEveryKeyInObjectHasValue(object: Object) {
  return Object.values(object).every(value => value !== '' && value !== null && value !== undefined)
}

export function removeEmptyValueFromObject<T extends Object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined && v !== ''),
  ) as T
}

export function toBase64Image(url: string) {
  return `data:image/jpeg;base64,${url}`
}

export function removeBase64Reader(str: string) {
  return str.replace(Regex.base64Reader, '')
}

export function isUnknownDataTruethy(data: any): data is boolean {
  if (isArray(data)) {
    return data?.length > 0
  } else if (isObject(data)) {
    return Object.keys(data || {})?.length > 0
  }

  return !!data
}

export function changeImageWidthHeightFromHtml(html: string) {
  return html.replace(/(width=")\d+("\W+height=")\d+/gi, '$100%$auto')
}

export function formatSaleTargetByNumberB(current: any, target: any) {
  if (target <= 0) {
    return 0
  } else {
    return parseFloat(((current / target) * 100).toFixed(1))
  }
}

export function removeHTMLFromString(html: string): string {
  return html.replace(/<[^>]+>/g, '')
}

export function formatPhoneNumber(phoneNumber: string) {
  phoneNumber = phoneNumber.replace(/\D/g, '')

  if (phoneNumber.startsWith('84')) {
    return phoneNumber.replace(/^(\d{2})(\d{3})(\d{4})(\d+)$/, '+84 ($1) $2-$3$4')
  } else {
    return phoneNumber.replace(/^(\d{2})(\d{4})(\d+)$/, '($1) $2-$3')
  }
}

export function toArrayStringQueryString(array?: string[]) {
  return array?.length ? `[${array?.map(item => `'${item}'`)?.join(', ')}]` : undefined
}

export function toArrayNumberQueryString(array?: number[]) {
  return array?.length ? `[${array?.join(', ')}]` : undefined
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(Number(value))
}

export function replaceNewlineWithSpace(value: string) {
  return value?.replace?.(/\n+/g, ' ') ?? ''
}

export function convert1Dto2DArray<T = any>(array: T[], column: number) {
  const arr = [...array]
  const newArr = []
  while (arr.length) newArr.push(arr.splice(0, column))
}

export const generateId = () => {
  const d = typeof performance === 'undefined' ? Date.now() : performance.now() * 1000

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16 + d) % 16 | 0

    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}
