import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCityComponent } from './page-city.component';

describe('PageCityComponent', () => {
  let component: PageCityComponent;
  let fixture: ComponentFixture<PageCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PageCityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
