import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibilityDemoNextPageComponent } from './accessibility-demo-next-page.component';

describe('AccessibilityDemoNextPageComponent', () => {
  let component: AccessibilityDemoNextPageComponent;
  let fixture: ComponentFixture<AccessibilityDemoNextPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessibilityDemoNextPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AccessibilityDemoNextPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
