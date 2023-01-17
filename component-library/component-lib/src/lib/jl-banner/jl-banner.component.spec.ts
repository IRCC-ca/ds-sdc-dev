import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JLBannerComponent } from './jl-banner.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { UniversalTranslateLoader } from '@shared/translate/universal-translate-loader';

describe('JLBannerComponent', () => {
  let component: JLBannerComponent;
  let fixture: ComponentFixture<JLBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JLBannerComponent],
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
    fixture = TestBed.createComponent(JLBannerComponent);
    component = fixture.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
