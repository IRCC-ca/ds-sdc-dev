import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { IIndicatorConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {

  indiConf : IIndicatorConfig = {
    type: 'text',
    category: 'strong',
    purpose: 'status',
    status: 'critical',
    label: 'Testing this'
  }

  constructor(private altLang: LanguageSwitchService) {}

  ngOnInit() {

  }
}
