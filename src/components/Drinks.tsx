import React, { useState } from "react"
import { View, FlatList, StyleSheet, ViewStyle } from "react-native"

import colors from "../styles/colors"
import { IDrink } from "../types"

import Drink from "./Drink"

interface Props {
  drinks: IDrink[] | undefined
  refetch: (callback: () => void) => Promise<void>
}

const Drinks = ({ drinks, refetch }: Props): JSX.Element => {
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const onRefresh = (): void => {
    setRefreshing(true)
    refetch(() => setRefreshing(false))
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={drinks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item: drink }) => <Drink drink={drink} />}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  )
}

interface Styles {
  container: ViewStyle
  columnWrapper: ViewStyle
  contentContainer: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  columnWrapper: {
    justifyContent: "space-around",
  },
  container: {
    backgroundColor: colors.white,
  },
  contentContainer: {
    backgroundColor: colors.white,
  },
})

export default Drinks
