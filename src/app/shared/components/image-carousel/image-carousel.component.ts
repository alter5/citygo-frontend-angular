import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, Input, type OnInit } from "@angular/core"
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
  @Input() slides: ImageCarouselSlide[] = [
    {
      imageUrl: "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?q=80&w=1217&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Times Square"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?q=80&w=1217&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Times Square"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?q=80&w=1217&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Times Square"
    }
  ] // replace these with your actual image paths

  currentSlideIndex = 0

  changeImage(forward: boolean) {
    if (forward) {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length
    } else {
      this.currentSlideIndex =
        (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length
    }
  }
}
