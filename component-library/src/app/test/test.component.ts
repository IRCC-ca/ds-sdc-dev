import { AfterContentInit, Component, ElementRef, Input } from '@angular/core';
import { SlugifyPipe } from '../share/pipe-slugify.pipe';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  providers: [SlugifyPipe]
})
export class TestComponent implements AfterContentInit {
  @Input() type: 'primary' | 'secondary' = 'secondary';
  @Input() translate = ''; // translation binding
  title = '';
  titleSlugified = ''; // overview-test
  slugifiedUrl = ''; // http://localhost:4200/en/overview#overview-test

  constructor(
    private el: ElementRef,
    private slugify: SlugifyPipe,
    private translator: TranslateService
  ) {}

  ngAfterContentInit(): void {
    this.title = this.el.nativeElement.innerText;
    if (this.translate != '') {
      this.title = this.translator.instant(this.translate);
    }
    this.titleSlugified = this.slugify.transform(this.title);
    console.log(this.titleSlugified);
    this.slugifiedUrl =
      this.el.nativeElement.ownerDocument.location.origin +
      this.el.nativeElement.ownerDocument.location.pathname +
      '#' +
      this.titleSlugified;
  }
}
