import { Component, OnInit } from '@angular/core';
import {
  slugTitleURLConfig,
  slugAnchorType
} from '@app/components/title-slug-url/title-slug-url.component';
import { docPageheadingConfig } from '@app/share/documentation-page-headings';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-icon-button-documentation',
  templateUrl: './icon-button-documentation.component.html',
  styleUrls: ['./icon-button-documentation.component.scss']
})
export class IconButtonDocumentationComponent implements OnInit {
  headingConfig = docPageheadingConfig;
  currentLanguage: string = '';
  altLangLink = 'iconButtonDocumentation';

  pageTitleSlugConfig: slugTitleURLConfig = {
    title: 'IconButtonDocumentation.Title',
    heading: 'h1',
    anchorType: slugAnchorType.primary
  };
  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
