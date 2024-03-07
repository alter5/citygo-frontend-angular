import { City } from "./city.model"

export interface Trip {
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

// TODO: delete the old trip interface
// export interface Trip {
//   city: City
//   stats: {
//     price_range: number
//     rating: number
//   }
//   description: string,
//   stops: {
//     name: string
//     image: string
//   }[]
// }

// TODO: add destinations table to backend

