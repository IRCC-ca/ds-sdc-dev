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
import { ComponentPreviewComponent } from '@app/components/component-preview/component-preview.component';
import { InfoTextSmallComponent } from '@app/components/info-text-small/info-text-small.component';
import { ContactComponent } from '@app/pages/contact/contact.component';
import { codeViewerComponent } from '@app/components/code-viewer/code-viewer.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { resizableContainerComponent } from '@app/components/resizable-container/resizable-container.component';
import { codeViewComponent } from '@app/pages/code-view/code-view.component';
import { BannerDocCodeComponent } from '@app/pages/banner-documentation/banner-doc-code.component';
import { InteractiveDemoComponent } from '@app/components/interactive-demo/interactive-demo.component';
import { ButtonDocCodeComponent } from '@app/pages/button-documentation/button-doc-code.component';
import { TranslateModule } from '@ngx-translate/core';
import { InputDocumentationComponent } from '@app/pages/input-documentation/input-documentation.component';
import { accordionContainerComponent } from '@app/components/accordion-panel/accordion-container.component';
import { InputDocCodeComponent } from '@app/pages/input-documentation/input-doc-code.component';
import { EncapsulatedElementComponent } from '@app/components/encapsulated-element/encapsulated-element.component';
import { RequestFormComponent } from '@app/pages/request-form/request-form.component';
import { DatePickerDocumentationComponent } from '@app/pages/date-picker-documentation/date-picker-documentation.component';

@NgModule({
  declarations: [
    TitleSlugUrlComponent,
    resizableContainerComponent,
    codeViewerComponent,
    accordionContainerComponent,
    OverviewComponent,
    ForDesignersComponent,
    ForDevelopersComponent,
    UtilitiesComponent,
    ContactComponent,
    SlugifyPipe,
    SafeHtmlPipe,
    SideNavComponent,
    ComponentPreviewComponent,
    InfoTextSmallComponent,
    ShellComponent,
    codeViewComponent,
    BannerDocCodeComponent,
    InteractiveDemoComponent,
    ButtonDocCodeComponent,
    InputDocumentationComponent,
    ComponentPreviewComponent,
    InteractiveDemoComponent,
    InputDocCodeComponent,
    EncapsulatedElementComponent,
    RequestFormComponent,
    DatePickerDocumentationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClipboardModule,
    QaModule,
    AccessibilityDemoModule,
    ShelldModule,
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
    SideNavConfig,
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
