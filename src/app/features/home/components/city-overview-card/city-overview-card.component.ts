import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core"
import { NgFor, NgOptimizedImage, NgIf } from "@angular/common"
// import img

@Component({
  selector: "app-city-overview-card",
  templateUrl: "./city-overview-card.component.html",
  styleUrls: ["./city-overview-card.component.css"],
  standalone: true,
  imports: [CommonModule, NgFor],
})
export class CityOverviewCardComponent implements OnInit {
  images: string[] | null = null

  ngOnInit(): void {
    this.images = [
      "assets/images/city-card-images/ny-skyscraper.jpg",
      "assets/images/city-card-images/ny-times-square.jpg",
      "assets/images/city-card-images/ny-centralpark.jpg"
    ]
  }
}
