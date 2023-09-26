import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerDocumentationComponent } from './spinner-documentation.component';

describe('SpinnerDocumentationComponent', () => {
  let component: SpinnerDocumentationComponent;
  let fixture: ComponentFixture<SpinnerDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerDocumentationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
