import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateTripComponent } from './form-create-trip.component';

describe('FormCreateTripComponent', () => {
  let component: FormCreateTripComponent;
  let fixture: ComponentFixture<FormCreateTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormCreateTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
