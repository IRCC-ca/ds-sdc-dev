import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParentTemplateComponent } from './parent-template.component';

describe('ParentTemplateComponent', () => {
  let component: ParentTemplateComponent;
  let fixture: ComponentFixture<ParentTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentTemplateComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ParentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
