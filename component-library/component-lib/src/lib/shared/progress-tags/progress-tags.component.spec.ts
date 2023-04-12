import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressTagsComponent } from './progress-tags.component';

describe('ProgressTagsComponent', () => {
  let component: ProgressTagsComponent;
  let fixture: ComponentFixture<ProgressTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressTagsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
