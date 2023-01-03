import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  testTitle = 'Test Title';
  testID = 'testID';

  constructor() { }

  ngOnInit(): void {
  }

}
