import { AxiosResponse } from "axios"
import React, { useCallback } from "react"
import { useQuery, UseQueryResult } from "react-query"

import { matchWithSteak } from "../api"
import { Drinks, Loader } from "../components"
import { IDrink } from "../types"

const SteakDrinks = (): JSX.Element => {
  const {
    isLoading,
    data,
    refetch,
  }: UseQueryResult<AxiosResponse<IDrink[], any>, unknown> = useQuery(
    "matchWithSteak",
    matchWithSteak
  )

  type TRefetchData = (callback: () => void) => Promise<void>
  const refetchData: TRefetchData = useCallback(
    async (callback: () => void) => {
      await refetch()
      callback()
    },
    [refetch]
  )

  return isLoading ? (
    <Loader />
  ) : (
    <Drinks refetch={refetchData} drinks={data?.data} />
  )
}

export default SteakDrinks
