import Axios from "axios"

const axios = Axios.create({
  baseURL: "https://api.punkapi.com/v2/beers",
})

export const allDrinks = () => axios.get("")

export const matchWithPizza = () => axios.get("?food=pizza&per_page=80")

export const matchWithSteak = () => axios.get("?food=steak")

export const oneDrink = (id: string) => axios.get(`/${id}`)
