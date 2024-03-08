import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output } from "@angular/core"
import { NgFor, NgOptimizedImage, NgIf } from "@angular/common"
import { Trip } from "src/app/shared/models/trip.model"
import { EventEmitter } from "@angular/core"
// import img

@Component({
  selector: "app-trip-overview-card",
  templateUrl: "./trip-overview-card.component.html",
  styleUrls: ["./trip-overview-card.component.css"],
  standalone: true,
  imports: [CommonModule, NgFor, NgOptimizedImage],
})
export class TripOverviewCardComponent {
  @Input() trip: Trip | null = null
  @Output() cardClick = new EventEmitter<number>()

  constructor(private cd: ChangeDetectorRef){}

  emitCardClick() {
    if (this.trip !== null) {
      this.cardClick.emit(this.trip.id)
    }
  }
}
