import { TActionType, TItem } from "../types"

import {
  ADD_TO_BASKET,
  REMOVE_AS_BASKET,
  GET_BASKET_ITEMS,
  INCREMENT_COUNT_ITEM,
  DECREMENT_COUNT_ITEM,
} from "./types"

export const addToBasket = (drink: TItem): TActionType => ({
  payload: drink,
  type: ADD_TO_BASKET,
})

export const removeAsBasket = (drinkId: number): TActionType => ({
  payload: drinkId,
  type: REMOVE_AS_BASKET,
})

export const getAllItems = (items: TItem[]): TActionType => ({
  payload: items,
  type: GET_BASKET_ITEMS,
})

export const incrementCountItem = (drinkId: number): TActionType => ({
  payload: drinkId,
  type: INCREMENT_COUNT_ITEM,
})

export const decrementCountItem = (drinkId: number): TActionType => ({
  payload: drinkId,
  type: DECREMENT_COUNT_ITEM,
})
