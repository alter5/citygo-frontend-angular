import { CommonModule } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  type OnInit
} from "@angular/core"
import { GoogleMapsModule } from "@angular/google-maps"
import { Observable, catchError, forkJoin } from "rxjs"

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

  @Input() center: google.maps.LatLngLiteral = { lat: 24, lng: 12 }
  @Input() destinations!: string[]

  markerPositions: google.maps.LatLng[] | null = null
  zoom = 4

  ngOnInit(): void {
    if (this.destinations !== undefined) {
      this.parseDestinations(this.destinations)
    }
  }

  async parseDestinations(destinations: string[]) {
    const { Place } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary //prettier-ignore
    const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary //prettier-ignore

    for (let destination of destinations) { }

    const observables = this.strings.map(str =>
      this.numberService.getNumberFromString(str)
    );

    const obs = new Observable((observer) => {
      forkJoin(destinations).subscribe((places) => {
        observer.next(places)
        observer.complete()
      }),
      catchError((error) => {
        console.error(error)
        return []
      })})


    destination = "The Strip, Las Vegas"

    const request = {
      query: destination,
      fields: ['name', 'geometry'],
    };

    var service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
        map.setCenter(results[0].geometry.location);
      }
    });

    




    const { places } = await Place.searchByText(request)

    if (places.length) {
      console.log("🚀 ~ parseDestinations ~ places:", places)

      //prettier-ignore
      const { LatLngBounds } = (await google.maps.importLibrary("core")) as google.maps.CoreLibrary
      const bounds = new LatLngBounds()

      // Loop through and get all the results.
      places.forEach((place) => {
        const markerView = new AdvancedMarkerElement({
          position: place.location,
          title: place.displayName
        })

        bounds.extend(place.location)
        console.log(place)
      })

      map.setCenter(bounds.getCenter())
    } else {
      console.log("No results")
  }
}
