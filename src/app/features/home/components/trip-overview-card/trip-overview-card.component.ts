import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core"
import { NgFor, NgOptimizedImage, NgIf } from "@angular/common"
import { Trip } from "src/app/shared/models/trip.model"
// import img

@Component({
  selector: "app-trip-overview-card",
  templateUrl: "./trip-overview-card.component.html",
  styleUrls: ["./trip-overview-card.component.css"],
  standalone: true,
  imports: [CommonModule, NgFor, NgOptimizedImage],
})
export class TripOverviewCardComponent implements OnInit {
  @Input() trip: Trip | undefined

  ngOnInit(): void {
    ;
  }
}
