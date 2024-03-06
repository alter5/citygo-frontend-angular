import { TestBed } from "@angular/core/testing"
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing"

import { CitiesService } from "./cities.service"
import { HttpErrorResponse, HttpParams } from "@angular/common/http"
import { catchError, of, pipe } from "rxjs"
import { ApiResponse } from "../models/apiResponse.model"
import { City } from "../models/city.model"

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
    const searchString = "Athe"

    const expectedCity1: City = {
      id: 0,
      city_name: "Athens",
      state: "",
      state_abbreviation: "",
      population: 0,
      latitude: 0,
      longitude: 0
    }
    const expectedCity2: City = {
      id: 0,
      city_name: "Atherton",
      state: "",
      state_abbreviation: "",
      population: 0,
      latitude: 0,
      longitude: 0
    }
    
    const expectedResponse: ApiResponse = {
      success: true,
      data: [expectedCity1, expectedCity2]
    }

    service.getCitiesContainingString(searchString).subscribe((result) => {
      expect(result.length).toBeGreaterThan(0)

      expect(result[0]).toEqual(expectedCity1)
      expect(result[1]).toEqual(expectedCity2)
    })

    const req = httpTestingController.expectOne((req) => {
      return req.url.startsWith(requestUrl) && req.url.includes(searchString)
    })

    expect(req.request.method).toBe("GET")

    req.flush(expectedResponse)
  })

  it("should return an empty array on error", () => {
    const requestUrl = service.baseUrl + "/mostPopulous"

    // Suppress the expected error output
    // const consoleErrorSpy = jest
    //   .spyOn(console, "error")
    //   .mockImplementation(() => {
    //     // Do nothing
    //   })

    service
      .getMostPopulousCities()
      .pipe(
        catchError((error) => {
          fail("The cities service should not throw any errors")
          return of([])
        })
      )
      .subscribe((cities) => {
        expect(cities).toBe([])
      })

    const req = httpTestingController.expectOne((req) => {
      return req.url.includes(requestUrl)
    })

    req.flush("Test error message", { status: 404, statusText: "Not Found" })

    // consoleErrorSpy.mockRestore()
  })
})
