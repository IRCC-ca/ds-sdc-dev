import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchService {
  darkModeEnabled: boolean = false;
  themeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  toggleTheme() {
    this.darkModeEnabled = !this.darkModeEnabled;
    this.themeChanged.emit(this.darkModeEnabled);  
  }
}