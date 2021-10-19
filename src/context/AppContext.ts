import { createContext, Dispatch, SetStateAction } from "react"

const AppContext = createContext<{
  setIndexPoint: Dispatch<SetStateAction<number>>
} | null>(null)

const AppContextProvider = AppContext.Provider

const AppContextConsumer = AppContext.Consumer

export { AppContext, AppContextProvider, AppContextConsumer }
