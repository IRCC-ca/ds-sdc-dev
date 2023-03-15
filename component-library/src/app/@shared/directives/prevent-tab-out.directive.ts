import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[preventTabOut]'
})
export class PreventTabOutDirective {
  // constructor(private el: ElementRef) {}

  // @HostListener('keydown.tab', ['$event'])
  // onTab(event: KeyboardEvent) {
  //   const dialog = this.el.nativeElement as HTMLDialogElement;

  //   if (dialog && dialog.open && !event.shiftKey) {
  //     event.preventDefault();
  //     const focusableElements = dialog.querySelectorAll(
  //       'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  //     );
  //     const firstElement = focusableElements[0] as HTMLElement;
  //     firstElement.focus();
  //   }
  // }

  // @Output() clickOutside = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) { }
  
  scrollToAnchor() {
    const anchorEl = this.elementRef.nativeElement.querySelector('target');
    if (anchorEl) {
      anchorEl.scrollIntoView({behaviour: 'smooth'});
    }
  }

  // @HostListener('keydown.tab', ['$event'])
  // @HostListener('keydown.shift.tab', ['$event'])
  // onTab(event: KeyboardEvent) {
  //   const dialog = this.elementRef.nativeElement;
    
  //   console.log(this.getNextTabbableElement(event.target));
  //   //   if (dialog.contains(event.target)) {
  //   //     console.log('ha!')
  //   //   }
  //   //   // Do something when a tab or shift+tab event occurs
  //   //   console.log('Tab or shift+tab event occurred', event);
  //   //   // event.preventDefault();
  //   //   console.log(this.getNextTabElement());
  //   // }

  //   // getNextTabElement(): HTMLElement {
  //   //   const currentElement = this.elementRef.nativeElement;
  //   //   const nextElement = currentElement.nextTabbable;

  //   //   return nextElement as HTMLElement;
  //   // }
  // }
  // getNextTabbableElement(element: any): HTMLElement {
  //   const elements = Array.from(document.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, *[tabindex]'));
  //   const currentElement = this.elementRef.nativeElement;
  //   const currentIndex = elements.indexOf(currentElement);
  //   const nextIndex = currentIndex === elements.length - 1 ? 0 : currentIndex + 1;
  //   const nextElement = elements[nextIndex];

  //   return nextElement as HTMLElement;
  // }
}
