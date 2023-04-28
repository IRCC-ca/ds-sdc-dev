import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleSlugUrlComponent } from '@app/components/title-slug-url/title-slug-url.component';
import { OverviewComponent } from '@app/pages/overview/overview.component';
import { ForDesignersComponent } from '@app/pages/for-designers/for-designers.component';
import { ForDevelopersComponent } from '@app/pages/for-developers/for-developers.component';
import { SafeHtmlPipe } from '@app/share/safe-html.pipe';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { SharedModule } from './shared.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { QaModule } from '@app/pages/QA/qa.module';
import { AccessibilityDemoModule } from '@app/pages/QA/accessibility-demo/accessibility-demo.module';
import { SideNavComponent } from '@app/components/side-nav/side-nav.component';
import { SideNavConfig } from '@app/components/side-nav/side-nav.config';
import { ShellComponent } from '@app/shell/shell.component';
import { ShelldModule } from '@app/shell/shell.module';
import { UtilitiesComponent } from '@app/pages/utilities/utilities.component';
import { ButtonComponent } from '@app/pages/button/button.component';
import { ComponentPreviewComponent } from '@app/components/component-preview/component-preview.component';
import { InfoTextSmallComponent } from '@app/components/info-text-small/info-text-small.component';
import { ContactComponent } from '@app/pages/contact/contact.component';
@NgModule({
  declarations: [
    TitleSlugUrlComponent,
    OverviewComponent,
    ForDesignersComponent,
    ForDevelopersComponent,
    UtilitiesComponent,
    ButtonComponent,
    ContactComponent,
    SlugifyPipe,
    SafeHtmlPipe,
    SideNavComponent,
    ComponentPreviewComponent,
    InfoTextSmallComponent,
    ShellComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClipboardModule,
    QaModule,
    AccessibilityDemoModule,
    ShelldModule
  ],
  exports: [TitleSlugUrlComponent],
  providers: [SideNavConfig]
})
export class DsPageModule {}
