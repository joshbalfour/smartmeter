import { Arg, Ctx, FieldResolver, Query, registerEnumType, Resolver, Root } from 'type-graphql'
import { GraphQLDateTime } from 'graphql-iso-date'
import { client, ReadingQueryPeriod, ReadingQueryFunction } from '@joshbalfour/glowmarkt-api'

import { Context } from '../types'
import { Reading, Resource } from '../entities/resource'
import { getFuelFromClassifier } from '../utils'

registerEnumType(ReadingQueryPeriod, {
  name: 'ReadingQueryPeriod',
  description: 'The period of time to query for readings',
})

registerEnumType(ReadingQueryFunction, {
  name: 'ReadingQueryFunction',
  description: 'The aggregation function to apply to the readings',
})

@Resolver(Resource)
export class ResourceResolver {
  @Query(() => Resource)
  async getResource(@Arg('id') id: string, @Ctx() context: Context): Promise<Resource> {
    if (!context.token) {
      throw new Error('No token found')
    }

    const resource = await client().getResource(context.token, id)

    return {
      ...resource,
      fuel: getFuelFromClassifier(resource.classifier),
      id,
    }
  }

  @FieldResolver(() => Reading)
  async currentReading(
    @Root() resource: Resource,
    @Ctx() context: Context,
  ): Promise<Reading> {
    if (!context.token) {
      throw new Error('No token found')
    }

    const readings = await client().getCurrentReadings(context.token, resource.id)

    const [utcTimestamp, reading] = readings.data[0]
    return {
      timestamp: new Date(utcTimestamp * 1000),
      reading,
      unit: readings.units,
    }
  }

  @FieldResolver(() => [Reading])
  async readings(
    @Root() resource: Resource,
    @Arg('from', () => GraphQLDateTime) from: Date,
    @Arg('to', () => GraphQLDateTime) to: Date,
    @Arg('period', { nullable: true }) period: ReadingQueryPeriod = ReadingQueryPeriod.P1D,
    @Arg('function', { nullable: true }) func: ReadingQueryFunction = ReadingQueryFunction.sum,
    @Ctx() context: Context,
    @Arg('offset', { nullable: true }) offset?: string,
  ): Promise<Reading[]> {
    if (!context.token) {
      throw new Error('No token found')
    }

    const readings = await client().getReadings(context.token, resource.id, {
      from,
      to, 
      offset,
      period,
      function: func,
    })

    return readings.data.map(([utcTimestamp, reading]) => ({
      timestamp: new Date(utcTimestamp * 1000),
      reading,
      unit: readings.units,
    }))
  }
}
