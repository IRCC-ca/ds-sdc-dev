import { Component, Input, OnInit } from '@angular/core';

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

  ngOnInit() {
    if (!this.backgroundColor) this.backgroundColor = BackgroundColor.gray;
    if (this.multiConfig && this.multiConfig.multi)
      this.positionClass = 'multi-' + this.multiConfig.position;

    this.backgroundColor === BackgroundColor.white
      ? BackgroundColor.white
      : BackgroundColor.gray;
  }
}
