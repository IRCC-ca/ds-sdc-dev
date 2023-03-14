import { Component, Input, OnInit } from '@angular/core';

export interface ISkipLinkConfig {
  title: string,
  href: string,
  ariaLabel?: string
}

export interface IHiddenNavConfig {
  id: string,
  skipLinks?: ISkipLinkConfig[]
}

@Component({
  selector: 'lib-hidden-nav',
  templateUrl: './hidden-nav.component.html'
})
export class HiddenNavComponent implements OnInit {

  @Input() config: IHiddenNavConfig = {
    id: ''
  }

  constructor() { }

  keyPress(e : KeyboardEvent, href: string){
    if (e.key === 'Enter') this.scrollToAnchor(href);
  }

  scrollToAnchor(id : string){
    if (id) {
      const el = document.getElementById(id);
      el?.scrollIntoView();
      el?.setAttribute('tabindex','-1');
      el?.focus();
    }
  }

  showNav() {
    const container = document.getElementById('hidden-nav-container');
    const btns = document.getElementsByClassName('hidden-btns');
    container?.classList.add('active-nav');
  }

  ngOnInit(): void {

    document.addEventListener('keydown', event => {
      event.key === 'Tab' ? this.showNav() : null;
    })
  }
}
