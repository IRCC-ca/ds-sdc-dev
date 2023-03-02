import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { IProgressIndicatorConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {
  form = new FormGroup({});

  progressIndicatorConfig: IProgressIndicatorConfig = {
    id: 'progress-indicator',
    formGroup: this.form,
    // stepNumber: "Step 1",
    tab: [
      { id: 'step1', title: 'Step 1' },
    ],
    stepTitle: 'Step title',
    // size: 'small'
  }


  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {}
}


