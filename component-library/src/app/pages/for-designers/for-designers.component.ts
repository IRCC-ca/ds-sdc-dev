import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from 'src/app/share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { TranslatedPageComponent } from '../translated-page-component';

@Component({
  selector: 'app-for-designers',
  templateUrl: './for-designers.component.html',
  styleUrls: ['./for-designers.component.scss'],
  providers: [SlugifyPipe]
})
export class ForDesignersComponent implements OnInit, TranslatedPageComponent {
  altLangLink = 'forDesigners';

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  ngOnInit(): void {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
