import { Component, forwardRef, Input } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
;
;
export class DropdownInputComponent {
    constructor() {
        this.touched = false;
        this.config = {
            id: '',
            formGroup: new FormGroup({}),
            category: 'secondary'
        };
        this.onChange = (formValue) => { };
        this.onTouched = () => { };
    }
    writeValue(formValue) {
        // this.form.get('formControl')?.setValue(formValue);
    }
    registerOnChange(onChange) {
        this.onChange = onChange;
    }
    registerOnTouched(onTouched) {
        this.onTouched = onTouched;
    }
    markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }
    ngOnInit() {
    }
}
DropdownInputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: DropdownInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DropdownInputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: DropdownInputComponent, selector: "lib-dropdown-input", inputs: { config: "config" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => DropdownInputComponent) //This allows the error state to be turned off and on again
        }
    ], ngImport: i0, template: "<div>\n    <label *ngIf=\"config.label\" [for]=\"config.id\">{{config.label}}</label>\n    <form [formGroup]=\"config.formGroup\">\n        <div class=\"dropdown\">\n            <select class=\"custom-select\"\n             [name]=\"config.id\" [id]=\"config.id\" [formControlName]=\"config.id\">\n                <option *ngFor=\"let option of config.options\" [value]=\"option.value || option.text\">{{option.text}}\n                </option>\n            </select>\n        </div>\n    </form>\n</div>", styles: [""], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: DropdownInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-dropdown-input', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            multi: true,
                            useExisting: forwardRef(() => DropdownInputComponent) //This allows the error state to be turned off and on again
                        }
                    ], template: "<div>\n    <label *ngIf=\"config.label\" [for]=\"config.id\">{{config.label}}</label>\n    <form [formGroup]=\"config.formGroup\">\n        <div class=\"dropdown\">\n            <select class=\"custom-select\"\n             [name]=\"config.id\" [id]=\"config.id\" [formControlName]=\"config.id\">\n                <option *ngFor=\"let option of config.options\" [value]=\"option.value || option.text\">{{option.text}}\n                </option>\n            </select>\n        </div>\n    </form>\n</div>" }]
        }], ctorParameters: function () { return []; }, propDecorators: { config: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50LWxpYi9zcmMvbGliL2Ryb3Bkb3duLWlucHV0L2Ryb3Bkb3duLWlucHV0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudC1saWIvc3JjL2xpYi9kcm9wZG93bi1pbnB1dC9kcm9wZG93bi1pbnB1dC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUF3QixTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQVNuRixDQUFDO0FBS0QsQ0FBQztBQWNGLE1BQU0sT0FBTyxzQkFBc0I7SUE0QmpDO1FBM0JBLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFUCxXQUFNLEdBQXlCO1lBQ3RDLEVBQUUsRUFBRSxFQUFFO1lBQ04sU0FBUyxFQUFFLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUM1QixRQUFRLEVBQUUsV0FBVztTQUN0QixDQUFBO1FBRUQsYUFBUSxHQUFHLENBQUMsU0FBaUIsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLGNBQVMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFrQk4sQ0FBQztJQWpCakIsVUFBVSxDQUFDLFNBQWM7UUFDdkIscURBQXFEO0lBQ3ZELENBQUM7SUFDRCxnQkFBZ0IsQ0FBQyxRQUFhO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFDRCxpQkFBaUIsQ0FBQyxTQUFjO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztJQUlELFFBQVE7SUFDUixDQUFDOzttSEEvQlUsc0JBQXNCO3VHQUF0QixzQkFBc0IsMkVBUnRCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLEtBQUssRUFBRSxJQUFJO1lBQ1gsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLDJEQUEyRDtTQUNsSDtLQUNGLDBCQzNCSCwwZkFXTTsyRkRrQk8sc0JBQXNCO2tCQVpsQyxTQUFTOytCQUNFLG9CQUFvQixhQUduQjt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixLQUFLLEVBQUUsSUFBSTs0QkFDWCxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLDJEQUEyRDt5QkFDbEg7cUJBQ0Y7MEVBS1EsTUFBTTtzQkFBZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUdyb3VwLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGludGVyZmFjZSBJRHJvcGRvd25JbnB1dENvbmZpZyB7XG4gIGlkOiBzdHJpbmc7XG4gIGZvcm1Hcm91cDogRm9ybUdyb3VwO1xuICBzbWFsbD86IGJvb2xlYW47XG4gIGxhYmVsPzogc3RyaW5nO1xuICBvcHRpb25zPzogSURyb3Bkb3duSW5wdXRPcHRpb25zQ29uZmlnW11cbiAgY2F0ZWdvcnk/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElEcm9wZG93bklucHV0T3B0aW9uc0NvbmZpZyB7XG4gIHRleHQ6IHN0cmluZztcbiAgdmFsdWU/OiBzdHJpbmc7XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItZHJvcGRvd24taW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZHJvcGRvd24taW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9kcm9wZG93bi1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRHJvcGRvd25JbnB1dENvbXBvbmVudCkgLy9UaGlzIGFsbG93cyB0aGUgZXJyb3Igc3RhdGUgdG8gYmUgdHVybmVkIG9mZiBhbmQgb24gYWdhaW5cbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRHJvcGRvd25JbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICB0b3VjaGVkID0gZmFsc2U7XG5cbiAgQElucHV0KCkgY29uZmlnOiBJRHJvcGRvd25JbnB1dENvbmZpZyA9IHtcbiAgICBpZDogJycsXG4gICAgZm9ybUdyb3VwOiBuZXcgRm9ybUdyb3VwKHt9KSxcbiAgICBjYXRlZ29yeTogJ3NlY29uZGFyeSdcbiAgfVxuXG4gIG9uQ2hhbmdlID0gKGZvcm1WYWx1ZTogc3RyaW5nKSA9PiB7IH07XG4gIG9uVG91Y2hlZCA9ICgpID0+IHsgfTtcbiAgd3JpdGVWYWx1ZShmb3JtVmFsdWU6IGFueSkge1xuICAgIC8vIHRoaXMuZm9ybS5nZXQoJ2Zvcm1Db250cm9sJyk/LnNldFZhbHVlKGZvcm1WYWx1ZSk7XG4gIH1cbiAgcmVnaXN0ZXJPbkNoYW5nZShvbkNoYW5nZTogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IG9uQ2hhbmdlO1xuICB9XG4gIHJlZ2lzdGVyT25Ub3VjaGVkKG9uVG91Y2hlZDogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBvblRvdWNoZWQ7XG4gIH1cblxuICBtYXJrQXNUb3VjaGVkKCkge1xuICAgIGlmICghdGhpcy50b3VjaGVkKSB7XG4gICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgdGhpcy50b3VjaGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICB9XG5cbn1cbiIsIjxkaXY+XG4gICAgPGxhYmVsICpuZ0lmPVwiY29uZmlnLmxhYmVsXCIgW2Zvcl09XCJjb25maWcuaWRcIj57e2NvbmZpZy5sYWJlbH19PC9sYWJlbD5cbiAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cImNvbmZpZy5mb3JtR3JvdXBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duXCI+XG4gICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiY3VzdG9tLXNlbGVjdFwiXG4gICAgICAgICAgICAgW25hbWVdPVwiY29uZmlnLmlkXCIgW2lkXT1cImNvbmZpZy5pZFwiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29uZmlnLmlkXCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbmZpZy5vcHRpb25zXCIgW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZSB8fCBvcHRpb24udGV4dFwiPnt7b3B0aW9uLnRleHR9fVxuICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZm9ybT5cbjwvZGl2PiJdfQ==