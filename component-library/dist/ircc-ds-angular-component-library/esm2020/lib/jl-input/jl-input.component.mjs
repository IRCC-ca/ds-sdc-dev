import { Component, forwardRef, Input, } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-translate/core";
export var InputTypes;
(function (InputTypes) {
    InputTypes["text"] = "text";
    InputTypes["password"] = "password";
})(InputTypes || (InputTypes = {}));
export class JLInputComponent {
    constructor() {
        this.formGroupEmpty = new FormGroup({});
        //DON'T include default values of '' unless it REALLY makes sense to do so. Instead, make them optional
        this.config = {
            id: '',
            formGroup: new FormGroup({})
        };
        this.id = '';
        this.formGroup = this.formGroupEmpty;
        this.disabled = false;
        this.focusState = false;
        this.showPassword = false;
    }
    ngOnInit() {
        if (this.id !== '') {
            this.config.id = this.id;
        }
        if (this.formGroup !== this.formGroupEmpty) {
            this.config.formGroup = this.formGroup;
        }
        this.config.formGroup.addControl(this.config.id, new FormControl('', this.config.validators));
    }
    focusInput(focusValue) {
        this.focusState = !focusValue;
    }
    /**
     * Toggle the password field
     */
    hideShow() {
        this.showPassword = !this.showPassword;
        this.config.type === InputTypes.password ? (this.config.type = InputTypes.text) : (this.config.type = InputTypes.password);
    }
    clearvalue() {
        this.config.value = ``;
    }
    writeValue(value) {
        this.config.value = value;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
JLInputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: JLInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
JLInputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: JLInputComponent, selector: "jl-pr-sclp-input", inputs: { config: "config", id: "id", formGroup: "formGroup" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => JLInputComponent),
            multi: true
        }
    ], ngImport: i0, template: "<!-- TODO: Fix how large is handled here to work with DS rather than against it -->\n<div>\n  <form [formGroup]=\"config.formGroup\">\n    <p *ngIf=\"config.type === 'password' || showPassword\">TODO: This element does not actually have correct aria text on\n      it!</p>\n    <div class=\"input-container\" [ngClass]=\"{ large: config.large, error: config.error }\">\n      <div class=\"input-text\">\n        <label for=\"{{ (config.value || '') }}\">{{ (config.label || '') | translate }}</label>\n        <p *ngIf=\"config.hintText\" class=\"hint-text\">{{ config.hintText | translate }}</p>\n        <div class=\"input-content-area\" [ngClass]=\"focusState === true ? 'focus' : ''\">\n          <!-- ngModel doesn't mind undefined values, apparently\n        TODO: Should probably change the (keyup) to (onblur) -->\n          <input autocomplete=\"{{ config.autocomplete }}\" placeholder=\"{{ (config.placeholder || '') | translate }}\"\n            tabindex=\"0\" [ngClass]=\"(showPassword || config.type === 'password') ? 'password' : 'input'\"\n            [type]=\"config.type\" [id]=\"config.id\" [formControlName]=\"config.id\" />\n        </div>\n        <button *ngIf=\"config.type === 'password' || showPassword\" role=\"switch\" category=\"plain\"\n          class=\"transparentButton\" (click)=\"hideShow()\" [disabled]=\"disabled\">\n          <div *ngIf=\"showPassword\"><i class=\"fa-solid fa-eye-slash\"></i></div>\n          <div *ngIf=\"!showPassword\"><i class=\"fa-solid fa-eye\"></i></div>\n          <!-- <i class=\"passwordIcon fa-solid\" aria-pressed=\"getShowHideText('check')\"\n            [ngClass]=\"showPassword ? 'fa-eye-slash' : 'fa-eye'\"></i> -->\n        </button>\n      </div>\n    </div>\n  </form>\n</div>", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "pipe", type: i3.TranslatePipe, name: "translate" }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: JLInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'jl-pr-sclp-input', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => JLInputComponent),
                            multi: true
                        }
                    ], template: "<!-- TODO: Fix how large is handled here to work with DS rather than against it -->\n<div>\n  <form [formGroup]=\"config.formGroup\">\n    <p *ngIf=\"config.type === 'password' || showPassword\">TODO: This element does not actually have correct aria text on\n      it!</p>\n    <div class=\"input-container\" [ngClass]=\"{ large: config.large, error: config.error }\">\n      <div class=\"input-text\">\n        <label for=\"{{ (config.value || '') }}\">{{ (config.label || '') | translate }}</label>\n        <p *ngIf=\"config.hintText\" class=\"hint-text\">{{ config.hintText | translate }}</p>\n        <div class=\"input-content-area\" [ngClass]=\"focusState === true ? 'focus' : ''\">\n          <!-- ngModel doesn't mind undefined values, apparently\n        TODO: Should probably change the (keyup) to (onblur) -->\n          <input autocomplete=\"{{ config.autocomplete }}\" placeholder=\"{{ (config.placeholder || '') | translate }}\"\n            tabindex=\"0\" [ngClass]=\"(showPassword || config.type === 'password') ? 'password' : 'input'\"\n            [type]=\"config.type\" [id]=\"config.id\" [formControlName]=\"config.id\" />\n        </div>\n        <button *ngIf=\"config.type === 'password' || showPassword\" role=\"switch\" category=\"plain\"\n          class=\"transparentButton\" (click)=\"hideShow()\" [disabled]=\"disabled\">\n          <div *ngIf=\"showPassword\"><i class=\"fa-solid fa-eye-slash\"></i></div>\n          <div *ngIf=\"!showPassword\"><i class=\"fa-solid fa-eye\"></i></div>\n          <!-- <i class=\"passwordIcon fa-solid\" aria-pressed=\"getShowHideText('check')\"\n            [ngClass]=\"showPassword ? 'fa-eye-slash' : 'fa-eye'\"></i> -->\n        </button>\n      </div>\n    </div>\n  </form>\n</div>" }]
        }], propDecorators: { config: [{
                type: Input
            }], id: [{
                type: Input
            }], formGroup: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamwtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50LWxpYi9zcmMvbGliL2psLWlucHV0L2psLWlucHV0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudC1saWIvc3JjL2xpYi9qbC1pbnB1dC9qbC1pbnB1dC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEdBRU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixXQUFXLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFlLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBa0I5RyxNQUFNLENBQU4sSUFBWSxVQUdYO0FBSEQsV0FBWSxVQUFVO0lBQ3BCLDJCQUFhLENBQUE7SUFDYixtQ0FBcUIsQ0FBQTtBQUN2QixDQUFDLEVBSFcsVUFBVSxLQUFWLFVBQVUsUUFHckI7QUFZRCxNQUFNLE9BQU8sZ0JBQWdCO0lBWDdCO1FBWUUsbUJBQWMsR0FBYyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5Qyx1R0FBdUc7UUFDOUYsV0FBTSxHQUE0QjtZQUN6QyxFQUFFLEVBQUUsRUFBRTtZQUNOLFNBQVMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7U0FDN0IsQ0FBQztRQUVPLE9BQUUsR0FBRyxFQUFFLENBQUM7UUFDUixjQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUV6QyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsaUJBQVksR0FBRyxLQUFLLENBQUM7S0FnRXRCO0lBMURDLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDMUI7UUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVNLFVBQVUsQ0FBQyxVQUFtQjtRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0gsQ0FBQztJQUVNLFVBQVU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsRUFBTztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsVUFBbUI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDN0IsQ0FBQzs7NkdBMURVLGdCQUFnQjtpR0FBaEIsZ0JBQWdCLDJHQVJoQjtRQUNUO1lBQ0UsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDO1lBQy9DLEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRiwwQkNyQ0gsd3REQTBCTTsyRkRhTyxnQkFBZ0I7a0JBWDVCLFNBQVM7K0JBQ0Usa0JBQWtCLGFBRWpCO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDOzRCQUMvQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjs4QkFLUSxNQUFNO3NCQUFkLEtBQUs7Z0JBS0csRUFBRTtzQkFBVixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIE5HX1ZBTFVFX0FDQ0VTU09SLCBWYWxpZGF0b3JGbiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGludGVyZmFjZSBJSkxJbnB1dENvbXBvbmVudENvbmZpZyB7XG4gIGxhYmVsPzogc3RyaW5nO1xuICBoaW50VGV4dD86IHN0cmluZztcbiAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gIHR5cGU/OiBJbnB1dFR5cGVzO1xuICB2YWx1ZT86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgaWQ6IHN0cmluZztcbiAgZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG4gIGF1dG9jb21wbGV0ZT86IHN0cmluZztcbiAgbGFyZ2U/OiB0cnVlO1xuICBlcnJvcj86IGJvb2xlYW47XG4gIGVtcHR5PzogYm9vbGVhbjsgLy9EZWZhdWx0IGlzIFRSVUVcbiAgdmFsaWRhdG9ycz86IFZhbGlkYXRvckZuW107XG59XG5cbmV4cG9ydCBlbnVtIElucHV0VHlwZXMge1xuICB0ZXh0ID0gJ3RleHQnLFxuICBwYXNzd29yZCA9ICdwYXNzd29yZCdcbn1cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2psLXByLXNjbHAtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vamwtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEpMSW5wdXRDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSkxJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICBmb3JtR3JvdXBFbXB0eTogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gIC8vRE9OJ1QgaW5jbHVkZSBkZWZhdWx0IHZhbHVlcyBvZiAnJyB1bmxlc3MgaXQgUkVBTExZIG1ha2VzIHNlbnNlIHRvIGRvIHNvLiBJbnN0ZWFkLCBtYWtlIHRoZW0gb3B0aW9uYWxcbiAgQElucHV0KCkgY29uZmlnOiBJSkxJbnB1dENvbXBvbmVudENvbmZpZyA9IHtcbiAgICBpZDogJycsXG4gICAgZm9ybUdyb3VwOiBuZXcgRm9ybUdyb3VwKHt9KVxuICB9O1xuXG4gIEBJbnB1dCgpIGlkID0gJyc7XG4gIEBJbnB1dCgpIGZvcm1Hcm91cCA9IHRoaXMuZm9ybUdyb3VwRW1wdHk7XG5cbiAgZGlzYWJsZWQgPSBmYWxzZTtcbiAgZm9jdXNTdGF0ZSA9IGZhbHNlO1xuICBzaG93UGFzc3dvcmQgPSBmYWxzZTtcbiAgLy9SZW1vdmVkICchJyBhbmQgYWRkZWQgbnVsbCBjYXNlIGluIG9uQ2hhbmdlXG4gIHByaXZhdGUgb25Ub3VjaD86ICgpID0+IHZvaWQ7XG4gIHByaXZhdGUgb25DaGFuZ2U/OiAodmFsdWU6IGFueSkgPT4gdm9pZDtcblxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmlkICE9PSAnJykge1xuICAgICAgdGhpcy5jb25maWcuaWQgPSB0aGlzLmlkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZvcm1Hcm91cCAhPT0gdGhpcy5mb3JtR3JvdXBFbXB0eSkge1xuICAgICAgdGhpcy5jb25maWcuZm9ybUdyb3VwID0gdGhpcy5mb3JtR3JvdXA7XG4gICAgfVxuXG4gICAgdGhpcy5jb25maWcuZm9ybUdyb3VwLmFkZENvbnRyb2wodGhpcy5jb25maWcuaWQsIG5ldyBGb3JtQ29udHJvbCgnJywgdGhpcy5jb25maWcudmFsaWRhdG9ycykpO1xuICB9XG5cbiAgcHVibGljIGZvY3VzSW5wdXQoZm9jdXNWYWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNTdGF0ZSA9ICFmb2N1c1ZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSB0aGUgcGFzc3dvcmQgZmllbGRcbiAgICovXG4gIGhpZGVTaG93KCkge1xuICAgIHRoaXMuc2hvd1Bhc3N3b3JkID0gIXRoaXMuc2hvd1Bhc3N3b3JkO1xuICAgIHRoaXMuY29uZmlnLnR5cGUgPT09IElucHV0VHlwZXMucGFzc3dvcmQgPyAodGhpcy5jb25maWcudHlwZSA9IElucHV0VHlwZXMudGV4dCkgOiAodGhpcy5jb25maWcudHlwZSA9IElucHV0VHlwZXMucGFzc3dvcmQpO1xuICB9XG5cbiAgcHVibGljIGNsZWFydmFsdWUoKSB7XG4gICAgdGhpcy5jb25maWcudmFsdWUgPSBgYDtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlnLnZhbHVlID0gdmFsdWU7XG4gIH1cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2ggPSBmbjtcbiAgfVxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIC8qKlxuICogVXNlZCB0byBnZXQgdGhlIGFyaWEtcHJlc3NlZCB0ZXh0IGZvciB0aGUgc2hvdyBwYXNzd29yZCBidXR0b25cbiAqIEBwYXJhbSBmaWVsZElEIGlkIG9mIHRoZSBpbnB1dCBmaWVsZCB0aGUgdGV4dCBpcyBmb3JcbiAqIEByZXR1cm5zIHRyYW5zbGF0ZWQgdGV4dFxuICovXG4gIC8vICBnZXRTaG93SGlkZVRleHQoZmllbGRJRDogc3RyaW5nKSB7XG4gIC8vICAgbGV0IHRleHQgPSAnJ1xuICAvLyAgIGlmIChmaWVsZElEID09PSAncGFzc3dvcmQnKSB7XG4gIC8vICAgICB0ZXh0ID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnUGFzc3dvcmQuYWNjZXNzaWJpbGl0eS5wYXNzd29yZE1hdGNoMScpO1xuICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgICB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdQYXNzd29yZC5hY2Nlc3NpYmlsaXR5LnBhc3N3b3JkTWF0Y2gyJyk7XG4gIC8vICAgfVxuICAvLyAgICh0aGlzLnBhc3N3b3JkRmllbGRUeXBlID09PSBJbnB1dFR5cGUucGFzc3dvcmQpID9cbiAgLy8gICAgICh0ZXh0ICs9ICgnICcgKyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdQYXNzd29yZC5hY2Nlc3NpYmlsaXR5LnBhc3NIaWRkZW4nKSkpIDpcbiAgLy8gICAgICh0ZXh0ICs9ICgnICcgKyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdQYXNzd29yZC5hY2Nlc3NpYmlsaXR5LnBhc3NTaG93bicpKSk7XG4gIC8vICAgcmV0dXJuIHRleHQ7XG4gIC8vIH1cbn1cbiIsIjwhLS0gVE9ETzogRml4IGhvdyBsYXJnZSBpcyBoYW5kbGVkIGhlcmUgdG8gd29yayB3aXRoIERTIHJhdGhlciB0aGFuIGFnYWluc3QgaXQgLS0+XG48ZGl2PlxuICA8Zm9ybSBbZm9ybUdyb3VwXT1cImNvbmZpZy5mb3JtR3JvdXBcIj5cbiAgICA8cCAqbmdJZj1cImNvbmZpZy50eXBlID09PSAncGFzc3dvcmQnIHx8IHNob3dQYXNzd29yZFwiPlRPRE86IFRoaXMgZWxlbWVudCBkb2VzIG5vdCBhY3R1YWxseSBoYXZlIGNvcnJlY3QgYXJpYSB0ZXh0IG9uXG4gICAgICBpdCE8L3A+XG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cInsgbGFyZ2U6IGNvbmZpZy5sYXJnZSwgZXJyb3I6IGNvbmZpZy5lcnJvciB9XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtdGV4dFwiPlxuICAgICAgICA8bGFiZWwgZm9yPVwie3sgKGNvbmZpZy52YWx1ZSB8fCAnJykgfX1cIj57eyAoY29uZmlnLmxhYmVsIHx8ICcnKSB8IHRyYW5zbGF0ZSB9fTwvbGFiZWw+XG4gICAgICAgIDxwICpuZ0lmPVwiY29uZmlnLmhpbnRUZXh0XCIgY2xhc3M9XCJoaW50LXRleHRcIj57eyBjb25maWcuaGludFRleHQgfCB0cmFuc2xhdGUgfX08L3A+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1jb250ZW50LWFyZWFcIiBbbmdDbGFzc109XCJmb2N1c1N0YXRlID09PSB0cnVlID8gJ2ZvY3VzJyA6ICcnXCI+XG4gICAgICAgICAgPCEtLSBuZ01vZGVsIGRvZXNuJ3QgbWluZCB1bmRlZmluZWQgdmFsdWVzLCBhcHBhcmVudGx5XG4gICAgICAgIFRPRE86IFNob3VsZCBwcm9iYWJseSBjaGFuZ2UgdGhlIChrZXl1cCkgdG8gKG9uYmx1cikgLS0+XG4gICAgICAgICAgPGlucHV0IGF1dG9jb21wbGV0ZT1cInt7IGNvbmZpZy5hdXRvY29tcGxldGUgfX1cIiBwbGFjZWhvbGRlcj1cInt7IChjb25maWcucGxhY2Vob2xkZXIgfHwgJycpIHwgdHJhbnNsYXRlIH19XCJcbiAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiIFtuZ0NsYXNzXT1cIihzaG93UGFzc3dvcmQgfHwgY29uZmlnLnR5cGUgPT09ICdwYXNzd29yZCcpID8gJ3Bhc3N3b3JkJyA6ICdpbnB1dCdcIlxuICAgICAgICAgICAgW3R5cGVdPVwiY29uZmlnLnR5cGVcIiBbaWRdPVwiY29uZmlnLmlkXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb25maWcuaWRcIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiAqbmdJZj1cImNvbmZpZy50eXBlID09PSAncGFzc3dvcmQnIHx8IHNob3dQYXNzd29yZFwiIHJvbGU9XCJzd2l0Y2hcIiBjYXRlZ29yeT1cInBsYWluXCJcbiAgICAgICAgICBjbGFzcz1cInRyYW5zcGFyZW50QnV0dG9uXCIgKGNsaWNrKT1cImhpZGVTaG93KClcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwic2hvd1Bhc3N3b3JkXCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1leWUtc2xhc2hcIj48L2k+PC9kaXY+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cIiFzaG93UGFzc3dvcmRcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWV5ZVwiPjwvaT48L2Rpdj5cbiAgICAgICAgICA8IS0tIDxpIGNsYXNzPVwicGFzc3dvcmRJY29uIGZhLXNvbGlkXCIgYXJpYS1wcmVzc2VkPVwiZ2V0U2hvd0hpZGVUZXh0KCdjaGVjaycpXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInNob3dQYXNzd29yZCA/ICdmYS1leWUtc2xhc2gnIDogJ2ZhLWV5ZSdcIj48L2k+IC0tPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Zvcm0+XG48L2Rpdj4iXX0=