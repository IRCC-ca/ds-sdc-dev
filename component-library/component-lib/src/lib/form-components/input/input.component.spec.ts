import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniversalTranslateLoader } from '@app/shared/translate/universal-translate-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { InputComponent } from './input.component';

describe('DropdownComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
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
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Component to be of type text when type is set to text', () => {
    const expected = 'text';
    component.type = expected;
    const input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.type).toBe(expected);
  });
});
