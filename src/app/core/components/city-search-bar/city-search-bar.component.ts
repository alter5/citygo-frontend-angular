import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from 'src/app/shared/components/searchbar/search-bar.component';

@Component({
  selector: 'app-city-search-bar',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './city-search-bar.component.html',
  styleUrls: ['./city-search-bar.component.scss']
})
export class CitySearchBarComponent {
  onTextChanged(searchText: string) {
    if (searchText === "") {
      // return list of most populous cities
    }
    else {
      // call cities service with text, and pass through input field the returned cities
    }
  }
}
