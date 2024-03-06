import { TestBed } from "@angular/core/testing"

import { TripsService } from "./trips.service"
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing"
import { ApiResponse } from "../models/apiResponse.model"
import { TripCreationDto } from "src/app/features/create-trip/models/tripCreationPayload.model"

describe("Service Trips", () => {
  let service: TripsService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TripsService]
    })
    service = TestBed.inject(TripsService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should create a trip", () => {
    const tripDto: TripCreationDto = {
      title: "Las Vegas in one day",
      city_id: 0,
      destinations: [],
      description: "",
      price_range: 0,
      duration: 0
    }

    service.createTrip(tripDto).subscribe((response) => {
      expect(response).toBe(true)
    })

    const req = httpTestingController.expectOne(service.baseUrl + "/createTrip")

    expect(req.request.method).toBe("POST")
    
    req.flush({ success: true } as ApiResponse)
  })

  it("should get popular trips", () => {
    service.getPopularTrips().subscribe((response) => {
      expect(response.length).toBeGreaterThan(0)
      expect(response[0].title)
    })

    const req = httpTestingController.expectOne(
      service.baseUrl + "/popularTrips"
    )
    expect(req.request.method).toBe("GET")
  })

  // it("should get trips", () => {
  //   const expectedResponse = "New York"
  //   tripsService.getAllTrips().subscribe((trips) => {
  //     expect(trips[0].city.city_name).toEqual("New York")
  //   })
  // })
})
