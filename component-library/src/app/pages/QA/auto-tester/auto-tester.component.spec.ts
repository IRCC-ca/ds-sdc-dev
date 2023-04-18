import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoTesterComponent } from './auto-tester.component';

describe('AutoTesterComponent', () => {
  let component: AutoTesterComponent;
  let fixture: ComponentFixture<AutoTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoTesterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AutoTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
