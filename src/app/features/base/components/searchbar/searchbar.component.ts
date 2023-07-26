import { Component, OnInit } from "@angular/core"
import { FormControl } from "@angular/forms"
import { Observable } from "rxjs"
import { startWith, map } from "rxjs/operators"

@Component({
  selector: "app-searchbar",
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.scss"]
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
