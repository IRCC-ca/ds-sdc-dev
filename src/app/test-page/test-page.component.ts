import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {IconButtonCategories} from "../../../component-lib/src/lib/icon-button/icon-button.component";

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  testTitle = 'Test Title';
  testID = 'testID';
  eIconButtonCategories = IconButtonCategories;

  constructor() { }

  ngOnInit(): void {
  }

}
