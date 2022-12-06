import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JLCheckboxComponent } from './jl-checkbox.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { UniversalTranslateLoader } from '@shared/translate/universal-translate-loader';

describe('JLCheckboxComponent', () => {
  let component: JLCheckboxComponent;
  let fixture: ComponentFixture<JLCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JLCheckboxComponent],
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
    fixture = TestBed.createComponent(JLCheckboxComponent);
    component = fixture.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
