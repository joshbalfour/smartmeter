import { gql, useQuery } from "@apollo/client"
import { Authentication } from "@joshbalfour/smartmeter-graphql-schema"
import { useAuthToken } from "./useAuthToken"

const GetAuthenticatedUser = gql`
  query getViewer {
    getViewer {
      token
      name
      accountId
      exp
    }
  }
`

export const useAuthenticatedUser = () => {
  const token = useAuthToken()
  const { loading, error, data, refetch } = useQuery(GetAuthenticatedUser, {
    skip: !token,
  })
  return {
    loading,
    error,
    user: data?.getViewer as Authentication | undefined,
    refetch,
  }
}
