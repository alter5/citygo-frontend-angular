import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, Input, type OnInit } from "@angular/core"
import { ImageLoadableComponent } from "../../image-loadable/image-loadable.component"

@Component({
  selector: "app-image-gallery",
  standalone: true,
  imports: [CommonModule, ImageLoadableComponent],
  templateUrl: "./image-gallery.component.html",
  styleUrls: ["./image-gallery.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageGalleryComponent implements OnInit {

  @Input() imageUrls: string[] | null = null

  ngOnInit(): void {
    ;
  }
}
