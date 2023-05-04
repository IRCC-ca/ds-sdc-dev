import { Component, OnInit } from '@angular/core';
import {
  slugTitleURLConfig,
  slugTitleURLType,
  slugAnchorType
} from '@app/components/title-slug-url/title-slug-url.component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { TranslateService } from '@app/share/templates/parent-template.module';
import { IBannerConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
  providers: [SlugifyPipe]
})
export class RequestFormComponent implements OnInit {
  altLangLink = 'requestForm';

  submitRequestTitleSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'RequestForm.Title',
    anchorType: slugAnchorType.primary
  };

  requestCriteriaTitleSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'RequestForm.RequestCriteriaTitle',
    anchorType: slugAnchorType.primary
  };

  requestFormTitleSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'RequestForm.RequestFormTitle',
    anchorType: slugAnchorType.primary
  };

  bannerConfig: IBannerConfig = {
    id: 'request-form-banner',
    content: 'RequestForm.BannerDesc',
    type: 'info',
    rounded: false,
    dismissible: false,
    size: 'small',
    cta: []
  };
  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  ngOnInit(): void {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
