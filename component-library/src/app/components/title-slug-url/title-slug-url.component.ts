import { AfterContentInit, Component, Input } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from '../../share/pipe-slugify.pipe';

export enum slugTitleURLType {
  'primary' = 'primary',
  'secondary' = 'secondary'
}

export enum slugAnchorType {
  'primary' = 'primary',
  'secondary' = 'secondary'
}
export interface slugTitleURLConfig {
  type: slugTitleURLType;
  title: string;
  anchorType: slugAnchorType;
}

@Component({
  selector: 'app-title-slug-url',
  templateUrl: './title-slug-url.component.html',
  styleUrls: ['./title-slug-url.component.scss'],
  providers: [SlugifyPipe]
})
export class TitleSlugUrlComponent implements AfterContentInit {
  @Input()
  config: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: '',
    anchorType: slugAnchorType.primary
  };
  currentLang = '';
  windowPathname = '';
  windowOrigin = '';

  constructor(private translator: TranslateService) {
    this.currentLang = translator.currentLang;
  }

  ngOnInit() {
    this.translator.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
  }

  ngAfterContentInit(): void {
    this.windowOrigin = window.location.origin;
    this.windowPathname = window.location.pathname;
  }
}
