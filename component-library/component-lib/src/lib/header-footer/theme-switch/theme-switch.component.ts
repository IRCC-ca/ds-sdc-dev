import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'ircc-cl-lib-theme-switch',
  templateUrl: './theme-switch.component.html'
})
export class ThemeSwitchComponent {
  isDarkTheme = false;
  currentTheme = '';
  previousTheme = '';
  darkModeQuery : any;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkTheme = this.darkModeQuery.matches;
    this.isDarkTheme ? this.currentTheme = 'dark' : this.currentTheme = 'light';
    this.currentTheme === 'dark' ? this.previousTheme = 'light' : this.previousTheme = 'dark';
    this.darkModeQuery.addEventListener('change', this.handleDarkModeChange.bind(this));
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.isDarkTheme ? this.currentTheme = 'dark' : this.currentTheme = 'light';
    this.currentTheme === 'dark' ? this.previousTheme = 'light' : this.previousTheme = 'dark';
    this.renderer.setAttribute(document.documentElement, 'scheme', this.currentTheme);
    this.darkModeQuery.removeEventListener('change', this.handleDarkModeChange.bind(this));
  }

  handleDarkModeChange(event: MediaQueryListEvent) {
    this.isDarkTheme = event.matches;
    this.isDarkTheme ? this.currentTheme = 'dark' : this.currentTheme = 'light';
    this.currentTheme === 'dark' ? this.previousTheme = 'light' : this.previousTheme = 'dark';
}
}
