import { Component } from "@angular/core"
import { BaseComponent } from "./features/base/base.component"
import { HomeComponent } from "./features/home/components/home.component"
import { RouterModule } from '@angular/router';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterModule,
    BaseComponent,
    HomeComponent
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {}
