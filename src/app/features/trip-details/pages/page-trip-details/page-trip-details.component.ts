import { CommonModule } from "@angular/common"
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  type OnInit
} from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  concatMap,
  delay,
  firstValueFrom,
  from,
  interval,
  map,
  of,
  startWith,
  switchMap,
  take,
  tap
} from "rxjs"
import { CitiesService } from "src/app/shared/services/cities.service"
import { ImageGalleryComponent } from "src/app/shared/components/image-gallery/image-gallery/image-gallery.component"
import { ImageLoadableComponent } from "src/app/shared/components/image-loadable/image-loadable.component"
import { Trip } from "src/app/shared/models/trip.model"
import { TripsService } from "src/app/shared/services/trips.service"
import { GoogleMapComponent } from "src/app/shared/components/google-map/google-map.component"
import { GoogleMapsService } from "src/app/shared/services/google-maps.service"
import { Marker } from "src/app/shared/components/google-map/marker.model"

@Component({
  selector: "app-page-trip-details",
  standalone: true,
  imports: [
    CommonModule,
    ImageLoadableComponent,
    ImageGalleryComponent,
    GoogleMapComponent
  ],
  templateUrl: "./page-trip-details.component.html",
  styleUrls: ["./page-trip-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTripDetailsComponent implements OnInit {
  trip$!: Observable<Trip>
  imageUrls$ = new BehaviorSubject<string[]>([])
  isLoading$ = new BehaviorSubject(true)
  destinations$ = new BehaviorSubject<string[]>([])

  markers$ = new BehaviorSubject<Marker[]>([])

  images = [
    "assets/images/city-card-images/ny-skyscraper.jpg",
    "assets/images/city-card-images/ny-times-square.jpg",
    "assets/images/city-card-images/ny-centralpark.jpg"
  ]

  // TODO: Redo the image gallery to use one with buttons, and a preview bar on the right
  // TODO: merge destinations list into the map wrapper div
  // TODO: Create deep link for google maps using waypoints (scroll to "More examples, example 2"): https://developers.google.com/maps/documentation/urls/get-started

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripsService,
    private googleMapsService: GoogleMapsService
  ) {}

  ngOnInit() {
    this.trip$ = this.route.params.pipe(
      switchMap((params) => {
        const tripId = Number(params["tripId"])
        return this.tripsService.getTripById(tripId).pipe(
          startWith(this.getMockTrip()),
          map((trip) => {
            return this.parseTrip(trip)
          }),
          tap((trip) => {
            this.imageUrls$.next(
              trip.destinations.map((destination) => destination.imageUrl)
            )
          }),
          tap((trip) => {
            this.destinations$.next(
              trip.destinations.map((destination) => destination.name)
            )
          }),
          tap((trip) => {
            if (this.isLoading$.value !== true) {
              this.getMarkers(trip)
            }
          })
        )
      })
    )
  }

  parseTrip(trip: Trip | null): Trip {
    if (trip === null) {
      this.isLoading$.next(true)
      return this.getMockTrip()
    }
    this.isLoading$.next(false)
    return trip
  }

  async getMarkers(trip: Trip) {
    console.log("🚀 ~ PageTripDetailsComponent ~ getMarkers ~ trip:", trip)
    const destinationNames = trip.destinations.map((destination) => destination.name)
    const markers = await this.googleMapsService.convertDestinationsToMarkers(
      destinationNames,
      trip.city.city_name
    )
    this.markers$.next(markers)
  }

  getMockTrip(): Trip {
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
      priceRange: 0,
      rating: 0,
      description: "",
      destinations: [
        { name: "", imageUrl: "" },
        { name: "", imageUrl: "" },
        { name: "", imageUrl: "" }
      ]
    }

    return mockTrip
  }
}
