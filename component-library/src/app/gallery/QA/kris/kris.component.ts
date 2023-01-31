import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';

@Component({
  selector: 'app-kris',
  templateUrl: './kris.component.html',
  styleUrls: ['./kris.component.scss']
})
export class KrisComponent implements OnInit {

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('QATesting-alt');
  }

}
