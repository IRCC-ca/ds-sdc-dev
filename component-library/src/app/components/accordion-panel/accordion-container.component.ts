import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IButtonConfig } from 'ircc-ds-angular-component-library';

export interface IAccordionContainerConfig {
  id: string;
  buttonText?: string;
  buttonTextClosed?: string;
  open?: boolean;
}

@Component({
  selector: 'app-accordian-container',
  templateUrl: './accordion-container.component.html',
  styleUrls: ['./accordion-container.component.scss']
})
export class accordionContainerComponent implements OnInit {
  @Input() config: IAccordionContainerConfig = {
    id: ''
  };
  @Input() id: string = '';
  @Input() buttonText: string = '';
  @Input() buttonTextClosed: string = '';
  @Input() open?: boolean | undefined;

  @Output() getOpen = new EventEmitter<boolean>();

  buttonConfigAcccordion: IButtonConfig = {
    id: 'accordion-button',
    category: 'plain',
    size: 'small',
    ariaLabel: 'Click to expand the accordion',
    iconDirection: 'left'
  };

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    console.log(this.config);
    if (this.config.buttonText === '' || this.config.buttonText === undefined)
      this.config.buttonText = 'Accordion.HideCode';

    if (
      this.config.buttonTextClosed === '' ||
      this.config.buttonTextClosed === undefined
    )
      this.config.buttonTextClosed = 'Accordion.ShowCode';

    if (this.id !== '') this.config.id = this.id;
    if (this.buttonText !== '') this.config.buttonText = this.buttonText;
    if (this.buttonTextClosed !== '')
      this.config.buttonTextClosed = this.buttonTextClosed;
    if (this.open !== undefined) this.config.open = this.open;
  }

  openAccordion() {
    this.config.open = !this.config.open;
    this.getOpen.emit(this.config.open);
  }
}
