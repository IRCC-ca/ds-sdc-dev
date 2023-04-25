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
import { BannerDocumentationComponent } from '@app/pages/banner-documentation/banner-documentation.component';
import { InteractiveDemoComponent } from '@app/components/interactive-demo/interactive-demo.component';
import { accordionContainerComponent } from '@app/components/accordion-panel/accordion-container.component';

@NgModule({
  declarations: [
    TitleSlugUrlComponent,
    OverviewComponent,
    ForDesignersComponent,
    SlugifyPipe,
    SafeHtmlPipe,
    BannerDocumentationComponent,
    InteractiveDemoComponent,
    accordionContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClipboardModule,
    QaModule,
    AccessibilityDemoModule,
  ],
  exports: [TitleSlugUrlComponent]
})
export class DsPageModule {}