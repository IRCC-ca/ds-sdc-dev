import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaseerComponent } from './naseer.component';

describe('NaseerComponent', () => {
  let component: NaseerComponent;
  let fixture: ComponentFixture<NaseerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NaseerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NaseerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
