import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

  /**
   * Language Switch Button renamed and refactored to include Header and Footer Dark Mode support based on user system preferences
   */
export class LanguageHeaderFooterSwitchService {
  private languageClickSub = new BehaviorSubject<boolean>(false);
  languageClickObs$ = this.languageClickSub.asObservable();
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  public isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor() {
    this.updateDarkModePreference();
  }
    /**
   * We check system preference for preferred color scheme in the constructor before components are rendered in the DOM and subscribe to changes in the header and footer components
   */
  updateDarkModePreference() {
    const currentScheme = document.documentElement.getAttribute('scheme');

    if(currentScheme === 'system' || currentScheme === 'dark') {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
      const darkModeListener = (event: MediaQueryListEvent) => {
        this.isDarkModeSubject.next(event.matches);
      };
  
      darkModeQuery.addEventListener('change', darkModeListener);
      this.isDarkModeSubject.next(darkModeQuery.matches);
    }
  }

  languageToggleClick() {
    this.languageClickSub.next(true);
  }
}
