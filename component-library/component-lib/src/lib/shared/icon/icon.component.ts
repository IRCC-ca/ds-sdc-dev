import { Component, Input, KeyValueDiffer, KeyValueDiffers, SimpleChanges } from '@angular/core';

export interface IIconConfig {
  ariaLabel?: string;
  FA_keywords?: string;
}

@Component({
  selector: 'ircc-cl-lib-icon',
  templateUrl: './icon.component.html'
})
export class IconComponent {
  @Input() config: IIconConfig = {};

  @Input() ariaLabel?: string;
  @Input() FA_keywords?: string;

  differ: KeyValueDiffer<string, any>;

  constructor(private differs: KeyValueDiffers) {
    this.differ = this.differs.find({}).create();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config']) {
      console.log('config changed', changes['config'].currentValue);
    }
  }
}
