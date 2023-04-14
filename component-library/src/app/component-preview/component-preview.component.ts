import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-component-preview',
  templateUrl: './component-preview.component.html',
  styleUrls: ['./component-preview.component.scss']
})
export class ComponentPreviewComponent {
  @Input() copyText?: string;

  constructor() { }

}
