import { TestBed } from "@angular/core/testing"

import { TripsService } from "./trips.service"
import { HttpClientTestingModule } from "@angular/common/http/testing"

describe("Service Trips", () => {
  let service: TripsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TripsService]
    })
    service = TestBed.inject(TripsService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })


})
