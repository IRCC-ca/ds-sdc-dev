import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibilityDemoPreviousPageComponent } from './accessibility-demo-previous-page.component';

describe('AccessibilityDemoPreviousPageComponent', () => {
  let component: AccessibilityDemoPreviousPageComponent;
  let fixture: ComponentFixture<AccessibilityDemoPreviousPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessibilityDemoPreviousPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessibilityDemoPreviousPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
