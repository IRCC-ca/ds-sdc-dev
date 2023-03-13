import { Component, Input, OnInit } from '@angular/core';
import { DSSizes } from "../../../shared/constants/jl-components/jl-components.constants/jl-components.constants";

export enum IndicatorType {
  dot = 'dot',
  text = 'text'
}

export enum IndicatorTreatment {
  strong = 'strong',
  weak = 'weak'
}

export enum IndicatorPurpose {
  status = 'status',
  palette = 'palette'
}

export enum IndicatorStatus {
  info = 'info',
  warning = 'warning',
  critical = 'critical',
  generic = 'generic',
  genericPrimary = 'generic-primary',
}

export interface IIndicatorConfig {
  label?: string;
  size?: keyof typeof DSSizes;
  type: keyof typeof IndicatorType;
  treatment: keyof typeof IndicatorTreatment;
  purpose: keyof typeof IndicatorPurpose;
  status?: keyof typeof IndicatorStatus; // Sentiment
  palette?: string; // Colour
}

@Component({
  selector: 'lib-indicator',
  templateUrl: './indicator.component.html',
})
export class IndicatorComponent implements OnInit {
  @Input() config: IIndicatorConfig = {
    type: IndicatorType.text,
    treatment: IndicatorTreatment.weak,
    purpose: IndicatorPurpose.status
  };
  EIndicatorStatus = IndicatorStatus;
  constructor() { }

  ngOnInit(): void {
  }

}
