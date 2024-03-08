import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component } from "@angular/core"
import { Input } from "@angular/core"
import { NgOptimizedImage } from "@angular/common"

@Component({
  selector: "app-image-loadable",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
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
  }
}
