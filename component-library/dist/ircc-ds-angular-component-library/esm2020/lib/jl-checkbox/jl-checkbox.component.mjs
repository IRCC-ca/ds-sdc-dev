import { Component, forwardRef, Input } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-translate/core";
export class JLCheckboxComponent {
    constructor() {
        this.formGroupEmpty = new FormGroup({});
        this.checkboxIsChecked = false;
        this.touched = false;
        //TODO: Add output - consider using a formControl as output rather than anything else. Many different approaches are possible
        this.config = {
            id: '',
            formGroup: this.formGroupEmpty,
        };
        this.formGroup = this.formGroupEmpty;
        this.id = '';
        this.isDisabled = false;
        this.onTouch = () => { };
        this.onChange = () => { };
    }
    writeValue(checked) {
        this.config.checked = checked;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    /**
     * This is used automatically by the parent formControl. It is used in the template to set the label to disabled
     * @param isDisabled
     */
    setDisabledState(isDisabled) {
        // (this.config !== undefined) ? this.config.disabled = isDisabled : this.disabled = isDisabled;
        this.isDisabled = isDisabled;
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
}
JLCheckboxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: JLCheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
JLCheckboxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: JLCheckboxComponent, selector: "jl-pr-sclp-checkbox", inputs: { config: "config", formGroup: "formGroup", id: "id" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => JLCheckboxComponent),
            multi: true
        }
    ], ngImport: i0, template: "<div class=\"checkbox-container\" [formGroup]=\"config.formGroup\">\n  <div class=\"checkbox-layout\" [ngClass]=\"{ error: config?.error }\">\n    <div class=\"checkbox\">\n      <input *ngIf=\"config.small\" id=\"{{config.id}}\" class=\"check\"\n        [ngClass]=\"{ mixed: config?.mixed, focus: !config.disableFocus}\" size=\"small\" type=\"checkbox\"\n        [checked]=\"config.checked\" [formControlName]=\"config.id\" />\n      <input *ngIf=\"(!config.small)\" id=\"{{config.id}}\" class=\"check\"\n        [ngClass]=\"{ mixed: config?.mixed, focus: !config.disableFocus}\" size=\"large\" type=\"checkbox\"\n        [checked]=\"config.checked\" [formControlName]=\"config.id\" />\n      <span class=\"checkmark\"></span>\n    </div>\n    <label class=\"label\" for=\"{{config.id}}\" [attr.aria-label]=\"\n    config.formGroup.get(config.id)?.invalid && config.formGroup.get(config.id)?.dirty\n      ? (config.label || '' | translate) + ' ' +\n        (config.helpText || '' | translate) + ' ' +\n        ('INPUT.ERROR' | translate) + ' ' +\n        (config.customErrorText || '' | translate) : \n        (config.label || '' | translate) + ' ' + (config.helpText || '' | translate)\n  \" [ngClass]=\"{'disabled-label': isDisabled }\">{{\n      config.label || '' }}</label>\n  </div>\n</div>", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "pipe", type: i3.TranslatePipe, name: "translate" }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: JLCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'jl-pr-sclp-checkbox', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => JLCheckboxComponent),
                            multi: true
                        }
                    ], template: "<div class=\"checkbox-container\" [formGroup]=\"config.formGroup\">\n  <div class=\"checkbox-layout\" [ngClass]=\"{ error: config?.error }\">\n    <div class=\"checkbox\">\n      <input *ngIf=\"config.small\" id=\"{{config.id}}\" class=\"check\"\n        [ngClass]=\"{ mixed: config?.mixed, focus: !config.disableFocus}\" size=\"small\" type=\"checkbox\"\n        [checked]=\"config.checked\" [formControlName]=\"config.id\" />\n      <input *ngIf=\"(!config.small)\" id=\"{{config.id}}\" class=\"check\"\n        [ngClass]=\"{ mixed: config?.mixed, focus: !config.disableFocus}\" size=\"large\" type=\"checkbox\"\n        [checked]=\"config.checked\" [formControlName]=\"config.id\" />\n      <span class=\"checkmark\"></span>\n    </div>\n    <label class=\"label\" for=\"{{config.id}}\" [attr.aria-label]=\"\n    config.formGroup.get(config.id)?.invalid && config.formGroup.get(config.id)?.dirty\n      ? (config.label || '' | translate) + ' ' +\n        (config.helpText || '' | translate) + ' ' +\n        ('INPUT.ERROR' | translate) + ' ' +\n        (config.customErrorText || '' | translate) : \n        (config.label || '' | translate) + ' ' + (config.helpText || '' | translate)\n  \" [ngClass]=\"{'disabled-label': isDisabled }\">{{\n      config.label || '' }}</label>\n  </div>\n</div>" }]
        }], propDecorators: { config: [{
                type: Input
            }], formGroup: [{
                type: Input
            }], id: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamwtY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50LWxpYi9zcmMvbGliL2psLWNoZWNrYm94L2psLWNoZWNrYm94LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudC1saWIvc3JjL2xpYi9qbC1jaGVja2JveC9qbC1jaGVja2JveC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUF3QixXQUFXLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUEyQixNQUFNLGdCQUFnQixDQUFDOzs7OztBQTRCMUgsTUFBTSxPQUFPLG1CQUFtQjtJQVpoQztRQWFFLG1CQUFjLEdBQWMsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUMsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFaEIsNkhBQTZIO1FBQ3BILFdBQU0sR0FBNkI7WUFDMUMsRUFBRSxFQUFFLEVBQUU7WUFDTixTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDL0IsQ0FBQztRQUVPLGNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ2hDLE9BQUUsR0FBRyxFQUFFLENBQUM7UUFFakIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUVuQixZQUFPLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQ25CLGFBQVEsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7S0FnQ3JCO0lBOUJDLFVBQVUsQ0FBQyxPQUFnQjtRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDaEMsQ0FBQztJQUNELGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNELGlCQUFpQixDQUFDLEVBQU87UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILGdCQUFnQixDQUFFLFVBQW1CO1FBQ25DLGdHQUFnRztRQUNoRyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztTQUMxQjtRQUVELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDeEM7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNoRyxDQUFDOztnSEEvQ1UsbUJBQW1CO29HQUFuQixtQkFBbUIsOEdBVG5CO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7WUFDbEQsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGLDBCQzFCSCxteENBcUJNOzJGRFFPLG1CQUFtQjtrQkFaL0IsU0FBUzsrQkFDRSxxQkFBcUIsYUFFcEI7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsb0JBQW9CLENBQUM7NEJBQ2xELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGOzhCQVNRLE1BQU07c0JBQWQsS0FBSztnQkFLRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLEVBQUU7c0JBQVYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBOR19WQUxVRV9BQ0NFU1NPUiwgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNoZWNrQm94Q29tcG9uZW50Q29uZmlnIHtcbiAgZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG4gIGVycm9yPzogdHJ1ZTtcbiAgc21hbGw/OiB0cnVlOyAvL0RTIERlZmF1bHQgaXMgTGFyZ2UsIGhlbmNlIHRoaXMgYmVpbmcgY2hhbmdlZCBmb3IgY29uc2lzdGVuY3kgXG4gIG1peGVkPzogdHJ1ZTtcbiAgZGlzYWJsZUZvY3VzPzogYm9vbGVhbjsgLy9EZWZhdWx0IGlzIHRydWVcbiAgY2hlY2tlZD86IGJvb2xlYW47IC8vQ29udHJvbHMgdGhlIGFjdHVhbCBjaGVja2VkIHN0YXRlIG9mIHRoZSBjb21wb25lbnRcbiAgbGFiZWw/OiBzdHJpbmc7XG4gIGlkOiBzdHJpbmc7IC8vdXNlZCBmb3IgaWRlbnRpZnlpbmcgdGhlIGNvbXBvbmVudCBldmVyeXdoZXJlIGFuZCBzaG91bGQgTkVWRVIgYmUgbWlzc2luZ1xuICB2YWxpZGF0b3JzPzogVmFsaWRhdG9yRm5bXTtcbiAgaGVscFRleHQ/OiBzdHJpbmc7XG4gIGN1c3RvbUVycm9yVGV4dD86IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnamwtcHItc2NscC1jaGVja2JveCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9qbC1jaGVja2JveC5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSkxDaGVja2JveENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxuXG59KVxuZXhwb3J0IGNsYXNzIEpMQ2hlY2tib3hDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIGZvcm1Hcm91cEVtcHR5OiBGb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgY2hlY2tib3hJc0NoZWNrZWQgPSBmYWxzZTtcbiAgdG91Y2hlZCA9IGZhbHNlO1xuXG4gIC8vVE9ETzogQWRkIG91dHB1dCAtIGNvbnNpZGVyIHVzaW5nIGEgZm9ybUNvbnRyb2wgYXMgb3V0cHV0IHJhdGhlciB0aGFuIGFueXRoaW5nIGVsc2UuIE1hbnkgZGlmZmVyZW50IGFwcHJvYWNoZXMgYXJlIHBvc3NpYmxlXG4gIEBJbnB1dCgpIGNvbmZpZzogSUNoZWNrQm94Q29tcG9uZW50Q29uZmlnID0ge1xuICAgIGlkOiAnJyxcbiAgICBmb3JtR3JvdXA6IHRoaXMuZm9ybUdyb3VwRW1wdHksXG4gIH07XG5cbiAgQElucHV0KCkgZm9ybUdyb3VwID0gdGhpcy5mb3JtR3JvdXBFbXB0eTtcbiAgQElucHV0KCkgaWQgPSAnJztcblxuICBpc0Rpc2FibGVkID0gZmFsc2U7XG5cbiAgb25Ub3VjaCA9ICgpID0+IHt9O1xuICBvbkNoYW5nZSA9ICgpID0+IHt9O1xuXG4gIHdyaXRlVmFsdWUoY2hlY2tlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuY29uZmlnLmNoZWNrZWQgPSBjaGVja2VkO1xuICB9XG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoID0gZm47XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBpcyB1c2VkIGF1dG9tYXRpY2FsbHkgYnkgdGhlIHBhcmVudCBmb3JtQ29udHJvbC4gSXQgaXMgdXNlZCBpbiB0aGUgdGVtcGxhdGUgdG8gc2V0IHRoZSBsYWJlbCB0byBkaXNhYmxlZFxuICAgKiBAcGFyYW0gaXNEaXNhYmxlZCBcbiAgICovXG4gIHNldERpc2FibGVkU3RhdGU/KGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAvLyAodGhpcy5jb25maWcgIT09IHVuZGVmaW5lZCkgPyB0aGlzLmNvbmZpZy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQgOiB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLmlzRGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuaWQgIT09ICcnKSB7XG4gICAgICB0aGlzLmNvbmZpZy5pZCA9IHRoaXMuaWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZm9ybUdyb3VwICE9PSB0aGlzLmZvcm1Hcm91cEVtcHR5KSB7XG4gICAgICB0aGlzLmNvbmZpZy5mb3JtR3JvdXAgPSB0aGlzLmZvcm1Hcm91cDtcbiAgICB9XG4gICAgdGhpcy5jb25maWcuZm9ybUdyb3VwLmFkZENvbnRyb2wodGhpcy5jb25maWcuaWQsIG5ldyBGb3JtQ29udHJvbCgnJywgdGhpcy5jb25maWcudmFsaWRhdG9ycykpO1xuICB9XG5cbn0iLCI8ZGl2IGNsYXNzPVwiY2hlY2tib3gtY29udGFpbmVyXCIgW2Zvcm1Hcm91cF09XCJjb25maWcuZm9ybUdyb3VwXCI+XG4gIDxkaXYgY2xhc3M9XCJjaGVja2JveC1sYXlvdXRcIiBbbmdDbGFzc109XCJ7IGVycm9yOiBjb25maWc/LmVycm9yIH1cIj5cbiAgICA8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj5cbiAgICAgIDxpbnB1dCAqbmdJZj1cImNvbmZpZy5zbWFsbFwiIGlkPVwie3tjb25maWcuaWR9fVwiIGNsYXNzPVwiY2hlY2tcIlxuICAgICAgICBbbmdDbGFzc109XCJ7IG1peGVkOiBjb25maWc/Lm1peGVkLCBmb2N1czogIWNvbmZpZy5kaXNhYmxlRm9jdXN9XCIgc2l6ZT1cInNtYWxsXCIgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgW2NoZWNrZWRdPVwiY29uZmlnLmNoZWNrZWRcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbmZpZy5pZFwiIC8+XG4gICAgICA8aW5wdXQgKm5nSWY9XCIoIWNvbmZpZy5zbWFsbClcIiBpZD1cInt7Y29uZmlnLmlkfX1cIiBjbGFzcz1cImNoZWNrXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyBtaXhlZDogY29uZmlnPy5taXhlZCwgZm9jdXM6ICFjb25maWcuZGlzYWJsZUZvY3VzfVwiIHNpemU9XCJsYXJnZVwiIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgIFtjaGVja2VkXT1cImNvbmZpZy5jaGVja2VkXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb25maWcuaWRcIiAvPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjaGVja21hcmtcIj48L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIiBmb3I9XCJ7e2NvbmZpZy5pZH19XCIgW2F0dHIuYXJpYS1sYWJlbF09XCJcbiAgICBjb25maWcuZm9ybUdyb3VwLmdldChjb25maWcuaWQpPy5pbnZhbGlkICYmIGNvbmZpZy5mb3JtR3JvdXAuZ2V0KGNvbmZpZy5pZCk/LmRpcnR5XG4gICAgICA/IChjb25maWcubGFiZWwgfHwgJycgfCB0cmFuc2xhdGUpICsgJyAnICtcbiAgICAgICAgKGNvbmZpZy5oZWxwVGV4dCB8fCAnJyB8IHRyYW5zbGF0ZSkgKyAnICcgK1xuICAgICAgICAoJ0lOUFVULkVSUk9SJyB8IHRyYW5zbGF0ZSkgKyAnICcgK1xuICAgICAgICAoY29uZmlnLmN1c3RvbUVycm9yVGV4dCB8fCAnJyB8IHRyYW5zbGF0ZSkgOiBcbiAgICAgICAgKGNvbmZpZy5sYWJlbCB8fCAnJyB8IHRyYW5zbGF0ZSkgKyAnICcgKyAoY29uZmlnLmhlbHBUZXh0IHx8ICcnIHwgdHJhbnNsYXRlKVxuICBcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkLWxhYmVsJzogaXNEaXNhYmxlZCB9XCI+e3tcbiAgICAgIGNvbmZpZy5sYWJlbCB8fCAnJyB9fTwvbGFiZWw+XG4gIDwvZGl2PlxuPC9kaXY+Il19