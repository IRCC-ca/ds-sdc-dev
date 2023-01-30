import { Component, OnInit } from '@angular/core';
import { BannerType, IBannerConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

  bannerConfig : IBannerConfig = {
    id: 'banner',
    title: 'Title',
    content: `<p>This is descriptione. <strong>This is the text.<strong> For the description. This is it.</p>
    <ul>
      <li>List example</li>
      <li>Another list example</li>
    </ul>`,
    type: BannerType.warning,
    dismissible: true
  }

  constructor(
  ) { }

  ngOnInit() {
  }


}
