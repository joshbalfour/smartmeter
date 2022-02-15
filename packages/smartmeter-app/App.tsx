import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { getSchema } from '@joshbalfour/smartmeter-graphql-schema'
import { Context } from '@joshbalfour/smartmeter-graphql-schema/src/types'

const getClient = async () => {
  const schema = await getSchema()
  console.log(schema)
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

const useClient = () => {
  const [client, setClient] = useState<ApolloClient<any>>()

  useEffect(() => {
    getClient().then(setClient)
  }, [])

  return client
}

export default function App() {
  const client = useClient()

  if (!client) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <StatusBar style="auto" />
      </View>
    )
  }

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
