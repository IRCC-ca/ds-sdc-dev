import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JlChipItemComponent } from './jl-chip-item.component';

describe('JlChipItemComponent', () => {
  let component: JlChipItemComponent;
  let fixture: ComponentFixture<JlChipItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JlChipItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JlChipItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
