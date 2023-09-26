import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  HostListener,
  ElementRef
} from '@angular/core';
import { DSSizes } from '../../../shared/constants/jl-components.constants';
import {
  IFlyoutOptionConfig
} from '../flyout-option/flyout-option.component';

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

@Component({
  selector: 'ircc-cl-lib-flyout',
  templateUrl: './flyout.component.html'
})
export class FlyoutComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

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
  optionContainers : Array<HTMLElement> = [];


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
          this.a11yText = option.value;
        } else {
          option.active = false;
        }
      });

      const el = this.elementRef.nativeElement.querySelector(`#${el_id}`);
      const flyoutContainer = this.elementRef.nativeElement.querySelector('.flyout-container');

      if (el && flyoutContainer) {
        const elRect = el.getBoundingClientRect();
        const containerRect = flyoutContainer.getBoundingClientRect();

        if (elRect.bottom > containerRect.bottom) {
          // Scroll down if the element is below the container's visible area
          flyoutContainer.scrollTop += (elRect.bottom - containerRect.bottom);
        } else if (elRect.top < containerRect.top) {
          // Scroll up if the element is above the container's visible area
          flyoutContainer.scrollTop -= (containerRect.top - elRect.top);
        }
      }
        }
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
