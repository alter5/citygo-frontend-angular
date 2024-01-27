import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, Input, type OnInit } from "@angular/core"
import { NgOptimizedImage } from "@angular/common"

@Component({
  selector: "app-image-gallery",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: "./image-gallery.component.html",
  styleUrls: ["./image-gallery.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageGalleryComponent implements OnInit {

  @Input() imageUrls: string[] | undefined

  ngOnInit(): void {
    ;
  }
}
