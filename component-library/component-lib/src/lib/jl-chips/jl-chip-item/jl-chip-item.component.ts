import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'jl-pr-sclp-jl-chip-item',
  templateUrl: './jl-chip-item.component.html',
  styleUrls: ['./jl-chip-item.component.scss']
})
export class JlChipItemComponent {
  @Input() chipContent?: string;
  @Output() iconClickEvent = new EventEmitter();

  constructor() {}

  onIconClick() {
    this.iconClickEvent.emit();
  }

  onEnterKeyPress() {
    this.iconClickEvent.emit();
  }
}
