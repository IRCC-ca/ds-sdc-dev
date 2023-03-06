import { Component, Input, OnInit } from '@angular/core';
import { DSSizes } from '../../shared/constants/jl-components/jl-components.constants/jl-components.constants';

@Component({
  selector: 'lib-select',
  templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit {

  @Input() size? : keyof typeof DSSizes;
  @Input() labelText? : string;
  @Input() placeholderText? : string;

  showPlaceholder : boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (!this.labelText || this.labelText.trim().length == 0) {
      if (!this.placeholderText) {
        this.placeholderText = "Default";
      }
      this.showPlaceholder = true;
    }
  }
}
