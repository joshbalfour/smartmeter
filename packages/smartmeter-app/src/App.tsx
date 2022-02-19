import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { Router } from './router'
import { Outlet, Route, Routes } from 'react-router'
import { ApolloProvider } from '@apollo/client'
import { useFonts, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins'

import { useClient } from './graphql'
import { Loading } from './routes/loading'
import { Home } from './routes/home'
import { offBlack, offWhite } from './colors'
import { Signup } from './routes/Signup'

export default function App() {
  const client = useClient()
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular,
  })

  if (!client || !fontsLoaded) {
    return (
     <Loading />
    )
  }

  return (
    <Containers>
      <StatusBar style="auto" />
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </Router>
      </ApolloProvider>
    </Containers>
  )
}

const Containers = ({ children }: { children: any }) => (
  <View style={styles.container}>
    <View style={styles.subcontainer}>
      {children}
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offBlack,
    color: offWhite,
  },
  subcontainer: {
    flex: 1,
    maxWidth: 812,
    marginHorizontal: 'auto',
  },
})
