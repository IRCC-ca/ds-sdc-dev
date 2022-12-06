import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrccDsAngularComponentLibraryComponent } from './ircc-ds-angular-component-library.component';

describe('IrccDsAngularComponentLibraryComponent', () => {
  let component: IrccDsAngularComponentLibraryComponent;
  let fixture: ComponentFixture<IrccDsAngularComponentLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrccDsAngularComponentLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IrccDsAngularComponentLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
