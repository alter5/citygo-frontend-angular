import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { PageHomeComponent } from "./page-home.component"
import { TripsService } from "src/app/shared/services/trips.service"
import { delay, first, of, take } from "rxjs"
import { Trip } from "src/app/shared/models/trip.model"
import { getMockTrip } from "src/app/shared/models/tripMock"

describe("PageHomeComponent", () => {
  let component: PageHomeComponent
  let fixture: ComponentFixture<PageHomeComponent>
  let tripsServiceSpy: jasmine.SpyObj<TripsService>

  beforeEach(async () => {
    tripsServiceSpy = jasmine.createSpyObj("TripsService", ["getPopularTrips"])

    // Delay is used to simulate the time it takes for the service to return data

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
  })

  it("should render trips", () => {
    const mockTrip = getMockTrip()
    mockTrip.title = "Test title"
    const mockTrips = new Array(6).fill(mockTrip)

    tripsServiceSpy.getPopularTrips.and.returnValue(of(mockTrips))

    fixture.detectChanges()

    // check how many app-trip-overview-card components are rendered
    const tripElements = fixture.nativeElement.querySelectorAll("app-trip-overview-card")

    expect(tripElements.length).toEqual(6)
  })

  it("should render dummy trips while loading data from service", async () => {
    // Delay is used to simulate the time it takes for the service to return data
    tripsServiceSpy.getPopularTrips.and.returnValue(
      of(new Array(3).fill(getMockTrip())).pipe(delay(1))
    )

    fixture.detectChanges()

    const compiled = fixture.nativeElement

    component.trips$.pipe(first()).subscribe((trips) => {
      // The component should not render the actual trips until the service returns data
      expect(trips.length).not.toEqual(3)

      // The number of dummy trips created in ngOnInit
      expect(trips.length).toEqual(4)

      const tripCardElements = compiled.querySelectorAll("app-trip-overview-card")
      expect(tripCardElements.length).toEqual(4)
    })
  })
})
