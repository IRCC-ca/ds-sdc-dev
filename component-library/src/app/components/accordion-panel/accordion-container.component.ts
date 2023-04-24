import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IButtonConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-accordian-container',
  templateUrl: './accordion-container.component.html',
  styleUrls: ['./accordion-container.component.scss']
})
export class accordionContainerComponent {
  @Input() buttonText: string = 'Show Code';
  @Input() open: boolean = true;
  @Output() getOpen = new EventEmitter<boolean>();

  buttonConfigAcccordion: IButtonConfig = {
    id: 'accordion-button',
    category: 'plain',
    size: 'small',
    ariaLabel: 'Click to expand the accordion',
    iconDirection: 'left'
  };

  constructor(private translate: TranslateService) {}

  openAccordion() {
    this.open = !this.open;
    this.getOpen.emit(this.open);
  }
}
