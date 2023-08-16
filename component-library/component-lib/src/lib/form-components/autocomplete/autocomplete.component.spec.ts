import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCheckboxComponent } from './multi-checkbox.component';

describe('MultiCheckboxComponent', () => {
  let component: MultiCheckboxComponent;
  let fixture: ComponentFixture<MultiCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
