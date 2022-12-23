// TODO: Cannot enter dropdown menu with keyboard!!!

import {
  Component,
  OnInit,
  HostListener,
  Input,
  KeyValueDiffers,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

import { DropdownTypes } from '../../shared/constants/jl-components/jl-components.constants/jl-components.constants';
import { IComponentOutputEvent } from '../../shared/interfaces/component-configs';

export interface IJLDropdownComponentConfig {
  type: DropdownTypes;
  options: IJLDropdownOptions[];
  text?: string;
  large?: boolean; //TODO: This should be changed to 'small' like all the others
  error?: boolean;
  // empty?: boolean; //Default TRUE but doesn't do anything
  selectedIndex?: number;
  id: string;
}

export interface IJLDropdownOptions {
  text: string;
  value?: string;
}

@Component({
  selector: 'jl-pr-sclp-dropdown',
  templateUrl: './jl-dropdown.component.html',
  styleUrls: ['./jl-dropdown.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: JLDropdownComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: JLDropdownComponent
    }
  ]
})
export class JLDropdownComponent implements OnInit, ControlValueAccessor, Validator {
  // @Input() options: IJLDropdownOptions[] = [
  //   {
  //     text: `Text`,
  //     value: `Value`
  //   }
  // ];

  // @Input() type = DropdownTypes.input;
  // @Input() text = ``;
  // @Input() large = false;
  // @Input() error = false;
  // @Input() empty = true;
  // @Input() selectedIndex = 0;

  @Input() config?: IJLDropdownComponentConfig;

  //Optionally, individual parameters can be used instead.
  @Input() options?: IJLDropdownOptions[]
  @Input() id?: string;
  @Input() type?: DropdownTypes;
  @Input() text?: string;
  @Input() large?: true;
  @Input() error?: true;
  // @Input() empty?: true;
  @Input() selectedIndex?: number;

  hideDropdown = true;
  isFocusInsideComponent = false;
  isComponentClicked = false;
  dropdownTypes = DropdownTypes;

  touched = false;
  isDisabled = false;

  constructor(private differs: KeyValueDiffers) {
  }
  onChange = (value: string) => {};
  onTouched = () => {};

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return control.errors
  }

  writeValue(value: any) {
    //TODO: This needs to be written to set the value and the current index number;
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
  setDisabledState?(isDisabled: boolean) {
    // (this.config !== undefined) ? this.config.disabled = isDisabled : this.disabled = isDisabled;
    this.isDisabled = isDisabled;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  @HostListener('window:keydown.escape', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    event.stopPropagation();
    if (this.hideDropdown === false || (this.config?.options || []).length > 0) {
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

  public toggleDropDown() {
    this.hideDropdown = !this.hideDropdown;
  }

  public toggleDropDownKey(event: KeyboardEvent) {
    if (event.keyCode === 13) { //TODO: Changed until const can be added.
      // if (event.key === KeyboardEvents.enter) {
      this.toggleDropDown();
    }
  }

  /**
   * TODO: I've band-aided this one so that it works. Can probably remove the entire
   * custom DoCheck by just doing this.
   * @param index 
   */
  public selectIndex(index: number) {
    if (this.config) {
      let emit = false;
      if (this.config.selectedIndex !== index) {
        emit = true;
      }
      this.config.selectedIndex = index;
      emit ? this.onChange(this.config?.options[(this.config?.selectedIndex || 0)].value || '') : '';
      // emit ? this.valueChange.emit({ id: this.config?.id || '', value: this.config?.options[(this.config?.selectedIndex || 0)].value || '' }) : '';
    }
  }

  getOptions(index: number) {
    if (this.config) {
      return this.config.options[index].text;
    }
    return '';
  }

  ngOnInit(): void { }
}
