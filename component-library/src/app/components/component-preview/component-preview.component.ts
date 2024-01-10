import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DSViewPortSize } from 'ircc-ds-angular-component-library';

export enum BackgroundColor {
  white = 'white',
  gray = 'gray'
}

@Component({
  selector: 'app-component-preview',
  templateUrl: './component-preview.component.html',
  styleUrls: ['./component-preview.component.scss']
})
export class ComponentPreviewComponent implements OnInit {
  @Input() copyText?: string;
  @Input() copyStyle?: string;
  @Input() backgroundColor?: keyof typeof BackgroundColor;
  @Input() minWidth: number = 0;
  @Input() multiConfig?: {
    multi: boolean;
    position: 'first' | 'middle' | 'last';
  };

  positionClass?: string;
  mobile: boolean = false;

  ngOnInit() {
    if (!this.backgroundColor) this.backgroundColor = BackgroundColor.gray;
    if (this.multiConfig && this.multiConfig.multi)
      this.positionClass = 'multi-' + this.multiConfig.position;

    this.backgroundColor === BackgroundColor.white
      ? BackgroundColor.white
      : BackgroundColor.gray;
    this.mobile = window.innerWidth < DSViewPortSize.mobile;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.mobile = window.innerWidth < DSViewPortSize.mobile;
  }
}
