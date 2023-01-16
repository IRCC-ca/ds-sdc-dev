/**
 * TODO: This particular component, while functional, is not ideal. Components should not import other components directly in the .ts
 * unless absolutely necessary. Furthermore, the use of DoCheck, while interesting, is not ideal, since it ignores the built-in
 * angular lifecycle hooks and change detection.
 */
import { Component, HostListener, Input, Output, EventEmitter, ViewChild } from '@angular/core';
//TODO: This should be changed. Ideally the component doesn't need to know about these, and can just
//add them in using the template.
import { JLInputComponent } from '../jl-input/jl-input.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../jl-chips/jl-chip-item/jl-chip-item.component";
import * as i3 from "@ngx-translate/core";
export class JLAutocompleteComponent {
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
JLAutocompleteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: JLAutocompleteComponent, selector: "jl-pr-sclp-autocomplete", inputs: { options: "options", title: "title", hintText: "hintText", name: "name", error: "error", limit: "limit", savedSelectedOptions: "savedSelectedOptions" }, outputs: { selectValueChange: "selectValueChange" }, host: { listeners: { "window:keydown.escape": "handleKeyDown($event)", "click": "clickInside($event)", "document:click": "clickout()" } }, viewQueries: [{ propertyName: "inputComponent", first: true, predicate: JLInputComponent, descendants: true, static: true }], ngImport: i0, template: "<div class=\"autocomplete-container\" [ngClass]=\"{ error: error }\">\n  <div>\n    <!-- <jl-pr-sclp-input\n      [label]=\"title\"\n      [hintText]=\"hintText\"\n      [placeholder]=\"'+ ' + (name | translate)\"\n      [error]=\"error\"\n      (valueChange)=\"valueChange($event)\"\n    > -->\n      <jl-pr-sclp-jl-chip-item\n        *ngFor=\"let option of selectedOptions; let index = index\"\n        [chipContent]=\"option['text']\"\n        (iconClickEvent)=\"removeChipItem(index)\"\n      ></jl-pr-sclp-jl-chip-item\n    >\n  <!-- </jl-pr-sclp-input> -->\n  </div>\n\n  <div\n    class=\"autocomplete-options\"\n    [ngClass]=\"hideDropdown === false ? '' : 'hide'\"\n    (mouseenter)=\"onMouseEnter()\"\n  >\n    <div\n      *ngIf=\"limit === 0\" \n      class=\"option autocomplete-target all-results\"\n      (click)=\"selectAll()\"\n      [tabindex]=\"0\"\n      [ngClass]=\"emptyResults === false ? '' : 'hide-option'\"\n    >\n      <p class=\"select-target\">{{ 'AllOptionsForAutocomplete' | translate}} {{ title | translate }}s</p>\n    </div>\n    <div\n      class=\"option autocomplete-target\"\n      *ngFor=\"let option of options; let index = index; first as isFirst\"\n      (click)=\"selectIndex(index)\"\n      [tabindex]=\"index + 1\"\n      [ngClass]=\"checkActive(option['value']) ? 'active' : ''\"\n    >\n      <p class=\"select-target\">{{ option['text'] }}</p>\n    </div>\n    <div\n      class=\"option autocomplete-target\"\n      [ngClass]=\"emptyResults === false ? 'hide-option' : ''\"\n    >\n      <p>{{ 'NoResults' | translate }}</p>\n    </div>\n  </div>\n</div>\n", styles: [".gray-bg{background:#f5f5f5}.dark-gray-bg{background:#d9d9d9}:host ::ng-deep .input-content-area{border-radius:4px;border:1px solid #b2b2b4;display:inline-flex;flex-wrap:wrap;row-gap:16px;padding:10px 12px}:host ::ng-deep .input-content-area:focus-visible{outline:none}:host ::ng-deep .input-content-area.active{background-color:#59595a1f}:host ::ng-deep jl-pr-sclp-jl-chip-item{display:inline-block;margin-right:8px}:host ::ng-deep jl-pr-sclp-input .input{display:inline-block;width:100%;border:none!important;flex:1;padding:0!important;padding-left:12px;min-width:100px!important}:host ::ng-deep jl-pr-sclp-input .input:focus{outline:none!important}:host ::ng-deep jl-pr-sclp-input .input:hover{background-color:transparent!important}:host ::ng-deep jl-pr-sclp-input .input.active{background-color:transparent!important}:host ::ng-deep jl-pr-sclp-input label{font-weight:700;margin-bottom:8px!important}:host ::ng-deep jl-pr-sclp-input .hint-text{margin-bottom:4px!important;font-weight:400;font-size:14px;color:#6f6f71}.autocomplete-container{position:relative;-webkit-user-select:none;user-select:none}.autocomplete-container label{font-weight:700!important}.autocomplete-container .autocomplete-options{background:#ffffff;font-size:14px;line-height:20px;color:#161617;font-family:Inter,sans-serif!important;border-radius:4px;border:1px solid #b2b2b4;z-index:2;width:auto;margin-top:9px;box-shadow:0 8px 20px #0000001a;max-height:200px;overflow-y:scroll;position:absolute;width:100%}.autocomplete-container .autocomplete-options::-webkit-scrollbar{width:5px}.autocomplete-container .autocomplete-options::-webkit-scrollbar-track{background:#ffffff}.autocomplete-container .autocomplete-options::-webkit-scrollbar-thumb{background-color:#9c9c9d;border-radius:20px;border:3px solid #9c9c9d;margin-right:5px}.autocomplete-container .autocomplete-options::-webkit-scrollbar-track{box-shadow:inset 0 0 10px 10px green;border:solid 3px transparent}.autocomplete-container .autocomplete-options.hide{display:none}.autocomplete-container .autocomplete-options .option{margin:8px 0;width:100%;padding:10px 12px;display:grid;grid-template-areas:\"options\";align-items:center}.autocomplete-container .autocomplete-options .option.hide-option{display:none}.autocomplete-container .autocomplete-options .option.active:after{grid-area:options;justify-self:end;content:\"\";height:16px;width:14px;pointer-events:none;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIiA/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgd2lkdGg9IjY0MCIgaGVpZ2h0PSI0ODAiIHZpZXdCb3g9IjAgMCA2NDAgNDgwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGRlc2M+Q3JlYXRlZCB3aXRoIEZhYnJpYy5qcyAzLjYuMzwvZGVzYz4KPGRlZnM+CjwvZGVmcz4KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS40MyAwIDAgMS40MyAzMjAuMTYgMjM4Ljg3KSIgID4KPHBhdGggc3R5bGU9InN0cm9rZTogbm9uZTsgc3Ryb2tlLXdpZHRoOiAxOyBzdHJva2UtZGFzaGFycmF5OiBub25lOyBzdHJva2UtbGluZWNhcDogYnV0dDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDA7IHN0cm9rZS1saW5lam9pbjogbWl0ZXI7IHN0cm9rZS1taXRlcmxpbWl0OiA0OyBmaWxsOiByZ2IoNzMsMTE2LDI0NSk7IGZpbGwtcnVsZTogbm9uemVybzsgb3BhY2l0eTogMTsiICB0cmFuc2Zvcm09IiB0cmFuc2xhdGUoLTI1NS45NSwgLTI1Ni4wNSkiIGQ9Ik0gNDcwLjYgMTA1LjQgYyAxMi41IDEyLjUgMTIuNSAzMi44IDAgNDUuMyBsIC0yNTYgMjU2IGMgLTEyLjUgMTIuNSAtMzIuOCAxMi41IC00NS4zIDAgbCAtMTI4IC0xMjggYyAtMTIuNSAtMTIuNSAtMTIuNSAtMzIuOCAwIC00NS4zIHMgMzIuOCAtMTIuNSA0NS4zIDAgTCAxOTIgMzM4LjcgTCA0MjUuNCAxMDUuNCBjIDEyLjUgLTEyLjUgMzIuOCAtMTIuNSA0NS4zIDAgeiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgo8L2c+Cjwvc3ZnPg==);background-repeat:no-repeat;background-position:center center;background-size:100%}.autocomplete-container .autocomplete-options .option:hover,.autocomplete-container .autocomplete-options .option.hoverFirst{background-color:#59595a0f;cursor:pointer}.autocomplete-container .autocomplete-options .option:focus{outline:none}.autocomplete-container .autocomplete-options .option p{grid-area:options;margin:0;padding-right:30px;color:#161617;font-family:Inter,sans-serif!important}.autocomplete-container.large .selected,.autocomplete-container.large .autocomplete-options{font-size:16px;padding:14px 12px}.autocomplete-container.error .selected{border-color:#ab2225;background:#faedee}.autocomplete-container.error .selected:hover{border-color:#931c1f}.autocomplete-container.error .selected:focus-visible{outline:solid 3px hsl(225deg,90%,62%)}.autocomplete-container.error .selected.active{border-color:#931c1f;background-color:ircc-ca-error-active}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.JlChipItemComponent, selector: "jl-pr-sclp-jl-chip-item", inputs: ["chipContent"], outputs: ["iconClickEvent"] }, { kind: "pipe", type: i3.TranslatePipe, name: "translate" }], preserveWhitespaces: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamwtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudC1saWIvc3JjL2xpYi9qbC1hdXRvY29tcGxldGUvamwtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudC1saWIvc3JjL2xpYi9qbC1hdXRvY29tcGxldGUvamwtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFJWixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsb0dBQW9HO0FBQ3BHLGlDQUFpQztBQUNqQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7QUFhbEUsTUFBTSxPQUFPLHVCQUF1QjtJQXdCbEMsWUFBb0IsT0FBd0I7UUFBeEIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFwQjVDLCtCQUErQjtRQUN0QixZQUFPLEdBQWMsRUFBRSxDQUFDO1FBQ3hCLFVBQUssR0FBRyxPQUFPLENBQUM7UUFDaEIsYUFBUSxHQUFHLFdBQVcsQ0FBQztRQUN2QixTQUFJLEdBQUcsVUFBVSxDQUFDO1FBQ2xCLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1Qsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4Qyx5QkFBb0IsR0FBYyxFQUFFLENBQUM7UUFFOUMsb0JBQWUsR0FBYyxFQUFFLENBQUM7UUFDaEMsb0JBQWUsR0FBYyxFQUFFLENBQUM7UUFFaEMsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsMkJBQXNCLEdBQUcsS0FBSyxDQUFDO1FBQy9CLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUMzQixhQUFR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cnRpY3VsYXIgY29tcG9uZW50LCB3aGlsZSBmdW5jdGlvbmFsLCBpcyBub3QgaWRlYWwuIENvbXBvbmVudHMgc2hvdWxkIG5vdCBpbXBvcnQgb3RoZXIgY29tcG9uZW50cyBkaXJlY3RseSBpbiB0aGUgLnRzXG4gKiB1bmxlc3MgYWJzb2x1dGVseSBuZWNlc3NhcnkuIEZ1cnRoZXJtb3JlLCB0aGUgdXNlIG9mIERvQ2hlY2ssIHdoaWxlIGludGVyZXN0aW5nLCBpcyBub3QgaWRlYWwsIHNpbmNlIGl0IGlnbm9yZXMgdGhlIGJ1aWx0LWluXG4gKiBhbmd1bGFyIGxpZmVjeWNsZSBob29rcyBhbmQgY2hhbmdlIGRldGVjdGlvbi4gXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBEb0NoZWNrLFxuICBLZXlWYWx1ZURpZmZlcnMsXG4gIEtleVZhbHVlRGlmZmVyLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vL1RPRE86IFRoaXMgc2hvdWxkIGJlIGNoYW5nZWQuIElkZWFsbHkgdGhlIGNvbXBvbmVudCBkb2Vzbid0IG5lZWQgdG8ga25vdyBhYm91dCB0aGVzZSwgYW5kIGNhbiBqdXN0XG4vL2FkZCB0aGVtIGluIHVzaW5nIHRoZSB0ZW1wbGF0ZS5cbmltcG9ydCB7IEpMSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi9qbC1pbnB1dC9qbC1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSmxDaGlwSXRlbUNvbXBvbmVudCB9IGZyb20gJy4uL2psLWNoaXBzL2psLWNoaXAtaXRlbS9qbC1jaGlwLWl0ZW0uY29tcG9uZW50JztcblxuaW50ZXJmYWNlIElPcHRpb24geyAvL0NoYW5nZWQ6IEludGVyZmFjZXMgc2hvdWxkIEFMV0FZUyBzdGFydCB3aXRoICdJJy5cbiAgdGV4dDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdqbC1wci1zY2xwLWF1dG9jb21wbGV0ZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9qbC1hdXRvY29tcGxldGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9qbC1hdXRvY29tcGxldGUuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEpMQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrIHtcbiAgQFZpZXdDaGlsZChKTElucHV0Q29tcG9uZW50LCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBpbnB1dENvbXBvbmVudD86IEpMSW5wdXRDb21wb25lbnQ7XG5cbiAgLy9UT0RPOiBDaGFuZ2UgdGhpcyB0byBhIGNvbmZpZ1xuICBASW5wdXQoKSBvcHRpb25zOiBJT3B0aW9uW10gPSBbXTtcbiAgQElucHV0KCkgdGl0bGUgPSBgVGl0bGVgO1xuICBASW5wdXQoKSBoaW50VGV4dCA9IGBIaW50IFRleHRgO1xuICBASW5wdXQoKSBuYW1lID0gYEFkZCBOYW1lYDtcbiAgQElucHV0KCkgZXJyb3IgPSBmYWxzZTtcbiAgQElucHV0KCkgbGltaXQgPSAwO1xuICBAT3V0cHV0KCkgc2VsZWN0VmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgpIHNhdmVkU2VsZWN0ZWRPcHRpb25zOiBJT3B0aW9uW10gPSBbXTtcblxuICBzZWxlY3RlZE9wdGlvbnM6IElPcHRpb25bXSA9IFtdO1xuICBvcmlnaW5hbE9wdGlvbnM6IElPcHRpb25bXSA9IFtdO1xuICBpbnB1dFZhbHVlPzogc3RyaW5nO1xuICBoaWRlRHJvcGRvd24gPSB0cnVlO1xuICBpc0ZvY3VzSW5zaWRlQ29tcG9uZW50ID0gZmFsc2U7XG4gIGlzQ29tcG9uZW50Q2xpY2tlZCA9IGZhbHNlO1xuICBhZGRIb3ZlciA9IGZhbHNlO1xuICBlbXB0eVJlc3VsdHMgPSBmYWxzZTtcblxuICBkaWZmZXI6IEtleVZhbHVlRGlmZmVyPHN0cmluZywgYW55PjtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMpIHtcbiAgICB0aGlzLmRpZmZlciA9IHRoaXMuZGlmZmVycy5maW5kKHt9KS5jcmVhdGUoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLmVzY2FwZScsIFsnJGV2ZW50J10pXG4gIGhhbmRsZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5oaWRlRHJvcGRvd24gPT09IGZhbHNlIHx8IHRoaXMub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmlucHV0Q29tcG9uZW50Py5jbGVhcnZhbHVlKCk7XG4gICAgICB0aGlzLnJldHVybk9wdGlvbnNUb0RlZmF1bHQoKTtcbiAgICAgIHRoaXMuaXNDb21wb25lbnRDbGlja2VkID0gZmFsc2U7XG4gICAgICB0aGlzLmlzRm9jdXNJbnNpZGVDb21wb25lbnQgPSBmYWxzZTtcbiAgICAgIHRoaXMuaGlkZURyb3Bkb3duID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIGNsaWNrSW5zaWRlKGV2ZW50OiB7IHRhcmdldDogSFRNTElucHV0RWxlbWVudCB9KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIGlmIChcbiAgICAgIHRoaXMuaGlkZURyb3Bkb3duID09PSB0cnVlICYmXG4gICAgICB0YXJnZXQudHlwZSA9PT0gYHRleHRgICYmXG4gICAgICB0aGlzLm9wdGlvbnMubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgdGhpcy5pc0ZvY3VzSW5zaWRlQ29tcG9uZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNDb21wb25lbnRDbGlja2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMudG9nZ2xlRHJvcERvd24oKTtcbiAgICAgIHRoaXMuYWRkSG92ZXIgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3QtdGFyZ2V0JykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoYHNlbGVjdGVkYClcbiAgICApIHtcbiAgICAgIHRoaXMuaXNDb21wb25lbnRDbGlja2VkID0gZmFsc2U7XG4gICAgICB0aGlzLmlzRm9jdXNJbnNpZGVDb21wb25lbnQgPSBmYWxzZTtcbiAgICAgIHRoaXMudG9nZ2xlRHJvcERvd24oKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycpXG4gIGNsaWNrb3V0KCkge1xuICAgIGlmICghdGhpcy5pc0ZvY3VzSW5zaWRlQ29tcG9uZW50ICYmIHRoaXMuaXNDb21wb25lbnRDbGlja2VkKSB7XG4gICAgICB0aGlzLnRvZ2dsZURyb3BEb3duKCk7XG4gICAgICB0aGlzLmlucHV0Q29tcG9uZW50Py5jbGVhcnZhbHVlKCk7XG4gICAgICB0aGlzLnJldHVybk9wdGlvbnNUb0RlZmF1bHQoKTtcbiAgICAgIHRoaXMuaXNDb21wb25lbnRDbGlja2VkID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuaXNGb2N1c0luc2lkZUNvbXBvbmVudCA9IGZhbHNlO1xuICB9XG5cbiAgb25Nb3VzZUVudGVyKCkge1xuICAgIHRoaXMuYWRkSG92ZXIgPSBmYWxzZTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBjb25zdCBjaGFuZ2UgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMpO1xuICAgIGlmIChjaGFuZ2UpIHtcbiAgICAgIGNoYW5nZS5mb3JFYWNoQ2hhbmdlZEl0ZW0oKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW0ua2V5ID09PSBgb3B0aW9uc2ApIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdFZhbHVlQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB2YWx1ZUNoYW5nZShldmVudDogYW55KSB7XG4gICAgdGhpcy5maWx0ZXJMaXN0KGV2ZW50KTtcbiAgfVxuXG4gIGZpbHRlckxpc3QoZmlsdGVyVmFsdWU6IGFueSkge1xuICAgIGlmIChmaWx0ZXJWYWx1ZS5sZW5ndGggPCAxKSB7XG4gICAgICB0aGlzLnJldHVybk9wdGlvbnNUb0RlZmF1bHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsdGVyZWRPcHRpb25zID0gdGhpcy5vcmlnaW5hbE9wdGlvbnMuZmlsdGVyKCh2YWx1ZSkgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWUudGV4dC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGZpbHRlclZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBmaWx0ZXJlZE9wdGlvbnMuc2xpY2UoMCk7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmVtcHR5UmVzdWx0cyA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVtcHR5UmVzdWx0cyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjaGVja0FjdGl2ZSh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgZm9yIChjb25zdCBzZWxlY3RlZE9wdGlvbiBvZiB0aGlzLnNlbGVjdGVkT3B0aW9ucykge1xuICAgICAgaWYgKHNlbGVjdGVkT3B0aW9uLnZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuT3B0aW9uc1RvRGVmYXVsdCgpIHtcbiAgICB0aGlzLmVtcHR5UmVzdWx0cyA9IGZhbHNlO1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub3JpZ2luYWxPcHRpb25zLnNsaWNlKDApO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZURyb3BEb3duKCkge1xuICAgIHRoaXMuaGlkZURyb3Bkb3duID0gIXRoaXMuaGlkZURyb3Bkb3duO1xuICAgIHRoaXMuaW5wdXRDb21wb25lbnQ/LmZvY3VzSW5wdXQodGhpcy5oaWRlRHJvcGRvd24pO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZURyb3BEb3duS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICB0aGlzLnRvZ2dsZURyb3BEb3duKCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQ2hpcEl0ZW0oaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5yZXR1cm5PcHRpb25zVG9EZWZhdWx0KCk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQWxsQ2hpcEl0ZW1zKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gICAgdGhpcy5yZXR1cm5PcHRpb25zVG9EZWZhdWx0KCk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0QWxsKCkge1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMucHVzaChvcHRpb24pO1xuICAgIH1cbiAgICB0aGlzLnJldHVybk9wdGlvbnNUb0RlZmF1bHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMubGltaXQgIT09IDAgJiYgdGhpcy5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoID49IHRoaXMubGltaXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnB1dENvbXBvbmVudD8uY2xlYXJ2YWx1ZSgpO1xuICAgICAgdGhpcy5yZXR1cm5PcHRpb25zVG9EZWZhdWx0KCk7XG4gICAgICBpZiAodGhpcy5jaGVja0R1cGxpY2F0ZWQoaW5kZXgpID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucy5wdXNoKHRoaXMub3B0aW9uc1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNoZWNrRHVwbGljYXRlZChpbmRleDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRPcHRpb25zLnNvbWUoKGVsZW1lbnQ6IHsgdmFsdWU6IHN0cmluZyB9KSA9PiB7XG4gICAgICBpZiAoZWxlbWVudC52YWx1ZSA9PT0gdGhpcy5vcHRpb25zW2luZGV4XS52YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBbXTtcbiAgICB0aGlzLm9yaWdpbmFsT3B0aW9ucyA9IHRoaXMub3B0aW9ucy5zbGljZSgwKTtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IHRoaXMuc2F2ZWRTZWxlY3RlZE9wdGlvbnM7XG4gICAgdGhpcy5zYXZlZFNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuICAgIHRoaXMucmV0dXJuT3B0aW9uc1RvRGVmYXVsdCgpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiYXV0b2NvbXBsZXRlLWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cInsgZXJyb3I6IGVycm9yIH1cIj5cbiAgPGRpdj5cbiAgICA8IS0tIDxqbC1wci1zY2xwLWlucHV0XG4gICAgICBbbGFiZWxdPVwidGl0bGVcIlxuICAgICAgW2hpbnRUZXh0XT1cImhpbnRUZXh0XCJcbiAgICAgIFtwbGFjZWhvbGRlcl09XCInKyAnICsgKG5hbWUgfCB0cmFuc2xhdGUpXCJcbiAgICAgIFtlcnJvcl09XCJlcnJvclwiXG4gICAgICAodmFsdWVDaGFuZ2UpPVwidmFsdWVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgPiAtLT5cbiAgICAgIDxqbC1wci1zY2xwLWpsLWNoaXAtaXRlbVxuICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHNlbGVjdGVkT3B0aW9uczsgbGV0IGluZGV4ID0gaW5kZXhcIlxuICAgICAgICBbY2hpcENvbnRlbnRdPVwib3B0aW9uWyd0ZXh0J11cIlxuICAgICAgICAoaWNvbkNsaWNrRXZlbnQpPVwicmVtb3ZlQ2hpcEl0ZW0oaW5kZXgpXCJcbiAgICAgID48L2psLXByLXNjbHAtamwtY2hpcC1pdGVtXG4gICAgPlxuICA8IS0tIDwvamwtcHItc2NscC1pbnB1dD4gLS0+XG4gIDwvZGl2PlxuXG4gIDxkaXZcbiAgICBjbGFzcz1cImF1dG9jb21wbGV0ZS1vcHRpb25zXCJcbiAgICBbbmdDbGFzc109XCJoaWRlRHJvcGRvd24gPT09IGZhbHNlID8gJycgOiAnaGlkZSdcIlxuICAgIChtb3VzZWVudGVyKT1cIm9uTW91c2VFbnRlcigpXCJcbiAgPlxuICAgIDxkaXZcbiAgICAgICpuZ0lmPVwibGltaXQgPT09IDBcIiBcbiAgICAgIGNsYXNzPVwib3B0aW9uIGF1dG9jb21wbGV0ZS10YXJnZXQgYWxsLXJlc3VsdHNcIlxuICAgICAgKGNsaWNrKT1cInNlbGVjdEFsbCgpXCJcbiAgICAgIFt0YWJpbmRleF09XCIwXCJcbiAgICAgIFtuZ0NsYXNzXT1cImVtcHR5UmVzdWx0cyA9PT0gZmFsc2UgPyAnJyA6ICdoaWRlLW9wdGlvbidcIlxuICAgID5cbiAgICAgIDxwIGNsYXNzPVwic2VsZWN0LXRhcmdldFwiPnt7ICdBbGxPcHRpb25zRm9yQXV0b2NvbXBsZXRlJyB8IHRyYW5zbGF0ZX19IHt7IHRpdGxlIHwgdHJhbnNsYXRlIH19czwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cIm9wdGlvbiBhdXRvY29tcGxldGUtdGFyZ2V0XCJcbiAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uczsgbGV0IGluZGV4ID0gaW5kZXg7IGZpcnN0IGFzIGlzRmlyc3RcIlxuICAgICAgKGNsaWNrKT1cInNlbGVjdEluZGV4KGluZGV4KVwiXG4gICAgICBbdGFiaW5kZXhdPVwiaW5kZXggKyAxXCJcbiAgICAgIFtuZ0NsYXNzXT1cImNoZWNrQWN0aXZlKG9wdGlvblsndmFsdWUnXSkgPyAnYWN0aXZlJyA6ICcnXCJcbiAgICA+XG4gICAgICA8cCBjbGFzcz1cInNlbGVjdC10YXJnZXRcIj57eyBvcHRpb25bJ3RleHQnXSB9fTwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cIm9wdGlvbiBhdXRvY29tcGxldGUtdGFyZ2V0XCJcbiAgICAgIFtuZ0NsYXNzXT1cImVtcHR5UmVzdWx0cyA9PT0gZmFsc2UgPyAnaGlkZS1vcHRpb24nIDogJydcIlxuICAgID5cbiAgICAgIDxwPnt7ICdOb1Jlc3VsdHMnIHwgdHJhbnNsYXRlIH19PC9wPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19