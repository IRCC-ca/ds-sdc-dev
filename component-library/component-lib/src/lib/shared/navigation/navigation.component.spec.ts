import { ComponentFixture, TestBed } from '@angular/core/testing';

import { navigationComponent } from './navigation.component';

describe('navigationComponent', () => {
  let component: navigationComponent;
  let fixture: ComponentFixture<navigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [navigationComponent]   
    }).compileComponents();

    fixture = TestBed.createComponent(navigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
