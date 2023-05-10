import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncapsulatedElementComponent } from './encapsulated-element.component';

describe('EncapsulatedElementComponent', () => {
  let component: EncapsulatedElementComponent;
  let fixture: ComponentFixture<EncapsulatedElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EncapsulatedElementComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EncapsulatedElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
