import { TActionType, TState, TItem } from "../types"

import {
  ADD_TO_BASKET,
  GET_BASKET_ITEMS,
  REMOVE_AS_BASKET,
  INCREMENT_COUNT_ITEM,
  DECREMENT_COUNT_ITEM,
} from "./types"

const getBasketTotal = (basket: TItem[]): number =>
  basket.reduce(
    (amount: number, item): number => amount + item.count * item.item.abv,
    0
  )

const initialState: TState = {
  basket: [],
}

function reducer(state: TState, action: TActionType): TState {
  switch (action.type) {
    case ADD_TO_BASKET:
      return {
        ...state,
        basket: [action.payload, ...state?.basket],
      }
    case REMOVE_AS_BASKET:
      return {
        ...state,
        basket: state?.basket.filter(drink => drink.item.id !== action.payload),
      }
    case GET_BASKET_ITEMS:
      return { basket: action.payload }
    case INCREMENT_COUNT_ITEM:
      return {
        basket: state.basket.map(drink => ({
          ...drink,
          count:
            drink.item.id === action.payload ? drink.count + 1 : drink.count,
        })),
      }
    case DECREMENT_COUNT_ITEM:
      const item = state.basket.filter(
        drink => drink.item.id === action.payload
      )[0]
      const basket =
        item.count - 1 === 0
          ? state.basket.filter(drink => drink.item.id !== action.payload)
          : state.basket.map(drink => ({
              ...drink,
              count:
                drink.item.id === action.payload
                  ? drink.count - 1
                  : drink.count,
            }))
      return {
        basket,
      }
    default:
      return state
  }
}

export { initialState, getBasketTotal }

export default reducer
