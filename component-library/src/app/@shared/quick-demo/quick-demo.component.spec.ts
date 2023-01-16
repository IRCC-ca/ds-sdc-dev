import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickDemoComponent } from './quick-demo.component';

describe('QuickDemoComponent', () => {
  let component: QuickDemoComponent;
  let fixture: ComponentFixture<QuickDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
