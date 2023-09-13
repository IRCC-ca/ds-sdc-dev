import { Component, OnInit } from '@angular/core';
import {
  slugTitleURLConfig,
  slugAnchorType
} from '@app/components/title-slug-url/title-slug-url.component';
import { docPageheadingConfig } from '@app/share/documentation-page-headings';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { TranslateService } from '@ngx-translate/core';
import {
  IIconButtonComponentConfig,
  IconButtonCategories
} from 'ircc-ds-angular-component-library';
import { ContentItem } from '@app/share/interface/content-item.interface';
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

  primaryIconBtnConfig: IIconButtonComponentConfig = {
    id: 'icon-button',
    category: IconButtonCategories.primary,
    size: 'small',
    disabled: false
  };

  criticalIconConfig: IIconButtonComponentConfig = {
    id: 'icon-button',
    category: IconButtonCategories.critical,
    size: 'small',
    disabled: false
  };

  anatomyContentItems: ContentItem[] = [
    {
      title: 'IconButtonDocumentation.AnatomyHeading',
      description: 'IconButtonDocumentation.AnatomyText'
    }
  ];

  figmaDirections: string[] = [
    'IconButtonDocumentation.FigmaDirectionsListItem1',
    'General.FigmaDirectionsListItem2',
    'General.FigmaDirectionsListItem3',
    'IconButtonDocumentation.FigmaDirectionsListItem4'
  ];

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
