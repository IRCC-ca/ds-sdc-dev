import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibilityDemoIntroPageComponent } from './accessibility-demo-intro-page.component';

describe('AccessibilityDemoPreviousPageComponent', () => {
  let component: AccessibilityDemoIntroPageComponent;
  let fixture: ComponentFixture<AccessibilityDemoIntroPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessibilityDemoIntroPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessibilityDemoIntroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
