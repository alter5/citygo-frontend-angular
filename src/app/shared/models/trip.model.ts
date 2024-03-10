import { City } from "./city.model"

export interface Trip {
  id: number,
  title: string
  city: City
  priceRange: number
  rating: number
  description: string
  destinations: {
    name: string
    imageUrl: string
  }[]
}
