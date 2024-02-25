import { CommonModule } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  type OnInit
} from "@angular/core"
import { FormArray, FormControl, ReactiveFormsModule } from "@angular/forms"
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray
} from "@angular/cdk/drag-drop"
import { FormControlPipe } from "../../pipes/form-control.pipe"
import { InputBasicComponent } from "../input-basic/input-basic.component"

@Component({
  selector: "app-input-draggable-options",
  standalone: true,
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    ReactiveFormsModule,
    FormControlPipe,
    InputBasicComponent
  ],
  templateUrl: "./input-draggable-options.component.html",
  styleUrls: ["./input-draggable-options.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputDraggableOptionsComponent {
  @Input() inputFormArray: FormArray = new FormArray([new FormControl("")])

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.inputFormArray.controls,
      event.previousIndex,
      event.currentIndex
    )
  }
}
