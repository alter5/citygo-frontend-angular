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
import { MatAutocompleteModule } from "@angular/material/autocomplete"
import { TestThemeComponent } from "./components/test-theme/test-theme.component"
import { ModalComponent } from "./components/modal/modal.component"
import { SidebarComponent } from "./components/sidebar/sidebar.component"
import { SearchBarComponent } from "./search-bar/search-bar.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    BaseComponent,
    TestThemeComponent,
    ModalComponent,
    SidebarComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
