import { Component } from "@angular/core"
import { TemplateBaseComponent } from "./core/components/base-template/template-base.component"
import { PageHomeComponent } from "./features/home/pages/home/page-home.component"
import { RouterModule } from '@angular/router';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterModule,
    TemplateBaseComponent,
    PageHomeComponent
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {}
