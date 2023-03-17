/**
 * TODO: This particular component, while functional, is not ideal. Components should not import other components directly in the .ts
 * unless absolutely necessary. Furthermore, the use of DoCheck, while interesting, is not ideal, since it ignores the built-in
 * angular lifecycle hooks and change detection.
 */

import {
  Component,
  OnInit,
  HostListener,
  Input,
  Output,
  EventEmitter,
  DoCheck,
  KeyValueDiffers,
  KeyValueDiffer,
  ViewChild
} from '@angular/core';
import { InputComponent } from '../../form-components/input/input.component';
//TODO: This should be changed. Ideally the component doesn't need to know about these, and can just
//add them in using the template.
import { ChipItemComponent } from '../chips/chip-item/chip-item.component';

interface IOption { //Changed: Interfaces should ALWAYS start with 'I'.
  text: string;
  value: string;
}

@Component({
  selector: 'lib-autocomplete',
  templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent implements OnInit, DoCheck {
  @ViewChild(InputComponent, { static: true })
  inputComponent?: InputComponent;

  //TODO: Change this to a config
  @Input() options: IOption[] = [];
  @Input() title = `Title`;
  @Input() hintText = `Hint Text`;
  @Input() name = `Add Name`;
  @Input() error = false;
  @Input() limit = 0;
  @Output() selectValueChange = new EventEmitter();
  @Input() savedSelectedOptions: IOption[] = [];

  selectedOptions: IOption[] = [];
  originalOptions: IOption[] = [];
  inputValue?: string;
  hideDropdown = true;
  isFocusInsideComponent = false;
  isComponentClicked = false;
  addHover = false;
  emptyResults = false;

  differ: KeyValueDiffer<string, any>;
  constructor(private differs: KeyValueDiffers) {
    this.differ = this.differs.find({}).create();
  }

  @HostListener('window:keydown.escape', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    event.stopPropagation();
    if (this.hideDropdown === false || this.options.length > 0) {
      this.inputComponent?.clearvalue();
      this.returnOptionsToDefault();
      this.isComponentClicked = false;
      this.isFocusInsideComponent = false;
      this.hideDropdown = true;
    }
  }

  @HostListener('click', ['$event'])
  clickInside(event: { target: HTMLInputElement }) {
    const target = event.target;
    if (
      this.hideDropdown === true &&
      target.type === `text` &&
      this.options.length > 0
    ) {
      this.isFocusInsideComponent = true;
      this.isComponentClicked = true;
      this.toggleDropDown();
      this.addHover = true;
    } else if (
      target.classList.contains('select-target') ||
      target.classList.contains(`selected`)
    ) {
      this.isComponentClicked = false;
      this.isFocusInsideComponent = false;
      this.toggleDropDown();
    }
  }

  @HostListener('document:click')
  clickout() {
    if (!this.isFocusInsideComponent && this.isComponentClicked) {
      this.toggleDropDown();
      this.inputComponent?.clearvalue();
      this.returnOptionsToDefault();
      this.isComponentClicked = false;
    }
    this.isFocusInsideComponent = false;
  }

  onMouseEnter() {
    this.addHover = false;
  }

  ngDoCheck() {
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem((item) => {
        if (item.key === `options`) {
          this.selectValueChange.emit(this.selectedOptions);
        }
      });
    }
  }

  valueChange(event: any) {
    this.filterList(event);
  }

  filterList(filterValue: any) {
    if (filterValue.length < 1) {
      this.returnOptionsToDefault();
    } else {
      const filteredOptions = this.originalOptions.filter((value) => {
        return value.text.toLowerCase().includes(filterValue.toLowerCase());
      });
      this.options = filteredOptions.slice(0);
      if (this.options.length === 0) {
        this.emptyResults = true;
      } else {
        this.emptyResults = false;
      }
    }
  }

  public checkActive(value: string): boolean {
    for (const selectedOption of this.selectedOptions) {
      if (selectedOption.value === value) {
        return true;
      }
    }
    return false;
  }

  returnOptionsToDefault() {
    this.emptyResults = false;
    this.options = this.originalOptions.slice(0);
  }

  public toggleDropDown() {
    this.hideDropdown = !this.hideDropdown;
    this.inputComponent?.focusInput(this.hideDropdown);
  }

  public toggleDropDownKey(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.toggleDropDown();
    }
  }

  removeChipItem(index: number) {
    this.selectedOptions.splice(index, 1);
    this.returnOptionsToDefault();
  }

  public removeAllChipItems() {
    this.selectedOptions = [];
    this.returnOptionsToDefault();
  }

  public selectAll() {
    for (const option of this.options) {
      this.selectedOptions.push(option);
    }
    this.returnOptionsToDefault();
  }

  public selectIndex(index: number) {
    if (this.limit !== 0 && this.selectedOptions.length >= this.limit) {
      return;
    } else {
      this.inputComponent?.clearvalue();
      this.returnOptionsToDefault();
      if (this.checkDuplicated(index) === false) {
        this.selectedOptions.push(this.options[index]);
      }
    }
  }

  checkDuplicated(index: number) {
    return this.selectedOptions.some((element: { value: string }) => {
      if (element.value === this.options[index].value) {
        return true;
      }

      return false;
    });
  }

  ngOnInit(): void {
    this.selectedOptions = [];
    this.originalOptions = this.options.slice(0);
    this.selectedOptions = this.savedSelectedOptions;
    this.savedSelectedOptions = [];
    this.returnOptionsToDefault();
  }
}
