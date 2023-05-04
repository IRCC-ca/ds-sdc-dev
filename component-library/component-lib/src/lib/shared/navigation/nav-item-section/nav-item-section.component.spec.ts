import { ComponentFixture, TestBed } from '@angular/core/testing';

import { navItemSectionComponent } from './nav-item-section.component';

describe('TabsComponent', () => {
  let component: navItemSectionComponent;
  let fixture: ComponentFixture<navItemSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [navItemSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(navItemSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
