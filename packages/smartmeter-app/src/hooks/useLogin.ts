import { gql, useMutation } from '@apollo/client'
import { Authentication } from '@joshbalfour/smartmeter-graphql-schema'
import { useAuthToken } from './useAuthToken'

const LoginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(username: $email, password: $password) {
      token
      name
      accountId
      exp
    }
  }
`

export const useLogin = () => {
  const [mutateFunction, { loading }] = useMutation(LoginMutation)
  const { setToken } = useAuthToken()

  const login = async ({ email, password }): Promise<Authentication> => {
    const { data } = await mutateFunction({ variables: { email, password } })
    if (data.login) {
      setToken(data.login.token)
      return data.login
    } else {
      throw new Error('Login failed')
    }
  }

  return {
    login,
    loading,
  }
}
