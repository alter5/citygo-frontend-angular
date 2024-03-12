import { Injectable } from "@angular/core"
import { Marker } from "../components/google-map/marker.model"

@Injectable({
  providedIn: "root"
})
export class GoogleMapsService {
  // Google Maps library modules
  Place: typeof google.maps.places.Place | null = null
  AdvancedMarkerElement:
    | typeof google.maps.marker.AdvancedMarkerElement
    | null = null
  LatLngBounds: typeof google.maps.LatLngBounds | null = null

  isLoaded!: Promise<void>

  constructor() {
    this.isLoaded = this.initializeGoogleMapsService()
  }

  isServiceLoaded(): Promise<void> {
    return this.isLoaded
  }

  async initializeGoogleMapsService() {
    await this.getGoogleMapsLibaries()
  }

  async convertDestinationsToMarkers(
    destinations: string[] | string,
    city: string
  ) {
    await this.isServiceLoaded()

    if (typeof destinations === "string") {
      destinations = [destinations]
    }

    const getMarkerPromises = destinations.map((destination) =>
      this.getMarker(destination, city)
    )

    return await Promise.all(getMarkerPromises)
  }

  async getMarker(destination: string, city: string): Promise<Marker> {
    await this.isServiceLoaded()

    const request: google.maps.places.SearchByTextRequest = {
      textQuery: destination + ", " + city,
      fields: ["displayName", "location"],
      language: "en-US",
      maxResultCount: 7,
      region: "us",
      useStrictTypeFiltering: false
      // includedType: 'restaurant',
      // isOpenNow: true,
      // minRating: 3.2,
    }

    //@ts-ignore
    const { places } = await this.Place.searchByText(request)

    if (places.length) {
      console.log(
        "🚀 ~ GoogleMapComponent ~ getLocation ~ places:",
        places,
        " destination: ",
        destination
      )

      // @ts-ignore
      const place: any = places[0].Fg

      const marker: Marker = {
        title: place.displayName,
        location: {
          lng: place.location.lng,
          lat: place.location.lat
        }
      }

      return marker
    } else {
      throw new Error("No locations were found for the string: " + destination)
    }
  }

  async getGoogleMapsLibaries() {
    // prettier-ignore
    const { Place } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary
    this.Place = Place

    // @ts-ignore
    // prettier-ignore
    const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary
    this.AdvancedMarkerElement = AdvancedMarkerElement

    // prettier-ignore
    const { LatLngBounds } = await google.maps.importLibrary("core") as google.maps.CoreLibrary;
    this.LatLngBounds = LatLngBounds
  }

  getCenterOfMarkers(markers: Marker[]) {
    // Extend map boundary
    let bounds = new this.LatLngBounds!()
    for (let marker of markers) {
      bounds = bounds!.extend(marker.location)
    }

    // Get center of boundaries
    return this.getCenterOfBoundaries(bounds)
  }

  getCenterOfBoundaries(bounds: google.maps.LatLngBounds): Marker {
    const center = bounds.getCenter()
    const lat = center.lat()
    const long = center.lng()

    return { title: "", location: { lat: lat, lng: long } }
  }
}
