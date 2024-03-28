import { ComponentFixture, TestBed } from "@angular/core/testing"
import { InputRatingComponent } from "./input-rating.component"
import { By } from "@angular/platform-browser"

describe("InputRatingComponent", () => {
  let component: InputRatingComponent
  let fixture: ComponentFixture<InputRatingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputRatingComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRatingComponent)
    component = fixture.componentInstance
  })

  it("should create the component", () => {
    expect(component).toBeTruthy()
  })

  it("should render the correct number of buttons", () => {
    const maxRating = 10
    const currentRating = 3

    component.maxRating = maxRating

    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(
      By.css("[data-testid='input-rating-button']")
    )
    expect(buttons.length).toBe(maxRating)
  })

  it("should highlight the correct number of buttons", () => {
    const maxRating = 10
    const currentRating = 3
    const selectedIconName = "foo"
    const unselectedIconName = "bar"

    component.maxRating = maxRating
    component.selectedIconName = selectedIconName
    component.unselectedIconName = unselectedIconName

    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(
      By.css("[data-testid='input-rating-button']")
    )
    expect(buttons.length).toBe(maxRating)

    const clickedButton = buttons[currentRating - 1]
    clickedButton.triggerEventHandler("click", null)

    fixture.detectChanges()

    for (let i = 0; i < buttons.length; i++) {
      const currentButton = buttons[i]
      const span = currentButton.query(By.css("[data-testid='input-rating-span']"))
        .nativeElement as HTMLSpanElement

      expect(span).toBeTruthy()

      if (i < currentRating) {
        expect(span.textContent).toContain(selectedIconName)
      } else {
        expect(span.textContent).toContain(unselectedIconName)
      }
    }
  })

  // Add more test cases here

  afterEach(() => {
    fixture.destroy()
  })
})
