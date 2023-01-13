import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageSwitchButtonService {
  private languageClickSub = new BehaviorSubject<any>('');
  languageClickObs$ = this.languageClickSub.asObservable();

  languageToggleClick() {
    this.languageClickSub.next(true);
  }
}
