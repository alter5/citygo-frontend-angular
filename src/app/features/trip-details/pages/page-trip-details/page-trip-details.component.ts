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
  delay,
  firstValueFrom,
  map,
  of,
  startWith,
  switchMap,
  tap
} from "rxjs"
import { CitiesService } from "src/app/shared/services/cities.service"
import { ImageGalleryComponent } from "src/app/shared/components/image-gallery/image-gallery/image-gallery.component"
import { ImageLoadableComponent } from "src/app/shared/components/image-loadable/image-loadable.component"
import { Trip } from "src/app/shared/models/trip.model"
import { TripsService } from "src/app/shared/services/trips.service"
import { GoogleMapComponent } from "src/app/shared/components/google-map/google-map.component"

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
  imageUrls$!: Observable<string[]>
  isLoading$ = new BehaviorSubject(true)

  images = [
    "assets/images/city-card-images/ny-skyscraper.jpg",
    "assets/images/city-card-images/ny-times-square.jpg",
    "assets/images/city-card-images/ny-centralpark.jpg"
  ]

  // TODO: Redo the image gallery to use one with buttons, and a preview bar on the right

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.trip$ = this.route.params.pipe(
      switchMap((params) => {
        const tripId = Number(params["tripId"])
        return this.tripsService.getTripById(tripId).pipe(
          startWith(null),
          map((trip) => {
            return this.parseTrip(trip)
          }),
          tap((trip) => {
            this.imageUrls$ = of(
              trip.destinations.map((destination) => destination.imageUrl)
            )
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
