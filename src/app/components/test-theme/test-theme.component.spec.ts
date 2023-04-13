import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestThemeComponent } from './test-theme.component';

describe('TestThemeComponent', () => {
  let component: TestThemeComponent;
  let fixture: ComponentFixture<TestThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestThemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
