import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerDocumentationComponent } from './date-picker-documentation.component';

describe('DatePickerDocumentationComponent', () => {
  let component: DatePickerDocumentationComponent;
  let fixture: ComponentFixture<DatePickerDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerDocumentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
