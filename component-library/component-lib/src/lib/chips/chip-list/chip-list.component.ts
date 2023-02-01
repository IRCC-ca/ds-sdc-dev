import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-chip-list',
  templateUrl: './chip-list.component.html'
})
export class ChipListComponent implements OnInit {
  @Input() chipList?: string[];
  @Output() chipListChange = new EventEmitter<Array<string>>();
  chipContentText?: string;
  constructor() {}

  ngOnInit(): void {}

  removeChipItem(chipIdx: number) {
    this.chipList?.splice(chipIdx, 1);
    this.chipListChange.emit(this.chipList);
  }

  onSubmit() {
    if (this.chipContentText) {
      this.chipList?.push(this.chipContentText);
      this.chipListChange.emit(this.chipList);
      this.chipContentText = '';
    }
  }
}
