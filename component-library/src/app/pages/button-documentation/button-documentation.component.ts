import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import {
  slugAnchorType,
  slugTitleURLConfig
} from '@app/components/title-slug-url/title-slug-url.component';
import { IButtonConfig } from 'ircc-ds-angular-component-library';
import { docPageheadingConfig } from '@app/share/documentation-page-headings';

@Component({
  selector: 'app-button-documentation',
  templateUrl: './button-documentation.component.html',
  styleUrls: ['./button-documentation.component.scss']
})
export class ButtonDocumentationComponent implements OnInit {
  altLangLink = 'buttonDocumentation';
  mobile: boolean = false;
  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  interactiveDemoSlugTitleURLConfig: slugTitleURLConfig = {
    title: 'Interactive Demo',
    anchorType: slugAnchorType.primary
  };

  pageTitleSlugConfig: slugTitleURLConfig = {
    title: 'Buttons.Title',
    heading: 'h1',
    anchorType: slugAnchorType.primary
  };
  headingConfig = docPageheadingConfig;
  buttonTypeConfigs: { [key: string]: IButtonConfig } = {
    primary: {
      id: 'type_primary',
      category: 'primary',
      color: 'CTA',
      size: 'large'
    },
    secondary: {
      id: 'type_secondary',
      category: 'secondary',
      color: 'CTA',
      size: 'large'
    },
    critical: {
      id: 'type_critical',
      category: 'primary',
      color: 'critical',
      size: 'large'
    },
    plain: {
      id: 'type_plain0',
      category: 'plain',
      color: 'CTA',
      size: 'large'
    },
    plain_critical: {
      id: 'type_plain_critical',
      category: 'plain',
      color: 'critical',
      size: 'large'
    }
  };

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
    this.mobile = window.innerWidth <= 768;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.mobile = window.innerWidth <= 768;
  }
}
