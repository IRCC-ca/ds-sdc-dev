import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() id?: string = 'header';

  menuHidden = true;

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }
}
