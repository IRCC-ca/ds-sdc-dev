import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'jl-pr-sclp-banner',
  templateUrl: './jl-banner.component.html',
  styleUrls: ['./jl-banner.scss']
})
export class JLBannerComponent implements OnInit {
  @Input() title = '';
  @Input() body = '';
  @Input() fixedLayout = false;
  @Input() delay = 0;
  @Input() hide = false;
  @Input() type = '';
  @Input() applications = '';

  @Output() bannerEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (this.delay > 0) {
      // 10 second max and 3 second min
      if (this.delay > 10000) {
        this.delay = 10000;
      } else if (this.delay < 1000) {
        this.delay = 3000;
      }
      setTimeout(() => {
        this.hide = true;
        this.bannerEvent.emit(''); //This had to be changed to make it universal (for the library). Call service from parent
      }, this.delay);
    }
  }
}
