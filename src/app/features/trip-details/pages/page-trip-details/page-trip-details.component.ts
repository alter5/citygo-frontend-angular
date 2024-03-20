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
      first(),
      switchMap((params) => {
        const tripId = Number(params["tripId"])
        return this.tripsService.getTripById(tripId).pipe(
          map((trip) => {
            if (trip === null) {
              trip = this.tripsService.getMockTrip()
            } else {
              this.isLoading$.next(false)
              this.getMarkers(trip)
            }
            this.imageCarouselSlides$.next(
              trip.destinations.map((destination) => {
                return { imageUrl: destination.imageUrl, description: destination.name }
              })
            )
            this.destinationNames$.next(
              trip.destinations.map((destination) => destination.name)
            )
            return trip
          }),
          startWith(this.tripsService.getMockTrip())
        )
      })
    )
  }

  getMarkers(trip: Trip) {
    // const destinationNames = trip.destinations.map((destination) => destination.name)
    // from(
    //   this.googleMapsService.convertDestinationsToMarkers(
    //     destinationNames,
    //     "New York City"
    //   )
    // )
    //   .pipe(
    //     tap((markers) => {
    //       this.markers$.next(markers)
    //       this.center$.next(this.googleMapsService.getCenterOfMarkers(markers))
    //     })
    //   )
    //   .subscribe()
  }
}
