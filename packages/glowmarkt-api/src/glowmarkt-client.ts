import { glowmarktRequest } from './glowmarkt-request'

import { AuthResponse, AuthResponseDetailed, ReadingQuery, Readings, Resource, ResourceDetails, VirtualEntity } from './types'

export const client = (appId: string = 'b0f1b774-a586-4f72-9edd-27ead8aa7a8d', baseUrl: string = 'https://api.glowmarkt.com/api/v0-1/') => {
  const request = glowmarktRequest(appId, baseUrl)

  const authenticate = (username: string, password: string): Promise<AuthResponseDetailed> => (
    request.post<AuthResponseDetailed>({
      endpoint: 'auth',
      body: {
        username,
        password,
      }
    })
  )

  const getCurrentAuthentication = (token: string): Promise<AuthResponse> => (
    request.get<AuthResponse>({
      endpoint: 'auth',
      token,
    })
  )

  const getVirtualEntities = (token: string): Promise<VirtualEntity<Resource>[]> => (
    request.get<VirtualEntity<Resource>[]>({
      endpoint: 'virtualentity',
      token,
    })
  )

  const getVirtualEntityWithResourceDetails = (token: string, veId: string): Promise<VirtualEntity<ResourceDetails>> => (
    request.get<VirtualEntity<ResourceDetails>>({
      endpoint: `virtualentity/${veId}/resources`,
      token,
    })
  )


  const getCurrentReadings = (token: string, resourceId: string): Promise<Readings> => (
    request.get<Readings>({
      endpoint: `resource/${resourceId}/current`,
      token,
    })
  )

  const getReadings = (token: string, resourceId: string, query: ReadingQuery): Promise<Readings> => (
    request.get<Readings>({
      endpoint: `resource/${resourceId}/readings`,
      search: { query },
      token,
    })
  )

  return {
    authenticate,
    getCurrentAuthentication,
    getVirtualEntities,
    getVirtualEntityWithResourceDetails,
    getCurrentReadings,
    getReadings,
  }
}
