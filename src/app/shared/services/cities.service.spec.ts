import { TestBed } from "@angular/core/testing"
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing"

import { CitiesService } from "./cities.service"
import { HttpErrorResponse, HttpParams } from "@angular/common/http"
import { catchError, pipe } from "rxjs"

// TODO: Continue reading Testing section in www.angular.io
// TODO: Use Cypress for E2E testing
describe("Service Cities", () => {
  let service: CitiesService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CitiesService]
    })

    service = TestBed.inject(CitiesService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should return an array of cities that match the query string", () => {
    const requestUrl = service.baseUrl + "/search"

    const queryString = "Athe"
    const expectedResponse = { success: true, data: ["Athens", "Atherton"] }

    service.getCitiesContainingString(queryString).subscribe((data) => {
      expect(data).toEqual(expectedResponse.data)
    })

    const req = httpTestingController.expectOne((req) => {
      return req.url.includes(requestUrl)
    })

    expect(req.request.method).toBe("GET")

    req.flush(expectedResponse)
  })

  it("should return an empty array on error", () => {
    const requestUrl = service.baseUrl + "/mostPopulous"

    // Supresses the console.error output from the expected error
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation() // The mock does nothing when no callback is specified

    service
      .getMostPopulousCities()
      .pipe(
        catchError((error) => {
          fail("The cities service should not throw any errors")
        })
      )
      .subscribe((cities) => {
        expect(cities).toBe([])
      })

    const req = httpTestingController.expectOne((req) => {
      return req.url.includes(requestUrl)
    })

    req.flush("Test error message", { status: 404, statusText: "Not Found" })

    consoleErrorSpy.mockRestore()
  })
})
