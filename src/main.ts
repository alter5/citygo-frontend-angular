/// <reference types="@angular/localize" />

import {
  bootstrapApplication,
  provideProtractorTestingSupport
} from "@angular/platform-browser"
import { provideRouter } from "@angular/router"
import routeConfig from "./app/routes"
import { importProvidersFrom } from "@angular/core"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { GoogleMapsModule } from "@angular/google-maps"
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withJsonpSupport
} from "@angular/common/http"

import { AppComponent } from "./app/app.component"

import { environment } from "./environments/environment"

const applyEnvVariables = () => {
  if (environment.googleMapsKey) {
    // Set the Google Maps key to a global variable accessible in index.html
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).googleMapsKey = environment.googleMapsKey
  }
}

applyEnvVariables()

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([BrowserAnimationsModule, GoogleMapsModule]),
    provideProtractorTestingSupport(),
    provideRouter(routeConfig),
    provideHttpClient(withInterceptorsFromDi(), withJsonpSupport())
  ]
}).catch((err) => console.error(err))
