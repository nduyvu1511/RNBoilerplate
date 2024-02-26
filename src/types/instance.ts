export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
  PATCH: 'PATCH',
} as const

export type HTTPMethod = (typeof HttpMethod)[keyof typeof HttpMethod]

export const ApiUrl = {
  social_api: 'social_api',
  com_api: 'com_api',
  loy_api: 'loy_api',
  social_avatar_api: 'social_avatar_api',
  funnel_api: 'funnel_api',
  fulfillment_api: 'fulfillment_api',
  file_api: 'file_api',
  hac_api: 'hac_api',
} as const

export type ApiUrlType = (typeof ApiUrl)[keyof typeof ApiUrl]

export interface IRspFile<T = any> {
  data: T
  hasError: boolean
  errorCode: string
  errorMessage: string
}

export interface IRspSocial<T = any> {
  data: T
  has_error: boolean
  error_code: string
  error_message: string
}

export interface IRspOmni<T = any> {
  data: T
  errors: string[]
  errorCodes: string[]
}

export interface IRspLoyalty<T = any> {
  data: T
  message: string
  status: number
}

export interface IRspFunnel<T = any> {
  data: T
  has_error: boolean
  error: any
  success: boolean
  error_code: string
}

export type HTTPResponse<ReqApiKey extends ApiUrlType, Response> = ReqApiKey extends 'social_api'
  ? IRspSocial<Response>
  : ReqApiKey extends 'loy_api'
  ? IRspLoyalty<Response>
  : ReqApiKey extends 'com_api'
  ? IRspLoyalty<Response>
  : ReqApiKey extends 'funnel_api'
  ? IRspFunnel<Response>
  : ReqApiKey extends 'fulfillment_api'
  ? IRspFunnel<Response>
  : ReqApiKey extends 'file_api'
  ? IRspFile<Response>
  : ReqApiKey extends 'hac_api'
  ? IRspFunnel<Response>
  : IRspSocial<Response>

export type HTTPResponsePromise<ReqApiKey extends ApiUrlType, Response> = Promise<
  HTTPResponse<ReqApiKey, Response>
>

export class HTTPService<ApiKey extends ApiUrlType> {
  private readonly apiKey: ApiKey

  constructor(apiKey?: ApiKey) {
    this.apiKey = apiKey ?? (ApiUrl.social_api as ApiKey)
  }

  parseObjectToParams = (obj: Record<string, any>) => {
    let path = ''
    Object.keys(obj).map(key => {
      if (obj[key] !== undefined || obj[key] !== '' || obj[key] !== null) {
        path += '&' + key + '=' + encodeURIComponent(obj[key])
      }
    })
    path = path.substring(1)
    return path
  }

  private async request<Request, Response, ReqApiKey extends ApiKey>(
    method: HTTPMethod,
    path: string,
    body: Request,
    apiId?: ReqApiKey,
  ): HTTPResponsePromise<ReqApiKey, Response> {
    const url = ApiUrl[apiId ?? this.apiKey] + path

    try {
      const access_token = ''
      const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : null,
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
          'X-Haravan-Social-Platform': 'mobile',
        },
      })
      if (response.status === 401 && apiId === ApiUrl.social_api) {
      } else if (response.status === 403) {
      } else if (response.status === 200 || response.status === 201 || response.status === 304) {
        return await response.json()
      } else {
        if (apiId !== ApiUrl.funnel_api) {
          // Sentry.Native.captureException(
          //   new Error(`Mobile - error_call_api - ${response.status} - ${url}`),
          // )
        }
      }
    } catch (e) {
    } finally {
    }
  }

  get<ReqApiKey extends ApiKey, Response = any, Request extends Object = {}>(
    path: string,
    params: Request,
    apiId?: ReqApiKey,
  ) {
    const query = params ? `?${this.parseObjectToParams(params)}` : ''
    return this.request<Request, Response, ReqApiKey>(
      HttpMethod.GET,
      `${path}${query}`,
      null,
      apiId,
    )
  }

  post<ReqApiKey extends ApiKey, Response = any, Request extends Object = {}>(
    path: string,
    body: Request,
    apiId?: ReqApiKey,
  ) {
    return this.request<Request, Response, ReqApiKey>(HttpMethod.POST, path, body, apiId)
  }

  put<ReqApiKey extends ApiKey, Response = any, Request extends Object = {}>(
    path: string,
    body: Request,
    apiId?: ReqApiKey,
  ) {
    return this.request<Request, Response, ReqApiKey>(HttpMethod.PUT, path, body, apiId)
  }

  patch<ReqApiKey extends ApiKey, Response = any, Request extends Object = {}>(
    path: string,
    body: Request,
    apiId?: ReqApiKey,
  ) {
    return this.request<Request, Response, ReqApiKey>(HttpMethod.PATCH, path, body, apiId)
  }

  delete<ReqApiKey extends ApiKey, Response = any, Request extends Object = {}>(
    path: string,
    body: Request,
    apiId?: ReqApiKey,
  ) {
    return this.request<Request, Response, ReqApiKey>(HttpMethod.DELETE, path, body, apiId)
  }
}
