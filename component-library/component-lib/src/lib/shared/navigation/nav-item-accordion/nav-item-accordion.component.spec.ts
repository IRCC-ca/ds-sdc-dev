import { ComponentFixture, TestBed } from '@angular/core/testing';

import { navItemNavComponent } from './nav-item-accordion.component';

describe('TabsComponent', () => {
  let component: navItemNavComponent;
  let fixture: ComponentFixture<navItemNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [navItemNavComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(navItemNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
