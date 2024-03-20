import { CommonModule } from "@angular/common"
import { ChangeDetectorRef, Component, Input, Output } from "@angular/core"
import { NgFor, NgOptimizedImage, NgIf } from "@angular/common"
import { Trip } from "src/app/shared/models/trip.model"
import { EventEmitter } from "@angular/core"
import { ImageLoadableComponent } from "src/app/shared/components/image-loadable/image-loadable.component"
import { RatingComponent } from "src/app/shared/components/rating/rating.component"
// import img

@Component({
  selector: "app-trip-overview-card",
  templateUrl: "./trip-overview-card.component.html",
  styleUrls: ["./trip-overview-card.component.css"],
  standalone: true,
  imports: [CommonModule, NgFor, NgOptimizedImage, ImageLoadableComponent, RatingComponent]
})
export class TripOverviewCardComponent {
  @Input() trip: Trip | null = null
  @Output() cardClick = new EventEmitter<number>()

  constructor(private cd: ChangeDetectorRef) {}

  emitCardClick() {
    if (this.trip !== null) {
      this.cardClick.emit(this.trip.id)
    }
  }
}
