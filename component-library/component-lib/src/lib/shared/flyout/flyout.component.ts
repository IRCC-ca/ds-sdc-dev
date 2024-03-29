import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  HostListener,
  ViewChildren,
  ElementRef,
  QueryList,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { DSSizes } from '../../../shared/constants/jl-components.constants';
import {
  FlyoutOptionComponent,
  IFlyoutOptionConfig
} from '../flyout-option/flyout-option.component';
import { TranslateService } from '@ngx-translate/core';

export enum IFlyoutSelectTypes {
  single = 'single',
  multi = 'multi',
  autocomplete = 'autocomplete'
}

export interface IFlyoutConfig {
  id: string;
  options: IFlyoutOptionConfig[];
  disabled?: boolean;
  selected?: string;
  selection?: [] | number;
  type?: keyof typeof IFlyoutSelectTypes;
  size?: keyof typeof DSSizes;
}
export const FLYOUT_CURRENT_SELECTED = {
  en: ' currently selected',
  fr: ' actuellement selectionne'
};

@Component({
  selector: 'ircc-cl-lib-flyout',
  templateUrl: './flyout.component.html'
})
export class FlyoutComponent implements OnInit {
  constructor(private translate: TranslateService) {}
  @ViewChildren('option') optionContainers: QueryList<ElementRef> =
    new QueryList<ElementRef>();

  @Input() config: IFlyoutConfig = {
    id: '',
    options: []
  };
  @Input() id?: string;
  @Input() options?: IFlyoutOptionConfig[];
  @Input() disabled?: boolean;
  @Input() selection?: [] | number;
  @Input() type?: keyof typeof IFlyoutSelectTypes;
  @Input() size?: keyof typeof DSSizes;

  //TODO: Must add the other config parameters
  @Output() isSelected = new EventEmitter();

  selectedIndex: number = -1;
  a11yText: string = '';
  currentSelected: string = '';

  ngOnInit() {
    if (this.config.type === undefined) this.config.type = 'single';
    if (this.config.selected === undefined) this.config.selected = '';
    if (this.id) this.config.id = this.id;
    if (this.options) this.config.options = this.options;
    if (!this.config.options) this.config.options = [];
    if (this.disabled) this.config.disabled = this.disabled;
    if (this.selection) this.config.selection = this.selection;
    if (this.type) this.config.type = this.type;
    if (this.size) this.config.size = this.size;

    this.setLang(this.translate.currentLang);
    this.translate.onLangChange.subscribe((change) => {
      this.setLang(change.lang);
    });
  }

  calculateContainerHeight(): string {
    let numberOfItems = this.config.options?.length || 0;
    const itemHeight = 36;
    const visibleItems = 5;

    if (numberOfItems < 2) {
      numberOfItems = 1.5;
    }

    if (numberOfItems && numberOfItems <= visibleItems) {
      return `${itemHeight * numberOfItems}px`;
    }

    return `${itemHeight * visibleItems}px`;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    let target = event.target as HTMLElement;
    if (
      !target.classList.contains('option-contents') &&
      !target.classList.contains('dropdown')
    ) {
      this.isSelected.emit(null);
    }
  }

  @HostListener('document:keydown.arrowdown', ['$event'])
  onArrowDown(event: KeyboardEvent) {
    event.preventDefault();
    if (this.config.options) {
      let foundClickable = false;
      this.config.options
        .slice(this.selectedIndex + 1)
        .forEach((option, index) => {
          if (!foundClickable && option.clickable !== false) {
            this.selectedIndex += index + 1;
            this.highlightIndex(option.id);
            foundClickable = true;
          }
        });
    }
  }

  @HostListener('document:keydown.arrowup', ['$event'])
  onArrowUp(event: KeyboardEvent) {
    event.preventDefault();
    if (this.config.options) {
      let foundClickable = false;
      this.config.options
        .slice(0, this.selectedIndex)
        .reverse()
        .forEach((option, index) => {
          if (!foundClickable && option.clickable !== false) {
            this.selectedIndex -= index + 1;
            this.highlightIndex(option.id);
            foundClickable = true;
          }
        });
      // Ensure selectedIndex does not fall below 0
      this.selectedIndex = Math.max(this.selectedIndex, 0);
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    event.preventDefault();
    //if the index hasn't changes through arrow navigation, emits our event but lets the parent know nothing was selected
    this.selectedIndex != -1
      ? this.optionSelected(this.selectedIndex)
      : this.isSelected.emit(null);
  }

  @HostListener('mouseenter')
  onHover() {
    // Remove default active state for 1st option when user hover on flyout
    if (
      this.config.options.length > 0 &&
      this.config.options[0].active === true
    )
      this.config.options[0].active = false;
  }

  //takes in the active index from HostListeners and sets the config option to active state which triggers styling
  highlightIndex(el_id: any) {
    if (el_id) {
      this.config.options?.forEach((option) => {
        if (option.id === el_id) {
          option.active = true;
          this.optionContainers
            .toArray()
            [this.selectedIndex]?.nativeElement?.scrollIntoView({
              behavior: 'smooth',
              block: 'end'
            });
          console.log('HERE', option.value);

          this.a11yText = option.value;
          //updates a11yText to indicate currently selected item if scrolling through flyout again
          if (option.selected) this.a11yText += this.currentSelected;
        } else {
          option.active = false;
        }
      });
    }
  }

  /**
   * setLang detects changes to the language toggle to serve the correct aria error text
   */
  setLang(lang: string) {
    lang === 'en' || lang === 'en-US'
      ? (this.currentSelected = FLYOUT_CURRENT_SELECTED.en)
      : (this.currentSelected = FLYOUT_CURRENT_SELECTED.fr);
  }

  //clears all selections by setting the option.selected to false
  clearOptions() {
    this.config?.options?.forEach((option) => {
      option.selected = false;
    });
  }

  //function takes in index value of current active option and selects it
  optionSelected(i: number) {
    if (
      this.config.options &&
      !this.config.options[i].selected &&
      this.config.options[i].clickable
    ) {
      //setup for future multi select feature
      this.config.type !== 'multi'
        ? this.clearOptions()
        : /*this.config.selection = [].push(this.config.options[i]);*/ console.log(
            'MULTI'
          );
      this.config.options[i].selected = true;
      //emits the value of the selected index so it's visible to the parent
      this.isSelected.emit(this.config.options[i].value);
    }
  }
}
