import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare enum ButtonCategories {
    primary = "primary",
    secondary = "secondary",
    plain = "plain"
}
export declare enum ButtonSize {
    small = "small",
    large = "large"
}
export declare enum ButtonColor {
    critical = "critical",
    CTA = "CTA"
}
export declare enum ButtonIconDirection {
    left = "left",
    right = "right"
}
export interface IButtonConfig {
    id: string;
    category?: ButtonCategories;
    size?: ButtonSize;
    color?: ButtonColor;
    ariaLabel?: string;
    disabled?: boolean;
    icon?: string;
    iconDirection?: ButtonIconDirection;
}
export declare class ButtonComponent {
    config: IButtonConfig;
    id: string;
    category?: ButtonCategories;
    size?: ButtonSize;
    color?: ButtonColor;
    ariaLabel?: string;
    disabled?: boolean;
    icon?: string;
    iconDirection?: ButtonIconDirection;
    click: EventEmitter<any>;
    ngOnInit(): void;
    buttonClick(id: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonComponent, "lib-button", never, { "config": "config"; "id": "id"; "category": "category"; "size": "size"; "color": "color"; "ariaLabel": "ariaLabel"; "disabled": "disabled"; "icon": "icon"; "iconDirection": "iconDirection"; }, { "click": "click"; }, never, ["*"], false>;
}
