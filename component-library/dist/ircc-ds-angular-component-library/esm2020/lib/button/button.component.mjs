import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../icon/icon.component";
export var ButtonCategories;
(function (ButtonCategories) {
    ButtonCategories["primary"] = "primary";
    ButtonCategories["secondary"] = "secondary";
    ButtonCategories["plain"] = "plain";
})(ButtonCategories || (ButtonCategories = {}));
;
export var ButtonSize;
(function (ButtonSize) {
    ButtonSize["small"] = "small";
    ButtonSize["large"] = "large";
})(ButtonSize || (ButtonSize = {}));
;
export var ButtonColor;
(function (ButtonColor) {
    ButtonColor["critical"] = "critical";
    ButtonColor["CTA"] = "CTA";
})(ButtonColor || (ButtonColor = {}));
;
// export enum ButtonType {
//     button = 'button',
//     submit = 'submit',
//     reset = 'reset'
// }
export var ButtonIconDirection;
(function (ButtonIconDirection) {
    ButtonIconDirection["left"] = "left";
    ButtonIconDirection["right"] = "right";
})(ButtonIconDirection || (ButtonIconDirection = {}));
;
;
export class ButtonComponent {
    constructor() {
        this.config = {
            id: '',
            iconDirection: ButtonIconDirection.left
        };
        this.id = '';
        this.click = new EventEmitter();
    }
    ngOnInit() {
        (this.id !== '') ? this.config.id = this.id : undefined;
        (this.category === undefined) ? undefined : this.config.category = this.category;
        (this.size === undefined) ? undefined : this.config.size = this.size;
        (this.color === undefined) ? undefined : this.config.color = this.color;
        (this.ariaLabel !== undefined) ? this.config.ariaLabel = this.ariaLabel : undefined;
        (this.disabled !== undefined) ? this.config.disabled = this.disabled : undefined;
        (this.icon !== undefined) ? this.config.icon = this.icon : undefined;
        (this.iconDirection !== undefined) ? this.config.iconDirection = this.iconDirection : undefined;
    }
    buttonClick(id) {
        this.click.emit(id);
    }
}
ButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: ButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: ButtonComponent, selector: "lib-button", inputs: { config: "config", id: "id", category: "category", size: "size", color: "color", ariaLabel: "ariaLabel", disabled: "disabled", icon: "icon", iconDirection: "iconDirection" }, outputs: { click: "click" }, ngImport: i0, template: "<button\n    [attr.aria-label]=\"config.ariaLabel\"\n    [attr.color]=\"config.color\"\n    [attr.category]=\"config.category\"\n    [attr.size]=\"config.size\"\n    [disabled]=\"config.disabled\"\n    [ngClass]=\"config.iconDirection === 'right' ? 'icon-right' : ''\"\n    (click)=\"buttonClick(config.id)\"\n>\n<div class=\"icon\">\n    <lib-icon *ngIf=\"icon != ''\" [class]=\"icon\"></lib-icon>\n</div>\n    <ng-content></ng-content>\n</button>\n", styles: ["button{display:flex;flex-direction:row;justify-content:space-between;gap:.75rem}button.icon-right{flex-direction:row-reverse}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.IconComponent, selector: "lib-icon", inputs: ["iconConfig"] }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: ButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-button', template: "<button\n    [attr.aria-label]=\"config.ariaLabel\"\n    [attr.color]=\"config.color\"\n    [attr.category]=\"config.category\"\n    [attr.size]=\"config.size\"\n    [disabled]=\"config.disabled\"\n    [ngClass]=\"config.iconDirection === 'right' ? 'icon-right' : ''\"\n    (click)=\"buttonClick(config.id)\"\n>\n<div class=\"icon\">\n    <lib-icon *ngIf=\"icon != ''\" [class]=\"icon\"></lib-icon>\n</div>\n    <ng-content></ng-content>\n</button>\n", styles: ["button{display:flex;flex-direction:row;justify-content:space-between;gap:.75rem}button.icon-right{flex-direction:row-reverse}\n"] }]
        }], propDecorators: { config: [{
                type: Input
            }], id: [{
                type: Input
            }], category: [{
                type: Input
            }], size: [{
                type: Input
            }], color: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], disabled: [{
                type: Input
            }], icon: [{
                type: Input
            }], iconDirection: [{
                type: Input
            }], click: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudC1saWIvc3JjL2xpYi9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudC1saWIvc3JjL2xpYi9idXR0b24vYnV0dG9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFFdkUsTUFBTSxDQUFOLElBQVksZ0JBSVg7QUFKRCxXQUFZLGdCQUFnQjtJQUN4Qix1Q0FBbUIsQ0FBQTtJQUNuQiwyQ0FBdUIsQ0FBQTtJQUN2QixtQ0FBZSxDQUFBO0FBQ25CLENBQUMsRUFKVyxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBSTNCO0FBQUEsQ0FBQztBQUVGLE1BQU0sQ0FBTixJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDbEIsNkJBQWUsQ0FBQTtJQUNmLDZCQUFlLENBQUE7QUFDbkIsQ0FBQyxFQUhXLFVBQVUsS0FBVixVQUFVLFFBR3JCO0FBQUEsQ0FBQztBQUVGLE1BQU0sQ0FBTixJQUFZLFdBR1g7QUFIRCxXQUFZLFdBQVc7SUFDbkIsb0NBQXFCLENBQUE7SUFDckIsMEJBQVcsQ0FBQTtBQUNmLENBQUMsRUFIVyxXQUFXLEtBQVgsV0FBVyxRQUd0QjtBQUFBLENBQUM7QUFFRiwyQkFBMkI7QUFDM0IseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6QixzQkFBc0I7QUFDdEIsSUFBSTtBQUVKLE1BQU0sQ0FBTixJQUFZLG1CQUdYO0FBSEQsV0FBWSxtQkFBbUI7SUFDM0Isb0NBQWEsQ0FBQTtJQUNiLHNDQUFlLENBQUE7QUFDbkIsQ0FBQyxFQUhXLG1CQUFtQixLQUFuQixtQkFBbUIsUUFHOUI7QUFBQSxDQUFDO0FBV0QsQ0FBQztBQU9GLE1BQU0sT0FBTyxlQUFlO0lBTDVCO1FBTVMsV0FBTSxHQUFrQjtZQUM3QixFQUFFLEVBQUUsRUFBRTtZQUNOLGFBQWEsRUFBRSxtQkFBbUIsQ0FBQyxJQUFJO1NBRTFDLENBQUM7UUFDVyxPQUFFLEdBQUcsRUFBRSxDQUFDO1FBVVAsVUFBSyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0tBZ0IzRDtJQWRHLFFBQVE7UUFDSixDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUN4RCxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNqRixDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyRSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4RSxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNwRixDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNqRixDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNyRSxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNwRyxDQUFDO0lBRUQsV0FBVyxDQUFDLEVBQVU7UUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEIsQ0FBQzs7NEdBL0JRLGVBQWU7Z0dBQWYsZUFBZSx1UUM3QzVCLG9jQWNBOzJGRCtCYSxlQUFlO2tCQUwzQixTQUFTOytCQUNJLFlBQVk7OEJBS2pCLE1BQU07c0JBQWQsS0FBSztnQkFLTyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUVHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFFSSxLQUFLO3NCQUFkLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgZW51bSBCdXR0b25DYXRlZ29yaWVzIHtcbiAgICBwcmltYXJ5ID0gXCJwcmltYXJ5XCIsXG4gICAgc2Vjb25kYXJ5ID0gXCJzZWNvbmRhcnlcIixcbiAgICBwbGFpbiA9IFwicGxhaW5cIlxufTtcblxuZXhwb3J0IGVudW0gQnV0dG9uU2l6ZSB7XG4gICAgc21hbGwgPSBcInNtYWxsXCIsXG4gICAgbGFyZ2UgPSBcImxhcmdlXCJcbn07XG5cbmV4cG9ydCBlbnVtIEJ1dHRvbkNvbG9yIHtcbiAgICBjcml0aWNhbCA9ICdjcml0aWNhbCcsXG4gICAgQ1RBID0gJ0NUQSdcbn07XG5cbi8vIGV4cG9ydCBlbnVtIEJ1dHRvblR5cGUge1xuLy8gICAgIGJ1dHRvbiA9ICdidXR0b24nLFxuLy8gICAgIHN1Ym1pdCA9ICdzdWJtaXQnLFxuLy8gICAgIHJlc2V0ID0gJ3Jlc2V0J1xuLy8gfVxuXG5leHBvcnQgZW51bSBCdXR0b25JY29uRGlyZWN0aW9uIHtcbiAgICBsZWZ0ID0gJ2xlZnQnLFxuICAgIHJpZ2h0ID0gJ3JpZ2h0J1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJQnV0dG9uQ29uZmlnIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGNhdGVnb3J5PzogQnV0dG9uQ2F0ZWdvcmllcztcbiAgICBzaXplPzogQnV0dG9uU2l6ZTtcbiAgICBjb2xvcj86IEJ1dHRvbkNvbG9yO1xuICAgIGFyaWFMYWJlbD86IHN0cmluZztcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XG4gICAgaWNvbj86IHN0cmluZztcbiAgICBpY29uRGlyZWN0aW9uPzogQnV0dG9uSWNvbkRpcmVjdGlvbjtcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbGliLWJ1dHRvbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2J1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkNvbXBvbmVudCB7XG5ASW5wdXQoKSBjb25maWc6IElCdXR0b25Db25maWcgPSB7XG4gICAgaWQ6ICcnLFxuICAgIGljb25EaXJlY3Rpb246IEJ1dHRvbkljb25EaXJlY3Rpb24ubGVmdFxuXG59O1xuICAgIEBJbnB1dCgpIGlkID0gJyc7XG4gICAgQElucHV0KCkgY2F0ZWdvcnk/OiBCdXR0b25DYXRlZ29yaWVzO1xuICAgIEBJbnB1dCgpIHNpemU/OiBCdXR0b25TaXplO1xuICAgIEBJbnB1dCgpIGNvbG9yPzogQnV0dG9uQ29sb3I7XG4gICAgLy8gQElucHV0KCkgdHlwZT86ICdidXR0b24nIHwgJ3N1Ym1pdCcgfCAncmVzZXQnO1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbD86IHN0cmluZztcbiAgICBASW5wdXQoKSBkaXNhYmxlZD86IGJvb2xlYW47XG4gICAgQElucHV0KCkgaWNvbj86IHN0cmluZztcbiAgICBASW5wdXQoKSBpY29uRGlyZWN0aW9uPzogQnV0dG9uSWNvbkRpcmVjdGlvbjtcblxuICAgIEBPdXRwdXQoKSBjbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgKHRoaXMuaWQgIT09ICcnKSA/IHRoaXMuY29uZmlnLmlkID0gdGhpcy5pZCA6IHVuZGVmaW5lZDtcbiAgICAgICAgKHRoaXMuY2F0ZWdvcnkgPT09IHVuZGVmaW5lZCkgPyB1bmRlZmluZWQgOiB0aGlzLmNvbmZpZy5jYXRlZ29yeSA9IHRoaXMuY2F0ZWdvcnk7XG4gICAgICAgICh0aGlzLnNpemUgPT09IHVuZGVmaW5lZCkgPyB1bmRlZmluZWQgOiB0aGlzLmNvbmZpZy5zaXplID0gdGhpcy5zaXplO1xuICAgICAgICAodGhpcy5jb2xvciA9PT0gdW5kZWZpbmVkKSA/IHVuZGVmaW5lZCA6IHRoaXMuY29uZmlnLmNvbG9yID0gdGhpcy5jb2xvcjtcbiAgICAgICAgKHRoaXMuYXJpYUxhYmVsICE9PSB1bmRlZmluZWQpID8gdGhpcy5jb25maWcuYXJpYUxhYmVsID0gdGhpcy5hcmlhTGFiZWwgOiB1bmRlZmluZWQ7XG4gICAgICAgICh0aGlzLmRpc2FibGVkICE9PSB1bmRlZmluZWQpID8gdGhpcy5jb25maWcuZGlzYWJsZWQgPSB0aGlzLmRpc2FibGVkIDogdW5kZWZpbmVkO1xuICAgICAgICAodGhpcy5pY29uICE9PSB1bmRlZmluZWQpID8gdGhpcy5jb25maWcuaWNvbiA9IHRoaXMuaWNvbiA6IHVuZGVmaW5lZDtcbiAgICAgICAgKHRoaXMuaWNvbkRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkKSA/IHRoaXMuY29uZmlnLmljb25EaXJlY3Rpb24gPSB0aGlzLmljb25EaXJlY3Rpb24gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgYnV0dG9uQ2xpY2soaWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmNsaWNrLmVtaXQoaWQpO1xuICAgIH1cbn1cbiIsIjxidXR0b25cbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImNvbmZpZy5hcmlhTGFiZWxcIlxuICAgIFthdHRyLmNvbG9yXT1cImNvbmZpZy5jb2xvclwiXG4gICAgW2F0dHIuY2F0ZWdvcnldPVwiY29uZmlnLmNhdGVnb3J5XCJcbiAgICBbYXR0ci5zaXplXT1cImNvbmZpZy5zaXplXCJcbiAgICBbZGlzYWJsZWRdPVwiY29uZmlnLmRpc2FibGVkXCJcbiAgICBbbmdDbGFzc109XCJjb25maWcuaWNvbkRpcmVjdGlvbiA9PT0gJ3JpZ2h0JyA/ICdpY29uLXJpZ2h0JyA6ICcnXCJcbiAgICAoY2xpY2spPVwiYnV0dG9uQ2xpY2soY29uZmlnLmlkKVwiXG4+XG48ZGl2IGNsYXNzPVwiaWNvblwiPlxuICAgIDxsaWItaWNvbiAqbmdJZj1cImljb24gIT0gJydcIiBbY2xhc3NdPVwiaWNvblwiPjwvbGliLWljb24+XG48L2Rpdj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2J1dHRvbj5cbiJdfQ==