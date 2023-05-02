import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';

export interface IIconConfig {
  ariaLabel?: string;
  FA_keywords?: string;
}

@Component({
  selector: 'ircc-cl-lib-icon',
  templateUrl: './icon.component.html'
})
export class IconComponent implements OnChanges {
  @ViewChild('iconSpan') iconSpan!: ElementRef;
  @Input() config: IIconConfig = {};
  @Input() ariaLabel?: string;
  @Input() FA_keywords?: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config'] && !changes['config'].firstChange) {
      const change = changes['config'].currentValue;
      const keys = Object.keys(change);
      let spanContent = `<i class='font-icon `;
      keys.includes('FA_keywords')
        ? (spanContent += `${change['FA_keywords']}'`)
        : null;
      keys.includes('ariaLabel')
        ? (spanContent += ` aria-hidden='${
            change['ariaLabel'] === ''
          }' aria-label='${change['ariaLabel']}'`)
        : null;
      spanContent += `></i>`;
      this.iconSpan.nativeElement.innerHTML = spanContent;
    }
  }
}
