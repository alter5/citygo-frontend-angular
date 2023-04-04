import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CityGo';
  theme = 'light';

  ngOnInit(): void {
    // setInterval(() => this.changeTheme(), 5000);
  }

  changeTheme(): void {
    if (this.theme === 'light') {
      this.theme = 'dark';
    } else {
      this.theme = 'light';
    }

    document.documentElement.style.setProperty('--theme', this.theme);
  }
}
