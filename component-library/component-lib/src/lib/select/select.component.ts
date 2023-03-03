import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-select',
  templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("------------------SELECT--------------------");
  }

}
