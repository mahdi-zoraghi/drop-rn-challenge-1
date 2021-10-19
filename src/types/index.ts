interface IDrink {
  image_url: string
  name: string
  description: string
  tagline: string
  abv: number
  srm: number
  id: number
}

type TAppContext = {
  getDrinks: () => Promise<void>
} | null

type TItem = { item: IDrink; count: number }

type TActionType = {
  type: string
  payload?: any
}

type TState = { basket: TItem[] }

export type { IDrink, TAppContext, TItem, TActionType, TState }
