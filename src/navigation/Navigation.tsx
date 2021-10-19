import { NavigationContainer } from "@react-navigation/native"
import React from "react"

import TabNavigation from "./TabNavigation"

const Navigation = (): JSX.Element => (
  <NavigationContainer>
    <TabNavigation />
  </NavigationContainer>
)

export default Navigation
