import { registerRootComponent } from "expo"
import { LogBox } from "react-native"

import App from "./App"

LogBox.ignoreLogs(["Setting a timer"])
// LogBox.ignoreLogs(["Reanimated 2"])

export default registerRootComponent(App)
