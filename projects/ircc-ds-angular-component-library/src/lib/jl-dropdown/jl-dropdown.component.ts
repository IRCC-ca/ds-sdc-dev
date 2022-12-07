import {
  Component,
  OnInit,
  HostListener,
  Input,
  Output,
  EventEmitter,
  DoCheck,
  KeyValueDiffers,
  KeyValueDiffer
} from '@angular/core';

import { DropdownTypes } from '../../shared/constants/jl-components/jl-components.constants/jl-components.constants';

//TODO: Create interface (config) for this component

@Component({
  selector: 'jl-pr-sclp-dropdown',
  templateUrl: './jl-dropdown.component.html',
  styleUrls: ['./jl-dropdown.scss']
})
export class JLDropdownComponent implements OnInit, DoCheck {
  //TODO: Make an interface for this!
  @Input() options = [
    {
      text: `Text`,
      value: `Value`
    }
  ];

  @Input() type = DropdownTypes.input;
  @Input() text = ``;
  @Input() large = false;
  @Input() error = false;
  @Input() empty = true;
  @Input() selectedIndex = 0;
  @Output() selectValueChange = new EventEmitter();

  hideDropdown = true;
  isFocusInsideComponent = false;
  isComponentClicked = false;
  dropdownTypes = DropdownTypes;

  differ: KeyValueDiffer<string, any>;
  constructor(private differs: KeyValueDiffers) {
    this.differ = this.differs.find({}).create();
  }

  @HostListener('window:keydown.escape', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    event.stopPropagation();
    if (this.hideDropdown === false || this.options.length > 0) {
      this.isComponentClicked = false;
      this.isFocusInsideComponent = false;
      this.hideDropdown = true;
    }
  }

  @HostListener('click', ['$event'])
  clickInside(event: { target: HTMLInputElement }) {
    const target = event.target;

    if (this.hideDropdown === true && target.classList.contains(`selected`)) {
      this.isFocusInsideComponent = true;
      this.isComponentClicked = true;
      this.hideDropdown = false;
    } else if (
      target.classList.contains('select-target') ||
      target.classList.contains(`selected`)
    ) {
      this.isComponentClicked = false;
      this.isFocusInsideComponent = false;
      this.hideDropdown = true;
    }
  }

  @HostListener('document:click')
  clickout() {
    if (!this.isFocusInsideComponent && this.isComponentClicked) {
      this.toggleDropDown();

      this.isComponentClicked = false;
    }
    this.isFocusInsideComponent = false;
  }

  //TODO: This is almost certainly not needed. Try and leverage the existing default lifecycle hooks for detection 
  //strategy
  ngDoCheck() {
    const change = this.differ.diff(this);

    if (change !== null) {
      change.forEachChangedItem((item) => {
        if (item.key === `selectedIndex` && this.type === DropdownTypes.input) {
          this.selectValueChange.emit(this.options[item.currentValue]);
        }
      });
      change.forEachItem((item) => {
        if (item.key === `selectedIndex` && this.type === DropdownTypes.cta) {
          this.selectIndex(item.currentValue);
        }
        if (
          item.key === `isComponentClicked` &&
          item.currentValue === false &&
          item.previousValue !== null &&
          this.type === DropdownTypes.cta
        ) {
          this.selectValueChange.emit(this.options[this.selectedIndex]);
        }
      });
    }
  }

  public toggleDropDown() {
    this.hideDropdown = !this.hideDropdown;
  }

  public toggleDropDownKey(event: KeyboardEvent) {
    if (event.keyCode === 13) { //TODO: Changed until const can be added.
    // if (event.key === KeyboardEvents.enter) {
      this.toggleDropDown();
    }
  }

  public selectIndex(index: number) {
    this.selectedIndex = index;
  }

  ngOnInit(): void {}
}
