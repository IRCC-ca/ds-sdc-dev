import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IButtonConfig } from 'ircc-ds-angular-component-library';

export enum mobileBehaviourType {
  fullWidth = 'fullWidth',
  column = 'column'
}
export interface IAccordionContainerConfig {
  id: string;
  buttonText?: string;
  buttonTextClosed?: string;
  open?: boolean;
  mobileBehaviour?: keyof typeof mobileBehaviourType;
}

@Component({
  selector: 'app-accordian-container',
  templateUrl: './accordion-container.component.html',
  styleUrls: ['./accordion-container.component.scss']
})
export class accordionContainerComponent
  implements OnInit, AfterViewInit, AfterContentChecked
{
  @Input() config: IAccordionContainerConfig = {
    id: '',
    mobileBehaviour: mobileBehaviourType.column
  };
  @Input() id: string = '';
  @Input() buttonText: string = '';
  @Input() buttonTextClosed: string = '';
  @Input() open?: boolean | undefined;
  @Input() mobileBehaviour: keyof typeof mobileBehaviourType | undefined;
  @ViewChild('extraLeft') extraLeftRef!: ElementRef;
  @ViewChild('extraRight') extraRightRef!: ElementRef;
  noExtraLeft: boolean = false;
  noExtraRight: boolean = false;

  @Output() getOpen = new EventEmitter<boolean>();

  buttonConfigAcccordionOpen: IButtonConfig = {
    id: 'accordion-button-open',
    category: 'plain',
    size: 'small',
    ariaLabel: 'Click to expand the accordion',
    iconDirection: 'left'
  };
  buttonConfigAcccordionClose: IButtonConfig = {
    id: 'accordion-button-close',
    category: 'plain',
    size: 'small',
    ariaLabel: 'Click to expand the accordion',
    iconDirection: 'left'
  };

  constructor(
    private translate: TranslateService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    // Insuring accordion-container btns have unique IDs
    this.buttonConfigAcccordionOpen.id =
      this.buttonConfigAcccordionOpen.id + '-' + this.config.id;
    this.buttonConfigAcccordionClose.id =
      this.buttonConfigAcccordionClose.id + '-' + this.config.id;

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
    if (this.mobileBehaviour !== undefined)
      this.config.mobileBehaviour = this.mobileBehaviour;
  }

  ngAfterViewInit() {
    this.noExtraLeft = this.extraLeftRef?.nativeElement.childElementCount === 0;
    this.noExtraRight =
      this.extraRightRef?.nativeElement.childElementCount === 0;
  }

  openAccordion() {
    this.config.open = !this.config.open;
    this.getOpen.emit(this.config.open);
  }

  getExtraClass(): string {
    if (this.noExtraLeft && this.noExtraRight) {
      return 'no-extra';
    } else if (this.noExtraLeft && !this.noExtraRight) {
      return 'no-extra-left';
    } else {
      return 'no-extra-right';
    }
  }
}
