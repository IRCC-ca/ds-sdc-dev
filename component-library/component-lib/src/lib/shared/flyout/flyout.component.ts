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
  selector: 'lib-flyout',
  templateUrl: './flyout.component.html'
})
export class FlyoutComponent implements OnInit {

  @Input() config : IFlyoutConfig = {
    id: ''
  }
  @Input() id? : string;
  @Output() isSelected = new EventEmitter();
  @Output() closeFlyout = new EventEmitter();

  selectedIndex : number = -1;

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
    this.selectedIndex != -1 ? this.optionSelected(this.selectedIndex) : this.closeFlyout.emit();
  }

  highlightIndex(el_id: any) {
    if(el_id){
      console.log(el_id);
      let el = document.getElementById(el_id);
      console.log(el);
      if (el){
        document.querySelectorAll('.option-container').forEach(option => {
          option.classList.remove('selected');
        });
        el.parentElement?.parentElement?.classList.add('selected');
        console.log('in here');
        el.parentElement?.parentElement?.scrollIntoView({block: "end", behavior: "smooth"});
      }
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
