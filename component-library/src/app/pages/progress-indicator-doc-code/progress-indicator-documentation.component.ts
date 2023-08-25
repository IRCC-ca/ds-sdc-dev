import { Component, OnInit } from '@angular/core';
import { slugAnchorType, slugTitleURLConfig } from '@app/components/title-slug-url/title-slug-url.component';
import { docPageheadingConfig } from '@app/share/documentation-page-headings';
import { TranslateService } from '@ngx-translate/core';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';

@Component({
  selector: 'app-progress-indicator-documentation',
  templateUrl: './progress-indicator-documentation.component.html',
  styleUrls: ['./progress-indicator-documentation.component.scss']
})
export class ProgressIndicatorDocumentationComponent implements OnInit {
  currentLanguage: string = '';
  altLangLink = 'progressIndicatorDocumentation';
  headingConfig = docPageheadingConfig;

  progressIndictorTitleSlugConfig: slugTitleURLConfig = {
    title: 'ProgressIndicator.MainTitle',
    heading: 'h1',
    anchorType: slugAnchorType.primary
  };

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
