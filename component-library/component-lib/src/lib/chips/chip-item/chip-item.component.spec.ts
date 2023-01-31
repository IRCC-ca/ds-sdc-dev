import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipItemComponent } from './chip-item.component';

describe('ChipItemComponent', () => {
  let component: ChipItemComponent;
  let fixture: ComponentFixture<ChipItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChipItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
