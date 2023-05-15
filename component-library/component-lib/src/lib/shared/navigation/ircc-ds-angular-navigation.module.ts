import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IrccDsAngularComponentsSharedModule } from '../../shared/ircc-ds-angular-component-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { navigationComponent } from './navigation.component';
import { navItemHeadingComponent } from './nav-item-heading/nav-item-heading.component';
import { navItemNavComponent } from './nav-item-nav/nav-item-nav.component';
import { navItemAccordionComponent } from './nav-item-accordion/nav-item-accordion.component';
import { navItemStatusComponent } from './nav-item-status/nav-item-status.component';

const IrccDsNavigationComponents = [
  navigationComponent,
  navItemHeadingComponent,
  navItemNavComponent,
  navItemAccordionComponent,
  navItemStatusComponent
];

@NgModule({
  declarations: [...IrccDsNavigationComponents],
  imports: [CommonModule, IrccDsAngularComponentsSharedModule, TranslateModule],
  exports: [...IrccDsNavigationComponents]
})
export class IrccDsAngularNavigationModule {}
