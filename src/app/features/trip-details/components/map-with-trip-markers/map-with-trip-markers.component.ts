import { Component, Input, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { GoogleMapComponent } from "src/app/shared/components/google-map/google-map.component"
import { Marker } from "src/app/shared/components/google-map/marker.model"
import { BehaviorSubject } from "rxjs"
import { Trip } from "src/app/shared/models/trip.model"

@Component({
  selector: "app-map-with-trip-markers",
  standalone: true,
  imports: [CommonModule, GoogleMapComponent],
  templateUrl: "./map-with-trip-markers.component.html",
  styleUrls: ["./map-with-trip-markers.component.scss"]
})
export class MapWithTripMarkersComponent implements OnInit {
  @Input() destinations: string[] = []
  @Input() city: string = ""

  center = new BehaviorSubject<google.maps.LatLngLiteral>({
    lat: 24,
    lng: 12
  })

  markers = new BehaviorSubject<Marker[]>([])


  // Google Maps library modules
  Place: typeof google.maps.places.Place | null = null
  AdvancedMarkerElement:
    | typeof google.maps.marker.AdvancedMarkerElement
    | null = null
  LatLngBounds: typeof google.maps.LatLngBounds | null = null

  ngOnInit(): void {
    this.initializeMap()
  }

  async initializeMap() {
    await this.getGoogleMapsLibaries()

    this.markers.next(await this.getMarkers(this.destinations))

    const markers = this.markers.value

    // Extend map boundary
    let bounds = new this.LatLngBounds!()
    for (let marker of markers) {
      const latLngLiteral = this.convertMarkerToLatLngLiteral(marker)
      bounds = bounds!.extend(latLngLiteral)
    }

    // Get center of boundaries
    const centerMarker = this.getCenterOfBoundaries(bounds)
    this.center.next({
      lat: centerMarker.location.latitude,
      lng: centerMarker.location.longitude
    })
  }

  async getMarkers(destinations: string[]) {
    const getMarkerPromises = destinations.map((destination) =>
      this.getMarker(destination)
    )

    return await Promise.all(getMarkerPromises)
  }

  async getMarker(destination: string): Promise<Marker> {
    const request: google.maps.places.SearchByTextRequest = {
      textQuery: destination + ", " + this.city,
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
          latitude: place.location.lng,
          longitude: place.location.lat
        }
      }

      return marker
    } else {
      throw new Error("No locations were found for the string: " + destination)
    }
  }

  getCenterOfBoundaries(bounds: google.maps.LatLngBounds): Marker {
    const center = bounds.getCenter()
    const latitude = center.lat()
    const longitude = center.lng()

    return { title: "", location: { latitude, longitude } }
  }

  convertMarkerToLatLngLiteral(marker: Marker) {
    let result: google.maps.LatLngLiteral = {
      lat: marker.location.latitude,
      lng: marker.location.longitude
    }
    return result
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
}
