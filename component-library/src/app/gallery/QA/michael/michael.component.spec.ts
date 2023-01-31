import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MichaelComponent } from './michael.component';

describe('MichaelComponent', () => {
  let component: MichaelComponent;
  let fixture: ComponentFixture<MichaelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MichaelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MichaelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
