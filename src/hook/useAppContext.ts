import { Dispatch, SetStateAction, useContext } from "react"

import { AppContext } from "../context/AppContext"

const useAppContext = () =>
  useContext<{
    setIndexPoint: Dispatch<SetStateAction<number>>
  } | null>(AppContext)

export default useAppContext
