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

@ObjectType()
export class UserApplication {
  @Field(() => String)
  applicationId: string

  @Field(() => Boolean)
  active: boolean

  @Field(() => String)
  accountId: string
}

@ObjectType()
export class CreatedUser {
  @Field(() => String)
  userId: string

  @Field(() => String)
  status: string

  @Field(() => Boolean)
  active: boolean

  @Field(() => [UserApplication])
  applications: UserApplication[]

  @Field(() => String)
  createdAt: string

  @Field(() => String)
  updatedAt: string
}