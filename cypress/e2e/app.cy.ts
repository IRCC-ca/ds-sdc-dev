import { AppSharedPage } from './page-objects/app-shared.po';
import { HomePage } from './page-objects/home.po';

describe('when the app loads', () => {
  const app = new AppSharedPage();
  const home = new HomePage();

  before(() => {
    app.navigateAndSetLanguage();
  });

  it('should display the home page and say hello', () => {
    cy.url().should('include', home.url);
    home.welcomeText.contains('Hello world !');
  });
});
