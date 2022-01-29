import { Field, Float, ObjectType } from 'type-graphql'

@ObjectType()
export class Authentication {
  @Field(() => String)
  token: string

  @Field(() => String)
  name: string

  @Field(() => String)
  accountId: string

  @Field(() => Float)
  exp: number
}
