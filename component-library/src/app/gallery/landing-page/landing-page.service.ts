import { Routes, Route } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';

/**
 * Provides helper methods to create routes.
 */
export class LandingPage {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: LandingPageComponent,
      children: routes
    };
  }
}
