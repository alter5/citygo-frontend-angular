import { ComponentFixture, TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { PageHomeComponent } from "./page-home.component"
import { TripsService } from "src/app/shared/services/trips.service"
import { of, take } from "rxjs"
import { Trip } from "src/app/shared/models/trip.model"
import { getMockTrip } from "src/app/shared/models/tripMock"

describe("PageHomeComponent", () => {
  let component: PageHomeComponent
  let fixture: ComponentFixture<PageHomeComponent>
  let tripsServiceSpy: jasmine.SpyObj<TripsService>

  beforeEach(async () => {
    tripsServiceSpy = jasmine.createSpyObj("TripsService", ["getPopularTrips"])
    tripsServiceSpy.getPopularTrips.and.returnValue(of(new Array(3).fill(getMockTrip())))

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, PageHomeComponent],
      providers: [
        {
          provide: TripsService,
          useValue: tripsServiceSpy
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(PageHomeComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it("should start with 4 mock trips before tripsService returns data", () => {
    const compiled = fixture.nativeElement

    component.trips$.pipe(take(1)).subscribe((trips) => {
      expect(trips.length).toEqual(4)

      const tripCardElements = compiled.querySelectorAll("app-trip-overview-card")
      expect(tripCardElements.length).toEqual(4)
    })
  })

  it("should render trips", () => {
    const mockTrip: Partial<Trip> = { title: "Mock Trip" }
    const mockTrips = new Array(6).fill(mockTrip)

    fixture.detectChanges()

    // check how many app-trip-overview-card components are rendered
    const tripElements = fixture.nativeElement.querySelectorAll("app-trip-overview-card")

    expect(tripElements.length).toEqual(4)
  })
})
