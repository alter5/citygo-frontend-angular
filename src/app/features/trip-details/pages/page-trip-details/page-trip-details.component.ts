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
  first,
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
import { ImageCarouselComponent } from "src/app/shared/components/image-carousel/image-carousel.component"
import { RatingComponent } from "src/app/shared/components/rating/rating.component"
import { ImageCarouselSlide } from "src/app/shared/components/image-carousel/image-carousel-slide.model"

@Component({
  selector: "app-page-trip-details",
  standalone: true,
  imports: [
    CommonModule,
    ImageLoadableComponent,
    ImageGalleryComponent,
    GoogleMapComponent,
    ImageCarouselComponent,
    RatingComponent
  ],
  templateUrl: "./page-trip-details.component.html",
  styleUrls: ["./page-trip-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTripDetailsComponent implements OnInit {
  trip$!: Observable<Trip>
  imageCarouselSlides$ = new BehaviorSubject<ImageCarouselSlide[] | null>(null)
  isLoading$ = new BehaviorSubject(true)
  destinationNames$ = new BehaviorSubject<string[] | null>(null)
  center$ = new BehaviorSubject<Marker | null>(null)
  markers$ = new BehaviorSubject<Marker[]>([])
  tripUrl$ = new BehaviorSubject<string>("")

  // TODO: Add shadow effect to bottom of image gallery. Make sure it doesnt overlap indicator dots
  // TODO: Add trip like button. For example: thumbs_up icon, and a counter next to it
  // TODO: Create deep link for google maps using waypoints (scroll to "More examples, example 2"): https://developers.google.com/maps/documentation/urls/get-started

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripsService,
    private googleMapsService: GoogleMapsService
  ) {}

  ngOnInit() {
    this.trip$ = this.route.params.pipe(
      first(),
      switchMap((params) => {
        const tripId = Number(params["tripId"])
        return this.tripsService.getTripById(tripId).pipe(
          map((trip) => {
            if (trip === null) {
              trip = this.tripsService.getMockTrip()
            } else {
              this.isLoading$.next(false)
            }

            this.imageCarouselSlides$.next(
              trip.destinations.map((destination) => {
                return { imageUrl: destination.imageUrl, description: destination.name }
              })
            )

            this.destinationNames$.next(
              trip.destinations.map((destination) => destination.name)
            )

            this.tripUrl$.next(this.createTripUrl(trip))

            const markers: Marker[] = trip.destinations.map((destination) => {
              return { title: destination.name, location: destination.location }
            })
            this.markers$.next(markers)

            // TODO: Reenable for google maps
            // this.googleMapsService
            //   .getCenterOfMarkers(markers)
            //   .then((center) => this.center$.next(center))

            return trip
          }),
          startWith(this.tripsService.getMockTrip())
        )
      })
    )
  }

  createTripUrl(trip: Trip) {
    const baseUrl = "https://www.google.com/maps/dir/?api=1&travelmode=driving&waypoints="

    const waypoints = trip.destinations.map((destination) => {
      return destination.name + ", " + trip.city.city_name
    })

    const waypointsString = waypoints.join("|")

    return baseUrl + waypointsString
  }
}
