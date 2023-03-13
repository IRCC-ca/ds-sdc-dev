import { Component, Input, OnInit } from '@angular/core';
import { DSSizes } from "../../../shared/constants/jl-components/jl-components.constants/jl-components.constants";

export enum IndicatorType {
  dot,
  text
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

export enum IndicatorPalette {
  teal,
  orange,
  red,
  grey,
  blue,
  green,
  purple,
  navy
}

export interface IIndicatorConfig {
  label?: string;
  size?: keyof typeof DSSizes;
  type: keyof typeof IndicatorType;
  treatment: keyof typeof IndicatorTreatment;
  purpose: keyof typeof IndicatorPurpose;
  status?: keyof typeof IndicatorStatus; // Sentiment
  palette?: keyof typeof IndicatorPalette; // Colour
}

@Component({
  selector: 'lib-indicator',
  templateUrl: './indicator.component.html',
})
export class IndicatorComponent implements OnInit {
  @Input() config: IIndicatorConfig = {
    type: 'text',
    treatment: IndicatorTreatment.weak,
    purpose: IndicatorPurpose.status
  };
  EIndicatorStatus = IndicatorStatus;
  constructor() { }

  ngOnInit(): void {
  }

}
