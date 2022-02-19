import { useState, useEffect } from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { getSchema } from '@joshbalfour/smartmeter-graphql-schema'
import { Context } from '@joshbalfour/smartmeter-graphql-schema/src/types'

const getClient = async () => {
  const schema = await getSchema()
  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema, context: async () => {
        const context: Context = {
          token: await AsyncStorage.getItem('smartmeter:token') || undefined,
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