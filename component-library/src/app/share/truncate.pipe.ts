import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 40, trail: string = '...'): string {
    const item = value;

    return item && item.length > limit
      ? item.substring(0, limit) + trail
      : value;
  }
}
