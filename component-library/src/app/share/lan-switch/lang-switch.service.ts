import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
// @ts-ignore
import en from '../../../assets/locales/en.json';
// @ts-ignore
import fr from '../../../assets/locales/fr.json';
import { Languages } from '../global-params';

@Injectable({
  providedIn: 'root'
})
export class LangSwitchService {
  /** BehaviourSubject/Observable for alt language paths */
  private altLangLink = new BehaviorSubject<string>('');
  altLangLinkObs = this.altLangLink.asObservable();
  constructor(private translate: TranslateService) {
    translate.setTranslation(Languages.English, en);
    translate.setTranslation(Languages.French, fr);
  }

  /**
   * Sets the link, updates the observer so that components subscribing to it will update
   * @param path Values to set the current link to
   */
  setAltLangLink(path: string) {
    this.altLangLink.next(path);
  }

  /** Returns an observable of the alt lang link for language switching */
  getAltLangLink(): Observable<string> {
    return this.altLangLink;
  }
}
