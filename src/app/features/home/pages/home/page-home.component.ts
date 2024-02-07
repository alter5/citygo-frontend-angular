import { Component, OnInit } from "@angular/core"
import { NgFor, AsyncPipe } from "@angular/common"
import { TestThemeComponent } from "../../components/test-theme/test-theme.component"
import { TripOverviewCardComponent } from "../../components/trip-overview-card/trip-overview-card.component"
import { TripsService } from "src/app/shared/services/trips.service"
import { Observable } from "rxjs"
import { Trip } from "src/app/shared/models/trip.model"
import { InputAutocompleteComponent } from "src/app/shared/components/input-autocomplete/input-autocomplete.component"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"

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
    MatButtonModule,
    MatIconModule
  ]
})
export class PageHomeComponent implements OnInit {
  trips$: Observable<Trip[]> | undefined


  constructor(private tripsService: TripsService) {}

  ngOnInit(): void {
    this.trips$ = this.tripsService.getAllTrips()
    this.trips$.subscribe((trips) => console.log("Trips:", trips))
  }
}
