import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'jl-pr-sclp-jl-chip-list',
  templateUrl: './jl-chip-list.component.html',
  styleUrls: ['./jl-chip-list.component.scss']
})
export class JlChipListComponent implements OnInit {
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
