import { CommonModule } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  type OnInit,
  EventEmitter
} from "@angular/core"
import { FormControl } from "@angular/forms"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"

@Component({
  selector: "app-input-rating",
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: "./input-rating.component.html",
  styleUrls: ["./input-rating.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputRatingComponent implements OnInit {
  @Input() maxRating = 5
  @Input() color = "accent"
  @Input() inputFormControl = new FormControl(1)
  @Input() selectedIconName = ""
  @Input() unselectedIconName = ""
  @Input() id = ""
  @Input() labelText = ""

  @Output() ratingUpdated = new EventEmitter()

  ratingValues: number[] = []

  ngOnInit(): void {
    for (let i = 0; i < this.maxRating; i++) {
      this.ratingValues.push(i + 1)
    }
  }

  get currentRating() {
    return this.inputFormControl.value
  }

  onClick(rating: number) {
    this.inputFormControl.setValue(rating)

    console.log(rating)
  }

  getIcon(index: number) {
    if (this.currentRating! >= index + 1) {
      return this.selectedIconName
    } else {
      return this.unselectedIconName
    }
  }
}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
