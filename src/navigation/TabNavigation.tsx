import { MaterialCommunityIcons } from "@expo/vector-icons"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React from "react"

import FoodScreen from "@screens/FoodScreen"
import HomeScreen from "@screens/HomeScreen"

import colors from "../styles/colors"

import navigation from "./navigation.json"

const Tab = createMaterialTopTabNavigator()

const screenOptions = {
  swipeEnabled: false,
  tabBarActiveTintColor: colors.black,
  tabBarInactiveTintColor: colors.white,
  tabBarIndicatorStyle: {
    backgroundColor: colors.black400,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: "100%",
  },
  tabBarPressColor: colors.white,
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: colors.dodgerblue,
  },
}

const TabNavigation = (): JSX.Element => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen
      name={navigation.HOME}
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="coffee" color={color} size={27} />
        ),
      }}
    />
    <Tab.Screen
      name={navigation.FOOD}
      component={FoodScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="food" color={color} size={27} />
        ),
      }}
    />
    <Tab.Screen
      name={navigation.DISCOUNT}
      component={FoodScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="percent" color={color} size={27} />
        ),
      }}
    />
    <Tab.Screen
      name={navigation.SEARCH}
      component={FoodScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="search-web" color={color} size={27} />
        ),
      }}
    />
  </Tab.Navigator>
)

export default TabNavigation
