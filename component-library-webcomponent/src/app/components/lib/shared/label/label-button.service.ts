import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelButtonService {
  private labelButtonClickSubj = new BehaviorSubject<string>('');
  labelButtonClickObs$ = this.labelButtonClickSubj.asObservable();

  buttonPress(id: string) {
    this.labelButtonClickSubj.next(id);
  }
}
