import { CommonModule } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  type OnInit
} from "@angular/core"
import { GoogleMapsModule } from "@angular/google-maps"
import {
  BehaviorSubject,
  Observable,
  catchError,
  forkJoin,
  from,
  map,
  tap
} from "rxjs"
import { GoogleMapsService } from "../../services/google-maps.service"

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
  @Input() city = ""

  markers$ = new BehaviorSubject<Marker[]>([])
  center$ = new BehaviorSubject<Marker>({
    location: { lng: 24, lat: 12 }
  } as Marker)

  zoom = 4

  constructor(private googleMapsService: GoogleMapsService) {}

  ngOnInit(): void {
    if (this.markers) {
      this.markers$.next(this.markers)
    } else if (this.destinations) {
      if (this.city === "") {
        throw new Error(
          "A city must be specified if passing an array of destinations"
        )
      }
      const _markers$ = from(
        this.googleMapsService.convertDestinationsToMarkers(
          this.destinations,
          this.city
        )
      ).pipe(
        tap((markers) => {
          this.markers$.next(markers)
          this.center$.next(
            this.googleMapsService.getCenterOfMarkers(this.markers$.value)
          )
        })
      )

      _markers$.subscribe()
    } else {
      // Use default BehaviorSubject value
    }
  }
}
