import AsyncStorage from '@react-native-community/async-storage'
import { useEffect, useState } from 'react'

const namespace = 'smartmeter'

const tokenKey = `${namespace}:token`
const emailKey = `${namespace}:email`
const passwordKey = `${namespace}:password`

export const getAuthToken = async () => (await AsyncStorage.getItem(tokenKey)) || undefined
export const setAuthToken = async (token: string) => await AsyncStorage.setItem(tokenKey, token)

export const setCredentials = async (email: string, password: string) => {
  await AsyncStorage.setItem(emailKey, email)
  await AsyncStorage.setItem(passwordKey, password)
}

export const getCredentials = async () => {
  const email = await AsyncStorage.getItem(emailKey)
  const password = await AsyncStorage.getItem(passwordKey)

  return {
    email,
    password,
  }
}

export const useAuthToken = () => {
  const [token, setTokenState] = useState<string | undefined>(undefined)

  useEffect(() => {
    getAuthToken().then(setTokenState)
  }, [])

  const setToken = async (token: string) => {
    await setAuthToken(token)
    setTokenState(token)
  }

  return {
    token,
    setToken,
  }
}

export const useCredentials = () => {
  const [credentials, setStateCredentials] = useState<{ email: string, password: string }>()

  useEffect(() => {
    getCredentials().then(setStateCredentials)
  }, [])

  return {
    credentials,
    setCredentials: async (email: string, password: string) => {
      setCredentials(email, password)
      setStateCredentials({ email, password })
    },
  }
}
