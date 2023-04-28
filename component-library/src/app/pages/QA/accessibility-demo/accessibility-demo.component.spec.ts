import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibilityDemoComponent } from './accessibility-demo.component';

describe('AccessibilityDemoComponent', () => {
  let component: AccessibilityDemoComponent;
  let fixture: ComponentFixture<AccessibilityDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessibilityDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AccessibilityDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
