import { Component, Input } from '@angular/core';

export interface ICheckBoxComponentConfig {
  disabled?: boolean;
  error?: boolean;
  large?: boolean;
  mixed?: boolean;
  focus?: boolean;
  checked?: boolean;
  label?: string;
}

@Component({
  selector: 'jl-pr-sclp-checkbox',
  templateUrl: './jl-checkbox.component.html',
  styleUrls: ['./jl-checkbox.scss']
})
export class JLCheckboxComponent {
  //TODO: Add output - consider using a formControl as output rather than anything else.
  @Input() disabled?: boolean; //Default false
  @Input() error?: boolean; //Default false
  @Input() large?: boolean; //Default false
  @Input() mixed?: boolean; //Default false
  @Input() focus?: boolean; //Default false
  @Input() checked?: boolean; //Default false
  @Input() label?: string; //Default ''
}