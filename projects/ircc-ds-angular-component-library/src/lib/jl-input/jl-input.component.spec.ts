import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniversalTranslateLoader } from '@app/shared/translate/universal-translate-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { JLInputComponent } from './jl-input.component';

describe('JLDropdownComponent', () => {
  let component: JLInputComponent;
  let fixture: ComponentFixture<JLInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JLInputComponent],
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
    fixture = TestBed.createComponent(JLInputComponent);
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
