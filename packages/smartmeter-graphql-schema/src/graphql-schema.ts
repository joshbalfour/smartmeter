import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'

import { AuthenticationResolver } from './resolvers/authentication'
import { customAuthChecker } from './auth-checker'
import { VirtualEntityResolver } from './resolvers/virtual-entity'
import { ResourceResolver } from './resolvers/resource'

export const getSchema = (): Promise<GraphQLSchema> => {
  return buildSchema({
    resolvers: [
      AuthenticationResolver,
      VirtualEntityResolver,
      ResourceResolver,
    ],
    authChecker: customAuthChecker,
  })
}
