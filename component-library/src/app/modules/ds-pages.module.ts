import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleSlugUrlComponent } from '@app/title-slug-url/title-slug-url.component';
import { OverviewComponent } from '@app/pages/overview/overview.component';
// import { ForDesignersComponent } from '@app/pages/for-designers/for-designers.component';
import { SafeHtmlPipe } from '@app/share/safe-html.pipe';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    TitleSlugUrlComponent,
    OverviewComponent,
    // ForDesignersComponent,
    SlugifyPipe,
    SafeHtmlPipe
  ],
  imports: [CommonModule, SharedModule],
  exports: [TitleSlugUrlComponent]
})
export class DsPageModule {}
