import {
  Component,
  Input,
  Renderer2,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DSViewPortSize } from '../../../shared/constants/jl-components.constants';

export interface IDynamicImageComponentConfig {
  id: string;
  breakpoints: IBreakpoint[];
  defaultSrc: string;
  altText: string;
  lazyLoad?: boolean;
}
export interface IBreakpoint {
  maxWidth: DSViewPortSize;
  src: string;
}
@Component({
  selector: 'ircc-cl-lib-dynamic-image',
  templateUrl: './dynamic-image.component.html'
})
export class DynamicImageComponent implements OnInit, AfterViewInit {
  @ViewChild('image', { static: true }) image: ElementRef | undefined;
  @Input() config: IDynamicImageComponentConfig = {
    id: '',
    breakpoints: [{ maxWidth: DSViewPortSize.default, src: '' }],
    altText: '',
    defaultSrc: '',
    lazyLoad: false
  };

  @Input() id: string = '';
  @Input() breakpoints:
    | [{ maxWidth: DSViewPortSize.default; src: '' }]
    | undefined;
  @Input() altText: string = '';
  @Input() defaultSrc?: string = '';
  @Input() lazyLoad: boolean = false;

  constructor(
    private translate: TranslateService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    if (this.id) this.config.id = this.id;
    if (this.breakpoints) this.config.breakpoints = this.breakpoints;
    if (this.altText) this.config.altText = this.altText;
    if (this.defaultSrc) this.config.defaultSrc = this.defaultSrc;
    if (this.lazyLoad) this.config.lazyLoad = this.lazyLoad;
  }

  ngAfterViewInit() {
    this.updateImageSrc();
    window.addEventListener('resize', () => this.updateImageSrc());
  }

  updateImageSrc() {
    if (this.image?.nativeElement) {
      const screenWidth = window.innerWidth;
  
      // Find the matching breakpoint for the current screen width
      const breakpoint = this.config.breakpoints.find(
        (breakpoint) => screenWidth <= breakpoint.maxWidth
      );
  
      if (breakpoint) {
        // Set the src attribute of the image to the matched breakpoint's src
        this.renderer.setAttribute(
          this.image?.nativeElement,
          'src',
          breakpoint.src
        );
      } else {
        // If no matching breakpoint is found, use the default src image
        this.renderer.setAttribute(
          this.image?.nativeElement,
          'src',
          this.config.defaultSrc
        );
      }
    }
  }
}
