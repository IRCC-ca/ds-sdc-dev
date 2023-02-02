import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MikeComponent } from './mike.component';

describe('MikeComponent', () => {
  let component: MikeComponent;
  let fixture: ComponentFixture<MikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MikeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
