import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { IDropdownInputConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-mahsa',
  templateUrl: './mahsa.component.html',
  styleUrls: ['./mahsa.component.scss']
})
export class MahsaComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  
  selectConfig: IDropdownInputConfig = {
    id: 'select-dropdown-test',
    formGroup: this.form,
    label: "Dropdown test",
    category: 'secondary',
    options: [
      {
        text: "One",
        value: 'First'
      },
      {
        text: "Two",
        value: 'Second'
      }
    ],
    required: true,
    hint: "Hint Text",
    desc: "Description text",
  };

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('Mahsa-alt');
    this.form.addControl(this.selectConfig.id, new FormControl());
  }

}
