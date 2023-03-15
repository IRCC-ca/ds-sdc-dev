import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DSSizes } from "../../../shared/constants/jl-components/jl-components.constants/jl-components.constants";

export enum IndicatorType {
  dot,
  text,
  number
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
  label?: string | number;
  size?: keyof typeof DSSizes;
  type: keyof typeof IndicatorType;
  icon?: string;
  category: keyof typeof IndicatorTreatment; // Treatment
  purpose: keyof typeof IndicatorPurpose;
  status?: keyof typeof IndicatorStatus; // Sentiment
  palette?: keyof typeof IndicatorPalette; // Colour
}

@Component({
  selector: 'lib-indicator',
  templateUrl: './indicator.component.html',
})
export class IndicatorComponent implements OnInit, AfterViewInit {
  @Input() config: IIndicatorConfig = {
    type: 'text',
    category: IndicatorTreatment.weak,
    purpose: IndicatorPurpose.status
  };
  @ViewChild('label') label?: ElementRef<HTMLDivElement>;
  EIndicatorStatus = IndicatorStatus;
  rounded?: boolean;
  abbr?: boolean; // Display abbr tag when text is truncated
  constructor() { }

  ngOnInit(): void {
    // If label only have 1 character, it should be rounded
    if (typeof this.config?.label === 'string') {
      this.rounded = (this.config.label.length == 1 && !this.config.icon);
    }
    if (this.config.type === 'number' && this.config?.label && this.config.label > 99) {
      this.config.label = '99+';
    }
  }

  ngAfterViewInit() {
    // Max 200px - padding 8px x2
    this.abbr = <boolean>(this.label?.nativeElement?.offsetWidth && this.label?.nativeElement?.offsetWidth > 184);
  }
}
