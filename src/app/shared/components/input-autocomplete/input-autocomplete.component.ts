import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core"
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { Observable } from "rxjs"
import { startWith, map } from "rxjs/operators"
import { MatOptionModule } from "@angular/material/core"
import { NgFor, NgIf, AsyncPipe } from "@angular/common"
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent
} from "@angular/material/autocomplete"
import { DropdownOption } from "./dropdown-option.model"

@Component({
  selector: "app-input-autocomplete",
  templateUrl: "./input-autocomplete.component.html",
  styleUrls: ["./input-autocomplete.component.scss"],
  standalone: true,
  imports: [
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    MatOptionModule,
    AsyncPipe
  ]
})
export class InputAutocompleteComponent implements OnInit {
  @Input() hint = ""
  @Input() inputFormControl = new FormControl("")
  @Input() inputLabel = ""
  @Input() dropdownOptions: DropdownOption[] | null = []

  @Output() selectedDropdownOption = new EventEmitter<DropdownOption>()
  @Output() clickInputField = new EventEmitter<void>()

  idForLabel = "input-autocomplete-" + crypto.randomUUID()

  ngOnInit() {;}

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedOptionText: DropdownOption = event.option.value
    this.selectedDropdownOption.emit(selectedOptionText)
  }

  convertOptionToString(option: DropdownOption | string): string {
    if (typeof option === "string") {
      return option
    } else {
      option = option as DropdownOption
      return option.textToDisplay
    }
  }

  onClickInputField() {
    this.clickInputField.emit()
  }
}
