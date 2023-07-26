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

  private multiCheckboxErrorSubj = new Subject<ImultiCheckboxEvent>();
  multiCheckboxErrorobs$ = this.multiCheckboxErrorSubj.asObservable();

  errorEvent(event: ImultiCheckboxEvent) {
    this.multiCheckboxErrorSubj.next(event);
  }

  checkField(
    control: AbstractControl<any, any> | null,
    field: string,
    errorMessage: string,
    errorKey?: string
  ) {
    //is the control valid
    if (control?.valid === false) {
      if (control.errors) {
        // is the function checking for a specific error
        if (errorKey === undefined) {
          // function is checking all the errors, loop them and send them
          Object.entries(control.errors).map(([key, value]) => {
            this.errorEvent({
              id: field,
              event: {
                id: field,
                key: key,
                errorLOV: errorMessage
              }
            });
          });
        }

        // function is checking a specific error, check to see if it's there
        else if (control.errors.hasOwnProperty(errorKey)) {
          this.errorEvent({
            id: field,
            event: {
              id: field,
              key: errorKey,
              errorLOV: errorMessage
            }
          });
        }
      }
    }
    // control is valid remove error
    else {
      this.errorEvent({
        id: field,
        event: { remove: true }
      });
    }
  }
}
