import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventService } from './event-service.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Directive({
  selector: '[appEventSub]'
})
export class EventSubDirective implements OnInit {
  @Input() buttonSubId = '';
  @Output() clickEvent = new EventEmitter<string>()

  clickSub = new Subscription;

  constructor(private buttonEvent: EventService) { }

  ngOnInit() {
    this.clickSub = this.buttonEvent.buttonClickedObs$.subscribe(response => {
      if (response.includes(this.buttonSubId)) {
        const emitString = response.replace((this.buttonSubId + '_'), '');
        this.clickEvent.emit(emitString);
      }
    });
  }

  ngOnDestroy() {
    this.clickSub.unsubscribe;
  }
}
