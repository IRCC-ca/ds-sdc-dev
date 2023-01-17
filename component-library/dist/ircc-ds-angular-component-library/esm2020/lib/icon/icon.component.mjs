import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const FONT_FAMILIES = {
    ['fa-solid']: null,
    ['fa-thin']: null,
    ['fa-light']: null,
    ['fa-regular']: null,
    ['fa-brands']: null,
};
export class IconComponent {
    get formattedIcon() {
        return "'" + '\\' + this.iconConfig.unicode + "'";
    }
    get isHidden() {
        return this.iconConfig.ariaLabel === '';
    }
}
IconComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: IconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
IconComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: IconComponent, selector: "lib-icon", inputs: { iconConfig: "iconConfig" }, ngImport: i0, template: "<span\n    class=\"font-icon\"\n    [attr.aria-hidden]=\"isHidden\"\n    [attr.aria-label]=\"iconConfig.ariaLabel\"\n    [style.--font-unicode]=\"formattedIcon\"\n    [ngClass]=\"iconConfig.fontFamily\"\n></span>\n", styles: [".font-icon:before{--font-unicode: inherit;content:var(--font-unicode);speak:none}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: IconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-icon', template: "<span\n    class=\"font-icon\"\n    [attr.aria-hidden]=\"isHidden\"\n    [attr.aria-label]=\"iconConfig.ariaLabel\"\n    [style.--font-unicode]=\"formattedIcon\"\n    [ngClass]=\"iconConfig.fontFamily\"\n></span>\n", styles: [".font-icon:before{--font-unicode: inherit;content:var(--font-unicode);speak:none}\n"] }]
        }], propDecorators: { iconConfig: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb21wb25lbnQtbGliL3NyYy9saWIvaWNvbi9pY29uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudC1saWIvc3JjL2xpYi9pY29uL2ljb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUVqRCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUc7SUFDekIsQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJO0lBQ2xCLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSTtJQUNqQixDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUk7SUFDbEIsQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJO0lBQ3BCLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSTtDQUN0QixDQUFDO0FBYUYsTUFBTSxPQUFPLGFBQWE7SUFHdEIsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sR0FBRyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDdEQsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNmLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEtBQUssRUFBRSxDQUFDO0lBQzVDLENBQUM7OzBHQVRRLGFBQWE7OEZBQWIsYUFBYSxzRkNyQjFCLHdOQU9BOzJGRGNhLGFBQWE7a0JBTHpCLFNBQVM7K0JBQ0ksVUFBVTs4QkFLWCxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgRk9OVF9GQU1JTElFUyA9IHtcbiAgICBbJ2ZhLXNvbGlkJ106IG51bGwsXG4gICAgWydmYS10aGluJ106IG51bGwsXG4gICAgWydmYS1saWdodCddOiBudWxsLFxuICAgIFsnZmEtcmVndWxhciddOiBudWxsLFxuICAgIFsnZmEtYnJhbmRzJ106IG51bGwsXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElJY29uQ29uZmlnIHtcbiAgICBhcmlhTGFiZWw/OiBzdHJpbmc7XG4gICAgdW5pY29kZTogc3RyaW5nO1xuICAgIGZvbnRGYW1pbHk6IGtleW9mIHR5cGVvZiBGT05UX0ZBTUlMSUVTO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2xpYi1pY29uJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vaWNvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vaWNvbi5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBJY29uQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBpY29uQ29uZmlnITogSUljb25Db25maWc7XG5cbiAgICBwdWJsaWMgZ2V0IGZvcm1hdHRlZEljb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwiJ1wiICsgJ1xcXFwnICsgdGhpcy5pY29uQ29uZmlnLnVuaWNvZGUgKyBcIidcIjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzSGlkZGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pY29uQ29uZmlnLmFyaWFMYWJlbCA9PT0gJyc7XG4gICAgfVxufVxuIiwiPHNwYW5cbiAgICBjbGFzcz1cImZvbnQtaWNvblwiXG4gICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwiaXNIaWRkZW5cIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaWNvbkNvbmZpZy5hcmlhTGFiZWxcIlxuICAgIFtzdHlsZS4tLWZvbnQtdW5pY29kZV09XCJmb3JtYXR0ZWRJY29uXCJcbiAgICBbbmdDbGFzc109XCJpY29uQ29uZmlnLmZvbnRGYW1pbHlcIlxuPjwvc3Bhbj5cbiJdfQ==