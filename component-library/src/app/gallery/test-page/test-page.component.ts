import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { IBannerConfig, IProgressTagsConfig } from 'ircc-ds-angular-component-library';


@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

  tagConfig: IProgressTagsConfig = {
    id: 'tag-test',
    title: 'success',
    type: 'success',
    size: 'large'
  }

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {}
}
