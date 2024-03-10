import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, Input, type OnInit } from "@angular/core"
import { GoogleMapsModule } from "@angular/google-maps"

@Component({
  selector: "app-google-map",
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: "./google-map.component.html",
  styleUrls: ["./google-map.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleMapComponent implements OnInit {
  @Input() center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;

  ngOnInit(): void {
;  }
}
