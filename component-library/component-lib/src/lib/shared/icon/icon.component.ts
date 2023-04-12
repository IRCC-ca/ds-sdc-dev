import { Component, Input, KeyValueDiffer, KeyValueDiffers, SimpleChanges } from '@angular/core';

export interface IIconConfig {
    ariaLabel?: string;
    FA_keywords?: string;
}

@Component({
    selector: 'lib-icon',
    templateUrl: './icon.component.html'
})
export class IconComponent {
    @Input() config: IIconConfig = {
    };

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

    // ngDoCheck() {
    //   const change = this.differ.diff(this);
    //     if (change) {
    //       let cont = document.getElementById('ds-icon-container');
    //         change.forEachChangedItem(item => {
    //           if(item.key === 'config' && cont){
    //               if(!item.currentValue.ariaLabel){
    //                 cont.innerHTML = `
    //                 <span class='${item.currentValue.FA_keywords}' aria-hidden='true'></span>
    //                 `
    //               } else {
    //                 cont.innerHTML = `
    //                 <span class='${item.currentValue.FA_keywords}' aria-label='${item.currentValue.ariaLabel}'></span>
    //                 `
    //               }
    //           }
    //         });
    //     }
    // }

}
