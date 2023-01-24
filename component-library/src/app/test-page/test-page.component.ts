import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownInputConfig } from 'ircc-ds-angular-component-library';


@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {
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
    error: true
  }

  constructor(
  ) { }

  ngOnInit() {
    this.form.addControl(this.selectConfig.id, new FormControl());
  }


}
