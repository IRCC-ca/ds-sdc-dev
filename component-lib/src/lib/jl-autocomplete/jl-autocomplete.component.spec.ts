import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { UniversalTranslateLoader } from '@app/shared/translate/universal-translate-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { JLAutocompleteComponent } from './jl-autocomplete.component';
import { JLInputComponent } from '../jl-input/jl-input.component';

describe('JLDropdownComponent', () => {
  let component: JLAutocompleteComponent;
  let fixture: ComponentFixture<JLAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JLAutocompleteComponent, JLInputComponent],
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
    fixture = TestBed.createComponent(JLAutocompleteComponent);
    component = fixture.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggleDropDown', fakeAsync(() => {
    component.hideDropdown = false;
    component.toggleDropDown();
    expect(component.hideDropdown).toBe(true);
  }));

  it('should open the dropdown', fakeAsync(() => {
    spyOn(component, 'clickInside');
    const button = fixture.debugElement.nativeElement.querySelector(
      '.autocomplete-container'
    );
    button.click();
    tick();
    expect(component.clickInside).toHaveBeenCalled();
  }));
});
