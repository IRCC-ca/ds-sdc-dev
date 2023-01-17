import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { UniversalTranslateLoader } from '@shared/translate/universal-translate-loader';

import { JlSecondaryChipsComponent } from './jl-secondary-chips.component';

describe('JlSecondaryChipsComponent', () => {
  let component: JlSecondaryChipsComponent;
  let fixture: ComponentFixture<JlSecondaryChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JlSecondaryChipsComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: UniversalTranslateLoader
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JlSecondaryChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
