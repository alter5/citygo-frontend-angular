import { Component, Input, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-rating",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./rating.component.html",
  styleUrl: "./rating.component.scss"
})
export class RatingComponent implements OnInit {
  @Input() maxRating = 5
  @Input() currentRating = 3

  numbers: number[] = []

  ngOnInit(): void {
    // Fill array with consequent numbers
    for (let i = 0; i < this.maxRating; i++) {
      this.numbers[i] = i + 1
    }
  }
}
