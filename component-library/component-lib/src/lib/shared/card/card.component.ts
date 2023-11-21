import { Component, EventEmitter, Input, Output } from '@angular/core';

export enum CardTypes {
  primary = 'primary',
  leftBorder = 'leftBorder',
}

export interface ICardConfig {
  id: string;
  type?: keyof typeof CardTypes;
}

@Component({
  selector: 'ircc-cl-lib-card',
  templateUrl: './card.component.html'
})
export class CardComponent {
  @Input() id = '';

  @Input() type?: keyof typeof CardTypes;

  @Input() config: ICardConfig = {
    id: ''
  };

  ngOnInit() {
    this.id !== '' ? (this.config.id = this.id) : undefined;
    this.type !== undefined ? (this.config.type = this.type) : 'primary';
  }
}
