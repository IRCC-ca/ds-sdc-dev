import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { slugAnchorType, slugTitleURLConfig } from '@app/components/title-slug-url/title-slug-url.component';
import { TranslateService } from '@ngx-translate/core';
import { IDatePickerConfig } from 'ircc-ds-angular-component-library';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';

@Component({
  selector: 'app-date-picker-documentation',
  templateUrl: './date-picker-documentation.component.html',
  styleUrls: ['./date-picker-documentation.component.scss']
})
export class DatePickerDocumentationComponent implements OnInit {
  altLangLink = 'datePickerDocumentation';
  form = new FormGroup({});

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  interactiveDemoSlugTitleURLConfig: slugTitleURLConfig = {
    title: 'Interactive Demo',
    anchorType: slugAnchorType.primary
  };
  
  datePickerConfig: IDatePickerConfig = {
    id: 'datePicker',
    formGroup: this.form,
  };
  
  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
