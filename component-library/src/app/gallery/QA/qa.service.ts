import { Routes, Route } from '@angular/router';
import { QaComponent } from './qa.component';

/**
 * Provides helper methods to create routes.
 */
export class QARoutes {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: QaComponent,
      children: routes
    };
  }
}
