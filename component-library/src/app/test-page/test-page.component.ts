import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownInputConfig } from 'ircc-ds-angular-component-library';


@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {
  form = new FormGroup({});

  selectConfig: IDropdownInputConfig = {
    id: 'select-dropdown-test',
    label: "Dropdown test",
    formGroup: new FormGroup({}),
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
    ]
  }

  constructor(
  ) { }

  ngOnInit() {
    this.form.addControl(this.selectConfig.id, new FormControl('', [Validators.required]));
  }


}
