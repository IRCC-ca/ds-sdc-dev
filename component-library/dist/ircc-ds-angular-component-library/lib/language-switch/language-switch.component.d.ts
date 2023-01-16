import { LanguageSwitchButtonService } from './language-switch-button.service';
import * as i0 from "@angular/core";
export declare class LanguageSwitchComponent {
    private platformId;
    private langToggle;
    id: string;
    isMobile: boolean;
    constructor(platformId: object, langToggle: LanguageSwitchButtonService);
    /** Listens for screen resizes and sets mobile boolean */
    handleResize(e: any): void;
    switch(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LanguageSwitchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LanguageSwitchComponent, "lib-language-switch", never, { "id": "id"; }, {}, never, never, false>;
}
