import { Component, Input } from '@angular/core';

export enum ComponentType {
  banner = 'banner',
  input = 'input'
}

@Component({
  selector: 'app-component-preview',
  templateUrl: './component-preview.component.html',
  styleUrls: ['./component-preview.component.scss']
})
export class ComponentPreviewComponent {
  @Input() copyText?: string;
  @Input() copyStyle?: string;
  @Input() componentType?: keyof typeof ComponentType;

  constructor() {}
}