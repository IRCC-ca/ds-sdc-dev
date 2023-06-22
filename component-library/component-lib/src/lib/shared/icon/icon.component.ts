import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
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
export class IconComponent implements OnChanges, OnInit {
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
      spanContent += `></i>`;
      this.iconSpan.nativeElement.innerHTML = spanContent;
    }
  }

  ngOnInit() {
     //set config from individual options, if present
    if (this.ariaLabel) this.config.ariaLabel = this.ariaLabel;
    if (this.FA_keywords) this.config.FA_keywords = this.FA_keywords;

    if (this.config.ariaLabel === '') {
      delete this.config.ariaLabel
    }
  }
}
