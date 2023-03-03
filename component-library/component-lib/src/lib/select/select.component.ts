import { Component, Input, OnInit } from '@angular/core';
import { DSSizes } from '../../shared/constants/jl-components/jl-components.constants/jl-components.constants';

@Component({
  selector: 'lib-select',
  templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit {

  @Input() size? : keyof typeof DSSizes;

  constructor() { }

  ngOnInit(): void {
    console.log("------------------SELECT--------------------");
  }

}
