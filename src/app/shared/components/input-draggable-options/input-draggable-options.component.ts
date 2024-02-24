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
import { InputAutocompleteComponent } from "../input-autocomplete/input-autocomplete.component"

@Component({
  selector: "app-input-draggable-options",
  standalone: true,
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    ReactiveFormsModule,
    FormControlPipe,
    InputAutocompleteComponent
  ],
  templateUrl: "./input-draggable-options.component.html",
  styleUrls: ["./input-draggable-options.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputDraggableOptionsComponent implements OnInit {
  @Input() inputFormArray: FormArray = new FormArray([new FormControl("")])

  ngOnInit(): void {;}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.inputFormArray.controls,
      event.previousIndex,
      event.currentIndex
    )
    // moveItemInArray(this.myForm.get('items').value, event.previousIndex, event.currentIndex);
  }

  // moveItemInFormArray(
  //   formArray: FormArray,
  //   fromIndex: number,
  //   toIndex: number
  // ): void {
  //   const direction = toIndex > fromIndex ? 1 : -1

  //   const item = formArray.at(fromIndex)
  //   for (
  //     let i = fromIndex;
  //     i * direction < toIndex * direction;
  //     i = i + direction
  //   ) {
  //     const current = formArray.at(i + direction)
  //     formArray.setControl(i, current)
  //   }
  //   formArray.setControl(toIndex, item)
  // }

  // drop(event: CdkDragDrop<string[]>) {
  //   this.moveItemInFormArray(this.fa, event.previousIndex, event.currentIndex)
  // }
}
