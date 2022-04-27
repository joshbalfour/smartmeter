import 'isomorphic-fetch'
import queryString from 'query-string'

import { isHildebrandError } from './types'

export const glowmarktRequest = (appId: string = 'b0f1b774-a586-4f72-9edd-27ead8aa7a8d', baseUrl: string = 'https://api.glowmarkt.com/api/v0-1/') => {
  const request = async <T>(endpoint: string, options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any,
    headers?: { [key: string]: string },
    token?: string,
    search?: any,
  }) => {
    const uri = `${baseUrl}/${endpoint}${options.search ? '?'+queryString.stringify(options.search) : ''}`
    const resp = await fetch(uri, {
      method: options.method || 'GET',
      body: options.body ? JSON.stringify(options.body) : undefined,
      headers: {
        'Content-Type': 'application/json',
        applicationId: appId,
        "X-GLOW-Version": "0",
        ...options.headers,
        ...(options.token ? { token: options.token } : {}),
      },
    })

    let json: any
    try {
      json = await resp.json()
    } catch (e) {
      throw new Error(`Failed to parse response from ${endpoint}: ${await resp.text()}`)
    }

    if (!resp.ok) {
      if (isHildebrandError(json)) {
        console.error(json)
        throw new Error(`Error ${resp.status} from ${endpoint}: ${json.error}`)
      }
      throw new Error(`Error ${resp.status} from ${endpoint}: ${JSON.stringify(json)}`)
    }

    return json as T
  }

  type RequestOptions = {
    endpoint: string,
    token?: string,
    search?: any,
  }

  const get = async <T>({ endpoint, ...rest }: RequestOptions): Promise<T> => {
    return request<T>(endpoint, {
      method: 'GET',
      ...rest,
    })
  }

  const deleteReq = async <T>({ endpoint, ...rest }: RequestOptions): Promise<T> => {
    return request<T>(endpoint, {
      method: 'DELETE',
      ...rest,
    })
  }

  const post = async <T>({ endpoint, ...rest } : RequestOptions & { body?: any }): Promise<T> => {
    return request<T>(endpoint, {
      method: 'POST',
      ...rest,
    })
  }

  const put = async <T>({ endpoint, ...rest } : RequestOptions & { body: any }): Promise<T> => {
    return request<T>(endpoint, {
      method: 'PUT',
      ...rest,
    })
  }

  return {
    get,
    deleteReq,
    post,
    put,

    request,
  }
}
