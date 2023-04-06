import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

/**
 * @see https://stackblitz.com/edit/angular-mutationobserver-example?file=app%2Fapp.module.ts,app%2Fdom-change.directive.ts,app%2Fapp.component.ts
 */
@Directive({
  selector: '[domChange]'
})
export class DomChangeDirective implements OnDestroy {
  private changes: MutationObserver;

  @Output()
  public domChange = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    const element = this.elementRef.nativeElement;

    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach((mutation: MutationRecord) => this.domChange.emit(mutation));
      }
    );

    this.changes.observe(element, {
      attributes: true,
      childList: true,
      characterData: true
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
