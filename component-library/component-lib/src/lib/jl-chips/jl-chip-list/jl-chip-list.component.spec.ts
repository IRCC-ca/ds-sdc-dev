import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UniversalTranslateLoader } from '@app/shared/translate/universal-translate-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { JLComponentsModule } from '../../jl-components.module';
import { JlChipListComponent } from './jl-chip-list.component';

describe('JlChipListComponent', () => {
  let component: JlChipListComponent;
  let fixture: ComponentFixture<JlChipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        JLComponentsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: UniversalTranslateLoader
          }
        })
      ],
      declarations: [JlChipListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JlChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
