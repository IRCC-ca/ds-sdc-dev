import * as i0 from '@angular/core';
import { Injectable, Component, forwardRef, Input, EventEmitter, Output, ViewChild, HostListener, PLATFORM_ID, Inject, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import * as i2 from '@angular/forms';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i3 from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

class IrccDsAngularComponentLibraryService {
    constructor() { }
}
IrccDsAngularComponentLibraryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: IrccDsAngularComponentLibraryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
IrccDsAngularComponentLibraryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: IrccDsAngularComponentLibraryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: IrccDsAngularComponentLibraryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class IrccDsAngularComponentLibraryComponent {
    constructor() { }
    ngOnInit() {
    }
}
IrccDsAngularComponentLibraryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: IrccDsAngularComponentLibraryComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
IrccDsAngularComponentLibraryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: IrccDsAngularComponentLibraryComponent, selector: "lib-ircc-ds-angular-component-library", ngImport: i0, template: `
    <p>
      ircc-ds-angular-component-library works!
    </p>
  `, isInline: true, preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: IrccDsAngularComponentLibraryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-ircc-ds-angular-component-library', template: `
    <p>
      ircc-ds-angular-component-library works!
    </p>
  ` }]
        }], ctorParameters: function () { return []; } });

var InputTypes;
(function (InputTypes) {
    InputTypes["text"] = "text";
    InputTypes["password"] = "password";
})(InputTypes || (InputTypes = {}));
class JLInputComponent {
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

class JlChipItemComponent {
    constructor() {
        this.iconClickEvent = new EventEmitter();
    }
    onIconClick() {
        this.iconClickEvent.emit();
    }
    onEnterKeyPress() {
        this.iconClickEvent.emit();
    }
}
JlChipItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: JlChipItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
JlChipItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: JlChipItemComponent, selector: "jl-pr-sclp-jl-chip-item", inputs: { chipContent: "chipContent" }, outputs: { iconClickEvent: "iconClickEvent" }, ngImport: i0, template: "<div class=\"chip-item\" tabindex=\"0\" (keydown.enter)=\"onEnterKeyPress()\">\n  <span class=\"chip-text\">{{ chipContent || '' }}</span>\n  <span class=\"icon-container\" (click)=\"onIconClick()\">\n    <i class=\"fa-solid fa-circle-xmark clickable-icon\"></i>\n  </span>\n</div>", styles: [".gray-bg{background:#f5f5f5}.dark-gray-bg{background:#d9d9d9}.chip-item{background:#f5f5f7;display:flex;align-items:center;height:28px;width:-moz-fit-content;width:fit-content;padding:4px 6px 4px 8px;border-radius:4px;border:solid 1px #868687}.chip-item:hover .clickable-icon{color:#868687}.chip-item:focus{outline:none}.chip-item:focus .clickable-icon{color:#9c9c9d;border-radius:50%;box-shadow:0 0 0 3px #fff;outline:hsl(225deg,90%,62%) solid 3px;outline-offset:3px}.chip-item .chip-text{font-family:Inter;font-weight:400;size:12px;line-height:20px;color:#161617}.chip-item .icon-container{display:flex;cursor:pointer}.chip-item .clickable-icon{margin-left:8px;color:#b2b2b4;font-weight:900;font-size:16px;line-height:16px}.chip-item .clickable-icon:hover{color:#868687}.chip-item .clickable-icon:active{color:#59595a}.chip-item .clickable-icon:focus{color:#9c9c9d;border-radius:50%}\n"], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: JlChipItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'jl-pr-sclp-jl-chip-item', template: "<div class=\"chip-item\" tabindex=\"0\" (keydown.enter)=\"onEnterKeyPress()\">\n  <span class=\"chip-text\">{{ chipContent || '' }}</span>\n  <span class=\"icon-container\" (click)=\"onIconClick()\">\n    <i class=\"fa-solid fa-circle-xmark clickable-icon\"></i>\n  </span>\n</div>", styles: [".gray-bg{background:#f5f5f5}.dark-gray-bg{background:#d9d9d9}.chip-item{background:#f5f5f7;display:flex;align-items:center;height:28px;width:-moz-fit-content;width:fit-content;padding:4px 6px 4px 8px;border-radius:4px;border:solid 1px #868687}.chip-item:hover .clickable-icon{color:#868687}.chip-item:focus{outline:none}.chip-item:focus .clickable-icon{color:#9c9c9d;border-radius:50%;box-shadow:0 0 0 3px #fff;outline:hsl(225deg,90%,62%) solid 3px;outline-offset:3px}.chip-item .chip-text{font-family:Inter;font-weight:400;size:12px;line-height:20px;color:#161617}.chip-item .icon-container{display:flex;cursor:pointer}.chip-item .clickable-icon{margin-left:8px;color:#b2b2b4;font-weight:900;font-size:16px;line-height:16px}.chip-item .clickable-icon:hover{color:#868687}.chip-item .clickable-icon:active{color:#59595a}.chip-item .clickable-icon:focus{color:#9c9c9d;border-radius:50%}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { chipContent: [{
                type: Input
            }], iconClickEvent: [{
                type: Output
            }] } });

/**
 * TODO: This particular component, while functional, is not ideal. Components should not import other components directly in the .ts
 * unless absolutely necessary. Furthermore, the use of DoCheck, while interesting, is not ideal, since it ignores the built-in
 * angular lifecycle hooks and change detection.
 */
class JLAutocompleteComponent {
    constructor(differs) {
        this.differs = differs;
        //TODO: Change this to a config
        this.options = [];
        this.title = `Title`;
        this.hintText = `Hint Text`;
        this.name = `Add Name`;
        this.error = false;
        this.limit = 0;
        this.selectValueChange = new EventEmitter();
        this.savedSelectedOptions = [];
        this.selectedOptions = [];
        this.originalOptions = [];
        this.hideDropdown = true;
        this.isFocusInsideComponent = false;
        this.isComponentClicked = false;
        this.addHover = false;
        this.emptyResults = false;
        this.differ = this.differs.find({}).create();
    }
    handleKeyDown(event) {
        event.stopPropagation();
        if (this.hideDropdown === false || this.options.length > 0) {
            this.inputComponent?.clearvalue();
            this.returnOptionsToDefault();
            this.isComponentClicked = false;
            this.isFocusInsideComponent = false;
            this.hideDropdown = true;
        }
    }
    clickInside(event) {
        const target = event.target;
        if (this.hideDropdown === true &&
            target.type === `text` &&
            this.options.length > 0) {
            this.isFocusInsideComponent = true;
            this.isComponentClicked = true;
            this.toggleDropDown();
            this.addHover = true;
        }
        else if (target.classList.contains('select-target') ||
            target.classList.contains(`selected`)) {
            this.isComponentClicked = false;
            this.isFocusInsideComponent = false;
            this.toggleDropDown();
        }
    }
    clickout() {
        if (!this.isFocusInsideComponent && this.isComponentClicked) {
            this.toggleDropDown();
            this.inputComponent?.clearvalue();
            this.returnOptionsToDefault();
            this.isComponentClicked = false;
        }
        this.isFocusInsideComponent = false;
    }
    onMouseEnter() {
        this.addHover = false;
    }
    ngDoCheck() {
        const change = this.differ.diff(this);
        if (change) {
            change.forEachChangedItem((item) => {
                if (item.key === `options`) {
                    this.selectValueChange.emit(this.selectedOptions);
                }
            });
        }
    }
    valueChange(event) {
        this.filterList(event);
    }
    filterList(filterValue) {
        if (filterValue.length < 1) {
            this.returnOptionsToDefault();
        }
        else {
            const filteredOptions = this.originalOptions.filter((value) => {
                return value.text.toLowerCase().includes(filterValue.toLowerCase());
            });
            this.options = filteredOptions.slice(0);
            if (this.options.length === 0) {
                this.emptyResults = true;
            }
            else {
                this.emptyResults = false;
            }
        }
    }
    checkActive(value) {
        for (const selectedOption of this.selectedOptions) {
            if (selectedOption.value === value) {
                return true;
            }
        }
        return false;
    }
    returnOptionsToDefault() {
        this.emptyResults = false;
        this.options = this.originalOptions.slice(0);
    }
    toggleDropDown() {
        this.hideDropdown = !this.hideDropdown;
        this.inputComponent?.focusInput(this.hideDropdown);
    }
    toggleDropDownKey(event) {
        if (event.keyCode === 13) {
            this.toggleDropDown();
        }
    }
    removeChipItem(index) {
        this.selectedOptions.splice(index, 1);
        this.returnOptionsToDefault();
    }
    removeAllChipItems() {
        this.selectedOptions = [];
        this.returnOptionsToDefault();
    }
    selectAll() {
        for (const option of this.options) {
            this.selectedOptions.push(option);
        }
        this.returnOptionsToDefault();
    }
    selectIndex(index) {
        if (this.limit !== 0 && this.selectedOptions.length >= this.limit) {
            return;
        }
        else {
            this.inputComponent?.clearvalue();
            this.returnOptionsToDefault();
            if (this.checkDuplicated(index) === false) {
                this.selectedOptions.push(this.options[index]);
            }
        }
    }
    checkDuplicated(index) {
        return this.selectedOptions.some((element) => {
            if (element.value === this.options[index].value) {
                return true;
            }
            return false;
        });
    }
    ngOnInit() {
        this.selectedOptions = [];
        this.originalOptions = this.options.slice(0);
        this.selectedOptions = this.savedSelectedOptions;
        this.savedSelectedOptions = [];
        this.returnOptionsToDefault();
    }
}
JLAutocompleteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: JLAutocompleteComponent, deps: [{ token: i0.KeyValueDiffers }], target: i0.ɵɵFactoryTarget.Component });
JLAutocompleteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: JLAutocompleteComponent, selector: "jl-pr-sclp-autocomplete", inputs: { options: "options", title: "title", hintText: "hintText", name: "name", error: "error", limit: "limit", savedSelectedOptions: "savedSelectedOptions" }, outputs: { selectValueChange: "selectValueChange" }, host: { listeners: { "window:keydown.escape": "handleKeyDown($event)", "click": "clickInside($event)", "document:click": "clickout()" } }, viewQueries: [{ propertyName: "inputComponent", first: true, predicate: JLInputComponent, descendants: true, static: true }], ngImport: i0, template: "<div class=\"autocomplete-container\" [ngClass]=\"{ error: error }\">\n  <div>\n    <!-- <jl-pr-sclp-input\n      [label]=\"title\"\n      [hintText]=\"hintText\"\n      [placeholder]=\"'+ ' + (name | translate)\"\n      [error]=\"error\"\n      (valueChange)=\"valueChange($event)\"\n    > -->\n      <jl-pr-sclp-jl-chip-item\n        *ngFor=\"let option of selectedOptions; let index = index\"\n        [chipContent]=\"option['text']\"\n        (iconClickEvent)=\"removeChipItem(index)\"\n      ></jl-pr-sclp-jl-chip-item\n    >\n  <!-- </jl-pr-sclp-input> -->\n  </div>\n\n  <div\n    class=\"autocomplete-options\"\n    [ngClass]=\"hideDropdown === false ? '' : 'hide'\"\n    (mouseenter)=\"onMouseEnter()\"\n  >\n    <div\n      *ngIf=\"limit === 0\" \n      class=\"option autocomplete-target all-results\"\n      (click)=\"selectAll()\"\n      [tabindex]=\"0\"\n      [ngClass]=\"emptyResults === false ? '' : 'hide-option'\"\n    >\n      <p class=\"select-target\">{{ 'AllOptionsForAutocomplete' | translate}} {{ title | translate }}s</p>\n    </div>\n    <div\n      class=\"option autocomplete-target\"\n      *ngFor=\"let option of options; let index = index; first as isFirst\"\n      (click)=\"selectIndex(index)\"\n      [tabindex]=\"index + 1\"\n      [ngClass]=\"checkActive(option['value']) ? 'active' : ''\"\n    >\n      <p class=\"select-target\">{{ option['text'] }}</p>\n    </div>\n    <div\n      class=\"option autocomplete-target\"\n      [ngClass]=\"emptyResults === false ? 'hide-option' : ''\"\n    >\n      <p>{{ 'NoResults' | translate }}</p>\n    </div>\n  </div>\n</div>\n", styles: [".gray-bg{background:#f5f5f5}.dark-gray-bg{background:#d9d9d9}:host ::ng-deep .input-content-area{border-radius:4px;border:1px solid #b2b2b4;display:inline-flex;flex-wrap:wrap;row-gap:16px;padding:10px 12px}:host ::ng-deep .input-content-area:focus-visible{outline:none}:host ::ng-deep .input-content-area.active{background-color:#59595a1f}:host ::ng-deep jl-pr-sclp-jl-chip-item{display:inline-block;margin-right:8px}:host ::ng-deep jl-pr-sclp-input .input{display:inline-block;width:100%;border:none!important;flex:1;padding:0!important;padding-left:12px;min-width:100px!important}:host ::ng-deep jl-pr-sclp-input .input:focus{outline:none!important}:host ::ng-deep jl-pr-sclp-input .input:hover{background-color:transparent!important}:host ::ng-deep jl-pr-sclp-input .input.active{background-color:transparent!important}:host ::ng-deep jl-pr-sclp-input label{font-weight:700;margin-bottom:8px!important}:host ::ng-deep jl-pr-sclp-input .hint-text{margin-bottom:4px!important;font-weight:400;font-size:14px;color:#6f6f71}.autocomplete-container{position:relative;-webkit-user-select:none;user-select:none}.autocomplete-container label{font-weight:700!important}.autocomplete-container .autocomplete-options{background:#ffffff;font-size:14px;line-height:20px;color:#161617;font-family:Inter,sans-serif!important;border-radius:4px;border:1px solid #b2b2b4;z-index:2;width:auto;margin-top:9px;box-shadow:0 8px 20px #0000001a;max-height:200px;overflow-y:scroll;position:absolute;width:100%}.autocomplete-container .autocomplete-options::-webkit-scrollbar{width:5px}.autocomplete-container .autocomplete-options::-webkit-scrollbar-track{background:#ffffff}.autocomplete-container .autocomplete-options::-webkit-scrollbar-thumb{background-color:#9c9c9d;border-radius:20px;border:3px solid #9c9c9d;margin-right:5px}.autocomplete-container .autocomplete-options::-webkit-scrollbar-track{box-shadow:inset 0 0 10px 10px green;border:solid 3px transparent}.autocomplete-container .autocomplete-options.hide{display:none}.autocomplete-container .autocomplete-options .option{margin:8px 0;width:100%;padding:10px 12px;display:grid;grid-template-areas:\"options\";align-items:center}.autocomplete-container .autocomplete-options .option.hide-option{display:none}.autocomplete-container .autocomplete-options .option.active:after{grid-area:options;justify-self:end;content:\"\";height:16px;width:14px;pointer-events:none;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIiA/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgd2lkdGg9IjY0MCIgaGVpZ2h0PSI0ODAiIHZpZXdCb3g9IjAgMCA2NDAgNDgwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGRlc2M+Q3JlYXRlZCB3aXRoIEZhYnJpYy5qcyAzLjYuMzwvZGVzYz4KPGRlZnM+CjwvZGVmcz4KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS40MyAwIDAgMS40MyAzMjAuMTYgMjM4Ljg3KSIgID4KPHBhdGggc3R5bGU9InN0cm9rZTogbm9uZTsgc3Ryb2tlLXdpZHRoOiAxOyBzdHJva2UtZGFzaGFycmF5OiBub25lOyBzdHJva2UtbGluZWNhcDogYnV0dDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDA7IHN0cm9rZS1saW5lam9pbjogbWl0ZXI7IHN0cm9rZS1taXRlcmxpbWl0OiA0OyBmaWxsOiByZ2IoNzMsMTE2LDI0NSk7IGZpbGwtcnVsZTogbm9uemVybzsgb3BhY2l0eTogMTsiICB0cmFuc2Zvcm09IiB0cmFuc2xhdGUoLTI1NS45NSwgLTI1Ni4wNSkiIGQ9Ik0gNDcwLjYgMTA1LjQgYyAxMi41IDEyLjUgMTIuNSAzMi44IDAgNDUuMyBsIC0yNTYgMjU2IGMgLTEyLjUgMTIuNSAtMzIuOCAxMi41IC00NS4zIDAgbCAtMTI4IC0xMjggYyAtMTIuNSAtMTIuNSAtMTIuNSAtMzIuOCAwIC00NS4zIHMgMzIuOCAtMTIuNSA0NS4zIDAgTCAxOTIgMzM4LjcgTCA0MjUuNCAxMDUuNCBjIDEyLjUgLTEyLjUgMzIuOCAtMTIuNSA0NS4zIDAgeiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgo8L2c+Cjwvc3ZnPg==);background-repeat:no-repeat;background-position:center center;background-size:100%}.autocomplete-container .autocomplete-options .option:hover,.autocomplete-container .autocomplete-options .option.hoverFirst{background-color:#59595a0f;cursor:pointer}.autocomplete-container .autocomplete-options .option:focus{outline:none}.autocomplete-container .autocomplete-options .option p{grid-area:options;margin:0;padding-right:30px;color:#161617;font-family:Inter,sans-serif!important}.autocomplete-container.large .selected,.autocomplete-container.large .autocomplete-options{font-size:16px;padding:14px 12px}.autocomplete-container.error .selected{border-color:#ab2225;background:#faedee}.autocomplete-container.error .selected:hover{border-color:#931c1f}.autocomplete-container.error .selected:focus-visible{outline:solid 3px hsl(225deg,90%,62%)}.autocomplete-container.error .selected.active{border-color:#931c1f;background-color:ircc-ca-error-active}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: JlChipItemComponent, selector: "jl-pr-sclp-jl-chip-item", inputs: ["chipContent"], outputs: ["iconClickEvent"] }, { kind: "pipe", type: i3.TranslatePipe, name: "translate" }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: JLAutocompleteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'jl-pr-sclp-autocomplete', template: "<div class=\"autocomplete-container\" [ngClass]=\"{ error: error }\">\n  <div>\n    <!-- <jl-pr-sclp-input\n      [label]=\"title\"\n      [hintText]=\"hintText\"\n      [placeholder]=\"'+ ' + (name | translate)\"\n      [error]=\"error\"\n      (valueChange)=\"valueChange($event)\"\n    > -->\n      <jl-pr-sclp-jl-chip-item\n        *ngFor=\"let option of selectedOptions; let index = index\"\n        [chipContent]=\"option['text']\"\n        (iconClickEvent)=\"removeChipItem(index)\"\n      ></jl-pr-sclp-jl-chip-item\n    >\n  <!-- </jl-pr-sclp-input> -->\n  </div>\n\n  <div\n    class=\"autocomplete-options\"\n    [ngClass]=\"hideDropdown === false ? '' : 'hide'\"\n    (mouseenter)=\"onMouseEnter()\"\n  >\n    <div\n      *ngIf=\"limit === 0\" \n      class=\"option autocomplete-target all-results\"\n      (click)=\"selectAll()\"\n      [tabindex]=\"0\"\n      [ngClass]=\"emptyResults === false ? '' : 'hide-option'\"\n    >\n      <p class=\"select-target\">{{ 'AllOptionsForAutocomplete' | translate}} {{ title | translate }}s</p>\n    </div>\n    <div\n      class=\"option autocomplete-target\"\n      *ngFor=\"let option of options; let index = index; first as isFirst\"\n      (click)=\"selectIndex(index)\"\n      [tabindex]=\"index + 1\"\n      [ngClass]=\"checkActive(option['value']) ? 'active' : ''\"\n    >\n      <p class=\"select-target\">{{ option['text'] }}</p>\n    </div>\n    <div\n      class=\"option autocomplete-target\"\n      [ngClass]=\"emptyResults === false ? 'hide-option' : ''\"\n    >\n      <p>{{ 'NoResults' | translate }}</p>\n    </div>\n  </div>\n</div>\n", styles: [".gray-bg{background:#f5f5f5}.dark-gray-bg{background:#d9d9d9}:host ::ng-deep .input-content-area{border-radius:4px;border:1px solid #b2b2b4;display:inline-flex;flex-wrap:wrap;row-gap:16px;padding:10px 12px}:host ::ng-deep .input-content-area:focus-visible{outline:none}:host ::ng-deep .input-content-area.active{background-color:#59595a1f}:host ::ng-deep jl-pr-sclp-jl-chip-item{display:inline-block;margin-right:8px}:host ::ng-deep jl-pr-sclp-input .input{display:inline-block;width:100%;border:none!important;flex:1;padding:0!important;padding-left:12px;min-width:100px!important}:host ::ng-deep jl-pr-sclp-input .input:focus{outline:none!important}:host ::ng-deep jl-pr-sclp-input .input:hover{background-color:transparent!important}:host ::ng-deep jl-pr-sclp-input .input.active{background-color:transparent!important}:host ::ng-deep jl-pr-sclp-input label{font-weight:700;margin-bottom:8px!important}:host ::ng-deep jl-pr-sclp-input .hint-text{margin-bottom:4px!important;font-weight:400;font-size:14px;color:#6f6f71}.autocomplete-container{position:relative;-webkit-user-select:none;user-select:none}.autocomplete-container label{font-weight:700!important}.autocomplete-container .autocomplete-options{background:#ffffff;font-size:14px;line-height:20px;color:#161617;font-family:Inter,sans-serif!important;border-radius:4px;border:1px solid #b2b2b4;z-index:2;width:auto;margin-top:9px;box-shadow:0 8px 20px #0000001a;max-height:200px;overflow-y:scroll;position:absolute;width:100%}.autocomplete-container .autocomplete-options::-webkit-scrollbar{width:5px}.autocomplete-container .autocomplete-options::-webkit-scrollbar-track{background:#ffffff}.autocomplete-container .autocomplete-options::-webkit-scrollbar-thumb{background-color:#9c9c9d;border-radius:20px;border:3px solid #9c9c9d;margin-right:5px}.autocomplete-container .autocomplete-options::-webkit-scrollbar-track{box-shadow:inset 0 0 10px 10px green;border:solid 3px transparent}.autocomplete-container .autocomplete-options.hide{display:none}.autocomplete-container .autocomplete-options .option{margin:8px 0;width:100%;padding:10px 12px;display:grid;grid-template-areas:\"options\";align-items:center}.autocomplete-container .autocomplete-options .option.hide-option{display:none}.autocomplete-container .autocomplete-options .option.active:after{grid-area:options;justify-self:end;content:\"\";height:16px;width:14px;pointer-events:none;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIiA/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgd2lkdGg9IjY0MCIgaGVpZ2h0PSI0ODAiIHZpZXdCb3g9IjAgMCA2NDAgNDgwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGRlc2M+Q3JlYXRlZCB3aXRoIEZhYnJpYy5qcyAzLjYuMzwvZGVzYz4KPGRlZnM+CjwvZGVmcz4KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS40MyAwIDAgMS40MyAzMjAuMTYgMjM4Ljg3KSIgID4KPHBhdGggc3R5bGU9InN0cm9rZTogbm9uZTsgc3Ryb2tlLXdpZHRoOiAxOyBzdHJva2UtZGFzaGFycmF5OiBub25lOyBzdHJva2UtbGluZWNhcDogYnV0dDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDA7IHN0cm9rZS1saW5lam9pbjogbWl0ZXI7IHN0cm9rZS1taXRlcmxpbWl0OiA0OyBmaWxsOiByZ2IoNzMsMTE2LDI0NSk7IGZpbGwtcnVsZTogbm9uemVybzsgb3BhY2l0eTogMTsiICB0cmFuc2Zvcm09IiB0cmFuc2xhdGUoLTI1NS45NSwgLTI1Ni4wNSkiIGQ9Ik0gNDcwLjYgMTA1LjQgYyAxMi41IDEyLjUgMTIuNSAzMi44IDAgNDUuMyBsIC0yNTYgMjU2IGMgLTEyLjUgMTIuNSAtMzIuOCAxMi41IC00NS4zIDAgbCAtMTI4IC0xMjggYyAtMTIuNSAtMTIuNSAtMTIuNSAtMzIuOCAwIC00NS4zIHMgMzIuOCAtMTIuNSA0NS4zIDAgTCAxOTIgMzM4LjcgTCA0MjUuNCAxMDUuNCBjIDEyLjUgLTEyLjUgMzIuOCAtMTIuNSA0NS4zIDAgeiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgo8L2c+Cjwvc3ZnPg==);background-repeat:no-repeat;background-position:center center;background-size:100%}.autocomplete-container .autocomplete-options .option:hover,.autocomplete-container .autocomplete-options .option.hoverFirst{background-color:#59595a0f;cursor:pointer}.autocomplete-container .autocomplete-options .option:focus{outline:none}.autocomplete-container .autocomplete-options .option p{grid-area:options;margin:0;padding-right:30px;color:#161617;font-family:Inter,sans-serif!important}.autocomplete-container.large .selected,.autocomplete-container.large .autocomplete-options{font-size:16px;padding:14px 12px}.autocomplete-container.error .selected{border-color:#ab2225;background:#faedee}.autocomplete-container.error .selected:hover{border-color:#931c1f}.autocomplete-container.error .selected:focus-visible{outline:solid 3px hsl(225deg,90%,62%)}.autocomplete-container.error .selected.active{border-color:#931c1f;background-color:ircc-ca-error-active}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.KeyValueDiffers }]; }, propDecorators: { inputComponent: [{
                type: ViewChild,
                args: [JLInputComponent, { static: true }]
            }], options: [{
                type: Input
            }], title: [{
                type: Input
            }], hintText: [{
                type: Input
            }], name: [{
                type: Input
            }], error: [{
                type: Input
            }], limit: [{
                type: Input
            }], selectValueChange: [{
                type: Output
            }], savedSelectedOptions: [{
                type: Input
            }], handleKeyDown: [{
                type: HostListener,
                args: ['window:keydown.escape', ['$event']]
            }], clickInside: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], clickout: [{
                type: HostListener,
                args: ['document:click']
            }] } });

class JLBannerComponent {
    constructor() {
        this.title = '';
        this.body = '';
        this.fixedLayout = false;
        this.delay = 0;
        this.hide = false;
        this.type = '';
        this.applications = '';
        this.bannerEvent = new EventEmitter();
    }
    ngOnInit() {
        if (this.delay > 0) {
            // 10 second max and 3 second min
            if (this.delay > 10000) {
                this.delay = 10000;
            }
            else if (this.delay < 1000) {
                this.delay = 3000;
            }
            setTimeout(() => {
                this.hide = true;
                this.bannerEvent.emit(''); //This had to be changed to make it universal (for the library). Call service from parent
            }, this.delay);
        }
    }
}
JLBannerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: JLBannerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
JLBannerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: JLBannerComponent, selector: "jl-pr-sclp-banner", inputs: { title: "title", body: "body", fixedLayout: "fixedLayout", delay: "delay", hide: "hide", type: "type", applications: "applications" }, outputs: { bannerEvent: "bannerEvent" }, ngImport: i0, template: "<ng-container *ngIf=\"true; then notEmpty\"> </ng-container>\n\n<ng-template #notEmpty>\n    <div *ngIf=\"!hide\" class=\"banner-container\" [ngClass]=\"{'layout': fixedLayout, 'success': type === 'success', 'info': type === 'info', 'warning': type === 'warning', 'critical': type === 'critical'}\">\n        <div class=\"alert-line\">\n        </div>\n\n        <td *ngIf=\"type === 'info'\" class=\"information\">        \n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 21\" fill=\"none\">\n            <path d=\"M10 0.5C4.45312 0.5 0 4.99219 0 10.5C0 16.0469 4.45312 20.5 10 20.5C15.5078 20.5 20 16.0469 20 10.5C20 4.99219 15.5078 0.5 10 0.5ZM10 19.25C5.15625 19.25 1.25 15.3438 1.25 10.5C1.25 5.69531 5.15625 1.75 10 1.75C14.8047 1.75 18.75 5.69531 18.75 10.5C18.75 15.3438 14.8047 19.25 10 19.25ZM10 7.6875C10.5078 7.6875 10.9375 7.29688 10.9375 6.75C10.9375 6.24219 10.5078 5.8125 10 5.8125C9.45312 5.8125 9.0625 6.24219 9.0625 6.75C9.0625 7.29688 9.45312 7.6875 10 7.6875ZM11.875 14.25H10.625V9.875C10.625 9.5625 10.3125 9.25 10 9.25H8.75C8.39844 9.25 8.125 9.5625 8.125 9.875C8.125 10.2266 8.39844 10.5 8.75 10.5H9.375V14.25H8.125C7.77344 14.25 7.5 14.5625 7.5 14.875C7.5 15.2266 7.77344 15.5 8.125 15.5H11.875C12.1875 15.5 12.5 15.2266 12.5 14.875C12.5 14.5625 12.1875 14.25 11.875 14.25Z\" fill=\"#1F83A1\"/>\n            </svg>\n        </td>\n        <td *ngIf=\"type === 'warning'\" class=\"exclamation-triangle\"><i class=\"bi bi-exclamation-triangle\"></i></td>\n        <td *ngIf=\"type === 'critical'\" class=\"exclamation-circle\"><i class=\"bi bi-exclamation-circle\"></i></td>\n        <td *ngIf=\"type === 'success'\" class=\"checkmark\"><i class=\"bi bi-check-circle\"></i></td>\n        <div class=\"text\">\n            <div class=\"title\">{{ title | translate }}</div>\n            <div *ngIf=\"type === 'success'\" class=\"body\">{{ body | translate: { assignedApplications: applications } }}</div>\n            <div *ngIf=\"type !== 'success'\" class=\"body\">{{ body | translate }}</div>\n        </div>\n    </div>\n</ng-template>\n", styles: [".gray-bg{background:#f5f5f5}.dark-gray-bg{background:#d9d9d9}.layout{position:fixed;right:20px;bottom:20px}.banner-container{box-sizing:border-box;display:flex;padding:12px;gap:11px;width:400px;max-width:400px;height:auto;box-shadow:0 4px 10px #0000000a,0 16px 28px #0000000f;border-radius:4px}.banner-container .layout{display:flex;flex-direction:column;align-items:flex-start;position:absolute}.banner-container .alert-line{width:4px;height:auto;border-radius:4px;flex:none;order:0;align-self:stretch;flex-grow:0}.banner-container .information{width:1.25rem;color:#1f83a1;display:flex;align-items:flex-start}@media (max-width: 700px){.banner-container .information{width:1.5rem}}.banner-container .exclamation-triangle{font-size:1.25rem;color:#bd6413}@media (max-width: 700px){.banner-container .exclamation-triangle{width:1.5rem}}.banner-container .exclamation-circle{font-size:1.25rem;color:#931c1f}@media (max-width: 700px){.banner-container .exclamation-circle{width:1.5rem}}.banner-container .checkmark{font-size:1.25rem;color:#0c8a0a}@media (max-width: 700px){.banner-container .checkmark{width:1.5rem}}.banner-container .text .title{width:307px;height:auto;margin-bottom:4px;font-family:Lato;font-style:normal;font-weight:700;font-size:16px;line-height:24px;color:#161617;flex:none;order:0;align-self:stretch;flex-grow:0}.banner-container .text .body{width:307px;height:auto;font-family:Inter;font-style:normal;font-weight:400;font-size:14px;line-height:20px;color:#161617;flex:none;order:1;align-self:stretch;flex-grow:0}.success{background:#edfaf4;border:1px solid #08a657}.success .alert-line{background:#08a657}.info{background:#edf7fa;border:1px solid #269abc}.info .alert-line{background:#269abc}.warning{background:#faf3ed;border:1px solid #e07616}.warning .alert-line{background:#e07616}.critical{background:#faedee;border:1px solid #ab2225}.critical .alert-line{background:#ab2225}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.TranslatePipe, name: "translate" }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: JLBannerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'jl-pr-sclp-banner', template: "<ng-container *ngIf=\"true; then notEmpty\"> </ng-container>\n\n<ng-template #notEmpty>\n    <div *ngIf=\"!hide\" class=\"banner-container\" [ngClass]=\"{'layout': fixedLayout, 'success': type === 'success', 'info': type === 'info', 'warning': type === 'warning', 'critical': type === 'critical'}\">\n        <div class=\"alert-line\">\n        </div>\n\n        <td *ngIf=\"type === 'info'\" class=\"information\">        \n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 21\" fill=\"none\">\n            <path d=\"M10 0.5C4.45312 0.5 0 4.99219 0 10.5C0 16.0469 4.45312 20.5 10 20.5C15.5078 20.5 20 16.0469 20 10.5C20 4.99219 15.5078 0.5 10 0.5ZM10 19.25C5.15625 19.25 1.25 15.3438 1.25 10.5C1.25 5.69531 5.15625 1.75 10 1.75C14.8047 1.75 18.75 5.69531 18.75 10.5C18.75 15.3438 14.8047 19.25 10 19.25ZM10 7.6875C10.5078 7.6875 10.9375 7.29688 10.9375 6.75C10.9375 6.24219 10.5078 5.8125 10 5.8125C9.45312 5.8125 9.0625 6.24219 9.0625 6.75C9.0625 7.29688 9.45312 7.6875 10 7.6875ZM11.875 14.25H10.625V9.875C10.625 9.5625 10.3125 9.25 10 9.25H8.75C8.39844 9.25 8.125 9.5625 8.125 9.875C8.125 10.2266 8.39844 10.5 8.75 10.5H9.375V14.25H8.125C7.77344 14.25 7.5 14.5625 7.5 14.875C7.5 15.2266 7.77344 15.5 8.125 15.5H11.875C12.1875 15.5 12.5 15.2266 12.5 14.875C12.5 14.5625 12.1875 14.25 11.875 14.25Z\" fill=\"#1F83A1\"/>\n            </svg>\n        </td>\n        <td *ngIf=\"type === 'warning'\" class=\"exclamation-triangle\"><i class=\"bi bi-exclamation-triangle\"></i></td>\n        <td *ngIf=\"type === 'critical'\" class=\"exclamation-circle\"><i class=\"bi bi-exclamation-circle\"></i></td>\n        <td *ngIf=\"type === 'success'\" class=\"checkmark\"><i class=\"bi bi-check-circle\"></i></td>\n        <div class=\"text\">\n            <div class=\"title\">{{ title | translate }}</div>\n            <div *ngIf=\"type === 'success'\" class=\"body\">{{ body | translate: { assignedApplications: applications } }}</div>\n            <div *ngIf=\"type !== 'success'\" class=\"body\">{{ body | translate }}</div>\n        </div>\n    </div>\n</ng-template>\n", styles: [".gray-bg{background:#f5f5f5}.dark-gray-bg{background:#d9d9d9}.layout{position:fixed;right:20px;bottom:20px}.banner-container{box-sizing:border-box;display:flex;padding:12px;gap:11px;width:400px;max-width:400px;height:auto;box-shadow:0 4px 10px #0000000a,0 16px 28px #0000000f;border-radius:4px}.banner-container .layout{display:flex;flex-direction:column;align-items:flex-start;position:absolute}.banner-container .alert-line{width:4px;height:auto;border-radius:4px;flex:none;order:0;align-self:stretch;flex-grow:0}.banner-container .information{width:1.25rem;color:#1f83a1;display:flex;align-items:flex-start}@media (max-width: 700px){.banner-container .information{width:1.5rem}}.banner-container .exclamation-triangle{font-size:1.25rem;color:#bd6413}@media (max-width: 700px){.banner-container .exclamation-triangle{width:1.5rem}}.banner-container .exclamation-circle{font-size:1.25rem;color:#931c1f}@media (max-width: 700px){.banner-container .exclamation-circle{width:1.5rem}}.banner-container .checkmark{font-size:1.25rem;color:#0c8a0a}@media (max-width: 700px){.banner-container .checkmark{width:1.5rem}}.banner-container .text .title{width:307px;height:auto;margin-bottom:4px;font-family:Lato;font-style:normal;font-weight:700;font-size:16px;line-height:24px;color:#161617;flex:none;order:0;align-self:stretch;flex-grow:0}.banner-container .text .body{width:307px;height:auto;font-family:Inter;font-style:normal;font-weight:400;font-size:14px;line-height:20px;color:#161617;flex:none;order:1;align-self:stretch;flex-grow:0}.success{background:#edfaf4;border:1px solid #08a657}.success .alert-line{background:#08a657}.info{background:#edf7fa;border:1px solid #269abc}.info .alert-line{background:#269abc}.warning{background:#faf3ed;border:1px solid #e07616}.warning .alert-line{background:#e07616}.critical{background:#faedee;border:1px solid #ab2225}.critical .alert-line{background:#ab2225}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { title: [{
                type: Input
            }], body: [{
                type: Input
            }], fixedLayout: [{
                type: Input
            }], delay: [{
                type: Input
            }], hide: [{
                type: Input
            }], type: [{
                type: Input
            }], applications: [{
                type: Input
            }], bannerEvent: [{
                type: Output
            }] } });

class JLCheckboxComponent {
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

class JlChipListComponent {
    constructor() {
        this.chipListChange = new EventEmitter();
    }
    ngOnInit() { }
    removeChipItem(chipIdx) {
        this.chipList?.splice(chipIdx, 1);
        this.chipListChange.emit(this.chipList);
    }
    onSubmit() {
        if (this.chipContentText) {
            this.chipList?.push(this.chipContentText);
            this.chipListChange.emit(this.chipList);
            this.chipContentText = '';
        }
    }
}
JlChipListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: JlChipListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
JlChipListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: JlChipListComponent, selector: "jl-pr-sclp-jl-chip-list", inputs: { chipList: "chipList" }, outputs: { chipListChange: "chipListChange" }, ngImport: i0, template: "<form #form=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n  <jl-pr-sclp-input name=\"chipContentText\" [(ngModel)]=\"chipContentText\" placeholder=\"Add Chip\">\n  </jl-pr-sclp-input>\n</form>\n<div class=\"chip-list\">\n  <jl-pr-sclp-jl-chip-item *ngFor=\"let chip of chipList; let idx = index\" [chipContent]=\"chip\"\n    (iconClickEvent)=\"removeChipItem(idx)\"></jl-pr-sclp-jl-chip-item>\n</div>", styles: [".chip-list{display:flex;gap:8px;margin:8px 0;overflow-x:auto}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i2.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: JlChipItemComponent, selector: "jl-pr-sclp-jl-chip-item", inputs: ["chipContent"], outputs: ["iconClickEvent"] }, { kind: "component", type: JLInputComponent, selector: "jl-pr-sclp-input", inputs: ["config", "id", "formGroup"] }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: JlChipListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'jl-pr-sclp-jl-chip-list', template: "<form #form=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n  <jl-pr-sclp-input name=\"chipContentText\" [(ngModel)]=\"chipContentText\" placeholder=\"Add Chip\">\n  </jl-pr-sclp-input>\n</form>\n<div class=\"chip-list\">\n  <jl-pr-sclp-jl-chip-item *ngFor=\"let chip of chipList; let idx = index\" [chipContent]=\"chip\"\n    (iconClickEvent)=\"removeChipItem(idx)\"></jl-pr-sclp-jl-chip-item>\n</div>", styles: [".chip-list{display:flex;gap:8px;margin:8px 0;overflow-x:auto}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { chipList: [{
                type: Input
            }], chipListChange: [{
                type: Output
            }] } });

class JlSecondaryChipsComponent {
    constructor() { }
    ngOnInit() { }
}
JlSecondaryChipsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: JlSecondaryChipsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
JlSecondaryChipsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: JlSecondaryChipsComponent, selector: "jl-pr-sclp-jl-secondary-chips", inputs: { chipContent: "chipContent" }, ngImport: i0, template: "<div class=\"secondary-chip\" tabindex=\"0\">\n    <span class=\"secondary-chip-text\">{{ chipContent || '' | translate }}</span>\n</div>", styles: [".gray-bg{background:#f5f5f5}.dark-gray-bg{background:#d9d9d9}.secondary-chip{font-family:Inter;font-style:normal;font-size:.75rem;line-height:20px;border-style:solid;border-width:1.5px;border-radius:4px;border-color:#dfdfe1;color:#59595a;font-weight:400;display:flex;align-items:center;height:28px;width:-moz-fit-content;width:fit-content;padding:4px 6px 4px 8px}\n"], dependencies: [{ kind: "pipe", type: i3.TranslatePipe, name: "translate" }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: JlSecondaryChipsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'jl-pr-sclp-jl-secondary-chips', template: "<div class=\"secondary-chip\" tabindex=\"0\">\n    <span class=\"secondary-chip-text\">{{ chipContent || '' | translate }}</span>\n</div>", styles: [".gray-bg{background:#f5f5f5}.dark-gray-bg{background:#d9d9d9}.secondary-chip{font-family:Inter;font-style:normal;font-size:.75rem;line-height:20px;border-style:solid;border-width:1.5px;border-radius:4px;border-color:#dfdfe1;color:#59595a;font-weight:400;display:flex;align-items:center;height:28px;width:-moz-fit-content;width:fit-content;padding:4px 6px 4px 8px}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { chipContent: [{
                type: Input
            }] } });

var DropdownTypes;
(function (DropdownTypes) {
    DropdownTypes["input"] = "input";
    DropdownTypes["cta"] = "cta";
})(DropdownTypes || (DropdownTypes = {}));
var DropDownActions;
(function (DropDownActions) {
    DropDownActions["addApplications"] = "add-applications";
    DropDownActions["filterApplications"] = "filter-applications";
})(DropDownActions || (DropDownActions = {}));
var DSSizes;
(function (DSSizes) {
    DSSizes["large"] = "large";
    DSSizes["small"] = "small";
})(DSSizes || (DSSizes = {}));

// TODO: Cannot enter dropdown menu with keyboard!!!
class JLDropdownComponent {
    constructor(differs) {
        this.differs = differs;
        this.hideDropdown = true;
        this.isFocusInsideComponent = false;
        this.isComponentClicked = false;
        this.dropdownTypes = DropdownTypes;
        this.touched = false;
        this.isDisabled = false;
        this.onChange = (value) => { };
        this.onTouched = () => { };
    }
    validate(control) {
        return control.errors;
    }
    writeValue(value) {
        //TODO: This needs to be written to set the value and the current index number;
    }
    registerOnChange(onChange) {
        this.onChange = onChange;
    }
    registerOnTouched(onTouched) {
        this.onTouched = onTouched;
    }
    setDisabledState(isDisabled) {
        // (this.config !== undefined) ? this.config.disabled = isDisabled : this.disabled = isDisabled;
        this.isDisabled = isDisabled;
    }
    markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }
    handleKeyDown(event) {
        event.stopPropagation();
        if (this.hideDropdown === false || (this.config?.options || []).length > 0) {
            this.isComponentClicked = false;
            this.isFocusInsideComponent = false;
            this.hideDropdown = true;
        }
    }
    clickInside(event) {
        const target = event.target;
        if (this.hideDropdown === true && target.classList.contains(`selected`)) {
            this.isFocusInsideComponent = true;
            this.isComponentClicked = true;
            this.hideDropdown = false;
        }
        else if (target.classList.contains('select-target') ||
            target.classList.contains(`selected`)) {
            this.isComponentClicked = false;
            this.isFocusInsideComponent = false;
            this.hideDropdown = true;
        }
    }
    clickout() {
        if (!this.isFocusInsideComponent && this.isComponentClicked) {
            this.toggleDropDown();
            this.isComponentClicked = false;
        }
        this.isFocusInsideComponent = false;
    }
    toggleDropDown() {
        this.hideDropdown = !this.hideDropdown;
    }
    toggleDropDownKey(event) {
        if (event.keyCode === 13) { //TODO: Changed until const can be added.
            // if (event.key === KeyboardEvents.enter) {
            this.toggleDropDown();
        }
    }
    /**
     * TODO: I've band-aided this one so that it works. Can probably remove the entire
     * custom DoCheck by just doing this.
     * @param index
     */
    selectIndex(index) {
        if (this.config) {
            let emit = false;
            if (this.config.selectedIndex !== index) {
                emit = true;
            }
            this.config.selectedIndex = index;
            emit ? this.onChange(this.config?.options[(this.config?.selectedIndex || 0)].value || '') : '';
            // emit ? this.valueChange.emit({ id: this.config?.id || '', value: this.config?.options[(this.config?.selectedIndex || 0)].value || '' }) : '';
        }
    }
    getOptions(index) {
        if (this.config) {
            return this.config.options[index].text;
        }
        return '';
    }
    ngOnInit() { }
}
JLDropdownComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: JLDropdownComponent, deps: [{ token: i0.KeyValueDiffers }], target: i0.ɵɵFactoryTarget.Component });
JLDropdownComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: JLDropdownComponent, selector: "jl-pr-sclp-dropdown", inputs: { config: "config", options: "options", id: "id", type: "type", text: "text", large: "large", error: "error", selectedIndex: "selectedIndex" }, host: { listeners: { "window:keydown.escape": "handleKeyDown($event)", "click": "clickInside($event)", "document:click": "clickout()" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: JLDropdownComponent
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: JLDropdownComponent
        }
    ], ngImport: i0, template: "<ng-container *ngIf=\"(config?.options || options || []).length > 0; then notEmpty; else isEmpty\">\n  <!-- an *ngIf may be better here, since there are only two cases -->\n</ng-container>\n<ng-template #notEmpty>\n  <div class=\"select-container\" [ngClass]=\"{ large: config?.large || large, error: config?.error || error }\">\n    <div\n      class=\"select\"\n      [ngClass]=\"!hideDropdown ? 'open' : ''\"\n      [class]=\"(config?.type || type || dropdownTypes.input)\"\n    >\n      <div\n        tabindex=\"0\"\n        class=\"selected input\"\n        (keyup)=\"toggleDropDownKey($event)\"\n        [ngClass]=\"!hideDropdown ? 'active' : ''\"\n        *ngIf=\"(config?.type === dropdownTypes.input) || (type === dropdownTypes.input)\"\n      >\n        {{ getOptions(config?.selectedIndex || selectedIndex || 0) | translate }}\n      </div>\n\n      <div\n        tabindex=\"0\"\n        class=\"selected cta\"\n        (keyup)=\"toggleDropDownKey($event)\"\n        [ngClass]=\"!hideDropdown ? 'active' : ''\"\n        *ngIf=\"(config?.type === dropdownTypes.cta) || (type === dropdownTypes.cta)\"\n      >\n        {{ (config?.text || text || '') | translate }}\n      </div>\n\n      <div\n        class=\"select-options\"\n        [ngClass]=\"!hideDropdown ? '' : 'hide'\"\n      >\n        <div\n          *ngFor=\"let option of config?.options || options; let index = index\" \n          class=\"option select-target\"\n          (click)=\"selectIndex(index)\"\n          [tabindex]=\"index + 1\"\n          [ngClass]=\"{ active: index === (config?.selectedIndex || selectedIndex || 0), hide: (config?.type === dropdownTypes.cta) || (type === dropdownTypes.cta) }\"\n        > \n        <!-- TODO: Check if the above line defaults to 0 if the selectedIndex is undefined, or if it also triggers if 0 -->\n          <p class=\"select-target\">{{ option.text | translate }}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-template>\n\n<ng-template #isEmpty>\n  <div\n    class=\"select-container empty\"\n    [ngClass]=\"{ large: config?.large || large, error: config?.error || error }\"\n  >\n    <div class=\"select\">\n      <div tabindex=\"0\" class=\"selected\">&#160;</div>\n    </div>\n  </div>\n</ng-template>\n", styles: [".gray-bg{background:#f5f5f5}.dark-gray-bg{background:#d9d9d9}.select-container{-webkit-user-select:none;user-select:none}.select-container .select{height:40px;min-width:15ch;max-width:30ch;justify-self:stretch;display:grid;grid-template-areas:\"select\";align-items:center;width:100%}.select-container .select:after{content:\"\\f282\";color:#161617;font-family:bootstrap-icons!important;grid-area:select;justify-self:end;margin-right:14px;height:16px;width:14px;line-height:initial;pointer-events:none;transition:all .1s}.select-container .selected{-webkit-appearance:none;appearance:none;background-color:transparent;border:none;margin:0;font-family:inherit;font-size:inherit;cursor:inherit;line-height:inherit;padding:10px 30px 10px 12px;cursor:pointer;grid-area:select}@keyframes active{0%{background-color:#59595a1f}99%{background-color:#59595a1f}to{background-color:transparent}}.select-container .selected:hover{background-color:#59595a0f}.select-container .selected:focus-visible{outline:solid 3px hsl(225deg,90%,62%)}.select-container .selected.active{background-color:transparent;animation-name:active;animation-duration:2s}.select-container .selected,.select-container .select-options{background:#ffffff;font-size:14px;line-height:20px;color:#161617;font-family:Inter,sans-serif!important;border-radius:4px;border:1px solid #b2b2b4}.select-container .select.open:after{content:\"\\f286\"}.select-container .cta{font-family:Lato,sans-serif;border-radius:4px;border-style:none;cursor:pointer;color:#fff;background-color:#29497f!important;min-width:180px;max-width:-moz-fit-content;max-width:fit-content;max-height:60px}.select-container .cta:after{color:#fff}.select-container .cta .select-options{min-width:234px;width:auto;margin-left:-53px}.select-container .select-options{z-index:2;width:auto;margin-top:9px;box-shadow:0 8px 20px #0000001a;position:relative}.select-container .select-options.hide{display:none}.select-container .select-options .option{margin:8px 0;width:100%;padding:10px 12px;display:grid;grid-template-areas:\"options\";align-items:center}.select-container .select-options .option:hover{background-color:#59595a0f;cursor:pointer}.select-container .select-options .option.hide:after{display:none!important}.select-container .select-options .option.hide .select-target{padding-right:0}.select-container .select-options .option.active:after{grid-area:options;justify-self:end;content:\"\";height:16px;width:14px;pointer-events:none;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIiA/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgd2lkdGg9IjY0MCIgaGVpZ2h0PSI0ODAiIHZpZXdCb3g9IjAgMCA2NDAgNDgwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGRlc2M+Q3JlYXRlZCB3aXRoIEZhYnJpYy5qcyAzLjYuMzwvZGVzYz4KPGRlZnM+CjwvZGVmcz4KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS40MyAwIDAgMS40MyAzMjAuMTYgMjM4Ljg3KSIgID4KPHBhdGggc3R5bGU9InN0cm9rZTogbm9uZTsgc3Ryb2tlLXdpZHRoOiAxOyBzdHJva2UtZGFzaGFycmF5OiBub25lOyBzdHJva2UtbGluZWNhcDogYnV0dDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDA7IHN0cm9rZS1saW5lam9pbjogbWl0ZXI7IHN0cm9rZS1taXRlcmxpbWl0OiA0OyBmaWxsOiByZ2IoNzMsMTE2LDI0NSk7IGZpbGwtcnVsZTogbm9uemVybzsgb3BhY2l0eTogMTsiICB0cmFuc2Zvcm09IiB0cmFuc2xhdGUoLTI1NS45NSwgLTI1Ni4wNSkiIGQ9Ik0gNDcwLjYgMTA1LjQgYyAxMi41IDEyLjUgMTIuNSAzMi44IDAgNDUuMyBsIC0yNTYgMjU2IGMgLTEyLjUgMTIuNSAtMzIuOCAxMi41IC00NS4zIDAgbCAtMTI4IC0xMjggYyAtMTIuNSAtMTIuNSAtMTIuNSAtMzIuOCAwIC00NS4zIHMgMzIuOCAtMTIuNSA0NS4zIDAgTCAxOTIgMzM4LjcgTCA0MjUuNCAxMDUuNCBjIDEyLjUgLTEyLjUgMzIuOCAtMTIuNSA0NS4zIDAgeiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgo8L2c+Cjwvc3ZnPg==);background-repeat:no-repeat;background-position:center center;background-size:100%}.select-container .select-options .option p{grid-area:options;margin:0;padding-right:30px;color:#161617;font-family:Inter,sans-serif!important}.select-container.large .selected,.select-container.large .select-options{font-size:16px;padding:14px 12px}.select-container.error .selected{border-color:#ab2225;background:#faedee}.select-container.error .selected:hover{border-color:#931c1f}.select-container.error .selected:focus-visible{outline:solid 3px hsl(225deg,90%,62%)}.select-container.error .selected.active{border-color:#931c1f;background-color:ircc-ca-error-active}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.TranslatePipe, name: "translate" }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: JLDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'jl-pr-sclp-dropdown', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            multi: true,
                            useExisting: JLDropdownComponent
                        },
                        {
                            provide: NG_VALIDATORS,
                            multi: true,
                            useExisting: JLDropdownComponent
                        }
                    ], template: "<ng-container *ngIf=\"(config?.options || options || []).length > 0; then notEmpty; else isEmpty\">\n  <!-- an *ngIf may be better here, since there are only two cases -->\n</ng-container>\n<ng-template #notEmpty>\n  <div class=\"select-container\" [ngClass]=\"{ large: config?.large || large, error: config?.error || error }\">\n    <div\n      class=\"select\"\n      [ngClass]=\"!hideDropdown ? 'open' : ''\"\n      [class]=\"(config?.type || type || dropdownTypes.input)\"\n    >\n      <div\n        tabindex=\"0\"\n        class=\"selected input\"\n        (keyup)=\"toggleDropDownKey($event)\"\n        [ngClass]=\"!hideDropdown ? 'active' : ''\"\n        *ngIf=\"(config?.type === dropdownTypes.input) || (type === dropdownTypes.input)\"\n      >\n        {{ getOptions(config?.selectedIndex || selectedIndex || 0) | translate }}\n      </div>\n\n      <div\n        tabindex=\"0\"\n        class=\"selected cta\"\n        (keyup)=\"toggleDropDownKey($event)\"\n        [ngClass]=\"!hideDropdown ? 'active' : ''\"\n        *ngIf=\"(config?.type === dropdownTypes.cta) || (type === dropdownTypes.cta)\"\n      >\n        {{ (config?.text || text || '') | translate }}\n      </div>\n\n      <div\n        class=\"select-options\"\n        [ngClass]=\"!hideDropdown ? '' : 'hide'\"\n      >\n        <div\n          *ngFor=\"let option of config?.options || options; let index = index\" \n          class=\"option select-target\"\n          (click)=\"selectIndex(index)\"\n          [tabindex]=\"index + 1\"\n          [ngClass]=\"{ active: index === (config?.selectedIndex || selectedIndex || 0), hide: (config?.type === dropdownTypes.cta) || (type === dropdownTypes.cta) }\"\n        > \n        <!-- TODO: Check if the above line defaults to 0 if the selectedIndex is undefined, or if it also triggers if 0 -->\n          <p class=\"select-target\">{{ option.text | translate }}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-template>\n\n<ng-template #isEmpty>\n  <div\n    class=\"select-container empty\"\n    [ngClass]=\"{ large: config?.large || large, error: config?.error || error }\"\n  >\n    <div class=\"select\">\n      <div tabindex=\"0\" class=\"selected\">&#160;</div>\n    </div>\n  </div>\n</ng-template>\n", styles: [".gray-bg{background:#f5f5f5}.dark-gray-bg{background:#d9d9d9}.select-container{-webkit-user-select:none;user-select:none}.select-container .select{height:40px;min-width:15ch;max-width:30ch;justify-self:stretch;display:grid;grid-template-areas:\"select\";align-items:center;width:100%}.select-container .select:after{content:\"\\f282\";color:#161617;font-family:bootstrap-icons!important;grid-area:select;justify-self:end;margin-right:14px;height:16px;width:14px;line-height:initial;pointer-events:none;transition:all .1s}.select-container .selected{-webkit-appearance:none;appearance:none;background-color:transparent;border:none;margin:0;font-family:inherit;font-size:inherit;cursor:inherit;line-height:inherit;padding:10px 30px 10px 12px;cursor:pointer;grid-area:select}@keyframes active{0%{background-color:#59595a1f}99%{background-color:#59595a1f}to{background-color:transparent}}.select-container .selected:hover{background-color:#59595a0f}.select-container .selected:focus-visible{outline:solid 3px hsl(225deg,90%,62%)}.select-container .selected.active{background-color:transparent;animation-name:active;animation-duration:2s}.select-container .selected,.select-container .select-options{background:#ffffff;font-size:14px;line-height:20px;color:#161617;font-family:Inter,sans-serif!important;border-radius:4px;border:1px solid #b2b2b4}.select-container .select.open:after{content:\"\\f286\"}.select-container .cta{font-family:Lato,sans-serif;border-radius:4px;border-style:none;cursor:pointer;color:#fff;background-color:#29497f!important;min-width:180px;max-width:-moz-fit-content;max-width:fit-content;max-height:60px}.select-container .cta:after{color:#fff}.select-container .cta .select-options{min-width:234px;width:auto;margin-left:-53px}.select-container .select-options{z-index:2;width:auto;margin-top:9px;box-shadow:0 8px 20px #0000001a;position:relative}.select-container .select-options.hide{display:none}.select-container .select-options .option{margin:8px 0;width:100%;padding:10px 12px;display:grid;grid-template-areas:\"options\";align-items:center}.select-container .select-options .option:hover{background-color:#59595a0f;cursor:pointer}.select-container .select-options .option.hide:after{display:none!important}.select-container .select-options .option.hide .select-target{padding-right:0}.select-container .select-options .option.active:after{grid-area:options;justify-self:end;content:\"\";height:16px;width:14px;pointer-events:none;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIiA/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgd2lkdGg9IjY0MCIgaGVpZ2h0PSI0ODAiIHZpZXdCb3g9IjAgMCA2NDAgNDgwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGRlc2M+Q3JlYXRlZCB3aXRoIEZhYnJpYy5qcyAzLjYuMzwvZGVzYz4KPGRlZnM+CjwvZGVmcz4KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS40MyAwIDAgMS40MyAzMjAuMTYgMjM4Ljg3KSIgID4KPHBhdGggc3R5bGU9InN0cm9rZTogbm9uZTsgc3Ryb2tlLXdpZHRoOiAxOyBzdHJva2UtZGFzaGFycmF5OiBub25lOyBzdHJva2UtbGluZWNhcDogYnV0dDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDA7IHN0cm9rZS1saW5lam9pbjogbWl0ZXI7IHN0cm9rZS1taXRlcmxpbWl0OiA0OyBmaWxsOiByZ2IoNzMsMTE2LDI0NSk7IGZpbGwtcnVsZTogbm9uemVybzsgb3BhY2l0eTogMTsiICB0cmFuc2Zvcm09IiB0cmFuc2xhdGUoLTI1NS45NSwgLTI1Ni4wNSkiIGQ9Ik0gNDcwLjYgMTA1LjQgYyAxMi41IDEyLjUgMTIuNSAzMi44IDAgNDUuMyBsIC0yNTYgMjU2IGMgLTEyLjUgMTIuNSAtMzIuOCAxMi41IC00NS4zIDAgbCAtMTI4IC0xMjggYyAtMTIuNSAtMTIuNSAtMTIuNSAtMzIuOCAwIC00NS4zIHMgMzIuOCAtMTIuNSA0NS4zIDAgTCAxOTIgMzM4LjcgTCA0MjUuNCAxMDUuNCBjIDEyLjUgLTEyLjUgMzIuOCAtMTIuNSA0NS4zIDAgeiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgo8L2c+Cjwvc3ZnPg==);background-repeat:no-repeat;background-position:center center;background-size:100%}.select-container .select-options .option p{grid-area:options;margin:0;padding-right:30px;color:#161617;font-family:Inter,sans-serif!important}.select-container.large .selected,.select-container.large .select-options{font-size:16px;padding:14px 12px}.select-container.error .selected{border-color:#ab2225;background:#faedee}.select-container.error .selected:hover{border-color:#931c1f}.select-container.error .selected:focus-visible{outline:solid 3px hsl(225deg,90%,62%)}.select-container.error .selected.active{border-color:#931c1f;background-color:ircc-ca-error-active}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.KeyValueDiffers }]; }, propDecorators: { config: [{
                type: Input
            }], options: [{
                type: Input
            }], id: [{
                type: Input
            }], type: [{
                type: Input
            }], text: [{
                type: Input
            }], large: [{
                type: Input
            }], error: [{
                type: Input
            }], selectedIndex: [{
                type: Input
            }], handleKeyDown: [{
                type: HostListener,
                args: ['window:keydown.escape', ['$event']]
            }], clickInside: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], clickout: [{
                type: HostListener,
                args: ['document:click']
            }] } });

class RadioInputComponent {
    constructor() {
        this.formGroupEmpty = new FormGroup({});
        this.size = DSSizes.large;
        this.sizes = DSSizes;
        this.touched = false;
        this.config = {
            id: '',
            formGroup: this.formGroupEmpty
        };
        this.id = '';
        this.formGroup = this.formGroupEmpty;
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
        if (this.config?.small)
            this.size = DSSizes.small;
        if (this.id !== '')
            this.config.id = this.id;
        if (this.formGroup !== this.formGroupEmpty)
            this.config.formGroup = this.formGroup;
        this.config.formGroup.addControl(this.config.id, new FormControl('', this.config.validators));
    }
    /**
     *
     * @param override
     * @returns
     */
    getSize(override) {
        if (override) {
            return override;
        }
        if (this.config?.small) {
            return DSSizes.small;
        }
        return DSSizes.large;
    }
    /**
     * used to disable individual fields (from the config under 'options')
     * @param index of the option field to be disabled
     * @returns null if value is undefined, empty string otherwise. This works with [attr.disabled].
     */
    getDisabled(index) {
        if (this.config.options) {
            if (this.config.options[index].disabled === undefined) {
                return null;
            }
        }
        return '';
    }
}
RadioInputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: RadioInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RadioInputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: RadioInputComponent, selector: "lib-radio-input", inputs: { config: "config", id: "id", formGroup: "formGroup" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => RadioInputComponent) //This allows the error state to be turned off and on again
        }
    ], ngImport: i0, template: "<form [formGroup]=\"config.formGroup\">\n    <label *ngIf=\"config.label\"\n       [attr.aria-label]=\"\n          config.formGroup.get(config.id)?.invalid && config.formGroup.get(config.id)?.dirty\n          ? (config.label || '' | translate) + ' ' +\n            (config.helpText || '' | translate) + ' ' + ('INPUT.ERROR' | translate) + ' ' +\n            (config.customErrorText || '' | translate)\n          : (config.label || '' | translate) + ' ' + (config?.helpText || '' | translate)\n       \"\n       [for]=\"config.id\">{{(config.label || '') | translate}}</label>\n    <div *ngFor=\"let option of config.options; let index = index\" class=\"radio\">\n        <ng-container [ngSwitch]=\"getSize(option.sizeOverride)\">\n            <ng-container *ngSwitchCase=\"sizes.small\">\n                <ng-container *ngIf=\"config.error || option.error\">\n                    <input type=\"radio\" value=\"{{option.value || option.text}}\"\n                         [id]=\"config.id + index\" size=\"small\" class=\"ng-invalid\"\n                         [formControlName]=\"config.id ?? 'formControl'\"\n                         [attr.disabled]='getDisabled(index)'>\n                </ng-container>\n                <ng-container *ngIf=\"!config.error && !option.error\">\n                    <input type=\"radio\" value=\"{{option.value || option.text}}\"\n                        [id]=\"config.id + index\" size=\"small\"\n                        [formControlName]=\"config.id ?? 'formControl'\"\n                        [attr.disabled]='getDisabled(index)'>\n                </ng-container>\n            </ng-container>\n\n            <!-- TODO: See if we can remove the error state from here, since it is controlled by the formControl -->\n            <ng-container *ngSwitchDefault>\n                <ng-container *ngIf=\"config.error || option.error\">\n                    <input type=\"radio\" value=\"{{option.value || option.text}}\"\n                        [id]=\"config.id + index\" size=\"large\" class=\"ng-invalid\"\n                        [formControlName]=\"config.id ?? 'formControl'\"\n                        [attr.disabled]='getDisabled(index)'>\n                </ng-container>\n                <ng-container *ngIf=\"!config.error && !option.error\">\n                    <input type=\"radio\" value=\"{{option.value || option.text}}\"\n                        [id]=\"config.id + index\" size=\"large\"\n                        [formControlName]=\"config.id ?? 'formControl'\"\n                        [attr.disabled]='getDisabled(index)'>\n                </ng-container>\n            </ng-container>\n        </ng-container>\n\n        <label for=\"{{config.id}}\">{{option.text | translate}}</label>\n    </div>\n</form>\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "pipe", type: i3.TranslatePipe, name: "translate" }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: RadioInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-radio-input', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            multi: true,
                            useExisting: forwardRef(() => RadioInputComponent) //This allows the error state to be turned off and on again
                        }
                    ], template: "<form [formGroup]=\"config.formGroup\">\n    <label *ngIf=\"config.label\"\n       [attr.aria-label]=\"\n          config.formGroup.get(config.id)?.invalid && config.formGroup.get(config.id)?.dirty\n          ? (config.label || '' | translate) + ' ' +\n            (config.helpText || '' | translate) + ' ' + ('INPUT.ERROR' | translate) + ' ' +\n            (config.customErrorText || '' | translate)\n          : (config.label || '' | translate) + ' ' + (config?.helpText || '' | translate)\n       \"\n       [for]=\"config.id\">{{(config.label || '') | translate}}</label>\n    <div *ngFor=\"let option of config.options; let index = index\" class=\"radio\">\n        <ng-container [ngSwitch]=\"getSize(option.sizeOverride)\">\n            <ng-container *ngSwitchCase=\"sizes.small\">\n                <ng-container *ngIf=\"config.error || option.error\">\n                    <input type=\"radio\" value=\"{{option.value || option.text}}\"\n                         [id]=\"config.id + index\" size=\"small\" class=\"ng-invalid\"\n                         [formControlName]=\"config.id ?? 'formControl'\"\n                         [attr.disabled]='getDisabled(index)'>\n                </ng-container>\n                <ng-container *ngIf=\"!config.error && !option.error\">\n                    <input type=\"radio\" value=\"{{option.value || option.text}}\"\n                        [id]=\"config.id + index\" size=\"small\"\n                        [formControlName]=\"config.id ?? 'formControl'\"\n                        [attr.disabled]='getDisabled(index)'>\n                </ng-container>\n            </ng-container>\n\n            <!-- TODO: See if we can remove the error state from here, since it is controlled by the formControl -->\n            <ng-container *ngSwitchDefault>\n                <ng-container *ngIf=\"config.error || option.error\">\n                    <input type=\"radio\" value=\"{{option.value || option.text}}\"\n                        [id]=\"config.id + index\" size=\"large\" class=\"ng-invalid\"\n                        [formControlName]=\"config.id ?? 'formControl'\"\n                        [attr.disabled]='getDisabled(index)'>\n                </ng-container>\n                <ng-container *ngIf=\"!config.error && !option.error\">\n                    <input type=\"radio\" value=\"{{option.value || option.text}}\"\n                        [id]=\"config.id + index\" size=\"large\"\n                        [formControlName]=\"config.id ?? 'formControl'\"\n                        [attr.disabled]='getDisabled(index)'>\n                </ng-container>\n            </ng-container>\n        </ng-container>\n\n        <label for=\"{{config.id}}\">{{option.text | translate}}</label>\n    </div>\n</form>\n" }]
        }], propDecorators: { config: [{
                type: Input
            }], id: [{
                type: Input
            }], formGroup: [{
                type: Input
            }] } });

;
;
class DropdownInputComponent {
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

class DatePickerComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.dateForm = new FormGroup({});
        this.days = [];
        this.months = [];
        this.years = [];
        //Get the current year for use in the year dropdown
        this.currentYear = new Date().getFullYear();
        this.onTouched = () => { };
    }
    ngOnInit() {
        // Populate the months and years arrays
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        for (let i = 1900; i <= this.currentYear; i++) {
            this.years.push(i);
        }
        // Set up a form control for the month and year
        this.dateForm.addControl((this.id + '_monthControl'), new FormControl('', Validators.required));
        this.dateForm.addControl((this.id + '_yearControl'), new FormControl('', Validators.required));
        this.dateForm.addControl((this.id + '_dayControl'), new FormControl('', Validators.required));
        // Populate the days array based on the selected month and year
        this.dateForm.get((this.id + '_monthControl'))?.valueChanges.subscribe(month => {
            //add if statement here - the value of year can be empty, since it may not have been selected yet.
            const numDays = this.updateDaysArray(month, this.dateForm.get((this.id + '_yearControl'))?.value);
            console.log(month, numDays);
            console.log(this.dateForm.get((this.id + '_yearControl'))?.value);
        });
        this.dateForm.get((this.id + '_yearControl'))?.valueChanges.subscribe(year => {
            const numDays = this.updateDaysArray(this.dateForm.get((this.id + '_monthControl'))?.value, year);
        });
        if (this.days.length === 0) {
            for (let i = 1; i <= 31; i++) {
                this.days.push(i);
            }
        }
    }
    /**
     * update the days array with the correct number of days based on the year and the month
     * @param month string of the month (TODO: Change this to be an LOV)
     * @param year year selected
     */
    updateDaysArray(month, year) {
        this.days = [];
        const numDays = this.getNumDaysInMonth(month, year);
        for (let i = 1; i <= numDays; i++) {
            this.days.push(i);
        }
        this.dateForm.get((this.id + '_dayControl'))?.setValue('');
    }
    /**
     * Get the number of days in the month based on the month and year
     * @param month string of the month selected
     * @param year number selected
     * @returns number representing the number of days in the month
     */
    getNumDaysInMonth(month, year) {
        const monthNum = this.getMonthNum(month);
        if (monthNum === 2) {
            return this.isLeapYear(year) ? 29 : 28;
        }
        else if ([4, 6, 9, 11].includes(monthNum)) {
            return 30;
        }
        else {
            return 31;
        }
    }
    /**
     * Check if the year is a leap year
     * @param year number representing the year
     * @returns true if a leap year, false otherwise
     */
    isLeapYear(year) {
        if (year % 4 === 0) {
            if (year % 100 === 0) {
                return year % 400 === 0;
            }
            return true;
        }
        return false;
    }
    /**
     * Switch function that grabs the month number based on the month name/lov
     * @param month string representing the month
     * @returns number representing the month (Jan = 1, etc.)/ or 0, if no match found.
     */
    getMonthNum(month) {
        switch (month) {
            case 'January':
                return 1;
            case 'February':
                return 2;
            case 'March':
                return 3;
            case 'April':
                return 4;
            case 'May':
                return 5;
            case 'June':
                return 6;
            case 'July':
                return 7;
            case 'August':
                return 8;
            case 'September':
                return 9;
            case 'October':
                return 10;
            case 'November':
                return 11;
            case 'December':
                return 12;
            default:
                return 0;
        }
    }
    writeValue(obj) {
        if (obj) {
            this.dateForm.setValue(obj, { emitEvent: false });
        }
    }
    registerOnChange(fn) {
        this.dateForm.valueChanges.subscribe(fn);
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        isDisabled ? this.dateForm.disable() : this.dateForm.enable();
    }
}
DatePickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: DatePickerComponent, deps: [{ token: i2.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
DatePickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: DatePickerComponent, selector: "lib-date-picker", inputs: { title: "title", dateForm: "dateForm", id: "id" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true
        }
    ], ngImport: i0, template: "<div class=\"date-title\" [attr.aria-label]=\"title\">{{ title }}</div>\n<div class=\"date-form\">\n    <form [formGroup]=\"dateForm\">\n        <div class=\"select-container\">\n            <div class=\"label-year\">Year YYYY</div>\n            <label for=\"year\" class=\"sr-only\">Year:</label>\n            <select id=\"year\" aria-label=\"Select a year\" [formControlName]=\"id + '_yearControl'\" class=\"date-input\">\n                <option *ngFor=\"let year of years\" [value]=\"year\">{{ year }}</option>\n            </select>\n        </div>\n        <div class=\"select-container\">\n            <div class=\"label-month\">Month MM</div>\n            <label for=\"month\" class=\"sr-only\">Month:</label>\n            <select id=\"month\" aria-label=\"Select a month\" [formControlName]=\"id + '_monthControl'\" class=\"date-input\">\n                <option *ngFor=\"let month of months\" [value]=\"month\">{{ month }}</option>\n            </select>\n        </div>\n        <div class=\"select-container\">\n            <div class=\"label-day\">Day DD</div>\n            <label for=\"day\" class=\"sr-only\">Day:</label>\n            <select id=\"day\" aria-label=\"Select a day\" [formControlName]=\"id + '_dayControl'\" class=\"date-input\">\n                <option *ngFor=\"let day of days\" [value]=\"day\">{{ day }}</option>\n            </select>\n        </div>\n    </form>\n</div>", styles: [".date-title{margin-top:4px}.date-form{display:flex;flex-wrap:nowrap;align-items:center;justify-content:space-between}.date-form .label{text-align:left}.date-form .date-input{height:40px;border-radius:4px;flex:1;min-width:120px}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: DatePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-date-picker', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => DatePickerComponent),
                            multi: true
                        }
                    ], template: "<div class=\"date-title\" [attr.aria-label]=\"title\">{{ title }}</div>\n<div class=\"date-form\">\n    <form [formGroup]=\"dateForm\">\n        <div class=\"select-container\">\n            <div class=\"label-year\">Year YYYY</div>\n            <label for=\"year\" class=\"sr-only\">Year:</label>\n            <select id=\"year\" aria-label=\"Select a year\" [formControlName]=\"id + '_yearControl'\" class=\"date-input\">\n                <option *ngFor=\"let year of years\" [value]=\"year\">{{ year }}</option>\n            </select>\n        </div>\n        <div class=\"select-container\">\n            <div class=\"label-month\">Month MM</div>\n            <label for=\"month\" class=\"sr-only\">Month:</label>\n            <select id=\"month\" aria-label=\"Select a month\" [formControlName]=\"id + '_monthControl'\" class=\"date-input\">\n                <option *ngFor=\"let month of months\" [value]=\"month\">{{ month }}</option>\n            </select>\n        </div>\n        <div class=\"select-container\">\n            <div class=\"label-day\">Day DD</div>\n            <label for=\"day\" class=\"sr-only\">Day:</label>\n            <select id=\"day\" aria-label=\"Select a day\" [formControlName]=\"id + '_dayControl'\" class=\"date-input\">\n                <option *ngFor=\"let day of days\" [value]=\"day\">{{ day }}</option>\n            </select>\n        </div>\n    </form>\n</div>", styles: [".date-title{margin-top:4px}.date-form{display:flex;flex-wrap:nowrap;align-items:center;justify-content:space-between}.date-form .label{text-align:left}.date-form .date-input{height:40px;border-radius:4px;flex:1;min-width:120px}\n"] }]
        }], ctorParameters: function () { return [{ type: i2.FormBuilder }]; }, propDecorators: { title: [{
                type: Input
            }], dateForm: [{
                type: Input
            }], id: [{
                type: Input
            }] } });

class LanguageSwitchButtonService {
    constructor() {
        this.languageClickSub = new BehaviorSubject('');
        this.languageClickObs$ = this.languageClickSub.asObservable();
    }
    languageToggleClick() {
        this.languageClickSub.next(true);
    }
}
LanguageSwitchButtonService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: LanguageSwitchButtonService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
LanguageSwitchButtonService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: LanguageSwitchButtonService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: LanguageSwitchButtonService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class LanguageSwitchComponent {
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
LanguageSwitchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: LanguageSwitchComponent, deps: [{ token: PLATFORM_ID }, { token: LanguageSwitchButtonService }], target: i0.ɵɵFactoryTarget.Component });
LanguageSwitchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: LanguageSwitchComponent, selector: "lib-language-switch", inputs: { id: "id" }, host: { listeners: { "window:resize": "handleResize($event)" } }, ngImport: i0, template: "<button category=\"plain\" [id]=\"id\"  attr.aria-label=\"{{'LANGUAGE_SELECTION_ARIA_LABEL' | translate}}\" (click)=\"switch()\" id=\"language-toggle\">{{ (!isMobile ? 'OPPOSITE_LANGUAGE' : 'OPPOSITE_LANGUAGE_MOBILE') | translate }}</button>\n", styles: [""], dependencies: [{ kind: "pipe", type: i3.TranslatePipe, name: "translate" }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: LanguageSwitchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-language-switch', template: "<button category=\"plain\" [id]=\"id\"  attr.aria-label=\"{{'LANGUAGE_SELECTION_ARIA_LABEL' | translate}}\" (click)=\"switch()\" id=\"language-toggle\">{{ (!isMobile ? 'OPPOSITE_LANGUAGE' : 'OPPOSITE_LANGUAGE_MOBILE') | translate }}</button>\n" }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: LanguageSwitchButtonService }]; }, propDecorators: { id: [{
                type: Input
            }], handleResize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });

class HeaderComponent {
    constructor() {
        this.id = '';
    }
}
HeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: HeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
HeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: HeaderComponent, selector: "lib-header", inputs: { id: "id" }, ngImport: i0, template: "<!-- <header class=\"heading\">\n    <div class=\"grid-container\">\n        <picture>\n            <source srcset=\"assets/images/canada_govt_logo_dark.svg\" media=\"(prefers-color-scheme: dark)\">\n            <img src=\"assets/images/canada_govt_logo_light.svg\">\n        </picture>\n        <div class=\"item2\"><ng-content></ng-content></div>\n    </div>\n    <hr class=\"headerLine\"/>\n</header> -->\n\n<header class=\"heading\">\n    <div class=\"grid-container\" [id]=\"id\">\n        <picture>\n            <!-- <source srcset=\"../../assets/images/goc-flag.png\" media=\"(prefers-color-scheme: dark)\"> -->\n            <img src=\"./assets/images/goc-flag.png\">\n        </picture>\n        <picture class=\"gocText\">\n          <source srcset=\"../../assets/images/goc-text.png\" media=\"(prefers-color-scheme: dark)\">\n          <img src=\"../../assets/images/goc-text.png\">\n        </picture>\n        <div class=\"item2\"><ng-content></ng-content></div>\n        <div class=\"languageSwitch\">\n            <lib-language-switch [id]=\"id + '_langToggle'\"></lib-language-switch>\n        </div>\n    </div>\n    <hr class=\"headerLine\"/>\n  </header>", styles: [".panel-3-column,.panel-3-column-margins,.panel-2-column,.panel-2-column-margins,.panel-1-column,.panel-1-column-margins,.content-area-responsive,.header-area-responsive,.header-area-responsive-margins,.content-area-responsive-margins{column-gap:20px}@media only screen and (min-width: 0) and (max-width: 360px){.panel-3-column-margins,.panel-2-column-margins,.panel-1-column-margins,.content-area-responsive-margins,.header-area-responsive-margins{margin-left:16px;margin-right:16px}}@media only screen and (min-width: 360px) and (max-width: 768px){.panel-3-column-margins,.panel-2-column-margins,.panel-1-column-margins,.content-area-responsive-margins,.header-area-responsive-margins{margin-left:40px;margin-right:40px}}@media only screen and (min-width: 768px){.panel-3-column-margins,.panel-2-column-margins,.panel-1-column-margins,.content-area-responsive-margins,.header-area-responsive-margins{margin-left:20px;margin-right:20px}}.content-area-responsive,.header-area-responsive,.header-area-responsive-margins,.content-area-responsive-margins{display:flex;flex-wrap:wrap;justify-content:center;align-items:baseline}.panel-3-column,.panel-3-column-margins,.panel-2-column,.panel-2-column-margins,.panel-1-column,.panel-1-column-margins{display:grid;justify-items:center;justify-tracks:center}.panel-3-column>*,.panel-3-column-margins>*,.panel-2-column>*,.panel-2-column-margins>*,.panel-1-column>*,.panel-1-column-margins>*{grid-column:auto/span 1}.header-area-responsive,.header-area-responsive-margins{grid-column:first/last;grid-row:first/2}.panel-1-column,.panel-1-column-margins{grid-template-columns:[first premier f p] repeat(1,minmax(auto,1fr)) [last dernier l d]}.panel-2-column,.panel-2-column-margins{grid-template-columns:[first premier f p] repeat(2,minmax(auto,1fr)) [last dernier l d]}.panel-3-column,.panel-3-column-margins{grid-template-columns:[first premier f p] repeat(3,minmax(auto,1fr)) [last dernier l d]}.heading{padding-top:8px}.headerLine{--global-divider: #102242;color:var(--global-divider);width:100%;border-width:2px;border-style:solid;margin-top:24px}.grid-container{display:grid;grid-template-columns:[first premier f p] max-content auto [last dernier l d];grid-template-rows:[first premier f p] auto [last dernier l d];align-items:center}.grid-container *{grid-column:auto/span 1}.grid-container img{min-width:295px}.item2,.languageSwitch{justify-self:end}\n"], dependencies: [{ kind: "component", type: LanguageSwitchComponent, selector: "lib-language-switch", inputs: ["id"] }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: HeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-header', template: "<!-- <header class=\"heading\">\n    <div class=\"grid-container\">\n        <picture>\n            <source srcset=\"assets/images/canada_govt_logo_dark.svg\" media=\"(prefers-color-scheme: dark)\">\n            <img src=\"assets/images/canada_govt_logo_light.svg\">\n        </picture>\n        <div class=\"item2\"><ng-content></ng-content></div>\n    </div>\n    <hr class=\"headerLine\"/>\n</header> -->\n\n<header class=\"heading\">\n    <div class=\"grid-container\" [id]=\"id\">\n        <picture>\n            <!-- <source srcset=\"../../assets/images/goc-flag.png\" media=\"(prefers-color-scheme: dark)\"> -->\n            <img src=\"./assets/images/goc-flag.png\">\n        </picture>\n        <picture class=\"gocText\">\n          <source srcset=\"../../assets/images/goc-text.png\" media=\"(prefers-color-scheme: dark)\">\n          <img src=\"../../assets/images/goc-text.png\">\n        </picture>\n        <div class=\"item2\"><ng-content></ng-content></div>\n        <div class=\"languageSwitch\">\n            <lib-language-switch [id]=\"id + '_langToggle'\"></lib-language-switch>\n        </div>\n    </div>\n    <hr class=\"headerLine\"/>\n  </header>", styles: [".panel-3-column,.panel-3-column-margins,.panel-2-column,.panel-2-column-margins,.panel-1-column,.panel-1-column-margins,.content-area-responsive,.header-area-responsive,.header-area-responsive-margins,.content-area-responsive-margins{column-gap:20px}@media only screen and (min-width: 0) and (max-width: 360px){.panel-3-column-margins,.panel-2-column-margins,.panel-1-column-margins,.content-area-responsive-margins,.header-area-responsive-margins{margin-left:16px;margin-right:16px}}@media only screen and (min-width: 360px) and (max-width: 768px){.panel-3-column-margins,.panel-2-column-margins,.panel-1-column-margins,.content-area-responsive-margins,.header-area-responsive-margins{margin-left:40px;margin-right:40px}}@media only screen and (min-width: 768px){.panel-3-column-margins,.panel-2-column-margins,.panel-1-column-margins,.content-area-responsive-margins,.header-area-responsive-margins{margin-left:20px;margin-right:20px}}.content-area-responsive,.header-area-responsive,.header-area-responsive-margins,.content-area-responsive-margins{display:flex;flex-wrap:wrap;justify-content:center;align-items:baseline}.panel-3-column,.panel-3-column-margins,.panel-2-column,.panel-2-column-margins,.panel-1-column,.panel-1-column-margins{display:grid;justify-items:center;justify-tracks:center}.panel-3-column>*,.panel-3-column-margins>*,.panel-2-column>*,.panel-2-column-margins>*,.panel-1-column>*,.panel-1-column-margins>*{grid-column:auto/span 1}.header-area-responsive,.header-area-responsive-margins{grid-column:first/last;grid-row:first/2}.panel-1-column,.panel-1-column-margins{grid-template-columns:[first premier f p] repeat(1,minmax(auto,1fr)) [last dernier l d]}.panel-2-column,.panel-2-column-margins{grid-template-columns:[first premier f p] repeat(2,minmax(auto,1fr)) [last dernier l d]}.panel-3-column,.panel-3-column-margins{grid-template-columns:[first premier f p] repeat(3,minmax(auto,1fr)) [last dernier l d]}.heading{padding-top:8px}.headerLine{--global-divider: #102242;color:var(--global-divider);width:100%;border-width:2px;border-style:solid;margin-top:24px}.grid-container{display:grid;grid-template-columns:[first premier f p] max-content auto [last dernier l d];grid-template-rows:[first premier f p] auto [last dernier l d];align-items:center}.grid-container *{grid-column:auto/span 1}.grid-container img{min-width:295px}.item2,.languageSwitch{justify-self:end}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }] } });

class FooterComponent {
}
FooterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: FooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
FooterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: FooterComponent, selector: "lib-footer", ngImport: i0, template: "<footer class=\"footing\">\n    <div class=\"grid-container\">\n        <div class=\"item1 body3\">\n            <ng-content></ng-content>\n        </div>\n        <picture class=\"item2\">\n            <source srcset=\"assets/canada_logo_dark.svg\" media=\"(prefers-color-scheme: dark)\">\n            <img src=\"assets/canada_logo_light.svg\">\n        </picture>\n    </div>\n</footer>", styles: [".panel-3-column,.panel-3-column-margins,.panel-2-column,.panel-2-column-margins,.panel-1-column,.panel-1-column-margins,.content-area-responsive,.header-area-responsive,.header-area-responsive-margins,.content-area-responsive-margins{column-gap:20px}@media only screen and (min-width: 0) and (max-width: 360px){.panel-3-column-margins,.panel-2-column-margins,.panel-1-column-margins,.content-area-responsive-margins,.header-area-responsive-margins{margin-left:16px;margin-right:16px}}@media only screen and (min-width: 360px) and (max-width: 768px){.panel-3-column-margins,.panel-2-column-margins,.panel-1-column-margins,.content-area-responsive-margins,.header-area-responsive-margins{margin-left:40px;margin-right:40px}}@media only screen and (min-width: 768px){.panel-3-column-margins,.panel-2-column-margins,.panel-1-column-margins,.content-area-responsive-margins,.header-area-responsive-margins{margin-left:20px;margin-right:20px}}.content-area-responsive,.header-area-responsive,.header-area-responsive-margins,.content-area-responsive-margins{display:flex;flex-wrap:wrap;justify-content:center;align-items:baseline}.panel-3-column,.panel-3-column-margins,.panel-2-column,.panel-2-column-margins,.panel-1-column,.panel-1-column-margins{display:grid;justify-items:center;justify-tracks:center}.panel-3-column>*,.panel-3-column-margins>*,.panel-2-column>*,.panel-2-column-margins>*,.panel-1-column>*,.panel-1-column-margins>*{grid-column:auto/span 1}.header-area-responsive,.header-area-responsive-margins{grid-column:first/last;grid-row:first/2}.panel-1-column,.panel-1-column-margins{grid-template-columns:[first premier f p] repeat(1,minmax(auto,1fr)) [last dernier l d]}.panel-2-column,.panel-2-column-margins{grid-template-columns:[first premier f p] repeat(2,minmax(auto,1fr)) [last dernier l d]}.panel-3-column,.panel-3-column-margins{grid-template-columns:[first premier f p] repeat(3,minmax(auto,1fr)) [last dernier l d]}.footing{margin-top:16px;margin-bottom:16px}.grid-container{display:grid;grid-template-columns:[first premier f p] max-content auto [last dernier l d];grid-template-rows:[first premier f p] auto [last dernier l d];align-items:center}.grid-container *{grid-column:auto/span 1}.item1{align-self:center}@media only screen and (min-width: 0) and (max-width: 360px){.item1{margin-left:36px}}.item2{justify-self:end;align-self:center}\n"], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: FooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-footer', template: "<footer class=\"footing\">\n    <div class=\"grid-container\">\n        <div class=\"item1 body3\">\n            <ng-content></ng-content>\n        </div>\n        <picture class=\"item2\">\n            <source srcset=\"assets/canada_logo_dark.svg\" media=\"(prefers-color-scheme: dark)\">\n            <img src=\"assets/canada_logo_light.svg\">\n        </picture>\n    </div>\n</footer>", styles: [".panel-3-column,.panel-3-column-margins,.panel-2-column,.panel-2-column-margins,.panel-1-column,.panel-1-column-margins,.content-area-responsive,.header-area-responsive,.header-area-responsive-margins,.content-area-responsive-margins{column-gap:20px}@media only screen and (min-width: 0) and (max-width: 360px){.panel-3-column-margins,.panel-2-column-margins,.panel-1-column-margins,.content-area-responsive-margins,.header-area-responsive-margins{margin-left:16px;margin-right:16px}}@media only screen and (min-width: 360px) and (max-width: 768px){.panel-3-column-margins,.panel-2-column-margins,.panel-1-column-margins,.content-area-responsive-margins,.header-area-responsive-margins{margin-left:40px;margin-right:40px}}@media only screen and (min-width: 768px){.panel-3-column-margins,.panel-2-column-margins,.panel-1-column-margins,.content-area-responsive-margins,.header-area-responsive-margins{margin-left:20px;margin-right:20px}}.content-area-responsive,.header-area-responsive,.header-area-responsive-margins,.content-area-responsive-margins{display:flex;flex-wrap:wrap;justify-content:center;align-items:baseline}.panel-3-column,.panel-3-column-margins,.panel-2-column,.panel-2-column-margins,.panel-1-column,.panel-1-column-margins{display:grid;justify-items:center;justify-tracks:center}.panel-3-column>*,.panel-3-column-margins>*,.panel-2-column>*,.panel-2-column-margins>*,.panel-1-column>*,.panel-1-column-margins>*{grid-column:auto/span 1}.header-area-responsive,.header-area-responsive-margins{grid-column:first/last;grid-row:first/2}.panel-1-column,.panel-1-column-margins{grid-template-columns:[first premier f p] repeat(1,minmax(auto,1fr)) [last dernier l d]}.panel-2-column,.panel-2-column-margins{grid-template-columns:[first premier f p] repeat(2,minmax(auto,1fr)) [last dernier l d]}.panel-3-column,.panel-3-column-margins{grid-template-columns:[first premier f p] repeat(3,minmax(auto,1fr)) [last dernier l d]}.footing{margin-top:16px;margin-bottom:16px}.grid-container{display:grid;grid-template-columns:[first premier f p] max-content auto [last dernier l d];grid-template-rows:[first premier f p] auto [last dernier l d];align-items:center}.grid-container *{grid-column:auto/span 1}.item1{align-self:center}@media only screen and (min-width: 0) and (max-width: 360px){.item1{margin-left:36px}}.item2{justify-self:end;align-self:center}\n"] }]
        }] });

const FONT_FAMILIES = {
    ['fa-solid']: null,
    ['fa-thin']: null,
    ['fa-light']: null,
    ['fa-regular']: null,
    ['fa-brands']: null,
};
class IconComponent {
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

var ButtonCategories;
(function (ButtonCategories) {
    ButtonCategories["primary"] = "primary";
    ButtonCategories["secondary"] = "secondary";
    ButtonCategories["plain"] = "plain";
})(ButtonCategories || (ButtonCategories = {}));
;
var ButtonSize;
(function (ButtonSize) {
    ButtonSize["small"] = "small";
    ButtonSize["large"] = "large";
})(ButtonSize || (ButtonSize = {}));
;
var ButtonColor;
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
var ButtonIconDirection;
(function (ButtonIconDirection) {
    ButtonIconDirection["left"] = "left";
    ButtonIconDirection["right"] = "right";
})(ButtonIconDirection || (ButtonIconDirection = {}));
;
;
class ButtonComponent {
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
ButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: ButtonComponent, selector: "lib-button", inputs: { config: "config", id: "id", category: "category", size: "size", color: "color", ariaLabel: "ariaLabel", disabled: "disabled", icon: "icon", iconDirection: "iconDirection" }, outputs: { click: "click" }, ngImport: i0, template: "<button\n    [attr.aria-label]=\"config.ariaLabel\"\n    [attr.color]=\"config.color\"\n    [attr.category]=\"config.category\"\n    [attr.size]=\"config.size\"\n    [disabled]=\"config.disabled\"\n    [ngClass]=\"config.iconDirection === 'right' ? 'icon-right' : ''\"\n    (click)=\"buttonClick(config.id)\"\n>\n<div class=\"icon\">\n    <lib-icon *ngIf=\"icon != ''\" [class]=\"icon\"></lib-icon>\n</div>\n    <ng-content></ng-content>\n</button>\n", styles: ["button{display:flex;flex-direction:row;justify-content:space-between;gap:.75rem}button.icon-right{flex-direction:row-reverse}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: IconComponent, selector: "lib-icon", inputs: ["iconConfig"] }], preserveWhitespaces: true });
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

var IconButtonCategories;
(function (IconButtonCategories) {
    IconButtonCategories["primary"] = "primary";
    IconButtonCategories["critical"] = "critical";
    IconButtonCategories["custom"] = "custom";
})(IconButtonCategories || (IconButtonCategories = {}));
class IconButtonComponent {
    constructor() { }
    ngOnInit() {
    }
}
IconButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: IconButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
IconButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: IconButtonComponent, selector: "lib-icon-button", ngImport: i0, template: "<p>icon-button works!</p>\n<lib-icon></lib-icon>", dependencies: [{ kind: "component", type: IconComponent, selector: "lib-icon", inputs: ["iconConfig"] }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: IconButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-icon-button', template: "<p>icon-button works!</p>\n<lib-icon></lib-icon>" }]
        }], ctorParameters: function () { return []; } });

class IrccDsAngularComponentLibraryModule {
}
IrccDsAngularComponentLibraryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: IrccDsAngularComponentLibraryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
IrccDsAngularComponentLibraryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.3", ngImport: i0, type: IrccDsAngularComponentLibraryModule, declarations: [IrccDsAngularComponentLibraryComponent,
        JLCheckboxComponent,
        JLDropdownComponent,
        JlChipItemComponent,
        JlChipListComponent,
        JlSecondaryChipsComponent,
        JLInputComponent,
        JLAutocompleteComponent,
        JLBannerComponent,
        RadioInputComponent,
        DropdownInputComponent,
        DatePickerComponent,
        HeaderComponent,
        FooterComponent,
        ButtonComponent,
        IconComponent,
        IconButtonComponent,
        LanguageSwitchComponent], imports: [CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule], exports: [IrccDsAngularComponentLibraryComponent,
        JLCheckboxComponent,
        JLDropdownComponent,
        JlChipItemComponent,
        JlChipListComponent,
        JlSecondaryChipsComponent,
        JLInputComponent,
        JLAutocompleteComponent,
        JLBannerComponent,
        RadioInputComponent,
        DropdownInputComponent,
        DatePickerComponent,
        HeaderComponent,
        FooterComponent,
        ButtonComponent,
        IconComponent,
        IconButtonComponent,
        LanguageSwitchComponent] });
IrccDsAngularComponentLibraryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: IrccDsAngularComponentLibraryModule, imports: [CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: IrccDsAngularComponentLibraryModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        IrccDsAngularComponentLibraryComponent,
                        JLCheckboxComponent,
                        JLDropdownComponent,
                        JlChipItemComponent,
                        JlChipListComponent,
                        JlSecondaryChipsComponent,
                        JLInputComponent,
                        JLAutocompleteComponent,
                        JLBannerComponent,
                        RadioInputComponent,
                        DropdownInputComponent,
                        DatePickerComponent,
                        HeaderComponent,
                        FooterComponent,
                        ButtonComponent,
                        IconComponent,
                        IconButtonComponent,
                        LanguageSwitchComponent,
                    ],
                    imports: [
                        CommonModule,
                        TranslateModule,
                        FormsModule,
                        ReactiveFormsModule
                    ],
                    exports: [
                        IrccDsAngularComponentLibraryComponent,
                        JLCheckboxComponent,
                        JLDropdownComponent,
                        JlChipItemComponent,
                        JlChipListComponent,
                        JlSecondaryChipsComponent,
                        JLInputComponent,
                        JLAutocompleteComponent,
                        JLBannerComponent,
                        RadioInputComponent,
                        DropdownInputComponent,
                        DatePickerComponent,
                        HeaderComponent,
                        FooterComponent,
                        ButtonComponent,
                        IconComponent,
                        IconButtonComponent,
                        LanguageSwitchComponent,
                    ]
                }]
        }] });

/*
 * Public API Surface of ircc-ds-angular-component-library
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ButtonCategories, ButtonColor, ButtonComponent, ButtonIconDirection, ButtonSize, DSSizes, DatePickerComponent, DropDownActions, DropdownInputComponent, DropdownTypes, FONT_FAMILIES, FooterComponent, HeaderComponent, IconButtonCategories, IconButtonComponent, IconComponent, InputTypes, IrccDsAngularComponentLibraryComponent, IrccDsAngularComponentLibraryModule, IrccDsAngularComponentLibraryService, JLAutocompleteComponent, JLBannerComponent, JLCheckboxComponent, JLDropdownComponent, JLInputComponent, JlChipItemComponent, JlChipListComponent, JlSecondaryChipsComponent, LanguageSwitchButtonService, LanguageSwitchComponent, RadioInputComponent };
//# sourceMappingURL=ircc-ds-angular-component-library.mjs.map
