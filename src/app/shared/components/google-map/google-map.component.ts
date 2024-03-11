import { CommonModule } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  type OnInit
} from "@angular/core"
import { GoogleMapsModule } from "@angular/google-maps"
import { BehaviorSubject, Observable, catchError, forkJoin } from "rxjs"

import { Marker } from "./marker.model"

@Component({
  selector: "app-google-map",
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: "./google-map.component.html",
  styleUrls: ["./google-map.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleMapComponent implements OnInit {
  // Source for Angular Google Maps: https://github.com/angular/components/tree/main/src/google-maps
  // Note: the package will be updated soon with new documentation at: https://github.com/angular/components/tree/17.0.x/src/google-maps
  // Website for Google Cloud Console: https://console.cloud.google.com/

  @Input() markers: Marker[] = []
  @Input() destinations: string[] = []
  @Input() city = "New York City"

  markers$ = new BehaviorSubject<Marker[]>([])

  mapComponentId = "google-map-" + crypto.randomUUID()

  zoom = 4
  center = new BehaviorSubject<google.maps.LatLngLiteral>(({ lat: 24, lng: 12 }))
  markerPositions: google.maps.LatLngLiteral[] | null = null

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
    if (this.markers !== undefined) {
      this.markers$.next(this.markers)
    } else if (this.destinations !== undefined && this.city !== undefined) {
      // map destinations to markers
    }

    {
      this.destinations = [
        "Empire State Building",
        "Times Square",
        "Statue of Liberty"
      ]
    }


    await this.getGoogleMapsLibaries()

    this.markers = await this.getMarkers(this.destinations)

    // Extend map boundary
    let bounds = new this.LatLngBounds!()
    for (let marker of this.markers) {
      const latLngLiteral = this.convertMarkerToLatLngLiteral(marker)
      bounds = bounds!.extend(latLngLiteral)
    }

    // Get center of boundaries
    const centerMarker = this.getCenterOfBoundaries(bounds)
    this.center.next(this.convertMarkerToLatLngLiteral(centerMarker))
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

/*
Example response from Place.searchByText(request):

{
  "id": "ChIJaXQRs6lZwokRY6EFpJnhNNE",
  "requestedLanguage": "en-US",
  "requestedRegion": "us",
  "Fg": {
    "id": "ChIJaXQRs6lZwokRY6EFpJnhNNE",
    "displayName": "Empire State Building",
    "location": {
      "lat": 40.7484405,
      "lng": -73.98566439999999
    }
  },
  "Ng": {},
  "Gg": {}
}
*/
