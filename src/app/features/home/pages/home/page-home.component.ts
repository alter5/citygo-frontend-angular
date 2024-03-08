import { Component, OnInit } from "@angular/core"
import { NgFor, AsyncPipe } from "@angular/common"
import { TestThemeComponent } from "../../components/test-theme/test-theme.component"
import { TripOverviewCardComponent } from "../../components/trip-overview-card/trip-overview-card.component"
import { TripsService } from "src/app/shared/services/trips.service"
import { Observable, startWith } from "rxjs"
import { Trip } from "src/app/shared/models/trip.model"
import { InputAutocompleteComponent } from "src/app/shared/components/input-autocomplete/input-autocomplete.component"
import { NgClass } from "@angular/common"
import { ButtonNewTripComponent } from "../../components/button-new-trip/button-new-trip.component"

@Component({
  selector: "app-home",
  templateUrl: "./page-home.component.html",
  styleUrls: ["./page-home.component.scss"],
  standalone: true,
  imports: [
    TestThemeComponent,
    TripOverviewCardComponent,
    NgFor,
    AsyncPipe,
    InputAutocompleteComponent,
    NgClass,
    ButtonNewTripComponent
  ]
})
export class PageHomeComponent implements OnInit {
  trips$: Observable<Trip[]> = this.tripsService.getPopularTrips()

  constructor(private tripsService: TripsService) {}

  ngOnInit(): void {
    this.trips$ = this.trips$.pipe(startWith(Array(5).fill(null)))
  }
}
