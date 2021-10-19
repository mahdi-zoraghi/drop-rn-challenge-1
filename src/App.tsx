import Constants from "expo-constants"
import React, { useState } from "react"
import { View, StyleSheet, ViewStyle } from "react-native"
import { QueryClientProvider, QueryClient } from "react-query"

import Header from "@components/Header"
import Sheet from "@components/Sheet"

import { AppContextProvider } from "./context/AppContext"
import Navigation from "./navigation/Navigation"
import reducer, { initialState } from "./store/reducer"
import { StateProvider } from "./store/StateProvider"

const queryClient = new QueryClient()

const App = (): JSX.Element => {
  const [indexPoint, setIndexPoint] = useState(0)

  return (
    <AppContextProvider value={{ setIndexPoint }}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <QueryClientProvider client={queryClient}>
          <View style={styles.container}>
            <Header />
            <Navigation />
            <Sheet indexPoint={indexPoint} setIndexPoint={setIndexPoint} />
          </View>
        </QueryClientProvider>
      </StateProvider>
    </AppContextProvider>
  )
}

interface Styles {
  container: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
})

export default App
