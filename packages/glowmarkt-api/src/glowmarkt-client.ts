import { glowmarktRequest } from './glowmarkt-request'

import { AuthResponse, AuthResponseDetailed, ReadingQuery, Readings, RegisterUserArgs, RegisterUserResponse, Resource, ResourceDetails, VirtualEntity, VirtualEntityType } from './types'
import { dateToGlowmarktString } from './utils'

export const client = (appId: string = 'b0f1b774-a586-4f72-9edd-27ead8aa7a8d', directoryId: string = '951cffa7-863f-4ae7-8f7e-ed682e690f91', baseUrl: string = 'https://api.glowmarkt.com/api/v0-1') => {
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

  const getResource = (token: string, resourceId: string): Promise<ResourceDetails> => (
    request.get<ResourceDetails>({
      endpoint: `resource/${resourceId}`,
      token,
    })
  )

  const getCurrentReadings = (token: string, resourceId: string): Promise<Readings> => (
    request.get<Readings>({
      endpoint: `resource/${resourceId}/current`,
      token,
    })
  )

  const getReadings = (token: string, resourceId: string, query: ReadingQuery): Promise<Readings> => {
    const search = {
      ...query,
      from: dateToGlowmarktString(query.from),
      to: dateToGlowmarktString(query.to),
    }

    return (
      request.get<Readings>({
        endpoint: `resource/${resourceId}/readings`,
        search,
        token,
      })
    )
  }

  const getVirtualEntityTypes = (token: string): Promise<VirtualEntityType[]> => (
    request.get<VirtualEntityType[]>({
      endpoint: 'vetype',
      token,
    })
  )

  const registerUser = (userData: Omit<Omit<RegisterUserArgs, 'applicationId'>, 'directoryId'>): Promise<RegisterUserResponse> => (
    request.post<RegisterUserResponse>({
      endpoint: 'register',
      body: {
        ...userData,
        applicationId: appId,
        directoryId,
      }
    })
  )

  return {
    authenticate,
    getCurrentAuthentication,
    getVirtualEntities,
    getVirtualEntityWithResourceDetails,
    getVirtualEntityTypes,
    getResource,
    getCurrentReadings,
    getReadings,
    registerUser,
  }
}
