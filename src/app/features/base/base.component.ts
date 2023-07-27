import { Component } from "@angular/core"
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
    selector: "app-base",
    templateUrl: "./base.component.html",
    styleUrls: ["./base.component.scss"],
    standalone: true,
    imports: [NavbarComponent]
})
export class BaseComponent {}
