import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { ThemeSwitchService } from './theme-switch.service';

@Component({
  selector: 'ircc-cl-lib-theme-switch',
  templateUrl: './theme-switch.component.html'
})
export class ThemeSwitchComponent {
  isDarkTheme = false;
  currentTheme = '';
  previousTheme = '';
  darkModeQuery : any;
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();

  constructor(private renderer: Renderer2, private themeService: ThemeSwitchService) {}

  ngOnInit() {
    this.darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkTheme = this.darkModeQuery.matches;
    this.isDarkTheme ? this.currentTheme = 'dark' : this.currentTheme = 'light';
    this.currentTheme === 'dark' ? this.previousTheme = 'Light' : this.previousTheme = 'Dark';
    this.darkModeQuery.addEventListener('change', this.handleDarkModeChange.bind(this));
  }

  toggleTheme() {
    this.toggle.emit();
    this.themeService.toggleTheme();
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
