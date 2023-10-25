import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import {
  slugAnchorType,
  slugTitleURLConfig
} from '@app/components/title-slug-url/title-slug-url.component';
import { IButtonConfig } from 'ircc-ds-angular-component-library';
import { docPageheadingConfig } from '@app/share/documentation-page-headings';
import { DSViewPortSize } from 'ircc-ds-angular-component-library';
import { ContentItem } from '@app/share/interface/content-item.interface';

@Component({
  selector: 'app-button-documentation',
  templateUrl: './button-documentation.component.html',
  styleUrls: ['./button-documentation.component.scss']
})
export class ButtonDocumentationComponent implements OnInit {
  altLangLink = 'buttonDocumentation';
  mobile: boolean = false;

  rightNavData: string[] = [
    // list of all right nav items
    'Buttons.Title',
    'General.InteractiveDemo',
    'General.TypesHeading',
    'General.ConfigurationsHeading',
    'General.DesignGuidelinesHeading',
    'General.AnatomyHeading',
    'General.SpecsHeading',
    'General.ContentGuidelinesHeading',
    'General.FigmaHeading',
    'General.AccessibilityHeading',
    'General.ResearchHeading'
  ];

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

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

  anatomyContentItems: ContentItem[] = [
    {
      title: 'Buttons.AnatomyBGHeading',
      description: 'Buttons.AnatomyBGText'
    },
    {
      title: 'Buttons.ConfigIconHeading',
      description: 'Buttons.AnatomyIconText'
    },
    {
      title: 'General.LabelHeading',
      description: 'Buttons.AnatomyLblText'
    }
  ];

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
    this.mobile = window.innerWidth < DSViewPortSize.mobile;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.mobile = window.innerWidth < DSViewPortSize.mobile;
  }
}
