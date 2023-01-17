import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { JLDropdownComponent } from './jl-dropdown.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { UniversalTranslateLoader } from '@shared/translate/universal-translate-loader';
describe('JLDropdownComponent', () => {
  let component: JLDropdownComponent;
  let fixture: ComponentFixture<JLDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JLDropdownComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: UniversalTranslateLoader
          }
        })
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JLDropdownComponent);
    component = fixture.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggleDropDown', () => {
    component.hideDropdown = false;
    component.toggleDropDown();
    expect(component.hideDropdown).toBe(true);
  });
  it('set selectIndex', () => {
    component.selectedIndex = 0;
    component.selectIndex(1);
    expect(component.selectedIndex).toEqual(1);
  });
  it('should open the dropdown', fakeAsync(() => {
    spyOn(component, 'clickInside');
    const button = fixture.debugElement.nativeElement.querySelector(
      '.select-container'
    );
    button.click();
    tick();
    expect(component.clickInside).toHaveBeenCalled();
  }));
});
