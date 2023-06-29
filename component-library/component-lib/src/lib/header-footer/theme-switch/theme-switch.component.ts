import { Component, EventEmitter, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { ThemeSwitchService } from './theme-switch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ircc-cl-lib-theme-switch',
  templateUrl: './theme-switch.component.html'
})
export class ThemeSwitchComponent implements OnDestroy {
  isDarkTheme = false;
  currentTheme = '';
  previousTheme = '';
  darkModeQuery : any;
  private subscription: Subscription = Subscription.EMPTY;
;

  constructor(private renderer: Renderer2, private themeService: ThemeSwitchService) {

  }

  ngOnInit() {
    this.darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkTheme = this.darkModeQuery.matches;
    this.isDarkTheme ? this.currentTheme = 'dark' : this.currentTheme = 'light';
    this.currentTheme === 'dark' ? this.previousTheme = 'Light' : this.previousTheme = 'Dark';
    this.darkModeQuery.addEventListener('change', this.handleDarkModeChange.bind(this));
    
    this.subscription = this.themeService.isDarkMode$.subscribe(() => {
      //Kris suggested we need to track two booleans, one for system preference and the other for toggle
      //currently, there is a bug when toggle is used and then system preference is changed, where the logo base64 string is correct but the system theme does not switch.
      //To reproduce, toggle system preference, toggle theme switch, and then toggle system preference again - it breaks.
      });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkTheme = !this.isDarkTheme;
    this.isDarkTheme ? this.currentTheme = 'dark' : this.currentTheme = 'light';
    this.currentTheme === 'dark' ? this.previousTheme = 'Light' : this.previousTheme = 'Dark';
    this.renderer.setAttribute(document.documentElement, 'scheme', this.currentTheme);
  }

  handleDarkModeChange(event: MediaQueryListEvent) { 
    this.isDarkTheme = event.matches;
    this.isDarkTheme ? this.currentTheme = 'dark' : this.currentTheme = 'light';
    this.currentTheme === 'dark' ? this.previousTheme = 'Light' : this.previousTheme = 'Dark';
  }
    ngOnDestroy() {
      this.subscription.unsubscribe();
      this.darkModeQuery.removeEventListener('change', this.handleDarkModeChange.bind(this));
  }
}
