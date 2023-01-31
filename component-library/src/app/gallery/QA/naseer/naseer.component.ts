import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';

@Component({
  selector: 'app-naseer',
  templateUrl: './naseer.component.html',
  styleUrls: ['./naseer.component.scss']
})
export class NaseerComponent implements OnInit {

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('QATesting-alt');
  }

}
