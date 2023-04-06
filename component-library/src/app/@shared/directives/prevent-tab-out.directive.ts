import { Directive, ElementRef, Output, EventEmitter, HostListener, Input } from '@angular/core';


export enum TabShiftTab {
  tab = 'tab',
  shiftTab = 'shiftTab'
}

@Directive({
  selector: '[appPreventTabOut]'
})
export class PreventTabOutDirective {
  @Input() enabled?: string[] = [];
  constructor(private el: ElementRef) { }

  @HostListener('keydown.tab', ['$event'])
  onTab(event: KeyboardEvent) {
    this.preventTabs(event, TabShiftTab.tab);
  }
  @HostListener('keydown.shift.tab', ['$event'])
  onShiftTab(event: KeyboardEvent) {
    this.preventTabs(event, TabShiftTab.shiftTab);
  }

  preventTabs(event: KeyboardEvent, type: TabShiftTab) {
    const focusableEls = document.querySelectorAll('button:not([disabled])');
    const modalEls: any[] = [];
    focusableEls.forEach(el => {
      this.enabled?.forEach(id => {
        if (el.id === id) {
          modalEls.push(el);
        }
      });
    });
    const firstFocusableEl = modalEls[0];
    const lastFocusableEl = modalEls[modalEls.length - 1];
    console.log(lastFocusableEl.parentElement.parentElement);
    if (type === TabShiftTab.tab) {
      if (document.activeElement?.contains(lastFocusableEl)) {
        firstFocusableEl.focus();
        event.preventDefault();
      }
    } else if (type === TabShiftTab.shiftTab) {
      if (document.activeElement?.contains(firstFocusableEl)) {
        lastFocusableEl.parentElement.parentElement.focus();
        event.preventDefault();
      }
    }
  }
}