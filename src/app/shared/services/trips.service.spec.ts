import { TestBed } from "@angular/core/testing"

import { TripsService } from "./trips.service"
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing"
import { ApiResponse } from "../models/apiResponse.model"
import { TripCreationDto } from "src/app/features/create-trip/models/tripCreationPayload.model"
import { Trip } from "../models/trip.model"

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

  it("should return false when creating a trip is unsuccessful", () => {
    const tripDto: TripCreationDto = {
      title: "Las Vegas in one day",
      city_id: 0,
      destinations: [],
      description: "",
      price_range: 0,
      duration: 0
    }

    service.createTrip(tripDto).subscribe((response) => {
      expect(response).toBe(false)
    })

    const req = httpTestingController.expectOne(service.baseUrl + "/createTrip")

    expect(req.request.method).toBe("POST")

    req.flush(null, { status: 404, statusText: "Internet error" })
  })

  it("should get popular trips", () => {
    const expectedResponse: Trip = {
      id: 0,
      title: "Las Vegas in one day",
      city: {
        id: 0,
        city_name: "",
        state: "",
        state_abbreviation: "",
        population: 0,
        latitude: 0,
        longitude: 0
      },
      priceRange: 0,
      rating: 0,
      description: "",
      destinations: []
    }

    service.getPopularTrips().subscribe((response) => {
      expect(response.length).toBe(1)
      expect(response[0].title).toBe(expectedResponse.title)
    })

    const req = httpTestingController.expectOne(
      service.baseUrl + "/popularTrips"
    )
    expect(req.request.method).toBe("GET")

    req.flush({ success: true, data: [expectedResponse] } as ApiResponse)
  })

  it("should get trip by id", async () => {
    const mockTrip = getMockTrip()
    const mockResponse: ApiResponse = { success: true, data: mockTrip }
    const idToSearch = 1

    service.getTripById(idToSearch).subscribe((trip) => {
      expect(trip?.title).toBe(mockTrip.title)
    })

    const req = httpTestingController.expectOne(service.baseUrl + "/getTripById/" + idToSearch)
    expect(req.request.method).toBe("GET")

    req.flush(mockResponse)
  })

  const getMockTrip = (): Trip => {
    const mockTrip: Trip = {
      id: 0,
      title: "Las Vegas in one day",
      city: {
        id: 0,
        city_name: "",
        state: "",
        state_abbreviation: "",
        population: 0,
        latitude: 0,
        longitude: 0
      },
      priceRange: 0,
      rating: 0,
      description: "",
      destinations: []
    }
    return mockTrip
  }
})
