import { Component, Input, Output, OnInit, EventEmitter, HostListener } from '@angular/core';
import { IFlyoutOptionConfig } from '../flyout-option/flyout-option.component';

export enum IFlyoutSelectTypes {
  single = 'single',
  multi = 'multi'
}

export interface IFlyoutConfig {
  id: string,
  options?: IFlyoutOptionConfig[],
  disabled?: boolean
  selection?: [] | number,
  type?: keyof typeof IFlyoutSelectTypes
};

@Component({
  selector: 'ircc-cl-lib-flyout',
  templateUrl: './flyout.component.html'
})
export class FlyoutComponent implements OnInit {

  @Input() config : IFlyoutConfig = {
    id: ''
  }
  @Input() id? : string;
  @Output() isSelected = new EventEmitter();

  selectedIndex : number = -1;
  a11yText : string = '';

  @HostListener('document:keydown.arrowdown', ['$event'])
  onArrowDown(event: KeyboardEvent) {
    event.preventDefault();
    if (this.config.options) {
      this.selectedIndex = Math.min(this.selectedIndex + 1, this.config.options.length - 1);
      while (this.config.options[this.selectedIndex].clickable === false) {
        this.selectedIndex++;
      }
      this.highlightIndex(this.config.options[this.selectedIndex].id);
    }
    console.log('down', this.selectedIndex);

  }

  @HostListener('document:keydown.arrowup', ['$event'])
  onArrowUp(event: KeyboardEvent) {
    event.preventDefault();
    this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
    if(this.config.options){
      while (this.config.options[this.selectedIndex].clickable === false) {
        this.selectedIndex--;
      }
      this.highlightIndex(this.config.options[this.selectedIndex].id);
    }
    console.log('up', this.selectedIndex);
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    event.preventDefault();
    console.log('enter', this.selectedIndex);
    this.selectedIndex != -1 ? this.optionSelected(this.selectedIndex) : this.isSelected.emit(null);
  }

  highlightIndex(el_id: any) {
    if(el_id){
      this.config.options?.forEach(option => {
        if(option.id === el_id){
          option.active = true;
          let el = document.getElementById(el_id);
          if (el) el.parentElement?.parentElement?.scrollIntoView({block: "end", behavior: "smooth"});
          this.a11yText = option.value;
          if(option.selected) this.a11yText += ' currently selected'; //translation?
        }else{
          option.active = false;
        }
      });
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
    if(this.id) this.config.id = this.id;
  };

  optionSelected(i: number){
    console.log('CLICK HAPPENING?');
    this.config.options ? console.log(this.config?.options[i]) : null;
    if(this.config.options && !this.config.options[i].selected && this.config.options[i].clickable){
      console.log(i);
      console.log(this.config.type);
      this.config.type != 'multi' ? this.clearOptions() : /*this.config.selection = [].push(this.config.options[i]);*/null;
      this.config.options[i].selected = true;
      console.log(this.config.options);
      this.isSelected.emit(this.config.options[i].value);
      }
  }

};
