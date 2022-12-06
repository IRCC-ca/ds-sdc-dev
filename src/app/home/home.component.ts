import { Component, OnInit } from '@angular/core';
import { IJLInputComponent } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  demoText = '';

  inputComponentConfig: IJLInputComponent = {
    label: 'Input Label',
    placeholder: 'placeholder'
  }

  isLoading = false;

  constructor() { }

  ngOnInit() {
  }

  valueChange(event: Event) {
    this.demoText = event.toString();
  }

}
