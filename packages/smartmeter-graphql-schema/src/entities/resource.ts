import { BaseUnit, Classifier } from '@joshbalfour/glowmarkt-api'
import { Field, Float, ObjectType, registerEnumType } from 'type-graphql'
import { GraphQLDateTime } from 'graphql-iso-date'

export enum Fuel {
  ELECTRICITY = 'ELECTRICITY',
  GAS = 'GAS',
}

registerEnumType(Fuel, {
  name: 'Fuel',
})

@ObjectType()
export class Resource {
  @Field(() => String)
  id: string

  @Field(() => String)
  resourceTypeId: string

  @Field(() => String)
  name: string

  @Field(() => String)
  classifier: Classifier

  @Field(() => Fuel)
  fuel: Fuel

  @Field(() => String)
  label: string

  @Field(() => String)
  description: string

  @Field(() => String)
  ownerId: string

  @Field(() => String)
  baseUnit: BaseUnit

  @Field(() => String)
  active: boolean
}

@ObjectType()
export class Reading {
  @Field(() => GraphQLDateTime)
  timestamp: Date
  @Field(() => Float)
  reading: number
  @Field(() => String)
  unit: string
}