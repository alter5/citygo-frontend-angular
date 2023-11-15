import { Component, OnInit, Inject, Renderer2 } from "@angular/core"
import { DOCUMENT } from "@angular/common"
import { RouterModule } from '@angular/router';

import { MatSlideToggleChange, MatSlideToggleModule } from "@angular/material/slide-toggle"
import { SearchBarComponent } from "../"; // TODO: Fix import to new city-search-bar

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"],
    standalone: true,
    imports: [RouterModule, SearchBarComponent, MatSlideToggleModule]
})
export class NavbarComponent implements OnInit {
  isDarkModeEnabled = false

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.isDarkModeEnabled = JSON.parse(
      localStorage.getItem("isDarkModeEnabled") || "false"
    )
    this.changeTheme()
  }

  handleDarkModeToggle({ checked }: MatSlideToggleChange): void {
    this.isDarkModeEnabled = checked
    this.changeTheme()
  }

  changeTheme(): void {
    let result = "mat-app-background mat-typograph "

    if (this.isDarkModeEnabled === true) {
      result += "dark-theme"
    } else {
      result += "light-theme"
    }

    this.renderer.setAttribute(this.document.body, "class", result)

    localStorage.setItem(
      "isDarkModeEnabled",
      JSON.stringify(this.isDarkModeEnabled)
    )
  }
}
