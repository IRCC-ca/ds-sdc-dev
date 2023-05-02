import { AfterContentInit, Component, Input } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from '../../share/pipe-slugify.pipe';

export enum slugTitleURLType {
  'primary' = 'primary',
  'secondary' = 'secondary'
}
export enum HeadingType {
  'h1' = 'h1',
  'h2' = 'h2'
}

export interface slugTitleURLConfig {
  type: slugTitleURLType;
  title: string;
  heading?: keyof typeof HeadingType;
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
    heading: HeadingType.h1
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
