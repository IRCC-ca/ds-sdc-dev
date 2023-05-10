import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-encapsulated-element',
  templateUrl: './encapsulated-element.component.html',
  styleUrls: ['./encapsulated-element.component.scss'], //or I can add another stylesheets here
  encapsulation: ViewEncapsulation.ShadowDom
})
export class EncapsulatedElementComponent implements OnInit {
  @Input() injectedHtml: string | undefined;

  constructor() {}

  ngOnInit() {}
}
