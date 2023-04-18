import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MahsaComponent } from './mahsa.component';

describe('MahsaComponent', () => {
  let component: MahsaComponent;
  let fixture: ComponentFixture<MahsaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MahsaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MahsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
