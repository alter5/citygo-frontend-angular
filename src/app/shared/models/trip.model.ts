import { City } from "./city.model"

export interface Trip {
  city: City
  stats: {
    price_range: number
    rating: number
  }
  stops: {
    name: string
    image: string
  }[]
}
