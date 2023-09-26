import { Component, OnInit } from '@angular/core';
import {
  slugAnchorType,
  slugTitleURLConfig
} from '@app/components/title-slug-url/title-slug-url.component';
import { docPageheadingConfig } from '@app/share/documentation-page-headings';
import { ContentItem } from '@app/share/interface/content-item.interface';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-spinner-documentation',
  templateUrl: './spinner-documentation.component.html',
  styleUrls: ['./spinner-documentation.component.scss']
})
export class SpinnerDocumentationComponent implements OnInit {
  currentLanguage: string = '';
  altLangLink = 'spinnerDocumentation';
  headingConfig = docPageheadingConfig;

  spinnerTitleSlugConfig: slugTitleURLConfig = {
    title: 'Spinner.MainTitle',
    heading: 'h1',
    anchorType: slugAnchorType.primary
  };

  anatomyContentItems: ContentItem[] = [
    {
      title: 'Spinner.MainTitle',
      description: 'Spinner.SpinnerAnatomy'
    },
    {
      title: 'General.LabelOptional',
      description: 'Spinner.LabelAnatomy'
    },
    {
      title: 'General.DescriptionOptional',
      description: 'Spinner.DescriptionAnatomy'
    }
  ];

  figmaDirections: string[] = [
    'Spinner.UsageInFigma.FigmaDirectionsListItem1',
    'General.FigmaDirectionsListItem2',
    'General.FigmaDirectionsListItem3'
  ];

  accessibilityContent: string[] = [
    'General.AccessibilityContentItem1',
    'Spinner.AccessibilityContentItem2',
    'Spinner.AccessibilityContentItem3',
    'Spinner.AccessibilityContentItem4',
    'General.AccessibilityContentItemMax'
  ];

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
