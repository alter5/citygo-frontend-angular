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

  it("should return an array of cities that match the query string", (done) => {
    const queryString = "Athe"
    const expectedResponse = { success: true, data: ["Athens", "Atherton"] }

    service.getCitiesContainingString(queryString).subscribe((data) => {
      expect(data).toEqual(expectedResponse.data)
      done()
    })

    let requestUrl = service.baseUrl + "/search"
    const params = new HttpParams().set("queryString", queryString)
    requestUrl += "?" + params.toString()

    const req = httpTestingController.expectOne(requestUrl)
    expect(req.request.method).toBe("GET")

    req.flush(expectedResponse)
  })

  it("should return an empty array on error", (done) => {
    const queryString = "Athe"

    service.getCitiesContainingString(queryString).subscribe((cities) => {
      console.log("🚀 ~ service.getCitiesContainingString ~ cities:", cities)
      expect(cities).toEqual([])
      done()
    })

    const req = httpTestingController.expectOne(
      (req) =>
        req.url.includes(service.baseUrl + "/search") && req.method === "GET"
    )

    req.flush(
      new HttpErrorResponse({
        status: 500,
        statusText: "Internal Server Error"
      })
    )
  })
})
