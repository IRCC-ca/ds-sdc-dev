import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
showThing = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.showThing = !this.showThing;
  }
}
