import { ComponentFixture, TestBed } from '@angular/core/testing';

import { navItemHeadingComponent } from './nav-item-heading.component';

describe('TabsComponent', () => {
  let component: navItemHeadingComponent;
  let fixture: ComponentFixture<navItemHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [navItemHeadingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(navItemHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
