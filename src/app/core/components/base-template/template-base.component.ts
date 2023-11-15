import { Component } from "@angular/core"
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: "app-template-base",
    templateUrl: "./template-base.component.html",
    styleUrls: ["./template-base.component.scss"],
    standalone: true,
    imports: [NavbarComponent]
})
export class TemplateBaseComponent {}
