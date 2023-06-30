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

  ngOnInit() {
    if (!this.backgroundColor) this.backgroundColor = BackgroundColor.gray;

    this.backgroundColor === BackgroundColor.white
      ? BackgroundColor.white
      : BackgroundColor.gray;
  }
}
