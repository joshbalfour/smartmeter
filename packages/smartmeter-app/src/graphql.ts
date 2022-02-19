import { useState, useEffect } from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'

import { getSchema } from '@joshbalfour/smartmeter-graphql-schema'
import { Context } from '@joshbalfour/smartmeter-graphql-schema/src/types'
import { getAuthToken } from './hooks/useAuthToken'

const getClient = async () => {
  const schema = await getSchema()
  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema, context: async () => {
        const context: Context = {
          token: await getAuthToken(),
        }

        return context
      }
    }),
    cache: new InMemoryCache()
  })

  return client
}

export const useClient = () => {
  const [client, setClient] = useState<ApolloClient<any>>()

  useEffect(() => {
    getClient().then(setClient)
  }, [])

  return client
}