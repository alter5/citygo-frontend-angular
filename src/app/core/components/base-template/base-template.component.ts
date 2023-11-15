import { Component } from "@angular/core"
import { NavbarComponent } from "../core/components/navbar/navbar.component";

@Component({
    selector: "app-base",
    templateUrl: "./base-template.component.html",
    styleUrls: ["./base-template.component.scss"],
    standalone: true,
    imports: [NavbarComponent]
})
export class BaseComponent {}
