import { Component, OnInit } from '@angular/core';
import { IErrorComponentConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

  errorConfig: IErrorComponentConfig = {
    id: 'error',
    errorLOV: 'testLOV'
  }

  constructor(
  ) { }

  ngOnInit() {
  }


}
