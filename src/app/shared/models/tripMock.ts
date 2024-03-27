import { Trip } from "./trip.model"

export const getMockTrip = (): Trip => {
  const mockTrip: Trip = {
    id: 0,
    title: "",
    city: {
      id: 0,
      city_name: "",
      state: "",
      state_abbreviation: "",
      population: 0,
      latitude: 0,
      longitude: 0
    },
    price_range: 0,
    rating: 0,
    description: "",
    destinations: [
      {
        name: "",
        imageUrl: "",
        address: "",
        purpose: "",
        location: { lng: 1, lat: 1 }
      },
      {
        name: "",
        imageUrl: "",
        address: "",
        purpose: "",
        location: { lng: 1, lat: 1 }
      },
      { name: "", imageUrl: "", address: "", purpose: "", location: { lng: 1, lat: 1 } }
    ]
  }

  return mockTrip
}
