import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Bypass security and trust the given value to be safe HTML.
 * @see https://stackoverflow.com/questions/39628007/angular2-innerhtml-binding-remove-style-attribute
 */
@Pipe({
  name: 'SafeHtmlPipe'
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}

  transform(value: string) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
