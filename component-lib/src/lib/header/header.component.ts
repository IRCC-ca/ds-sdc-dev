import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'lib-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Input() id = '';
}
