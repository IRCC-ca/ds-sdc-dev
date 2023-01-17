import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormControl, FormGroup } from '@angular/forms';
import { IJLInputComponentConfig, InputTypes, LanguageSwitchButtonService } from 'ircc-ds-angular-component-library';
=======
import { FormGroup } from '@angular/forms';
import { LanguageSwitchButtonService, IAlertConfig, AlertType } from 'ircc-ds-angular-component-library';
>>>>>>> 8678ba6 (mono-repo updates)
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

<<<<<<< HEAD
  inputConfig: IJLInputComponentConfig = {
    id: 'input',
    formGroup: new FormGroup({}),
    type: InputTypes.password,
=======
  alertConfig : IAlertConfig = {
    id:'123',
    title: 'Alert Title',
    body: 'This is the Alert Body, testing it out.',
    type: AlertType.success
>>>>>>> 8678ba6 (mono-repo updates)
  }

  constructor(
    private langToggle: LanguageSwitchButtonService,
  ) { }

  ngOnInit() {
    this.langToggleSub = this.langToggle.languageClickObs$.subscribe(response => {
    });
    this.inputConfig.formGroup.addControl(this.inputConfig.id, new FormControl());

  }


}
