import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, type OnInit } from "@angular/core"
import { GoogleMapsModule } from "@angular/google-maps"
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
export class GoogleMapComponent implements OnInit, OnChanges {
  // Source for Angular Google Maps: https://github.com/angular/components/tree/main/src/google-maps
  // Note: the package will be updated soon with new documentation at: https://github.com/angular/components/tree/17.0.x/src/google-maps
  // Website for Google Cloud Console: https://console.cloud.google.com/

  @Input() markers: Marker[] | null = []
  @Input() center: Marker | null = null

  zoom = 12

  constructor(private googleMapsService: GoogleMapsService) {}

  ngOnInit(): void {
    if (this.center === null) {
      this.center = {
        // Washington D.C.
        location: { lng: 77, lat: 38.9 }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log("🚀 ~ GoogleMapComponent ~ ngOnChanges ~ changes:", changes)
  }
}
