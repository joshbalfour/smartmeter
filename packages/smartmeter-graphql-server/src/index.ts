import { ApolloServer } from 'apollo-server'
import { getSchema } from '@joshbalfour/smartmeter-graphql-schema'

const go = async () => {
  const schema = await getSchema()
  const server = new ApolloServer({ schema })
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

go().catch(console.error)
