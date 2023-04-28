import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BobbyComponent } from './bobby.component';

describe('BobbyComponent', () => {
  let component: BobbyComponent;
  let fixture: ComponentFixture<BobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BobbyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
