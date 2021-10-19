import React, { useState } from "react"
import {
  View,
  useWindowDimensions,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native"
import {
  TabView,
  SceneMap,
  Route,
  SceneRendererProps,
  NavigationState,
} from "react-native-tab-view"

import { AllDrinks, PizzaDrinks, SteakDrinks } from "../scenes"
import colors from "../styles/colors"

interface RenderScene {
  [key: string]: JSX.Element
}

const renderScene = SceneMap<RenderScene>({
  all: AllDrinks,
  pizza: PizzaDrinks,
  steak: SteakDrinks,
})

const HomeScreen = (): JSX.Element => {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState<number>(0)

  type Routes = { key: string; title: string }[]
  const routes: Routes = [
    { key: "all", title: "ALL" },
    { key: "pizza", title: "PIZZA" },
    { key: "steak", title: "STEAK" },
  ]

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: NavigationState<Route> }
  ) => {
    const inputRange: number[] = props.navigationState.routes.map((_, i) => i)

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i): JSX.Element => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5
            ),
          })

          return (
            <View style={styles.tabBarItem} key={i.toString()}>
              <TouchableOpacity onPress={() => setIndex(i)}>
                <Animated.Text style={[styles.tabBarItemText, { opacity }]}>
                  {route.title}
                </Animated.Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    )
  }

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

interface Styles {
  tabBar: ViewStyle
  tabBarItem: ViewStyle
  tabBarItemText: TextStyle
}

const styles = StyleSheet.create<Styles>({
  tabBar: {
    backgroundColor: colors.black500,
    flexDirection: "row",
    justifyContent: "center",
  },
  tabBarItem: {
    padding: 8,
  },
  tabBarItemText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "bold",
  },
})

export default HomeScreen
