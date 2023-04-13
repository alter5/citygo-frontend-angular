import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { HomeComponent } from "./components/home/home.component"
import { NavbarComponent } from "./components/navbar/navbar.component"
import { BaseComponent } from "./templates/base/base.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { TestThemeComponent } from './components/test-theme/test-theme.component'

@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent, BaseComponent, TestThemeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
