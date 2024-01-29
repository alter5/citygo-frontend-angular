import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core"
import { NgFor, NgOptimizedImage, NgIf } from "@angular/common"
import { City } from "src/app/shared/models/city.model"
// import img

@Component({
  selector: "app-trip-overview-card",
  templateUrl: "./trip-overview-card.component.html",
  styleUrls: ["./trip-overview-card.component.css"],
  standalone: true,
  imports: [CommonModule, NgFor],
})
export class TripOverviewCardComponent implements OnInit {
  @Input() trip: City | undefined
  @Input() images: string[] | undefined

  ngOnInit(): void {
    this.images = [
      "assets/images/city-card-images/ny-skyscraper.jpg",
      "assets/images/city-card-images/ny-times-square.jpg",
      "assets/images/city-card-images/ny-centralpark.jpg"
    ]
  }
}
