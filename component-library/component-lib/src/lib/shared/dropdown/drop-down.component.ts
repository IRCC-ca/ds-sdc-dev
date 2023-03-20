import { Component, Input, OnInit } from '@angular/core';
import { DSSizes } from "../../../shared/constants/jl-components/jl-components.constants/jl-components.constants";

@Component({
  selector: 'ircc-cl-lib-dropdown',
  templateUrl: './drop-down.component.html'
})
export class DropdownComponent implements OnInit {

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
