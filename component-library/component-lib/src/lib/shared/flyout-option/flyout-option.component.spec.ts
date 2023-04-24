import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlyoutOptionComponent } from './flyout-option.component';

describe('FlyoutOptionComponent', () => {
  let component: FlyoutOptionComponent;
  let fixture: ComponentFixture<FlyoutOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlyoutOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlyoutOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
