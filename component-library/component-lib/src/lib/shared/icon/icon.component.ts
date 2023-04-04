import { Component, Input, KeyValueDiffer, KeyValueDiffers } from '@angular/core';

export interface IIconConfig {
    ariaLabel?: string;
    fontFamily?: string;
}

@Component({
    selector: 'lib-icon',
    templateUrl: './icon.component.html'
})
export class IconComponent {
    @Input() config: IIconConfig = {
    };

    differ: KeyValueDiffer<string, any>;

    constructor(private differs: KeyValueDiffers) {
      this.differ = this.differs.find({}).create();
    }

    ngDoCheck() {
      const change = this.differ.diff(this);
        if (change) {
          console.log('HERE');
          let cont = document.getElementById('ds-icon-container');
          console.log(cont);
            change.forEachChangedItem(item => {
              console.log(item.key);
              if(item.key === 'config' && cont){
                  if(!item.currentValue.ariaLabel){
                    cont.innerHTML = `
                    <span class='${item.currentValue.fontFamily}' aria-hidden='true'></span>
                    `
                    console.log('changed');
                  } else {
                    cont.innerHTML = `
                    <span class='${item.currentValue.fontFamily}' aria-label='${item.currentValue.ariaLabel}'></span>
                    `
                    console.log('also changed');
                  }
              }
            });
        }
    }

    ngOnInit() {
        if (this.ariaLabel) this.config.ariaLabel = this.ariaLabel;
        if (this.fontFamily) this.config.fontFamily = this.fontFamily;
    }
}
