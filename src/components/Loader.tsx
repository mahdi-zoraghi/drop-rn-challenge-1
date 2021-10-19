import LottieView from "lottie-react-native"
import React from "react"
import { StyleSheet, View, ViewStyle } from "react-native"

import colors from "../styles/colors"

const Loader = (): JSX.Element => {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        style={styles.lottie}
        source={require("../animation/loader.json")}
        autoPlay
      />
    </View>
  )
}

interface Styles {
  animationContainer: ViewStyle
  lottie: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  animationContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
  },
  lottie: {
    height: 400,
    width: 400,
  },
})

export default Loader
