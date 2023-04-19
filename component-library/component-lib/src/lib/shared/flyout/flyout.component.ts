import { Component, Input, Output, OnInit, EventEmitter, HostListener, ViewChildren, ElementRef, QueryList } from '@angular/core';
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
  @ViewChildren('option') optionContainers: QueryList<ElementRef> = new QueryList<ElementRef>;

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
      let foundClickable = false;
      this.config.options.slice(this.selectedIndex + 1).forEach((option, index) => {
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
    this.selectedIndex != -1 ? this.optionSelected(this.selectedIndex) : this.isSelected.emit(null);
  }

  //takes in the active index from HostListeners and sets the config option to active state which triggers styling
  highlightIndex(el_id: any) {
    if(el_id){
      this.config.options?.forEach(option => {
        if(option.id === el_id){
          option.active = true;
          this.optionContainers.toArray()[this.selectedIndex]?.nativeElement?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
          this.a11yText = option.value;
          //updates a11yText to indicate currently selected item if scrolling through flyout again
          if(option.selected) this.a11yText += ' currently selected'; //translation?
        }else{
          option.active = false;
        }
      });
    }
  }

  //clears all selections by setting the option.selected to false
  clearOptions(){
    this.config?.options?.forEach(option => {
      option.selected = false;
    });
  }

  constructor() { }

  ngOnInit() {
    if(this.config.type === undefined) this.config.type = 'single';
    if(this.id) this.config.id = this.id;
  };

  //function takes in index value of current active option and selects it
  optionSelected(i: number){
    if(this.config.options && !this.config.options[i].selected && this.config.options[i].clickable){
      //setup for future multi select feature
      this.config.type != 'multi' ? this.clearOptions() : /*this.config.selection = [].push(this.config.options[i]);*/null;
      this.config.options[i].selected = true;
      //emits the value of the selected index so it's visible to the parent
      this.isSelected.emit(this.config.options[i].value);
      }
  }

};
