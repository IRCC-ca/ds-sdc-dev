import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'autocomplete' })
export class autocompletePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: string, searched: string = ''): any {
    if (searched.length === 0) {
      return this.sanitize(`${value}`);
    }
    return this.sanitize(
      `<span class="normal">${this.replace(value, searched)}</span>`
    );
  }

  replace(str: string, searched: string) {
    return str.replace(
      new RegExp(`(${searched})`, 'i'),
      '<span class="bolded">$1</span>'
    );
  }

  sanitize(str: string) {
    return this.domSanitizer.sanitize(SecurityContext.HTML, str);
  }
}
