import { Component, OnInit } from "@angular/core"
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { Observable } from "rxjs"
import { startWith, map } from "rxjs/operators"
import { MatOptionModule } from "@angular/material/core";
import { NgFor, AsyncPipe } from "@angular/common";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

@Component({
    selector: "app-searchbar",
    templateUrl: "./searchbar.component.html",
    styleUrls: ["./searchbar.component.scss"],
    standalone: true,
    imports: [FormsModule, MatAutocompleteModule, ReactiveFormsModule, NgFor, MatOptionModule, AsyncPipe]
})
export class SearchBarComponent implements OnInit {
  control = new FormControl("")
  streets: string[] = [
    "Champs-Élysées",
    "Lombard Street",
    "Abbey Road",
    "Fifth Avenue"
  ]
  filteredStreets: Observable<string[]> | undefined

  ngOnInit() {
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value || ""))
    )
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value)
    return this.streets.filter((street) =>
      this._normalizeValue(street).includes(filterValue)
    )
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, "")
  }
}
