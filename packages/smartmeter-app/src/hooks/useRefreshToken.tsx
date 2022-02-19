import { useEffect } from "react"

import { useAuthenticatedUser } from "./useAuthenticatedUser"
import { useAuthToken, useCredentials } from "./useAuthToken"
import { useLogin } from "./useLogin"

export const useRefreshToken = () => {
  const { credentials } = useCredentials()
  const { loading, user, refetch } = useAuthenticatedUser()
  const { token } = useAuthToken()
  const { login, loading: loginLoading } = useLogin()

  useEffect(() => {
    if (token && !loading && !user && credentials.email && credentials.password) {
      login(credentials).then(refetch)
    }
  }, [credentials, user, loading, token])

  return {
    loading: loading || (token && !loading && !user && credentials.email && credentials.password),
    refreshing: loginLoading,
  }
}
