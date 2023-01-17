import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, Input, PLATFORM_ID } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./language-switch-button.service";
import * as i2 from "@ngx-translate/core";
export class LanguageSwitchComponent {
    constructor(platformId, langToggle) {
        this.platformId = platformId;
        this.langToggle = langToggle;
        this.id = '';
        this.isMobile = false;
    }
    /** Listens for screen resizes and sets mobile boolean */
    handleResize(e) {
        if (isPlatformBrowser(this.platformId)) {
            this.isMobile = window.innerWidth <= 893;
        }
    }
    switch() {
        this.langToggle.languageToggleClick();
    }
}
LanguageSwitchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: LanguageSwitchComponent, deps: [{ token: PLATFORM_ID }, { token: i1.LanguageSwitchButtonService }], target: i0.ɵɵFactoryTarget.Component });
LanguageSwitchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: LanguageSwitchComponent, selector: "lib-language-switch", inputs: { id: "id" }, host: { listeners: { "window:resize": "handleResize($event)" } }, ngImport: i0, template: "<button category=\"plain\" [id]=\"id\"  attr.aria-label=\"{{'LANGUAGE_SELECTION_ARIA_LABEL' | translate}}\" (click)=\"switch()\" id=\"language-toggle\">{{ (!isMobile ? 'OPPOSITE_LANGUAGE' : 'OPPOSITE_LANGUAGE_MOBILE') | translate }}</button>\n", styles: [""], dependencies: [{ kind: "pipe", type: i2.TranslatePipe, name: "translate" }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: LanguageSwitchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-language-switch', template: "<button category=\"plain\" [id]=\"id\"  attr.aria-label=\"{{'LANGUAGE_SELECTION_ARIA_LABEL' | translate}}\" (click)=\"switch()\" id=\"language-toggle\">{{ (!isMobile ? 'OPPOSITE_LANGUAGE' : 'OPPOSITE_LANGUAGE_MOBILE') | translate }}</button>\n" }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i1.LanguageSwitchButtonService }]; }, propDecorators: { id: [{
                type: Input
            }], handleResize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2Utc3dpdGNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudC1saWIvc3JjL2xpYi9sYW5ndWFnZS1zd2l0Y2gvbGFuZ3VhZ2Utc3dpdGNoLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudC1saWIvc3JjL2xpYi9sYW5ndWFnZS1zd2l0Y2gvbGFuZ3VhZ2Utc3dpdGNoLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxTQUFTLEVBQWdCLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFrQixXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFRbEgsTUFBTSxPQUFPLHVCQUF1QjtJQU1sQyxZQUMrQixVQUFrQixFQUN2QyxVQUF1QztRQURsQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ3ZDLGVBQVUsR0FBVixVQUFVLENBQTZCO1FBTnhDLE9BQUUsR0FBRyxFQUFFLENBQUM7UUFFakIsYUFBUSxHQUFHLEtBQUssQ0FBQztJQUlvQyxDQUFDO0lBRXBELHlEQUF5RDtJQUV6RCxZQUFZLENBQUMsQ0FBTTtRQUNqQixJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDeEMsQ0FBQzs7b0hBcEJRLHVCQUF1QixrQkFPeEIsV0FBVzt3R0FQVix1QkFBdUIsbUpDVHBDLHFQQUNBOzJGRFFhLHVCQUF1QjtrQkFMbkMsU0FBUzsrQkFDRSxxQkFBcUI7OzBCQVc1QixNQUFNOzJCQUFDLFdBQVc7c0ZBTFosRUFBRTtzQkFBVixLQUFLO2dCQVVKLFlBQVk7c0JBRFgsWUFBWTt1QkFBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPbkluaXQsIE91dHB1dCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExhbmd1YWdlU3dpdGNoQnV0dG9uU2VydmljZSB9IGZyb20gJy4vbGFuZ3VhZ2Utc3dpdGNoLWJ1dHRvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWxhbmd1YWdlLXN3aXRjaCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9sYW5ndWFnZS1zd2l0Y2guY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9sYW5ndWFnZS1zd2l0Y2guY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMYW5ndWFnZVN3aXRjaENvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgaWQgPSAnJztcblxuICBpc01vYmlsZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogb2JqZWN0LFxuICAgIHByaXZhdGUgbGFuZ1RvZ2dsZTogTGFuZ3VhZ2VTd2l0Y2hCdXR0b25TZXJ2aWNlKSB7IH1cblxuICAgIC8qKiBMaXN0ZW5zIGZvciBzY3JlZW4gcmVzaXplcyBhbmQgc2V0cyBtb2JpbGUgYm9vbGVhbiAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICAgIGhhbmRsZVJlc2l6ZShlOiBhbnkpIHtcbiAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgIHRoaXMuaXNNb2JpbGUgPSB3aW5kb3cuaW5uZXJXaWR0aCA8PSA4OTM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3dpdGNoKCkge1xuICAgICAgdGhpcy5sYW5nVG9nZ2xlLmxhbmd1YWdlVG9nZ2xlQ2xpY2soKTtcbiAgICB9IFxufVxuIiwiPGJ1dHRvbiBjYXRlZ29yeT1cInBsYWluXCIgW2lkXT1cImlkXCIgIGF0dHIuYXJpYS1sYWJlbD1cInt7J0xBTkdVQUdFX1NFTEVDVElPTl9BUklBX0xBQkVMJyB8IHRyYW5zbGF0ZX19XCIgKGNsaWNrKT1cInN3aXRjaCgpXCIgaWQ9XCJsYW5ndWFnZS10b2dnbGVcIj57eyAoIWlzTW9iaWxlID8gJ09QUE9TSVRFX0xBTkdVQUdFJyA6ICdPUFBPU0lURV9MQU5HVUFHRV9NT0JJTEUnKSB8IHRyYW5zbGF0ZSB9fTwvYnV0dG9uPlxuIl19