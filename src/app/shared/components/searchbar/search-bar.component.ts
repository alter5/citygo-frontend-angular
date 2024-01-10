import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core"
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { Observable } from "rxjs"
import { startWith, map } from "rxjs/operators"
import { MatOptionModule } from "@angular/material/core"
import { NgFor, NgIf, AsyncPipe } from "@angular/common"
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete"
import { DropdownOption } from "./dropdown-option.model"

// TODO: Add a callback when clicking dropdown option. It should open description page of the city.

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
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
export class SearchBarComponent implements OnInit {
  @Input() formControl!: FormControl;
  @Input() dropdownOptions: DropdownOption[] | null = null
  @Output() selectedDropdownOption: EventEmitter<DropdownOption> = new EventEmitter<DropdownOption>()

  ngOnInit() {
    ;
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedOptionText: DropdownOption = event.option.value
    this.selectedDropdownOption.emit(selectedOptionText)
  }

  convertOptionToStringForDisplayWith(option: DropdownOption) {
    return option.textToDisplay
  }

}
