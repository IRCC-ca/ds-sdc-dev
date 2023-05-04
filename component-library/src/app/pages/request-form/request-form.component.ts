import { Component, OnInit } from '@angular/core';
import { slugTitleURLConfig, slugTitleURLType, slugAnchorType } from '@app/components/title-slug-url/title-slug-url.component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { TranslateService } from '@app/share/templates/parent-template.module';
import { IBannerConfig } from 'component-lib/src/lib/banner-component/banner/banner.component';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
  providers: [SlugifyPipe]
})
export class RequestFormComponent implements OnInit {
  altLangLink = 'requestForm';

  requestFormTitleSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'RequestForm.Title',
    anchorType: slugAnchorType.primary
  };

  bannerConfig: IBannerConfig = {
    id: 'request-form-banner',
    content: 'Some content',
    type: 'generic',
    rounded: false,
    dismissible: false,
    size: 'small',
    cta: []
  }
  constructor(private translate: TranslateService,
    private lang: LangSwitchService) { }

  ngOnInit(): void {
    this.lang.setAltLangLink(this.altLangLink);

  }
}
