import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from 'src/app/share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { TranslatedPageComponent } from '../translated-page-component';

@Component({
  selector: 'app-for-developers',
  templateUrl: './for-developers.component.html',
  styleUrls: ['./for-developers.component.scss'],
  providers: [SlugifyPipe]
})
export class ForDevelopersComponent implements OnInit, TranslatedPageComponent {
  altLangLink = 'forDesigners';

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  ngOnInit(): void {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
