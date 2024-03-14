import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, type OnInit } from "@angular/core"

@Component({
  selector: "app-image-carousel",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./image-carousel.component.html",
  styleUrls: ["./image-carousel.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCarouselComponent {
  images = ["assets/images/city-card-images/ny-times-square.jpg", "assets/images/city-card-images/ny-centralpark.jpg", "assets/images/city-card-images/ny-skyscraper.jpg"] // replace these with your actual image paths
  currentImageIndex = 0

  changeImage(forward: boolean) {
    if (forward) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length
    } else {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.images.length) % this.images.length
    }
  }
}
