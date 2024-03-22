import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, Input } from "@angular/core"
import { ImageCarouselSlide } from "./image-carousel-slide.model"

@Component({
  selector: "app-image-carousel",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./image-carousel.component.html",
  styleUrls: ["./image-carousel.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCarouselComponent {
  @Input() slides: ImageCarouselSlide[] | null = null // replace these with your actual image paths

  currentSlideIndex = 0

  changeImage(forward: boolean) {
    if (this.slides === null || this.slides.length < 1) {
      return
    }
    if (forward) {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length
    } else {
      this.currentSlideIndex =
        (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length
    }
  }
}
