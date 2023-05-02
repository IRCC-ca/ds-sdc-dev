import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  HostListener,
  ElementRef,
  AfterViewInit,
  Renderer2,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { DSSizes } from '../../../shared/constants/jl-components.constants';
import { ILinkComponentConfig } from './link/link.component';
import { TranslateService } from '@ngx-translate/core';
import { StandAloneFunctions } from '../../../shared/functions/stand-alone.functions';
import { IIconButtonComponentConfig } from '../icon-button/icon-button.component';

export enum LinkType {
  href = 'href',
  routerLink = 'routerLink'
}

export interface IBreadcrumbConfig {
  id: string;
  size?: keyof typeof DSSizes;
  type: keyof typeof LinkType;
  // Translation key of base url segment
  baseUrlKey: string;
  // The mid-layer navigation to the ancestor links, the previous pages that lead to users to the child page
  links?: ILinkComponentConfig[];
}

@Component({
  selector: 'ircc-cl-lib-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() config: IBreadcrumbConfig = {
    id: '',
    baseUrlKey: '',
    type: 'href'
  };
  baseUrl = '';
  separatorIcon: IIconButtonComponentConfig = {
    id: 'breadcrumb_separator',
    category: 'custom',
    size: this.config?.size,
    icon: {
      class: 'fa-solid fa-ellipsis',
      color: 'var(--text-primary)'
    }
  };
  overflowLinks?: ILinkComponentConfig[];
  normalLinks?: ILinkComponentConfig[]; // Links that are not overflow
  displayOverflow = false;
  private maxHeight: number = 0; // Max height of element in px
  @ViewChild('breadcrumb_div', { static: false })
  divRef?: ElementRef<HTMLDivElement>;
  @ViewChild('breadcrumb_child', { static: false })
  childRef?: ElementRef<HTMLParagraphElement>;
  isChildOverflow: boolean = false;
  constructor(
    private translate: TranslateService,
    private standalone: StandAloneFunctions,
    private renderer: Renderer2,
    private changeRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.createLinks();
    this.separatorIcon.size = this.config.size;
    this.maxHeight = this.getMaxHeight();
    this.separatorIcon.ariaLabel = this.translate.instant(
      'ACC_DEMO.BREADCRUMB_COMPONENT.ADDITIONAL_LINKS'
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createOverflows();
      this.isChildOverflow = this.getChildOverflow();
      this.changeRef.detectChanges();
    }, 500);
  }

  ngOnChanges(changes: SimpleChanges) {
    // If changing size, update max height
    if (
      !changes['config'].firstChange &&
      changes['config'].currentValue.size !==
        changes['config'].previousValue.size
    ) {
      this.maxHeight = this.getMaxHeight();
    }
    // If changing link type, recreate all links
    if (
      !changes['config'].firstChange &&
      changes['config'].currentValue.type !==
        changes['config'].previousValue.type
    ) {
      this.createLinks();
    }
    if (this.config?.links && this.config?.links.length > 0) {
      if (this.config.type == 'routerLink') {
        this.config?.links.forEach((link) => {
          delete link.href;
        });
      } else {
        this.config?.links.forEach((link) => {
          delete link.routerLink;
        });
      }
    }
    this.separatorIcon.size = this.config.size;
  }

  /**
   * Create href or routerLinks
   */
  createLinks() {
    this.baseUrl = this.standalone.getBaseUrl('', this.config.baseUrlKey);
    if (this.config.links && this.config.links.length > 1) {
      let prev: string | undefined;
      this.config?.links.forEach((link, i) => {
        if (i === 0) {
          link[this.config.type] = this.baseUrl;
          prev = link[this.config.type];
        } else if (link.linkKey) {
          link[this.config.type] =
            prev + this.translate.instant(link.linkKey) + '/';
          prev = link[this.config.type];
        }
        link.overflow = false;
      });

      this.overflowLinks = this.config?.links.filter((link) => link.overflow);
      this.normalLinks = this.config?.links.filter((link) => !link.overflow);
    }
  }

  getMaxHeight(): number {
    const containerElement = this.divRef && this.divRef.nativeElement;
    const tempElement = this.renderer.createElement('p');
    const text = this.renderer.createText('Test');
    this.renderer.appendChild(tempElement, text);
    this.renderer.addClass(tempElement, 'breadcrumb-child');
    this.renderer.appendChild(containerElement, tempElement);
    const maxHeight = tempElement.offsetHeight;
    this.renderer.removeChild(containerElement, tempElement);
    // Calculate based on elipsis icon size to p tag ratio
    return maxHeight * 1.375;
  }

  createOverflows() {
    if (
      this.divRef &&
      this.divRef?.nativeElement.offsetHeight <= this.maxHeight
    )
      return;

    if (this.config.links && this.config.links.length > 1) {
      const linksLength = this.config.links.length;

      const overflow = this.config?.links.find(
        (link, i) => i > 0 && i < linksLength - 1 && !link.overflow
      );
      if (overflow) overflow.overflow = true;

      this.overflowLinks = this.config?.links.filter((link) => link.overflow);
      this.normalLinks = this.config?.links.filter((link) => !link.overflow);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.overflowLinks = [];
    this.normalLinks = [];
    this.createLinks();
    this.createOverflows();
    this.isChildOverflow = this.getChildOverflow();
  }

  flipOverflow(buttonId: string) {
    this.displayOverflow = !this.displayOverflow;
  }

  // Check if child page title overflows to 2nd line
  getChildOverflow(): boolean {
    if (this.childRef) {
      return (
        this.childRef.nativeElement.offsetWidth <
        this.childRef.nativeElement.scrollWidth
      );
    } else {
      return false;
    }
  }
}
