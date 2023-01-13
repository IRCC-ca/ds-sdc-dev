import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LanguageSwitchButtonService } from 'ircc-ds-angular-component-library';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  testTitle = 'Test Title';
  testID = 'testID';
  // eIconButtonCategories = IconButtonCategories;

  langToggleSub?: Subscription;

  constructor(
    private langToggle: LanguageSwitchButtonService,
  ) { }

  ngOnInit() {
    this.langToggleSub = this.langToggle.languageClickObs$.subscribe(response => {
    });
  }


}
