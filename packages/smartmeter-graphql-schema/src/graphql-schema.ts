import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'

import { AuthenticationResolver } from './resolvers/authentication'
import { customAuthChecker } from './auth-checker'

export const getSchema = (): Promise<GraphQLSchema> => {
  return buildSchema({
    resolvers: [
      AuthenticationResolver,
    ],
    authChecker: customAuthChecker,
  })
}
