import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component } from "@angular/core"
import { Input } from "@angular/core"
import { BehaviorSubject } from "rxjs"

// import { NgOptimizedImage } from "@angular/common"

@Component({
  selector: "app-image-loadable",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./image-loadable.component.html",
  styleUrls: ["./image-loadable.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageLoadableComponent {
  @Input() imageUrl!: string
  @Input() inputImageAlt = ""
  imageLoaded = false

  onImageLoad() {
    this.imageLoaded = true
    console.log("🚀 ~ ImageLoadableComponent ~ onImageLoaded ~ this.imageLoaded:", this.imageLoaded)
  }
}
