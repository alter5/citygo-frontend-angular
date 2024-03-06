import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, type OnInit } from "@angular/core"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"

@Component({
  selector: "app-overlay-loading",
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: "./overlay-loading.component.html",
  styleUrls: ["./overlay-loading.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayLoadingComponent {}
