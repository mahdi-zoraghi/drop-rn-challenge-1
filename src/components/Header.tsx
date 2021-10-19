import React from "react"
import { StyleSheet, View, ViewStyle } from "react-native"
import { Text } from "react-native-elements"

import colors from "../styles/colors"

const Header = (): JSX.Element => (
  <View style={styles.container}>
    <Text h4>Demo App</Text>
  </View>
)

interface Styles {
  container: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    alignItems: "center",
    backgroundColor: colors.dodgerblue,
    padding: 10,
  },
})

export default Header
