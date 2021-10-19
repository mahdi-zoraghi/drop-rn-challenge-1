import React from "react"
import { View, StyleSheet, ViewStyle, TextStyle, Text } from "react-native"

import colors from "../styles/colors"

const FoodScreen = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerItem}>All Food</Text>
      </View>
      <View style={styles.allFood}>
        <Text style={styles.allFoodText}>
          Put Whatever you want here {"\n"} For the extra's
        </Text>
      </View>
    </View>
  )
}

interface Styles {
  allFood: ViewStyle
  allFoodText: TextStyle
  container: ViewStyle
  header: ViewStyle
  headerItem: TextStyle
}

const styles = StyleSheet.create<Styles>({
  allFood: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
  },
  allFoodText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.black500,
  },
  headerItem: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "bold",
    padding: 8,
  },
})

export default FoodScreen
