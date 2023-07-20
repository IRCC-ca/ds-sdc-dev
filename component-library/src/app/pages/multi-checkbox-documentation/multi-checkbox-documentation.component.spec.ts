import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCheckboxDocumentationComponent } from './multi-checkbox-documentation.component';

describe('MultiCheckboxDocumentationComponent', () => {
  let component: MultiCheckboxDocumentationComponent;
  let fixture: ComponentFixture<MultiCheckboxDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiCheckboxDocumentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiCheckboxDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
