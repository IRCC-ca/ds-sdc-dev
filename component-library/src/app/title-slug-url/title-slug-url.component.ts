import { AfterContentInit, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from '../share/pipe-slugify.pipe';

export enum slugTitleURLType {
  'primary' = 'primary',
  'secondary' = 'secondary'
}
export interface slugTitleURLConfig {
  type: slugTitleURLType;
  title: string;
  route: string;
  anchor: string;
}

@Component({
  selector: 'app-title-slug-url',
  templateUrl: './title-slug-url.component.html',
  styleUrls: ['./title-slug-url.component.scss'],
  providers: [SlugifyPipe]
})
export class TitleSlugUrlComponent implements AfterContentInit {
  @Input()
  config!: slugTitleURLConfig;
  currentLang = '';
  windowOrigin = '';

  constructor(
    private translator: TranslateService,
    private slugify: SlugifyPipe
  ) {
    this.currentLang = translator.currentLang;
  }

  ngAfterContentInit(): void {
    this.windowOrigin = window.location.origin;
  }
}
