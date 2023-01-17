import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../icon/icon.component";
export var IconButtonCategories;
(function (IconButtonCategories) {
    IconButtonCategories["primary"] = "primary";
    IconButtonCategories["critical"] = "critical";
    IconButtonCategories["custom"] = "custom";
})(IconButtonCategories || (IconButtonCategories = {}));
export class IconButtonComponent {
    constructor() { }
    ngOnInit() {
    }
}
IconButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: IconButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
IconButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: IconButtonComponent, selector: "lib-icon-button", ngImport: i0, template: "<p>icon-button works!</p>\n<lib-icon></lib-icon>", dependencies: [{ kind: "component", type: i1.IconComponent, selector: "lib-icon", inputs: ["iconConfig"] }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: IconButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-icon-button', template: "<p>icon-button works!</p>\n<lib-icon></lib-icon>" }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50LWxpYi9zcmMvbGliL2ljb24tYnV0dG9uL2ljb24tYnV0dG9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudC1saWIvc3JjL2xpYi9pY29uLWJ1dHRvbi9pY29uLWJ1dHRvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDOzs7QUFDbEQsTUFBTSxDQUFOLElBQVksb0JBSVg7QUFKRCxXQUFZLG9CQUFvQjtJQUM5QiwyQ0FBbUIsQ0FBQTtJQUNuQiw2Q0FBcUIsQ0FBQTtJQUNyQix5Q0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSlcsb0JBQW9CLEtBQXBCLG9CQUFvQixRQUkvQjtBQUtELE1BQU0sT0FBTyxtQkFBbUI7SUFFOUIsZ0JBQWdCLENBQUM7SUFFakIsUUFBUTtJQUNSLENBQUM7O2dIQUxVLG1CQUFtQjtvR0FBbkIsbUJBQW1CLHVEQ1ZoQyxrREFDcUI7MkZEU1IsbUJBQW1CO2tCQUovQixTQUFTOytCQUNFLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5leHBvcnQgZW51bSBJY29uQnV0dG9uQ2F0ZWdvcmllcyB7XG4gIHByaW1hcnkgPSAncHJpbWFyeScsXG4gIGNyaXRpY2FsID0gJ2NyaXRpY2FsJyxcbiAgY3VzdG9tID0gJ2N1c3RvbSdcbn1cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1pY29uLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9pY29uLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEljb25CdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxufVxuIiwiPHA+aWNvbi1idXR0b24gd29ya3MhPC9wPlxuPGxpYi1pY29uPjwvbGliLWljb24+Il19