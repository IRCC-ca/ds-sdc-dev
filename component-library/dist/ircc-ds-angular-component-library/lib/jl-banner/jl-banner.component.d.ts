import { EventEmitter, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class JLBannerComponent implements OnInit {
    title: string;
    body: string;
    fixedLayout: boolean;
    delay: number;
    hide: boolean;
    type: string;
    applications: string;
    bannerEvent: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<JLBannerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<JLBannerComponent, "jl-pr-sclp-banner", never, { "title": "title"; "body": "body"; "fixedLayout": "fixedLayout"; "delay": "delay"; "hide": "hide"; "type": "type"; "applications": "applications"; }, { "bannerEvent": "bannerEvent"; }, never, never, false>;
}
