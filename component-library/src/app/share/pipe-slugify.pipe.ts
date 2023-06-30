import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transform string to slugged, then add # to front
 * @see https://www.otcollect.com/collection/angular/page/dkrrYPP2/angular-slugify-pipe-for-your-angular-url-seo-friendly-applications
 */
@Pipe({
  name: 'SlugifyPipe'
})
export class SlugifyPipe implements PipeTransform {
  transform(str: string): string {
    return this.isString(str)
      ? str
          .toLowerCase()
          .trim()
          .replace(/[^\w\-]+/g, ' ')
          .replace(/\s+/g, '-')
      : str;
  }

  isString(value: any): boolean {
    return typeof value === 'string';
  }
}
