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
    return this.inputFormControl.value ?? 1
  }

  onClick(rating: number) {
    this.inputFormControl.setValue(rating)

    console.log(rating)
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault()
      const newIndex = this.currentRating - 1 // Decrement current rating
      if (newIndex > 0) {
        this.onClick(newIndex)
      }
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault()
      const newIndex = this.currentRating // Increment current rating
      if (newIndex < this.maxRating) {
        this.onClick(newIndex + 1)
      }
    }
  }

  getIcon(index: number): string {
    if (index <= this.currentRating) {
      return this.selectedIconName
    } else {
      return this.unselectedIconName
    }
  }

  isRatingSelected(index: number): boolean {
    return index <= this.currentRating
  }
}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
