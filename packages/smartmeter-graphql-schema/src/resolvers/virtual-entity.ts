import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql'

import { client } from '@joshbalfour/glowmarkt-api'

import { Context } from '../types'
import { VirtualEntity } from '../entities/virtual-entity'
import { Resource } from '../entities/resource'
import { getFuelFromClassifier } from '../utils'

@Resolver(VirtualEntity)
export class VirtualEntityResolver {
  @Query(() => [VirtualEntity])
  async getVirtualEntities(@Ctx() context: Context): Promise<VirtualEntity[]> {
    if (!context.token) {
      throw new Error('No token found')
    }

    const virtualEntities = await client().getVirtualEntities(context.token)

    return virtualEntities.map(virtualEntity => ({
      ...virtualEntity,
      id: virtualEntity.veId,
    }))
  }

  @Query(() => VirtualEntity)
  async getVirtualEntity(@Arg('id') id: string, @Ctx() context: Context): Promise<VirtualEntity> {
    if (!context.token) {
      throw new Error('No token found')
    }

    const virtualEntity = await client().getVirtualEntityWithResourceDetails(context.token, id)

    return {
      ...virtualEntity,
      id,
    }
  }

  @FieldResolver(() => [Resource])
  async resources(@Root() virtualEntity: VirtualEntity, @Ctx() context: Context): Promise<Resource[]> {
    if (!context.token) {
      throw new Error('No token found')
    }

    const { resources } = await client().getVirtualEntityWithResourceDetails(context.token, virtualEntity.veId)

    return resources.map(resource => ({
      ...resource,
      id: resource.resourceId,
      fuel: getFuelFromClassifier(resource.classifier),
    }))
  }
}
