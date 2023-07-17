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

  //This is a subject, we're making subject => observable after
  // Anytime change to subject, it will propagate out to all other things related to it
  private multiCheckboxEventSubj = new Subject<ImultiCheckboxEvent>();
  multiCheckboxEventObs$ = this.multiCheckboxEventSubj.asObservable();//Use this for any events we need propagated up to parents

  /**
   * Broadcast element events
   * @param event: ImultiCheckboxEvent where id is the id of the component broadcasting and event is the Event
   */
   checkEvent(event: ImultiCheckboxEvent) {
    this.multiCheckboxEventSubj.next(event);
  }

}