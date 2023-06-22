import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { DSSizes } from '../../../shared/constants/jl-components.constants';

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
  information = 'information',
  warning = 'warning',
  critical = 'critical',
  neutral = 'neutral',
  primary = 'primary',
  success = 'success'
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
  tabIndex?: number | undefined;
  category: keyof typeof IndicatorTreatment; // Treatment
  purpose: keyof typeof IndicatorPurpose;
  status?: keyof typeof IndicatorStatus; // Sentiment
  palette?: keyof typeof IndicatorPalette; // Colour
  ariaLabel?: string; // Aria label line of value
}

@Component({
  selector: 'ircc-cl-lib-indicator',
  templateUrl: './indicator.component.html'
})
export class IndicatorComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() config: IIndicatorConfig = {
    type: 'text',
    category: IndicatorTreatment.weak,
    purpose: IndicatorPurpose.status,
    tabIndex: 0
  };

  @Input() size?: keyof typeof DSSizes;
  @Input() type?: keyof typeof IndicatorType;
  @Input() icon?: string;
  @Input() category?: keyof typeof IndicatorTreatment; // Treatment
  @Input() purpose?: keyof typeof IndicatorPurpose;
  @Input() status?: keyof typeof IndicatorStatus; // Sentiment
  @Input() palette?: keyof typeof IndicatorPalette; // Colour
  @Input() ariaLabel?: string; // Aria label line of value
  @Input() tabIndex = undefined;
  
  @ViewChild('label') label?: ElementRef<HTMLDivElement>;
  EIndicatorStatus = IndicatorStatus;
  rounded?: boolean;
  abbr?: boolean; // Display abbr tag when text is truncated

  ngOnInit() {
    //set config from individual options, if present
    if (this.size) this.config.size = this.size;
    if (this.type) this.config.type = this.type;
    if (this.icon) this.config.icon = this.icon;
    if (this.category) this.config.category = this.category;
    if (this.purpose) this.config.purpose = this.purpose;
    if (this.status) this.config.status = this.status;
    if (this.palette) this.config.palette = this.palette;
    if (this.ariaLabel) this.config.ariaLabel = this.ariaLabel;


    this.checkLabelRounded();
    this.checkNumber();

    this.tabIndex !== undefined
      ? (this.config.tabIndex = this.tabIndex)
      : undefined;
  }

  ngAfterViewInit() {
    this.checkLabelLength();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.checkNumber();
    this.checkLabelRounded();
    this.checkLabelLength();
  }

  // Check if number exceeds 99
  private checkNumber() {
    if (
      this.config.type === 'number' &&
      this.config?.label &&
      this.config.label > 99
    ) {
      this.config.label = '99+';
    }
  }

  // If label only have 1 character, it should be rounded
  private checkLabelRounded() {
    if (typeof this.config?.label === 'string') {
      this.rounded = this.config.label.length == 1 && !this.config.icon;
    }
  }

  // Check if div exceeds 200px
  private checkLabelLength() {
    // Max 200px - padding 8px x2
    this.abbr = <boolean>(
      (this.label?.nativeElement?.offsetWidth &&
        this.label?.nativeElement?.offsetWidth > 184)
    );
  }
}
