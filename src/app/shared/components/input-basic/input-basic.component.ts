import { CommonModule } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  type OnInit
} from "@angular/core"
import { FormControl, ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: "app-input-basic",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./input-basic.component.html",
  styleUrls: ["./input-basic.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputBasicComponent {
  @Input() inputFormControl = new FormControl("")
  @Input() inputId = ""
  @Input() inputLabel = ""
  @Input() hint = ""
}
