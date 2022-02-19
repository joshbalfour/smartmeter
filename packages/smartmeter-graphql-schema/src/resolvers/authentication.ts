import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { client } from '@joshbalfour/glowmarkt-api'

import { Authentication, CreatedUser } from '../entities/authentication'
import { Context } from '../types'

@Resolver(Authentication)
export class AuthenticationResolver {
  
  @Mutation(() => Authentication)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string,
  ): Promise<Authentication> {
    const authResult = await client().authenticate(username, password) 
    return authResult
  }

  @Query(() => Authentication)
  async getViewer(@Ctx() context: Context): Promise<Authentication> {
    if (!context.token) {
      throw new Error('No token found')
    }

    const authResult = await client().getCurrentAuthentication(context.token)

    return {
      ...authResult,
      token: context.token,
    }
  }

  @Mutation(() => CreatedUser)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<CreatedUser> {
    const authResult = await client().registerUser({
      email, password, username: email, name: email.split('@')[0],
    })

    return {
      ...authResult,
      status: 'success',
    }
  }
}
