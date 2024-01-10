import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-page-city",
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-city.component.html',
  styleUrls: ['./page-city.component.scss']
})
export class PageCityComponent implements OnInit {
  cityId: number | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cityId = Number(params['city-name']);
      console.log(this.cityId)
    });
  }
}
