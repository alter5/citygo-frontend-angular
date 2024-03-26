import { ComponentFixture, TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { PageHomeComponent } from "./page-home.component"
import { TripsService } from "src/app/shared/services/trips.service"
import { of } from "rxjs"

describe("PageHomeComponent", () => {
  let component: PageHomeComponent
  let fixture: ComponentFixture<PageHomeComponent>
  let tripsService: TripsService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, PageHomeComponent],
      providers: [ {provide: TripsService, useValue: jasmine.createSpyObj("TripsService", ["getPopularTrips"])}]
    }).compileComponents()

    fixture = TestBed.createComponent(PageHomeComponent)
    component = fixture.componentInstance
    tripsService = TestBed.inject(TripsService)
    fixture.detectChanges()
  })

  it("should start with 4 mock trips before tripsService returns data", (done) => {
    const compiled = fixture.nativeElement
    expect(component.trips$).toBeDefined()
    component.trips$.subscribe((trips) => {
      expect(trips.length).toEqual(4)
      done()
    })

    // check if 4 trips are rendered
    const tripCardElements = compiled.querySelectorAll("app-trip-overview-card")
    expect(tripCardElements.length).toEqual(4)
  })


  it("should render trips", () => {
    const mockTrip = tripsService.getMockTrip()
    const mockTrips = new Array(6).fill(mockTrip)

    spyOn(tripsService, "getPopularTrips").and.returnValue(of(mockTrips))

    // skip the component's startWith operator
    component.ngOnInit()

    fixture.detectChanges()

    // check how many app-trip-overview-card components are rendered
    const tripElements = fixture.nativeElement.querySelectorAll("app-trip-overview-card")

    expect(tripElements.length).toEqual(4)
  })
})
