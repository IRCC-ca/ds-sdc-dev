import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {
  constructor(private altLang: LanguageSwitchService) {}

  ngOnInit() {
    this.altLang.setAltLangLink('FormComponents');
  }
}
