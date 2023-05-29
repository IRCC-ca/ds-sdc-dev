import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

import enUS from '../../../translations/en-US.json';
import frFR from '../../../translations/fr-FR.json';

@Injectable({
  providedIn: 'root'
})
export class LanguageSwitchService {
  /** BehaviourSubject/Observable for alt language paths */
  private altLangLink = new BehaviorSubject<string>('');
  altLangLinkObs = this.altLangLink.asObservable();

  constructor(private translateService: TranslateService) {
    // Embed languages to avoid extra HTTP requests
    translateService.setTranslation('en-US', enUS);
    translateService.setTranslation('fr-FR', frFR);
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
