import { CommonModule } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  type OnInit
} from "@angular/core"
import { GoogleMapsModule } from "@angular/google-maps"

@Component({
  selector: "app-google-map",
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: "./google-map.component.html",
  styleUrls: ["./google-map.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleMapComponent {
  @Input() center: google.maps.LatLngLiteral = { lat: 24, lng: 12 }

  zoom = 4

  // Source for Angular Google Maps: https://github.com/angular/components/tree/main/src
  // Note: the package will be updated soon with new documentation at: https://github.com/angular/components/tree/17.0.x/src/google-maps
}
