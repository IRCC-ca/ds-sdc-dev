import { Component, Input, OnInit } from '@angular/core';
import { DSSizes } from "../../shared/constants/jl-components/jl-components.constants/jl-components.constants";
export interface IProgressIndicatorConfig {
  id: string,
  stepNumber?: string,
  stepTitle?: string,
  size?: keyof typeof DSSizes
}
@Component({
  selector: 'lib-progress-indicator',
  templateUrl: './progress-indicator.component.html',
})
export class ProgressIndicatorComponent implements OnInit {

  @Input() config: IProgressIndicatorConfig = {
    id: '',
  };
  constructor() { }

  ngOnInit(): void {
  }

}
