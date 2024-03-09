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
export class PageTripDetailsComponent implements OnInit, OnDestroy {
  tripSubscription!: Subscription
  trip: Trip | null = null

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
    this.tripSubscription = this.route.params
      .pipe(
        switchMap((params) => {
          const tripId = Number(params["tripId"])
          return this.tripsService.getTripById(tripId).pipe(
            startWith(null),
            tap((trip) => {
              this.trip = trip
              this.cdr.detectChanges()
            })
          )
        }),
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    if (this.tripSubscription) {
      this.tripSubscription.unsubscribe()
    }
  }

  get destinations(): Trip["destinations"] {
    if (this.trip === null) {
      return new Array(3).fill(null)
    }
    return this.trip.destinations
  }

  get imageUrls(): string[] | null {
    if (this.trip === null) {
      return null
    }
    return this.destinations.map((destination) => destination?.imageUrl ?? "")
  }
}
