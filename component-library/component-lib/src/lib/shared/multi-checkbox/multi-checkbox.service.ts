import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export interface ImultiCheckboxEvent {
  id: string;
  event: any;
}

@Injectable({
  providedIn: 'root'
})
export class MultiCheckboxService {

  private multiCheckboxEventSubj = new Subject<ImultiCheckboxEvent>();
  multiCheckboxEventObs$ = this.multiCheckboxEventSubj.asObservable();

  /**
   * Broadcast element events
   * @param event: ImultiCheckboxEvent where id is the id of the component broadcasting and event is the Event
   */
   checkEvent(event: ImultiCheckboxEvent) {
    this.multiCheckboxEventSubj.next(event);
  }

}