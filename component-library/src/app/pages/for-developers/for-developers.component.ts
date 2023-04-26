import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SideNavConfig } from '@app/components/side-nav/side-nav.config';
import { ISideNavDataInterface } from '@app/components/side-nav/side-nav.model';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from 'src/app/share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { TranslatedPageComponent } from '../translated-page-component';
import { Clipboard } from '@angular/cdk/clipboard';
import { slugTitleURLConfig, slugTitleURLType } from '@app/components/title-slug-url/title-slug-url.component';
@Component({
  selector: 'app-for-developers',
  templateUrl: './for-developers.component.html',
  styleUrls: ['./for-developers.component.scss'],
  providers: [SlugifyPipe]
})
export class ForDevelopersComponent implements OnInit, TranslatedPageComponent {
  rightNavData: ISideNavDataInterface[];
  rightNavDataRaw: string[] = [
    // list of all right nav items
    'Overview.DeveloperHeading',
    'Developers.GetStartedHeading',
    'Developers.UsageHeading',
    'Developers.FontAwesomeHeading',
    'Developers.ReleasesHeading'
  ];
  altLangLink = 'forDesigners';
  @ViewChild('paragraph1') paragraph1Ref!: ElementRef;
  @ViewChild('paragraph2') paragraph2Ref!: ElementRef;
  @ViewChild('paragraph3') paragraph3Ref!: ElementRef;
  @ViewChild('paragraph4') paragraph4Ref!: ElementRef;

  overViewDeveloperSlug: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Overview.DeveloperHeading'
  };
  developerStartedSlug: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Developers.GetStartedHeading'
  };

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private navBarConfig: SideNavConfig,
    private clipboard: Clipboard
  ) {
    this.rightNavData = navBarConfig.getRightNavBarConfig(this.rightNavDataRaw);
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }

  copyToClipboard(index: number) {
    // const textToCopy = this.textToCopyRef.nativeElement.innerText;
    let textToCopy;
    switch (index) {
      case 0:
        textToCopy = this.paragraph1Ref.nativeElement.innerText;
        break;
      case 1:
        textToCopy = this.paragraph2Ref.nativeElement.innerText;
        break;
      case 2:
        textToCopy = this.paragraph3Ref.nativeElement.innerText;
        break;
      case 3:
        textToCopy = this.paragraph4Ref.nativeElement.innerText;
        break;
    }
    this.clipboard.copy(textToCopy);
  }
}
