import { Component, Input, Output, OnInit, EventEmitter, HostListener } from '@angular/core';
import { IFlyoutOptionConfig } from '../flyout-option/flyout-option.component';

export enum IFlyoutSelectTypes {
  single = 'single',
  multi = 'multi'
}

export interface IFlyoutConfig {
  id?: string,
  options?: IFlyoutOptionConfig[],
  disabled?: boolean
  selection?: [] | number,
  type?: keyof typeof IFlyoutSelectTypes
};

@Component({
  selector: 'lib-flyout',
  templateUrl: './flyout.component.html'
})
export class FlyoutComponent implements OnInit {

  @Input() config : IFlyoutConfig = {
  }
  @Input() id : string = '';
  @Output() isSelected = new EventEmitter();

  selectedIndex : number = -1;

  @HostListener('document:keydown.arrowdown', ['$event'])
  onArrowDown(event: KeyboardEvent) {
    event.preventDefault();
    if (this.config.options) {
      this.selectedIndex = Math.min(this.selectedIndex + 1, this.config.options.length - 1);
      while (this.config.options[this.selectedIndex].clickable = false) {
        this.selectedIndex++;
      }
    }
    this.focusIndex();
    console.log('down', this.selectedIndex);

  }

  @HostListener('document:keydown.arrowup', ['$event'])
  onArrowUp(event: KeyboardEvent) {
    event.preventDefault();
    this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
    if(this.config.options){
      while (this.config.options[this.selectedIndex].clickable = false) {
        this.selectedIndex--;
      }
    }
    this.focusIndex();
    console.log('up', this.selectedIndex);
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    event.preventDefault();
    console.log('enter', this.selectedIndex);
    this.optionSelected(this.selectedIndex);
  }

  focusIndex() {
    if(this.config.options){
      console.log(this.config.options[this.selectedIndex].id);
    }
  }

  clearOptions(){
    console.log('getting here?');
    this.config?.options?.forEach(option => {
      option.selected = false;
    });
    console.log('THE OPTIONS', this.config.options);
  }

  constructor() { }

  ngOnInit() {
    console.log('Flyout:', this.config);
    if(this.config.type === undefined) this.config.type = 'single';
    if(this.config.id) this.id = this.config.id;
  };

  optionSelected(i: number){
    this.config.options ? console.log(this.config?.options[i]) : null;
    if(this.config.options && !this.config.options[i].selected && !this.config.options[i].clickable){
      console.log(i);
      console.log(this.config.type);
      this.config.type != 'multi' ? this.clearOptions() : /*this.config.selection = [].push(this.config.options[i]);*/null;
      this.config.options[i].selected = true;
      this.isSelected.emit(this.config.options[i].value);
      }
  }

};
