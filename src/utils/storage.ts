import isArray from "lodash/isArray"

import { TItem, IDrink } from "../types"

import asyncStorage from "./asyncStorage"

const getBasketItems = async (): Promise<TItem[]> => {
  const keys: string[] | void = await asyncStorage.getAllKeys()
  const items: TItem[] = []
  if (isArray(keys)) {
    for (const key of keys) {
      const item = await asyncStorage.getItem<{
        item: IDrink
        count: number
      }>(key, false)
      item && items.push(item)
    }
  }
  return items
}

export { getBasketItems }
