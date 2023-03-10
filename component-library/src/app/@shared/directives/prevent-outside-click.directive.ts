import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[preventOutsideClick]'
})
export class PreventOutsideClickDirective {
  @Output() clickOutside = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    event.stopImmediatePropagation();
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    console.log(clickedInside)
    if (!clickedInside) {
      event.stopPropagation();
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }


//   ngAfterViewInit() {
//     const outsideClick$ = fromEvent<MouseEvent>(document, 'click').pipe(
//       filter((event: MouseEvent) => !this.elementRef.nativeElement.contains(event.target))
//     );
//     const destroy$ = fromEvent(this.elementRef.nativeElement, 'destroy');
//     outsideClick$.pipe(takeUntil(destroy$)).subscribe((event: MouseEvent) => {
//       event.preventDefault();
//       console.log('things2')
//     });
//   }
}
