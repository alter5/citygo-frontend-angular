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

@Component({
  selector: "app-page-trip-details",
  standalone: true,
  imports: [CommonModule, ImageLoadableComponent, ImageGalleryComponent],
  templateUrl: "./page-trip-details.component.html",
  styleUrls: ["./page-trip-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTripDetailsComponent implements OnInit {
  trip$!: Observable<Trip>
  imageUrls!: string[]
  // trip!: Trip

  isLoading = true

  images = [
    "assets/images/city-card-images/ny-skyscraper.jpg",
    "assets/images/city-card-images/ny-times-square.jpg",
    "assets/images/city-card-images/ny-centralpark.jpg"
  ]

  // TODO: Use this to add maps: https://github.com/angular/components?tab=readme-ov-file

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
            this.imageUrls = trip.destinations.map(
              (destination) => destination.imageUrl
            )
          })
        )
      })
    )
  }

  parseTrip(trip: Trip | null): Trip {
    if (trip === null) {
      this.isLoading = true
      return this.getMockTrip()
    }
    this.isLoading = false
    return trip
  }

  getMockTrip(): Trip {
    this.isLoading = true

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
