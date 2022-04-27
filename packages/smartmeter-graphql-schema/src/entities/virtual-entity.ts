import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class VirtualEntity {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string
  @Field(() => String)
  veId: string
  @Field(() => String)
  veTypeId: string
  @Field(() => String)
  ownerId: string
  @Field(() => String)
  applicationId: string
  @Field(() => String)
  updatedAt: string
  @Field(() => String)
  createdAt: string
}
