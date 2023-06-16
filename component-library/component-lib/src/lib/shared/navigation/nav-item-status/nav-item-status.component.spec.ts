import { ComponentFixture, TestBed } from '@angular/core/testing';

import { navItemStatusComponent } from './nav-item-status.component';

describe('TabsComponent', () => {
  let component: navItemStatusComponent;
  let fixture: ComponentFixture<navItemStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [navItemStatusComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(navItemStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
