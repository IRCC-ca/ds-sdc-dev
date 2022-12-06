import { Component, Input, OnInit } from '@angular/core';

export interface ICheckBoxComponentConfig {
  disabled: boolean;
  error: boolean;
  large: boolean;
  mixed: boolean;
  focus: boolean;
  checked: boolean;
  label: string;
}

@Component({
  selector: 'jl-pr-sclp-checkbox',
  templateUrl: './jl-checkbox.component.html',
  styleUrls: ['./jl-checkbox.scss']
})
export class JLCheckboxComponent implements OnInit {
  @Input() disabled = false;
  @Input() error = false;
  @Input() large = false;
  @Input() mixed = false;
  @Input() focus = false;
  @Input() checked = false;
  @Input() label = '';
  constructor() {}

  ngOnInit(): void {}
}
