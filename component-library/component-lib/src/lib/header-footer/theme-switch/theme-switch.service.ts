import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchService {
  darkModeEnabled: boolean = false; 
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  public isDarkMode$ = this.isDarkModeSubject.asObservable();
  
  constructor() {
    this.updateDarkModePreference();
  }
  //handle system preferences
  updateDarkModePreference(){
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  console.log(darkModeQuery.matches);
  
  const darkModeListener = (event: MediaQueryListEvent) => {
    this.isDarkModeSubject.next(event.matches);
    console.log(darkModeQuery.matches);

  };

  darkModeQuery.addEventListener('change', darkModeListener);
  this.isDarkModeSubject.next(darkModeQuery.matches);
}
  //handle theme switch component
  toggleTheme() {
    this.isDarkModeSubject.next(!this.isDarkModeSubject.value);
  }
}