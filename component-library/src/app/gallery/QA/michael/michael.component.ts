import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';

@Component({
  selector: 'app-michael',
  templateUrl: './michael.component.html',
  styleUrls: ['./michael.component.scss']
})
export class MichaelComponent implements OnInit {

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('QATesting-alt');
  }

}
