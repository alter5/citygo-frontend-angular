import { CommonModule } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  type OnInit
} from "@angular/core"
import { FormControl, ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: "app-input-large",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./input-large.component.html",
  styleUrls: ["./input-large.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputLargeComponent implements OnInit {
  @Input() inputFormControl = new FormControl("")
  @Input() inputLabel = ""

  idForLabel = "input-large-" + crypto.randomUUID()

  ngOnInit(): void {;}
}
