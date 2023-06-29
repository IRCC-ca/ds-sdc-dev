import { Component, Renderer2 } from '@angular/core';
// import { ThemeSwitchService } from './theme-switch.service';


@Component({
  selector: 'ircc-cl-lib-theme-switch',
  templateUrl: './theme-switch.component.html'
})
export class ThemeSwitchComponent {
  isDarkTheme = false;
  currentTheme = '';
  previousTheme = '';
  darkModeQuery : any;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkTheme = this.darkModeQuery.matches;
    this.isDarkTheme ? this.currentTheme = 'dark' : this.currentTheme = 'light';
    this.currentTheme === 'dark' ? this.previousTheme = 'Light' : this.previousTheme = 'Dark';
    this.darkModeQuery.addEventListener('change', this.handleDarkModeChange.bind(this));
    
    // this.subscription = this.themeService.isDarkMode$.subscribe(() => {
      //Kris suggested we need to track two booleans, one for system preference and the other for toggle
      //currently, there is a bug when toggle is used and then system preference is changed, where the logo base64 string is correct but the system theme does not switch.
      //To reproduce, toggle system preference, toggle theme switch, and then toggle system preference again - it breaks.
      // });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.isDarkTheme ? this.currentTheme = 'dark' : this.currentTheme = 'light';
    this.currentTheme === 'dark' ? this.previousTheme = 'Light' : this.previousTheme = 'Dark';
    this.renderer.setAttribute(document.documentElement, 'scheme', this.currentTheme);
    this.darkModeQuery.removeEventListener('change', this.handleDarkModeChange.bind(this));
  }

  handleDarkModeChange(event: MediaQueryListEvent) { 
    this.isDarkTheme = event.matches;
    this.isDarkTheme ? this.currentTheme = 'dark' : this.currentTheme = 'light';
    this.currentTheme === 'dark' ? this.previousTheme = 'Light' : this.previousTheme = 'Dark';
  }
}
