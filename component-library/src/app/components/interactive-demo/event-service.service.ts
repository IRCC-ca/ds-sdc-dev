import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private buttonClicked = new Subject<string>();
  buttonClickedObs$ = this.buttonClicked.asObservable();


  onButtonClick(id: string) {
    this.buttonClicked.next(id);
  }
}
