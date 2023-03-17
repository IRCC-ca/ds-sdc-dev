import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavButtonsComponent } from './nav-buttons.component';

describe('NavButtonsComponent', () => {
  let component: NavButtonsComponent;
  let fixture: ComponentFixture<NavButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
