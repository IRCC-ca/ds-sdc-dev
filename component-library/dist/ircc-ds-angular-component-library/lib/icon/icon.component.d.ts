import * as i0 from "@angular/core";
export declare const FONT_FAMILIES: {
    "fa-solid": null;
    "fa-thin": null;
    "fa-light": null;
    "fa-regular": null;
    "fa-brands": null;
};
export interface IIconConfig {
    ariaLabel?: string;
    unicode: string;
    fontFamily: keyof typeof FONT_FAMILIES;
}
export declare class IconComponent {
    iconConfig: IIconConfig;
    get formattedIcon(): string;
    get isHidden(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconComponent, "lib-icon", never, { "iconConfig": "iconConfig"; }, {}, never, never, false>;
}
