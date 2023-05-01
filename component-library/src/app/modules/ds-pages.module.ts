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
import { codeViewerComponent } from '@app/components/code-viewer/code-viewer.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { resizableContainerComponent } from '@app/components/resizable-container/resizable-container.component';
import { accordionContainerComponent } from '@app/components/accordion-panel/accordion-container.component';
import { codeViewComponent } from '@app/pages/code-view/code-view.component';
import { BannerDocumentationComponent } from '@app/pages/banner-documentation/banner-documentation.component';
import { InteractiveDemoComponent } from '@app/components/interactive-demo/interactive-demo.component';
import { TranslateModule } from '@ngx-translate/core';
import { InputDocumentationComponent } from '@app/pages/input-documentation/input-documentation.component';
import { InputComponent } from 'component-lib/src/public-api';
import { ComponentPreviewComponent } from '@app/components/component-preview/component-preview.component';

@NgModule({
  declarations: [
    TitleSlugUrlComponent,
    resizableContainerComponent,
    codeViewerComponent,
    accordionContainerComponent,
    OverviewComponent,
    ForDesignersComponent,
    SlugifyPipe,
    SafeHtmlPipe,
    codeViewComponent,
    BannerDocumentationComponent,
    InteractiveDemoComponent,
    InputDocumentationComponent,
    ComponentPreviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClipboardModule,
    QaModule,
    HighlightModule,
    AccessibilityDemoModule,
    TranslateModule,
    SharedModule
  ],
  exports: [
    TitleSlugUrlComponent,
    codeViewerComponent,
    accordionContainerComponent,
    resizableContainerComponent
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
        themePath: 'assets/code-viewer.css'
      }
    }
  ]
})
export class DsPageModule {}
