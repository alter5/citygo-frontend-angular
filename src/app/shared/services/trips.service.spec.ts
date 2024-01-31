import { TestBed } from "@angular/core/testing"

import { TripsService } from "./trips.service"
import { HttpClientTestingModule } from "@angular/common/http/testing"

describe("Service Trips", () => {
  let tripsService: TripsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TripsService]
    })
    tripsService = TestBed.inject(TripsService)
  })

  it("should be created", () => {
    expect(tripsService).toBeTruthy()
  })

  it("should get trips", () => {
    const expectedResponse = "New York"
    tripsService.getAllTrips().subscribe((trips) => {
      expect(trips[0].city.city_name).toEqual("New York")
    })
  })

})
