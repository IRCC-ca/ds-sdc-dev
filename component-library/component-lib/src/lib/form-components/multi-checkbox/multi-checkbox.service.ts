import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';

export interface ImultiCheckboxEvent {
  id: string;
  event: any;
  remove?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MultiCheckboxService {
  //This is a subject, we're making subject => observable after
  // Anytime change to subject, it will propagate out to all other things related to it
  private multiCheckboxEventSubj = new Subject<ImultiCheckboxEvent>();
  multiCheckboxEventObs$ = this.multiCheckboxEventSubj.asObservable(); //Use this for any events we need propagated up to parents

  /**
   * Broadcast element events
   * @param event: ImultiCheckboxEvent where id is the id of the component broadcasting and event is the Event
   */
  checkEvent(event: ImultiCheckboxEvent) {
    this.multiCheckboxEventSubj.next(event);
  }

  private multiCheckboxErrorSubj = new Subject<string>();
  multiCheckboxErrorObs$ = this.multiCheckboxErrorSubj.asObservable();

  errorEvent(event: string) {
    this.multiCheckboxErrorSubj.next(event);
  }

  /**
   * Checks to see if an AbstractControl is valid or not.
   * @param control: AbstractControl field that we are checking
   * @param field: string, name of the field we are checking
   */
  checkField(id: string): void {
    //is the control valid
    this.errorEvent(id);
  }
}
