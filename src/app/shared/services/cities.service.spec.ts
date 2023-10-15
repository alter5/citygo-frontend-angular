import { TestBed } from "@angular/core/testing"
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing"

import { CitiesService } from "./cities.service"
import { HttpParams } from "@angular/common/http"

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

  it('should return an array of cities that match the query string', (done) => {
    const queryString = "New"
    const expectedResponse = { result: ["New York", "New Ark"] }

    service.getCitiesContainingString(queryString).subscribe((data) => {
      expect(data).toEqual(expectedResponse.result)
      done()
    })

    let requestUrl = service.baseUrl + "search"
    const params = new HttpParams().set("queryString", queryString)
    requestUrl += "?" + params.toString()

    const req = httpTestingController.expectOne(requestUrl)
    expect(req.request.method).toBe("GET")

    req.flush(expectedResponse)
  })

  it('should return an empty array if the request was unsuccessful', () => {
    // TODO: Edit the cities endpoint to return entire city objects, not just names
    // TODO: Create ts type "city"
    /* TODO: Implement Cypress E2E tests.
    Lookup integration tests using Cypress in fullstackopen: https://fullstackopen.com/en/part5/end_to_end_testing
    Fix the backend dropdb script so that the dbClient still works after dropping.
    Add an endpoint to drop the db. The tests need to be able to call this endpoint.
    Add conditional checking if app is in testing mode before adding endpoint
    */
    const queryString = "New"

    service.getCitiesContainingString(queryString).subscribe((data) => {
      expect(data).toEqual(expectedResponse.result)
      done()
    })

    let requestUrl = service.baseUrl + "search"
    const params = new HttpParams().set("queryString", queryString)
    requestUrl += "?" + params.toString()

    const req = httpTestingController.expectOne(requestUrl)
    expect(req.request.method).toBe("GET")

    req.flush(expectedResponse)

  })

  // it('should return an empty array when "result" property is not present in the response', () => {
  //   const mockResponse = { otherProperty: "someValue" }
  //   const parameter1 = "value1"
  //   const parameter2 = 42

  //   service.getDataWithParameters(parameter1, parameter2).subscribe((data) => {
  //     expect(data).toEqual([])
  //   })

  //   const req = httpTestingController.expectOne(
  //     `https://api.example.com/data?param1=${parameter1}&param2=${parameter2}`
  //   )
  //   expect(req.request.method).toBe("GET")

  //   req.flush(mockResponse)
  // })

  // it("should return an empty array on error", () => {
  //   const parameter1 = "value1"
  //   const parameter2 = 42

  //   service.getDataWithParameters(parameter1, parameter2).subscribe(
  //     (data) => {
  //       expect(data).toEqual([])
  //     },
  //     (error) => {
  //       fail("Should not have thrown an error")
  //     }
  //   )

  //   const req = httpTestingController.expectOne(
  //     `https://api.example.com/data?param1=${parameter1}&param2=${parameter2}`
  //   )
  //   expect(req.request.method).toBe("GET")

  //   req.error(new ErrorEvent("404"))
  // })
})
