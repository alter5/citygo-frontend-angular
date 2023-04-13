import { Component, OnInit, Inject, Renderer2 } from "@angular/core"
import { DOCUMENT } from "@angular/common"

import { MatSlideToggleChange } from "@angular/material/slide-toggle"

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
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
