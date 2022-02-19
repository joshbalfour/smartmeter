import { gql, useMutation } from '@apollo/client'
import { Authentication } from '@joshbalfour/smartmeter-graphql-schema'

import { useLogin } from './useLogin'

const RegisterMutation = gql`
  mutation Register($password: String!, $email: String!) {
    register(password: $password, email: $email) {
      userId
      status
      active
      applications {
        applicationId
        active
        accountId
      }
      createdAt
      updatedAt
    }
  }
`

export const useRegister = () => {
  const [mutateFunction, { loading }] = useMutation(RegisterMutation)
  const { login } = useLogin()

  const register = async ({ email, password }): Promise<Authentication> => {
    const { data } = await mutateFunction({ variables: { email, password } })
    if (data.register) {
      return login({ email, password })
    } else {
      throw new Error('Registration failed')
    }
  }

  return {
    register,
    loading,
  }
}
