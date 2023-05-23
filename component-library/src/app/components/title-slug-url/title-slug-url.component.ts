import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from '../../share/pipe-slugify.pipe';

export enum HeadingType {
  'h1' = 'h1',
  'h2' = 'h2'
}
export enum slugAnchorType {
  'primary' = 'primary',
  'secondary' = 'secondary'
}

export interface slugTitleURLConfig {
  title: string;
  heading?: keyof typeof HeadingType;
  anchorType?: slugAnchorType;
}

@Component({
  selector: 'app-title-slug-url',
  templateUrl: './title-slug-url.component.html',
  styleUrls: ['./title-slug-url.component.scss'],
  providers: [SlugifyPipe]
})
export class TitleSlugUrlComponent implements AfterContentInit, OnInit {
  @Input()
  config: slugTitleURLConfig = {
    title: '',
    heading: HeadingType.h1,
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
    
    if (this.config.heading !== 'h1') this.config.heading='h2'
  }

  ngAfterContentInit(): void {
    this.windowOrigin = window.location.origin;
    this.windowPathname = window.location.pathname;
  }
}
