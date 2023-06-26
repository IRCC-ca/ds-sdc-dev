import { EventEmitter, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchService {
  darkModeEnabled: boolean = false;
  themeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor() {}

  toggleTheme() {
    this.darkModeEnabled = !this.darkModeEnabled;
    this.themeChanged.emit(this.darkModeEnabled);  
  }
}