import { OnInit, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class JlChipListComponent implements OnInit {
    chipList?: string[];
    chipListChange: EventEmitter<string[]>;
    chipContentText?: string;
    constructor();
    ngOnInit(): void;
    removeChipItem(chipIdx: number): void;
    onSubmit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<JlChipListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<JlChipListComponent, "jl-pr-sclp-jl-chip-list", never, { "chipList": "chipList"; }, { "chipListChange": "chipListChange"; }, never, never, false>;
}
