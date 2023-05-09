import { Component, OnInit } from '@angular/core';
import { slugAnchorType, slugTitleURLConfig, slugTitleURLType } from '@app/components/title-slug-url/title-slug-url.component';
import { IBannerConfig } from 'ircc-ds-angular-component-library';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-banner-documentation',
  templateUrl: './banner-documentation.component.html',
  styleUrls: ['./banner-documentation.component.scss']
})
export class BannerDocumentationComponent implements OnInit {

  INFO_BANNER_ID = 'info_banner';

  infoBannerConfig: IBannerConfig = {
    id: this.INFO_BANNER_ID,
    title: 'Banner.BannerPreview.Title',
    content: "Banner.BannerPreview.Content",
    type: 'info'
  };

  warningBannerConfig: IBannerConfig = {
    id: this.INFO_BANNER_ID,
    title: 'Banner.BannerPreview.Title',
    content: "Banner.BannerPreview.Content",
    type: 'warning'
  };

  criticalBannerConfig: IBannerConfig = {
    id: this.INFO_BANNER_ID,
    title: 'Banner.BannerPreview.Title',
    content: "Banner.BannerPreview.Content",
    type: 'critical'
  };

  successBannerConfig: IBannerConfig = {
    id: this.INFO_BANNER_ID,
    title: 'Banner.BannerPreview.Title',
    content: "Banner.BannerPreview.Content",
    type: 'success'
  };

  genericBannerConfig: IBannerConfig = {
    id: this.INFO_BANNER_ID,
    title: 'Banner.BannerPreview.Title',
    content: "Banner.BannerPreview.Content",
    type: 'generic'
  };

  inputTitleSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Banner.Title',
    anchorType: slugAnchorType.primary
  };

  interactiveDemoSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.InteractiveDemo',
    anchorType: slugAnchorType.primary
  };
  
  typesSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.TypesHeading',
    anchorType: slugAnchorType.primary
  };

  configurationSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.ConfigurationsHeading',
    anchorType: slugAnchorType.primary
  };



  constructor() { }

  ngOnInit(): void {
  }

}
