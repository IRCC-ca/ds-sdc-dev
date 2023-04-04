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

    @Input() ariaLabel?: string;
    @Input() fontFamily?: string;

    formattedIcon = '';

    differ: KeyValueDiffer<string, any>;

    constructor(private differs: KeyValueDiffers) {
      this.differ = this.differs.find({}).create();
    }

    ngDoCheck() {
      const change = this.differ.diff(this);
        if (change) {
          let cont = document.getElementById('ds-icon-container');
            change.forEachChangedItem(item => {
              if(item.key === 'config' && cont){
                  if(!item.currentValue.ariaLabel){
                    cont.innerHTML = `
                    <span class='${item.currentValue.fontFamily}' aria-hidden='true'></span>
                    `
                  } else {
                    cont.innerHTML = `
                    <span class='${item.currentValue.fontFamily}' aria-label='${item.currentValue.ariaLabel}'></span>
                    `
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
