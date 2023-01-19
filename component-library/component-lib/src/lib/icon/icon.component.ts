import { Component, Input } from '@angular/core';

export const FONT_FAMILIES = {
    ['fa-solid']: null,
    ['fa-thin']: null,
    ['fa-light']: null,
    ['fa-regular']: null,
    ['fa-brands']: null,
};

export interface IIconConfig {
    ariaLabel?: string;
    unicode: string;
    fontFamily: keyof typeof FONT_FAMILIES;
}

@Component({
    selector: 'lib-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
    @Input() config: IIconConfig = {
        unicode: '',
        fontFamily: 'fa-regular'
    };

    @Input() ariaLabel?: string;
    @Input() unicode?: string;
    @Input() fontFamily?: keyof typeof FONT_FAMILIES;

    formattedIcon = '';

    ngOnInit() {
        this.formattedIcon = "'" + '\\' + this.config?.unicode + "'";

        if (this.ariaLabel) this.config.ariaLabel = this.ariaLabel;
        if (this.fontFamily) this.config.fontFamily = this.fontFamily;
        if (this.unicode) this.config.unicode = this.unicode;
    }
}
