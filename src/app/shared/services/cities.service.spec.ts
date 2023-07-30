import { TestBed } from "@angular/core/testing"
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing"

import { CitiesService } from "./cities.service"

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

  it('should return data when "result" property is present in the response', () => {
    const expectedResponse = { result: ["New York"] }

    service.getCitiesContainingString("New Yor").subscribe((data) => {
      expect(data).toEqual(expectedResponse.result)
    })

    const req = httpTestingController.expectOne(service.baseUrl + "search")
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
