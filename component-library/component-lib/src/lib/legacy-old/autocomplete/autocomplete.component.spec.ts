import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { UniversalTranslateLoader } from '@app/shared/translate/universal-translate-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AutocompleteComponent } from './autocomplete.component';
import { InputComponent } from '../input/input.component';

describe('DropdownComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteComponent, InputComponent],
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
    fixture = TestBed.createComponent(AutocompleteComponent);
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
