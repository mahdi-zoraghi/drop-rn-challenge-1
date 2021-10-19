import React, { createContext, useContext, useReducer, Dispatch } from "react"

import { TActionType, TState } from "../types"

const StateContext = createContext<[TState, Dispatch<TActionType>] | []>([])

interface Props {
  reducer: (state: TState, action: TActionType) => TState
  initialState: TState
  children: JSX.Element
}

const StateProvider = ({
  reducer,
  initialState,
  children,
}: Props): JSX.Element => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

const useStateValue = () => useContext(StateContext)

export { StateContext, StateProvider, useStateValue }
