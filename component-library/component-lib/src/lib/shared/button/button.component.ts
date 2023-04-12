import { Component, EventEmitter, Input, Output } from '@angular/core';

export enum ButtonCategories {
  primary = 'primary',
  secondary = 'secondary',
  plain = 'plain'
}

export enum ButtonSize {
  small = 'small',
  large = 'large'
}

export enum ButtonColor {
  critical = 'critical',
  CTA = 'CTA'
}

// export enum ButtonType {
//     button = 'button',
//     submit = 'submit',
//     reset = 'reset'
// }

export enum ButtonIconDirection {
  left = 'left',
  right = 'right'
}

export interface IButtonConfig {
  id: string;
  category?: keyof typeof ButtonCategories;
  size?: keyof typeof ButtonSize;
  color?: keyof typeof ButtonColor;
  ariaLabel?: string;
  disabled?: boolean;
  icon?: string;
  iconDirection?: keyof typeof ButtonIconDirection;
}

@Component({
  selector: 'ircc-cl-lib-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() config: IButtonConfig = {
    id: ''
  };
  @Input() id = '';
  @Input() category?: keyof typeof ButtonCategories;
  @Input() size?: keyof typeof ButtonSize;
  @Input() color?: keyof typeof ButtonColor;
  @Input() ariaLabel?: string;
  @Input() disabled?: boolean;
  @Input() icon?: string;
  @Input() iconDirection?: keyof typeof ButtonIconDirection;

  @Output() btnAction: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.id !== '' ? (this.config.id = this.id) : undefined;
    this.category === undefined
      ? undefined
      : (this.config.category = this.category);
    this.size === undefined ? undefined : (this.config.size = this.size);
    this.color === undefined ? undefined : (this.config.color = this.color);
    this.ariaLabel !== undefined
      ? (this.config.ariaLabel = this.ariaLabel)
      : undefined;
    this.disabled !== undefined
      ? (this.config.disabled = this.disabled)
      : undefined;
    if (this.icon || this.config.icon) {
      this.config.icon = this.icon ? this.icon : this.config.icon;
      this.config.iconDirection = this.iconDirection
        ? this.iconDirection
        : this.config.iconDirection;
      this.config.iconDirection = this.config.iconDirection
        ? this.config.iconDirection
        : 'left';
    } else {
      this.config.icon = undefined;
      this.config.iconDirection = undefined;
    }
  }

  clickEvent(id: string) {
    this.btnAction.emit(id);
  }
}
