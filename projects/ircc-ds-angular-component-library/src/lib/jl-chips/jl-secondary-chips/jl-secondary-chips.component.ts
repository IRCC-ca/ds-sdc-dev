import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jl-pr-sclp-jl-secondary-chips',
  templateUrl: './jl-secondary-chips.component.html',
  styleUrls: ['./jl-secondary-chips.component.scss']
})
export class JlSecondaryChipsComponent implements OnInit {
  @Input() chipContent!: string;

  constructor() {}

  ngOnInit(): void {}
}
