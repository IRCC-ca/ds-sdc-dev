import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiddenNavComponent } from './hidden-nav.component';

describe('SelectComponent', () => {
  let component: HiddenNavComponent;
  let fixture: ComponentFixture<HiddenNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HiddenNavComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HiddenNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
